whatsapp is where customers already are
agent should meet them there without breaking policy losing context missing slas
template shows how to design whatsapp support agent that is compliant debuggable easy to hand over to humans
complete with audit trails and sla-aware routing

What good looks like

Outcomes to aim for

- First-response time FRT under 60s for canary cohort, clear fallbacks when models fail
- Seamless human takeover with the full chat transcript and customer context
- Audit trail for every decision, who what when why
- SLA-aware routing: priority by customer tier, topic, promised response time
- Deflection where appropriate, without blocking escalation

Architecture at a glance

WhatsApp Webhook to Gateway and Policy Filters to Auth Layer order lookup OTP to NLU plus Intent Router to KB RAG plus Tools and Human Handoff Service to Response Builder JSON schema to Logger Audit Trail to Queue and SLA Scheduler to Human Handoff Service to WhatsApp.

Channel compliance non-negotiables

Policy anchors to respect

- 24-hour customer service window: outside it, respond only with approved message templates or wait for user initiation
- Explicit opt-in and clear identification of business in first contact
- Easy human escalation and a transparent path to alternative channels, email phone
- Handle PII carefully, minimise, redact in logs, restrict retention
- Template approval and locale management for re-engagement messages

Human handoff the two modes

Warm and cold handoff

- Warm handoff: the agent gathers intent, identity, evidence, citations, order refs, then invites a human into the same thread. The human sees the context
- Cold handoff: the agent opens a ticket with a permalink to the transcript, then replies in WhatsApp with the ticket number and ETA

pseudocode trigger handoff with full context:
const handoffPayload equals conversation_id customer id name phone summary last_model_summary transcript_url intent priority sla_due_at attachments
const ticket equals await helpdesk.createTicket handoffPayload
await whatsapp.reply conversation_id I've connected you to a human ticket ticket.key We'll reply by eta sla_due_at

Audit trail make every decision explainable

Log these fields on every message decision

- Conversation and message IDs, timestamps UTC
- Customer identity hashed phone, consent opt-in status
- Detected intent and confidence, prompt template plus version
- Tools used order lookup, KB citations with inputs outputs
- Model tokens costs latency, guardrail passes failures
- Handoff decisions who took over, when, why

create table wa_events:
id uuid primary key
ts timestamptz not null
conversation_id text not null
actor text not null
event_type text not null
payload jsonb not null
model text
tokens_in int
tokens_out int
cost_usd numeric 10,5
prompt_version text
intent text
confidence real
create index on wa_events conversation_id ts

SLA-aware routing

How to set priorities

- Customer tier VIP trade retail and topic refund, delivery, technical
- Promised SLA per tier times topic times channel
- Queue rules: escalate if time-to-SLA less than X minutes and agent unavailable

compute due time and enqueue with priority:
def due_at now tier topic return now plus sla tier topic
job equals conversation_id cid priority priority_score tier topic sentiment due_at due_at now tier topic
queue.push job
escalation watcher:
if job.due_at minus now total_seconds less than 300 and not assigned job
then notify_humans job channel support-p1

Conversation state machine

States and transitions

- new to authenticated order lookup OTP soft KYC
- authenticated to automated intent matched, tool answers
- automated to human confidence low, VIP, policy keyword
- human to closed resolution sent, CSAT request
- any to dormant 24h window expired, wait for user or send template

type state equals new authenticated automated human closed dormant
function next state state event event state:
if event.type equals handoff return human
if event.type equals expire_window return dormant
if state equals new and event.type equals authed return authenticated
if state equals authenticated and event.type equals answer_ok return automated
if state equals automated and event.type equals resolved return closed
return state

Authentication options pick the lightest that works

Low-friction identity patterns

- Order lookup: phone plus order ID masked input, match by last 4 digits of postcode or email
- One-time link sent to email SMS to view order and confirm identity
- Account match: if the phone is on file, ask for a short secret, last order total

Tools the agent should have

Minimal toolbelt

- Order status ETA, tracking link, address changes policy
- Returns refunds policy answerer with citations
- Ticket create update in help desk with transcript link
- Store finder or delivery cut-off checker, if relevant

Guardrails that matter

Before after the model

- Input: profanity PII filters, prompt-injection checks, rate limits
- Output: JSON schema intent, answer, citations, handoff flag, length limits, URL whitelist
- Context: never echo secrets, redact account numbers in logs

json schema zod for agent output:
const reply equals z.object
intent z.enum status refund return handoff unknown
answer z.string max 900
citations z.array z.string url max 5
handoff z.boolean default false
confidence z.number min 0 max 1

Handling the 24-hour window

How to re-engage correctly

- If the window has expired, queue a template approved, locale-specific such as We have an update on your order. Reply to continue
- Avoid free-text until the customer replies, then the window reopens

if windowExpired conversation_id
then await sendTemplate conversation_id order_update_v1 name order_id
return

Metrics and SLOs

Track these daily

- Deflection rate and handoff rate and why
- FRT p50 p95, resolution time, SLA misses count and cause
- CSAT or quick reaction emojis, cost per conversation
- Model confidence distribution and guardrail triggers

Failure modes and fixes

Common pitfalls

- Policy violations templates, opt-in: fix entry flow and template catalog
- Orphaned handoffs: enforce assignment timeouts, auto-reassign
- Alert floods: route only actionable alerts, digest the rest
- Unreadable logs: standardise event payloads, add a transcript permalink

Minimal data model can extend later

create table conversations:
id text primary key
customer_hash text not null
state text not null
tier text not null
topic text
opened_at timestamptz not null
closed_at timestamptz

create table messages:
id uuid primary key
conversation_id text references conversations id
ts timestamptz not null
sender text not null
body text
metadata jsonb

create table tickets:
id uuid primary key
conversation_id text
helpdesk_key text
status text
assignee text
sla_due_at timestamptz

10-day build plan thin slice

Days 0-2

- Stand up webhook, policy filters, logging, implement state machine

Days 3-5

- Wire order lookup plus KB answers with JSON-schema outputs, add 24h window handling

Days 6-7

- Implement handoff help desk ticket plus transcript link, add SLA queue and basic escalations

Days 8-10

- Canary to 10-20% of traffic, measure FRT, handoff rate, SLA misses, prepare runbook and rollback

Handover pack

What the team receives

- Runbook: on-call, escalation, template management, SLA matrix
- Dashboards: FRT, handoff, SLA, cost conversation, guardrail events
- Transcripts: searchable with links from tickets
- Decision memo: go no-go and next experiments, returns automation
