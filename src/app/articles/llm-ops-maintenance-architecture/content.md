---
author: Mitchell Bryson
date: "2025-06-08"
title: "LLMOps you can maintain: traces, evals, guardrails, and cost budgets in one architecture"
description: "A pragmatic, vendor-agnostic LLMOps architecture that ties traces, evaluations, guardrails, and hard cost budgets to releases - so you can ship safely and keep control."
---

LLMs are only useful when you can *operate* them: observe behaviour, measure quality, control risk, and cap spend. This article lays out a minimal, durable LLMOps architecture you can run with a small team: **Traces → Evals → Guardrails → Budgets**, wired into CI/CD and your app.

## Why this architecture

#### Principles

* Prefer **simple, observable components** over complex orchestration.
* Keep **one path to prod**: the same code serves human and automated tests.
* **Prove value with evals** before exposing features to real users.
* **Fail closed** with guardrails and **cap spend** with hard budgets.

---

## System overview

```mermaid
flowchart LR
  A[App] --> B[Tracing Middleware]
  B --> C[Guardrails (schema, policy, filters)]
  C --> D[LLM Provider(s)]
  B --> E[Trace Store + Cost Meter]
  E --> F[Evals Runner (CI + nightly)]
  F --> G[Release Gate]
  E --> H[Budget Enforcer (quotas, alerts)]
```

#### What this gives you

* End-to-end **visibility** (inputs, outputs, tokens, latency, user, version).
* Reproducible **quality signals** (eval scores) tied to a commit.
* **Runtime safety** (schema validation, policy filters, PII scrubs).
* **Spend control** (per-model, per-route, per-user budgets).

---

## Traces: capture everything the model did

Instrument every model call once at your HTTP/SDK boundary. Emit OpenTelemetry spans (or structured JSON Lines) with inputs/outputs, token counts, costs, and calling context.

```ts
// express/fastify-style middleware (TypeScript)
import { v4 as uuid } from 'uuid'
import { tracer } from './otel'
import { price } from './pricing' // maps model+tokens -> $
import { callLLM } from './providers'

export async function llmMiddleware(req, res) {
  const span = tracer.startSpan('llm.call', { attributes: {
    route: req.route, model: req.body.model, version: process.env.APP_SHA,
    user_id: req.user?.id ?? 'anon', request_id: uuid(),
  }})
  const started = Date.now()

  try {
    const result = await callLLM(req.body)
    const tokensIn = result.usage.prompt_tokens
    const tokensOut = result.usage.completion_tokens
    const cost = price(req.body.model, tokensIn, tokensOut)

    span.setAttributes({ tokensIn, tokensOut, cost_usd: cost })
    span.end()
    res.json({ ...result, meta: { cost_usd: cost } })
  } catch (err) {
    span.recordException(err); span.setStatus({ code: 2, message: String(err) }); span.end()
    throw err
  }
}
```

#### What to include in every trace

* User/session, route, model+version, prompt template name, inputs (redacted), outputs, tokens, latency, **cost**, and a stable **eval\_id** when running tests.

---

## Evals: gate releases with automated checks

Create a small, high-signal eval set per feature (10–50 cases). Run it in CI (fast subset) and nightly (full). Block deploys when scores regress or cost blows past thresholds.

```python
# eval_runner.py
from stats import wilcoxon
from evals import faithfulness, relevance, exact_match

def run_eval(model_version, dataset):
    scores = []
    for case in dataset:
        out = model(case.input)
        scores.append({
          "faith": faithfulness(out, case.refs),
          "rel": relevance(out, case.refs),
          "em": exact_match(out, case.refs),
          "cost": out.meta["cost_usd"]
        })
    return scores

baseline = load_baseline("support_bot")   # previous release scores
current  = run_eval(app_sha, dataset())
assert wilcoxon(current.faith, baseline.faith).pvalue > 0.05, "Faithfulness regressed"
assert sum(s["cost"] for s in current) <= baseline_total_cost * 1.15, "Cost budget exceeded"
save_results(current, app_sha)
```

#### Eval types that matter

* **Task success** (exact/semantic match, structured field accuracy).
* **Groundedness/faithfulness** (uses provided context, no fabrication).
* **Toxicity/safety policy** checks on outputs.
* **Latency & cost** per case and in aggregate.

---

## Guardrails: schema, policy, and redaction

Guardrails sit *before* and *after* the model. Use them to reject unsafe inputs, constrain outputs to a schema, and scrub sensitive data from logs.

