---
author: Mitchell Bryson
date: '2025-08-21'
title: 'Designing WhatsApp support agents with human handoff, audit trails, and SLA-aware routing'
description: 'A production template for WhatsApp support automation: compliant flows, human takeover, full audit trails, and routing that respects SLAs and customer tiers.'
---

WhatsApp is where customers already are; your agent should meet them there without breaking policy, losing context, or missing SLAs. This template shows how to design a **WhatsApp support agent** that's compliant, debuggable, and easy to hand over to humans - complete with audit trails and SLA-aware routing.

## What "good" looks like

#### Outcomes to aim for

- First-response time (FRT) under 60s for canary cohort; clear fallbacks when models fail.
- Seamless **human takeover** with the full chat transcript and customer context.
- **Audit trail** for every decision (who/what/when/why).
- **SLA-aware routing**: priority by customer tier, topic, and promised response time.
- Deflection where appropriate, without blocking escalation.

## Architecture at a glance

```mermaid
flowchart LR
  WA[WhatsApp Webhook] --> G[Gateway & Policy Filters]
  G --> A[Auth Layer (order lookup / OTP)]
  G --> N[NLU + Intent Router]
  N --> K[KB/RAG + Tools]
  N --> H[Human Handoff Service]
  K --> R[Response Builder (JSON schema)]
  R --> L[Logger / Audit Trail]
  H --> L
  L --> Q[Queue & SLA Scheduler]
  Q --> H
  R --> WA
```

## Channel compliance (non-negotiables)

#### Policy anchors to respect

- 24-hour **customer service window**: outside it, respond only with approved **message templates** or wait for user initiation.
- Explicit **opt-in** and clear identification of your business in first contact.
- Easy **human escalation** and a transparent path to alternative channels (email/phone).
- Handle **PII** carefully (minimise, redact in logs, restrict retention).
- Template approval and locale management for re-engagement messages.

## Human handoff: the two modes

#### Warm and cold handoff

- **Warm handoff**: the agent gathers intent, identity, and evidence (citations, order refs), then invites a human into the _same_ thread; the human sees the context.
- **Cold handoff**: the agent opens a ticket with a permalink to the transcript, then replies in WhatsApp with the ticket number and ETA.

```ts
// Pseudocode: trigger handoff with full context
const handoffPayload = {
  conversation_id,
  customer: { id, name, phone },
  summary: last_model_summary,
  transcript_url,
  intent,
  priority, // derived from tier + topic
  sla_due_at, // computed from SLA matrix
  attachments, // parsed docs / images (optional)
}
const ticket = await helpdesk.createTicket(handoffPayload)
await whatsapp.reply(
  conversation_id,
  `I've connected you to a human (ticket ${ticket.key}). We'll reply by ${eta(sla_due_at)}.`,
)
```

## Audit trail: make every decision explainable

#### Log these fields on every message/decision

- Conversation and message IDs; timestamps (UTC).
- Customer identity (hashed phone), consent/opt-in status.
- Detected **intent** and confidence; prompt template + version.
- Tools used (order lookup, KB citations) with inputs/outputs.
- Model tokens/costs/latency; guardrail passes/failures.
- Handoff decisions (who took over, when, why).

```sql
CREATE TABLE wa_events(
  id UUID PRIMARY KEY,
  ts timestamptz NOT NULL,
  conversation_id text NOT NULL,
  actor text NOT NULL,                    -- 'user' | 'agent' | 'human'
  event_type text NOT NULL,               -- 'message' | 'tool' | 'handoff' | 'sla'
  payload jsonb NOT NULL,                 -- redacted where needed
  model text, tokens_in int, tokens_out int, cost_usd numeric(10,5),
  prompt_version text, intent text, confidence real
);
CREATE INDEX ON wa_events (conversation_id, ts);
```

## SLA-aware routing

#### How to set priorities

- **Customer tier** (VIP/trade/retail) and **topic** (refund, delivery, technical).
- **Promised SLA** per (tier × topic × channel).
- **Queue rules**: "escalate if time-to-SLA < X minutes and agent unavailable."

```python
# Compute due time and enqueue with priority
def due_at(now, tier, topic):
    return now + SLA[tier][topic]

job = {
  "conversation_id": cid,
  "priority": priority_score(tier, topic, sentiment),
  "due_at": due_at(now, tier, topic)
}
queue.push(job)

# Escalation watcher
if (job.due_at - now).total_seconds() < 300 and not assigned(job):
    notify_humans(job, channel="#support-p1")
```

## Conversation state machine

#### States and transitions

- **new → authenticated** (order lookup / OTP / soft KYC)
- **authenticated → automated** (intent matched, tool answers)
- **automated → human** (confidence low, VIP, or policy keyword)
- **human → closed** (resolution sent, CSAT request)
- **any → dormant** (24h window expired; wait for user or send template)

