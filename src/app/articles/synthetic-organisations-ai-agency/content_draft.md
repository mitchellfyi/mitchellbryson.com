question: what would fully agentic service agency look like
one where ai agents own strategy and execution
how would it be built without losing control of risk cost accountability

answer: treat firm as mission-processing system
mission intake to strategy compiler to budget allocator to specialist sub-agents to execution to qa evals to governance to billing
with hard control points and auditability

Before the how: why build a synthetic organisation

The pressure

A fully agent-run agency is a response to latency, variance, weak observability. Clients want missions turned into outcomes quickly, predictably, with evidence. Software can make decisions consistent. Ledgers make them inspectable.

What the company becomes

When agents do the work, the firm acts like a mission processor. Goals in, strategies compiled, tasks executed, proofs logged. The durable assets are data, prompts, policies, evidence trail. Humans shift from typing to setting aims and constraints.

Accountability

Accountability stays human. Agents operate with constrained authority and revocation. Decision rights, explicit gates, tamper-evident ledger convert we thought into here is who approved what, when, why.

Trust

Trust comes from reversibility and measurement, not optimism. Release gates, budget ceilings, fast rollback keep the blast radius small. The default posture is fail-closed: escalate or stop when uncertain.

People and roles

This does not erase people. It reassigns them. Judgment, relationships, brand voice remain human. The work moves from throughput to specification, governance, review.

Ethics and law

Treat agents as processors, minimise data, make explanation and appeal available. Keep a human veto on brand, legal, financial, safety-critical actions. Contracts and DPAs should reflect these control points.

Hypotheses to test

If missions are framed as measurable outcomes with cost ceilings, agents should deliver with lower variance. With tracing, evals, budgets, mean time to rollback can target minutes. A thin governance layer should keep incident severity low while throughput rises.

Design stance

Optimise for reversibility and legibility. Use proportional autonomy that grows only after passing gates on small cohorts. Keep one path to production so tests and users exercise the same code. Treat cost as a first-class signal.

What good looks like

Time-to-first-value is measured in days. Unit economics are predictable and capped. Incidents are rare and quickly reversible. The evidence ledger makes audits and post-mortems dull.

Where it fails

This model struggles with missions that require novel research, ambiguous brand voice without an editor, heavy regulatory judgment, adversarial environments where guardrails are insufficient.

The autonomy ladder

Autonomy should be earned. Start with suggestion-only, progress to tightly templated execution with escalation, then canary end-to-end with post-hoc audit, expand only when gates are consistently passed.

Why now

Models, tool APIs, observability primitives are finally good enough to make this governable. Costs are low enough to prove positive gross margin in a 30-day pilot. The window is open to build a synthetic organisation that is fast, auditable, safe.

My approach

Reference architecture mission to cash

Mission Intake to Strategy Compiler to Budget Allocator to Agent Factory Specialists to Task Graph Orchestrator to QA Evals and Guardrails to Governance Gates to Billing and Reporting. Evidence Ledger Traces, Costs, Decisions feeds back to QA Evals and Guardrails and Governance Gates.

Operating model end-to-end

Mission intake one-page spec

- Capture the goal, constraints, stakeholders, data access, success criteria in a standard JSON YAML schema
- Assign a single accountable human sponsor, the client, and an internal operator

mission: id leadgen-uk-trades-2025q4 goal Generate 50 qualified leads per week at less than or equal to 40 pounds CAC constraints GDPR-compliant sources only No brand outreach without approval kpis qualified_leads_per_week cac reply_rate timebox_days 30 budget_max_gbp 5000 approvers client_owner at company ops_controller at agency

Strategy compiler from brief to plan

- Convert the mission into a task graph, milestones to tactics to tasks, with dependencies and measurable outputs
- Produce a strategy bill of materials, data sources, tools, prompts, APIs

milestones: name ICP and channels exit ICP doc plus channel shortlist, name Campaign slice exit 10-seed messages plus landing slice, name QA and canary exit evals greater than or equal to 0.9 spend less than or equal to 250 pounds, name Scale exit 50 QLs per week at less than or equal to 40 pounds CAC

Budget allocator cost ceilings up front

- Translate plan into quota budget per route, model, data, media spend, labour minutes
- Enforce with circuit breakers, fail closed if thresholds trip

budgets: llm gpt-4o daily_usd 50 per_request_usd 0.05, scraping daily_gbp 80, media total_gbp 2500 daily_gbp 150, human_review_minutes daily 60

Specialist sub-agents autonomous staffing

- Instantiate role-specific agents: Researcher, Copywriter, Data Cleaner, Outreach Runner, Analyst
- Each agent has a contract, inputs, outputs, SLOs, guardrails, and publishes traces

