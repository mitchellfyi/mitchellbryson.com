you don't need a six month project to prove AI works
just run a tight 10 day pilot
this template gives you schedule metrics cut-offs handover materials
for growth ops use cases like support triage order status invoice QA pricing rules

the 10 day schedule repeatable

days 0-1 scope baseline
define one narrow user journey
like "where is my order" or "AP invoice check" or "price update on 200 SKUs"
freeze a baseline window last 14-30 days
agree the primary KPI and target threshold
set a hard cost ceiling and canary cohort like 10-20% of traffic

days 2-3 wire data guardrails
connect minimum data sources orders tickets POs price lists
add tracing inputs outputs latency tokens costs
add guardrails schema validation escalation path rate limits
create eval set 10-30 realistic cases to check quality daily

days 4-5 ship thin slice
enable feature for canary cohort only
log all decisions with evidence citations diffs audit trail
start daily scoreboard

days 6-7 tune or stop
review KPI movement vs baseline fix obvious misses
if cut-offs hit quality spend error thresholds stop and document why

days 8-9 document handover prep
finalise runbooks dashboards rollback steps
collect stakeholder feedback support finance ops

day 10 decision
if KPIs pass and budget holds expand to 50-100% with monitoring
otherwise roll back and keep artefacts for next attempt

metrics that prove value
core financials pick ones that fit your pilot
pounds saved per week from invoice variance duplicates blocked
tickets deflected percent and median first response time
gross margin percent movement after pricing rule changes
conversion rate and refund rate where applicable
cost per resolved item tokens infra minutes of human time

simple ROI helpers for daily scoreboard
def pilot_roi savings_per_week_gbp revenue_uplift_gbp pilot_cost_gbp
def deflection_rate total handled_by_bot
def margin_delta_pct gm_after gm_before

cut-offs stop go rules
stop immediately if
output quality fails eval score or human QA less than 0.85 on chosen metric
budget exceeded pilot spend over X pounds per day or Y per conversation
latency p95 over Z seconds for two consecutive days

continue expand if
KPI moves by target or more and cost per unit stable improving for 3 days
no critical incidents escalations without audit evidence

default KPI targets sane starting points
ops support triage
deflection plus 15-30% vs baseline
first response time minus 30-50% median
QA pass rate 90% or more of sampled answers acceptable

AP invoice QA
overcharge detection 0.5 to 1.5% of AP value flagged with less than 5% false positives
duplicate invoices caught 80% or more of known dupes in backtests

pricing rules
gross margin plus 1-3% on canary SKUs with no conversion drop beyond minus 5% relative
rollback time less than 15 minutes from trigger to revert

daily scoreboard CSV you can paste into sheets
date kpi_name baseline_value pilot_value delta budget_spend_gbp unit_cost_gbp incidents notes

handover pack what team receives on day 10
documents
decision memo with KPI results clear verdict
runbook on-call escalation rollback weekly checks
data map tables joins owners privacy notes

assets
dashboards KPIs spend latency evals
tracing searchable logs with request answer cost linkage
eval set frozen cases procedure for updates

example pilot slices pick one
support "where is my order"
authenticate customer look up order answer with ETA policy handoff button
KPIs deflection percent first response time cost per conversation QA pass rate

AP "invoice QA on top 5 suppliers"
parse PDF compare to PO price list flag variance duplicates open ticket
KPIs pounds overcharge detected false positive rate minutes saved per invoice

pricing "guardrailed price update for 200 SKUs"
apply formula price with caps canary to 10% auto rollback if conversion drops
KPIs gross margin delta conversion delta rollback MTTR

minimal instrumentation don't skip
capture on every request
route feature user session prompt template inputs redacted outputs citations evidence latency tokens cost decision taken auto escalated rolled back

dashboards to publish
spend vs budget p50 p95 latency eval trend KPI trend vs baseline

risk checklist
before enabling traffic
legal privacy reviewed data map redaction
escalation path staffed SLAs agreed
canary cohort kill switch verified

during pilot
daily QA sample reviewed by business owner
incidents labelled linked to traces
costs monitored with 80% alert hard stop at 100%

rollback play one command
pilot rollback feature support_whatsapp reason qa_regression to timestamp

this template is intentionally small
proves or disproves value in ten days
keeps spend contained
leaves you with artefacts team can run without me
