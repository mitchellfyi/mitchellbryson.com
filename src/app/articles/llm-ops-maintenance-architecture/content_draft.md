llms are only useful when they can be operated
observe behaviour measure quality control risk cap spend
article lays out minimal durable llmops architecture that can be run with small team
traces to evals to guardrails to budgets wired into ci cd and app

Why this architecture

Principles

- Prefer simple, observable components over complex orchestration
- Keep one path to prod: the same code serves human and automated tests
- Prove value with evals before exposing features to real users
- Fail closed with guardrails and cap spend with hard budgets

System overview

App to Tracing Middleware to Guardrails schema, policy, filters to LLM Provider s to Trace Store plus Cost Meter to Evals Runner CI plus nightly to Release Gate. Trace Store plus Cost Meter also feeds Budget Enforcer quotas, alerts.

What this gives

- End-to-end visibility, inputs, outputs, tokens, latency, user, version
- Reproducible quality signals, eval scores, tied to a commit
- Runtime safety, schema validation, policy filters, PII scrubs
- Spend control, per-model, per-route, per-user budgets

Traces capture everything the model did

Instrument every model call once at the HTTP SDK boundary. Emit OpenTelemetry spans or structured JSON Lines with inputs outputs, token counts, costs, calling context.

express fastify-style middleware typescript:
import v4 as uuid from uuid
import tracer from otel
import price from pricing
import callllm from providers
export async function llmmiddleware req res:
const span equals tracer.startspan llm.call attributes route req.route model req.body.model version process.env.app_sha user_id req.user id anon request_id uuid
const started equals date.now
try:
const result equals await callllm req.body
const tokensin equals result.usage.prompt_tokens
const tokensout equals result.usage.completion_tokens
const cost equals price req.body.model tokensin tokensout
span.setattributes tokensin tokensout cost_usd cost
span.end
res.json result meta cost_usd cost
catch err:
span.recordexception err
span.setstatus code 2 message string err
span.end
throw err

What to include in every trace

- User session, route, model plus version, prompt template name, inputs redacted, outputs, tokens, latency, cost, stable eval_id when running tests

Evals gate releases with automated checks

Create a small, high-signal eval set per feature, 10-50 cases. Run it in CI, fast subset, and nightly, full. Block deploys when scores regress or cost blows past thresholds.

eval_runner.py:
from stats import wilcoxon
from evals import faithfulness relevance exact_match
def run_eval model_version dataset:
scores equals
for case in dataset:
out equals model case.input
scores.append faith faithfulness out case.refs
rel relevance out case.refs
em exact_match out case.refs
cost out.meta cost_usd
return scores
baseline equals load_baseline support_bot
current equals run_eval app_sha dataset
assert wilcoxon current.faith baseline.faith pvalue greater than 0.05 faithfulness regressed
assert sum s cost for s in current less than or equal to baseline_total_cost times 1.15 cost budget exceeded
save_results current app_sha

Eval types that matter

- Task success, exact semantic match, structured field accuracy
- Groundedness faithfulness, uses provided context, no fabrication
- Toxicity safety policy checks on outputs
- Latency and cost per case and in aggregate

Guardrails schema, policy, and redaction

Guardrails sit before and after the model. Use them to reject unsafe inputs, constrain outputs to a schema, scrub sensitive data from logs.

json schema validation for outputs zod example:
import z from zod
const supportreply equals z.object
intent z.enum status refund return handoff
answer z.string max 1000
citations z.array z.string url max 5
const rail equals async prompt:
if containssecrets prompt
then throw new error blocked secrets
const raw equals await callllm schema supportreply
const parsed equals supportreply.parse raw
if violatespolicy parsed.answer
then throw new error blocked policy
return parsed

Practical guardrails

- Input: rate limits, size limits, PII secret filters, prompt-injection checks
- Output: JSON schema validation, allow-list enums, citation URL checks, profanity toxicity filters
- Context: approved tools only, redact secrets before tracing, store hashes for sensitive values

Budgets hard caps for cost and concurrency

Budgets stop runaway spend and keep tail latencies under control. Enforce per-model, per-feature, per-user caps with circuit breakers.

budgets.yml:
models:
gpt-4o:
daily_usd 75
tpm 120000
rpm 3000
routes:
support_bot:
per_user_daily_usd 0.30
per_conv_cap_usd 0.06
max_concurrency 200
alerts:
slack_channel llm-spend notify_over 80%

budget enforcement snippet:
import budget from budget
const budget equals new budget support_bot
if not budget.allow user req.user id estcost est_usd
then return res.status 429 json error budget_exceeded
const result equals await rail req.body.prompt
budget.commit result.meta.cost_usd

Budgeting tips

- Pre-estimate cost from tokens before calling, hard-fail if over cap
- Alert at 80% of any budget and trip at 100% with a friendly fallback
- Separate eval spend from prod spend with distinct budgets

One data model for everything

Minimal schema in Postgres

create table llm_traces:
id uuid primary key
ts timestamptz
route text
model text
app_sha text
user_id text
prompt_name text
tokens_in int
tokens_out int
latency_ms int
cost_usd numeric 10,5
input_redacted jsonb
output jsonb
eval_id text

create table eval_results:
id uuid primary key
eval_id text
app_sha text
route text
case_id text
faith real
relevance real
exact real
cost_usd numeric 10,5
passed boolean
ts timestamptz

create table budgets:
scope text
key text
period date
spent_usd numeric 12,4
primary key scope key period

Why this works

- Traces, evals, budgets share identifiers, route, model, app_sha, so they can be correlated in dashboards and gates

CI CD integration release gates

.github workflows eval.yml: jobs evals steps run pnpm test:prompts run python eval_runner.py run node scripts check_gates.js

Gates to enforce

- No regression on critical evals, p-value or threshold
- No new policy violations in test logs
- Cost latency within configured budgets

Ops dashboard one page

Panels to ship

- Spend and tokens by route model, today, 7d, with budget utilisation
- P95 latency and error rate by route
- Eval trend, last 10 runs, with red green gate status
- Top failing cases with links to traces and prompts

60-day rollout plan

Days 0-15

- Add tracing middleware, start logging tokens, cost, latency, route, user
- Define budgets.yml and wire basic enforcement plus alerts

Days 16-30

- Draft eval sets per feature, run in CI, add release gates for faithfulness plus cost

Days 31-60

- Add JSON-schema output validation, policy filters, PII redaction
- Build a minimal dashboard, spend, latency, evals, and begin weekly reviews

Common failure modes

Watch for these

- Unversioned prompts: put template names and SHAs in traces
- Hidden tool calls: trace tool I O separately, apply guardrails there too
- Budget drift: revisit caps monthly, separate dev eval prod budgets
- Eval rot: rotate 10-20% of cases quarterly, keep a frozen golden subset