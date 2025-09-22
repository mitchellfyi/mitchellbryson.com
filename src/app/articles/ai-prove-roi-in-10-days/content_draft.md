six-month project not needed to prove ai works
run tight 10-day pilot
template gives schedule metrics cut-offs handover materials for growth and ops use cases
support triage order status invoice qa pricing rules

The 10-day schedule repeatable

Days 0-1 scope and baseline

- Define one narrow user journey. Where is my order. AP invoice check. Price update on 200 SKUs
- Freeze a baseline window. Last 14-30 days
- Agree the primary KPI and target threshold
- Set a hard cost ceiling and canary cohort. 10-20% of traffic

Days 2-3 wire data and guardrails

- Connect minimum data sources. Orders, tickets, POs, price lists
- Add tracing. Inputs, outputs, latency, tokens, costs
- Add guardrails. Schema validation, escalation path, rate limits
- Create eval set. 10-30 realistic cases to check quality daily

Days 4-5 ship thin slice

- Enable feature for canary cohort only
- Log all decisions with evidence, citations, diffs, audit trail
- Start daily scoreboard

Days 6-7 tune or stop

- Review KPI movement vs baseline, fix obvious misses
- If cut-offs hit, quality, spend, error thresholds, stop and document why

Days 8-9 document and handover prep

- Finalise runbooks, dashboards, rollback steps
- Collect stakeholder feedback. Support, finance, ops

Day 10 decision

- If KPIs pass and budget holds, expand to 50-100% with monitoring
- Otherwise, roll back and keep artefacts for next attempt

Metrics that prove value

Core financials pick ones that fit the pilot

- Pounds saved per week from invoice variance, duplicates blocked
- Tickets deflected percent and median first response time
- Gross margin percent movement after pricing rule changes
- Conversion rate and refund rate where applicable
- Cost per resolved item. Tokens, infra, minutes of human time

simple roi helpers for daily scoreboard:
def pilot_roi savings_per_week_gbp revenue_uplift_gbp pilot_cost_gbp
def deflection_rate total handled_by_bot
def margin_delta_pct gm_after gm_before

Cut-offs stop go rules

Stop immediately if

- Output quality fails eval score or human QA less than 0.85 on chosen metric
- Budget exceeded. Pilot spend over X pounds per day or Y per conversation
- Latency p95 over Z seconds for two consecutive days

Continue expand if

- KPI moves by target or more and cost per unit stable improving for 3 days
- No critical incidents, escalations without audit evidence

Default KPI targets sane starting points

Ops support triage

- Deflection plus 15-30% vs baseline
- First response time minus 30-50% median
- QA pass rate 90% or more of sampled answers acceptable

AP invoice QA

- Overcharge detection 0.5 to 1.5% of AP value flagged with less than 5% false positives
- Duplicate invoices caught 80% or more of known dupes in backtests

Pricing rules

- Gross margin plus 1-3% on canary SKUs with no conversion drop beyond minus 5% relative
- Rollback time less than 15 minutes from trigger to revert

daily scoreboard csv can paste into sheets:
date
kpi_name
baseline_value
pilot_value
delta
budget_spend_gbp
unit_cost_gbp
incidents
notes

Handover pack what team receives on day 10

Documents

- Decision memo with KPI results, clear verdict
- Runbook. On-call, escalation, rollback, weekly checks
- Data map. Tables, joins, owners, privacy notes

Assets

- Dashboards. KPIs, spend, latency, evals
- Tracing. Searchable logs with request, answer, cost linkage
- Eval set. Frozen cases, procedure for updates

Example pilot slices pick one

Support where is my order

- Authenticate customer, look up order, answer with ETA, policy handoff button
- KPIs deflection percent, first response time, cost per conversation, QA pass rate

AP invoice QA on top 5 suppliers

- Parse PDF, compare to PO price list, flag variance duplicates, open ticket
- KPIs pounds overcharge detected, false positive rate, minutes saved per invoice

Pricing guardrailed price update for 200 SKUs

- Apply formula price with caps, canary to 10%, auto rollback if conversion drops
- KPIs gross margin delta, conversion delta, rollback MTTR

Minimal instrumentation do not skip

Capture on every request

- Route, feature, user, session, prompt template, inputs redacted, outputs, citations, evidence, latency, tokens, cost, decision taken, auto escalated, rolled back

Dashboards to publish

- Spend vs budget, p50 p95 latency, eval trend, KPI trend vs baseline

Risk checklist

Before enabling traffic

- Legal privacy reviewed, data map, redaction
- Escalation path staffed, SLAs agreed
- Canary cohort, kill switch verified

During pilot

- Daily QA sample reviewed by business owner
- Incidents labelled, linked to traces
- Costs monitored with 80% alert, hard stop at 100%

rollback play one command:
pilot rollback feature support_whatsapp reason qa_regression to timestamp