```ts
// JSON Schema validation for outputs (Zod example)
import { z } from 'zod'
const SupportReply = z.object({
  intent: z.enum(['status','refund','return','handoff']),
  answer: z.string().max(1000),
  citations: z.array(z.string().url()).max(5)
})

const rail = async (prompt) => {
  // Input guard: PII / secrets filter
  if (containsSecrets(prompt)) throw new Error('blocked: secrets')

  const raw = await callLLM({ schema: SupportReply }) // provider w/ JSON mode
  const parsed = SupportReply.parse(raw)              // throws on violation
  if (violatesPolicy(parsed.answer)) throw new Error('blocked: policy')
  return parsed
}
```

#### Practical guardrails

* **Input**: rate limits, size limits, PII/secret filters, prompt-injection checks.
* **Output**: **JSON schema** validation, allow-list enums, citation/URL checks, profanity/toxicity filters.
* **Context**: approved tools only; redact secrets before tracing; store hashes for sensitive values.

---

## Budgets: hard caps for cost and concurrency

Budgets stop runaway spend and keep tail latencies under control. Enforce per-model, per-feature, and per-user caps with circuit breakers.

```yaml
# budgets.yml
models:
  gpt-4o:
    daily_usd: 75
    tpm: 120000
    rpm: 3000
routes:
  support_bot:
    per_user_daily_usd: 0.30
    per_conv_cap_usd: 0.06
    max_concurrency: 200
alerts:
  slack_channel: "#llm-spend"
  notify_over: "80%"   # of any budget
```

```ts
// Budget enforcement snippet
import { Budget } from './budget'

const budget = new Budget('support_bot')
if (!budget.allow({ user: req.user?.id, estCost: est_usd })) {
  return res.status(429).json({ error: 'budget_exceeded' })
}
const result = await rail(req.body.prompt)
budget.commit(result.meta.cost_usd)
```

#### Budgeting tips

* **Pre-estimate** cost from tokens before calling; hard-fail if over cap.
* **Alert at 80%** of any budget and **trip** at 100% with a friendly fallback.
* Separate **eval spend** from **prod spend** with distinct budgets.

---

## One data model for everything

```sql
-- Minimal schema in Postgres
CREATE TABLE llm_traces(
  id uuid PRIMARY KEY, ts timestamptz, route text, model text, app_sha text,
  user_id text, prompt_name text, tokens_in int, tokens_out int,
  latency_ms int, cost_usd numeric(10,5),
  input_redacted jsonb, output jsonb, eval_id text
);

CREATE TABLE eval_results(
  id uuid PRIMARY KEY, eval_id text, app_sha text, route text,
  case_id text, faith real, relevance real, exact real,
  cost_usd numeric(10,5), passed boolean, ts timestamptz
);

CREATE TABLE budgets(
  scope text, key text, period date, spent_usd numeric(12,4),
  PRIMARY KEY(scope, key, period)
);
```

#### Why this works

* Traces, evals, and budgets **share identifiers** (route, model, app\_sha) so you can correlate them in dashboards and gates.

---

## CI/CD integration (release gates)

```yaml
# .github/workflows/eval.yml
jobs:
  evals:
    steps:
      - run: pnpm test:prompts           # unit tests on templates/guards
      - run: python eval_runner.py       # fast eval set
      - run: node scripts/check_gates.js # assert scores & budgets
```

#### Gates to enforce

* **No regression** on critical evals (p-value or threshold).
* **No new policy violations** in test logs.
* **Cost/latency** within configured budgets.

---

## Ops dashboard (one page)

#### Panels to ship

* **Spend & tokens** by route/model (today, 7d), with budget utilisation.
* **P95 latency** and error rate by route.
* **Eval trend** (last 10 runs) with red/green gate status.
* **Top failing cases** with links to traces and prompts.

---

## 60-day rollout plan

#### Days 0–15

* Add tracing middleware; start logging tokens, cost, latency, route, user.
* Define budgets.yml and wire basic enforcement + alerts.

#### Days 16–30

* Draft eval sets per feature; run in CI; add release gates for faithfulness + cost.

#### Days 31–60

* Add JSON-schema output validation, policy filters, and PII redaction.
* Build a minimal dashboard (spend, latency, evals) and begin weekly reviews.

---

## Common failure modes

#### Watch for these

* **Unversioned prompts**: put template names and SHAs in traces.
* **Hidden tool calls**: trace tool I/O separately; apply guardrails there too.
* **Budget drift**: revisit caps monthly; separate dev/eval/prod budgets.
* **Eval rot**: rotate 10–20% of cases quarterly; keep a frozen "golden" subset.