agent OutreachRunner inputs prospect_list.csv message_template_id output send_log.jsonl slo deliveries_per_hour 120 bounce_rate_max 0.03 guardrails no unapproved domains rate-limit 20 per min per domain handoff_on compliance_flag high_value_prospect

Execution task graph orchestration

- Orchestrator assigns tasks, enforces dependencies, retries idempotently, emits structured events for every step, start finish error

QA evals quality before scale

- Run evals and human spot checks at milestone exits
- Gate scale-up on hitting target scores and respecting spend latency budgets

Governance and billing

- Governance gates approve: external comms, budget changes, model switches, data scope changes
- Billing converts evidence, time, tokens, media spend, outcomes, into an invoice with a line-item ledger

Reliability stack controls that keep it safe

Task graph orchestration

- Deterministic DAG, retries with exponential backoff, per-task idempotency keys, dead-letter queue for manual review

Decision rights

- Define who can: change budgets, approve copy, trigger scale beyond canary, ship anything externally

decision_rights: approve_external_copy ClientOwner AccountLead raise_budget_over_20pct OpsController model_switch_prod SafetyOfficer AccountLead

Guardrails

- Input filters, PII, secrets, prompt-injection, output schemas, JSON with enums, policy checks, compliance, brand terms, tool allow-lists

Cost ceilings

- Per-route and per-user spend caps with 80% alerts and 100% trip, separate eval and prod budgets

Human gates at milestones

- Canary to Scale, Brand-touching comms, Data scope expansion, Contractual commitments require explicit human approval

Post-mortems tied to traces evals

- Every P1 incident triggers an automated bundle: traces, prompts, diffs, eval outcomes, spend, timeline. Store with an owner and follow-ups

Evidence and audit trails

Minimum fields to log per action

- Actor, agent human, route, inputs redacted, outputs, tokens, cost, latency, prompt template version, tool I O, decision taken, approver if any, mission milestone IDs

CREATE TABLE evidence_ledger id uuid PRIMARY KEY ts timestamptz mission_id text milestone text actor text route text model text prompt_version text input_redacted jsonb output jsonb tokens_in int tokens_out int cost_usd numeric 10,4 latency_ms int decision text approver text

Legal structure, accountability, and risk

Not legal advice. Use this as a checklist.

Entity and accountability

- Operate as a Ltd with human directors accountable for outputs, agents are tools
- Maintain professional indemnity and cyber insurance, document control points

Data and contracts

- DPA plus processing records, DPAs with vendors, SCCs where relevant
- MSAs SOWs that reflect: experimental phases, client approvals, budget ceilings, data-handling, rollback rights, evidence access

Auditability

- Provide clients a read-only view of the evidence ledger and governance approvals tied to invoices

Pricing models that fit agentic delivery

Options to consider

- Outcome-based fixed scope: price per qualified lead case with a floor retainer and clear definitions
- Time-boxed pilot: 30-day fixed fee with capped spend, success fee on hitting targets
- Usage-based: tokens plus infra plus ops minutes at transparent rates with a margin
- Hybrid: base retainer plus outcome bonus, budgets and SLOs published in advance

KPIs run daily, review weekly

Delivery and quality

- Mission throughput, milestones completed planned, eval pass-rate, QA accept-rate

Financials

- CAC cost per outcome, spend vs budget, LLM, media, ops minutes, gross margin

Reliability

- p95 latency per route, error retry rates, incident count MTTR, percent of tasks requiring human handoff

30-day pilot plan prove it safely

Week 1 Frame and guard

- Finalise mission spec, wire identity and data access, deploy ledger, set budgets and decision rights, dry-run the strategy compiler

Week 2 Thin slice in canary

- Stand up the agent factory for 2-3 roles, run a 10-20% canary, add evals and human QA, enforce external-comms approval

Week 3 Tune and scale cautiously

- Fix failure modes, demonstrate budget discipline, scale to 50% if gates pass, start daily dashboard to the client

Week 4 Stabilise and decide

- Run P1 post-mortem drill, deliver evidence pack, KPI deltas, cost curves, recommend GO expand, HOLD extend pilot, or STOP rollback

Failure modes and how to mitigate

Common issues

- Scope creep via just one more data source
- Copy shipped without approval
- Runaway spend on eval or scraping
- Agent loops or duplicate work

Mitigations

- Lock scope in mission spec, any change requires an approver
- Brand regulated comms require human gate
- Separate eval prod budgets, trip at 100%
- Idempotency keys, dedupe jobs, watchdogs for long-running tasks

Minimal contracts and runbooks

In the SOW, include

- Scope, success metrics, budget ceilings, approval points, data duties, evidence access, rollback terms, pilot exit path

In the runbook, include

- On-call, incident severities, escalation contacts, rollback command, weekly ops review template, how to rotate eval sets