```ts
type State =
  | 'new'
  | 'authenticated'
  | 'automated'
  | 'human'
  | 'closed'
  | 'dormant'
function next(state: State, event: Event): State {
  if (event.type === 'handoff') return 'human'
  if (event.type === 'expire_window') return 'dormant'
  if (state === 'new' && event.type === 'authed') return 'authenticated'
  if (state === 'authenticated' && event.type === 'answer_ok')
    return 'automated'
  if (state === 'automated' && event.type === 'resolved') return 'closed'
  return state
}
```

## Authentication options (pick the lightest that works)

#### Low-friction identity patterns

- **Order lookup**: phone + order ID (masked input); match by last 4 digits of postcode or email.
- **One-time link** sent to email/SMS to view order and confirm identity.
- **Account match**: if the phone is on file, ask for a short secret (last order total).

## Tools the agent should have

#### Minimal toolbelt

- **Order status** (ETA, tracking link, address changes policy).
- **Returns/refunds policy** answerer with **citations**.
- **Ticket create/update** in your help desk with transcript link.
- **Store finder** or delivery cut-off checker, if relevant.

## Guardrails that matter

#### Before/after the model

- **Input**: profanity/PII filters, prompt-injection checks, rate limits.
- **Output**: JSON schema (intent, answer, citations, handoff flag), length limits, URL whitelist.
- **Context**: never echo secrets; redact account numbers in logs.

```ts
// JSON schema (Zod) for the agent's output
const Reply = z.object({
  intent: z.enum(['status', 'refund', 'return', 'handoff', 'unknown']),
  answer: z.string().max(900),
  citations: z.array(z.string().url()).max(5),
  handoff: z.boolean().default(false),
  confidence: z.number().min(0).max(1),
})
```

## Handling the 24-hour window

#### How to re-engage correctly

- If the window has expired, **queue a template** (approved, locale-specific) such as "We have an update on your order. Reply to continue."
- Avoid free-text until the customer replies; then the window reopens.

```ts
if (windowExpired(conversation_id)) {
  await sendTemplate(conversation_id, 'order_update_v1', { name, order_id })
  return // wait for user reply to resume
}
```

## Metrics & SLOs

#### Track these daily

- **Deflection rate** and **handoff rate** (and why).
- **FRT** p50/p95; **resolution time**; **SLA misses** count and cause.
- **CSAT** or quick reaction emojis; **cost per conversation**.
- **Model confidence** distribution and guardrail triggers.

## Failure modes (and fixes)

#### Common pitfalls

- **Policy violations** (templates, opt-in): fix your entry flow and template catalog.
- **Orphaned handoffs**: enforce assignment timeouts; auto-reassign.
- **Alert floods**: route only actionable alerts; digest the rest.
- **Unreadable logs**: standardise event payloads; add a transcript permalink.

## Minimal data model (can extend later)

```sql
CREATE TABLE conversations(
  id text PRIMARY KEY,
  customer_hash text NOT NULL,
  state text NOT NULL,
  tier text NOT NULL,               -- 'vip' | 'trade' | 'retail'
  topic text,
  opened_at timestamptz NOT NULL,
  closed_at timestamptz
);

CREATE TABLE messages(
  id uuid PRIMARY KEY,
  conversation_id text REFERENCES conversations(id),
  ts timestamptz NOT NULL,
  sender text NOT NULL,             -- 'user' | 'agent' | 'human'
  body text,
  metadata jsonb                    -- citations, tool outputs, etc.
);

CREATE TABLE tickets(
  id uuid PRIMARY KEY,
  conversation_id text,
  helpdesk_key text,
  status text,
  assignee text,
  sla_due_at timestamptz
);
```

## 10-day build plan (thin slice)

#### Days 0–2

- Stand up webhook, policy filters, and logging; implement state machine.

#### Days 3–5

- Wire order lookup + KB answers with JSON-schema outputs; add 24h window handling.

#### Days 6–7

- Implement handoff (help desk ticket + transcript link); add SLA queue and basic escalations.

#### Days 8–10

- Canary to 10–20% of traffic; measure FRT, handoff rate, and SLA misses; prepare runbook and rollback.

## Handover pack

#### What the team receives

- **Runbook**: on-call, escalation, template management, and SLA matrix.
- **Dashboards**: FRT, handoff, SLA, cost/conversation, guardrail events.
- **Transcripts**: searchable with links from tickets.
- **Decision memo**: go/no-go and next experiments (e.g., returns automation).

This blueprint keeps you inside WhatsApp policy, gives humans the right context, and makes operations measurable. It's small enough to ship in days, and strong enough to trust in production.
