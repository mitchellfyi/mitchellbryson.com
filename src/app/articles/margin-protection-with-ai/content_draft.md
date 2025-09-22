ai is useful when it ties directly to money
playbook covers three systems that usually pay for themselves fast
live pricing rules invoice qa anomaly alerts
each section includes defaults implementation notes operator checklist that real teams can run

TLDR

Defaults that work

- Start with rules, not reinforcement learning: formula-based prices with guardrails and a human override lane
- Automate invoice checks against POs and price lists before posting to the ledger, escalate with evidence
- Alert on margin deltas, cost drift, conversion anomalies using robust baselines, page a human only when action is clear

Live pricing rules real-time and defensible

Dynamic pricing is a rules engine plus clean data. Keep the model simple, auditable, fast to roll back.

What goes into the price

- Base cost landed, competitor index, inventory position, delivery SLA, customer segment
- Floors and ceilings: min gross margin percent, max price delta vs RRP, max daily change percent
- Exceptions: VIP accounts, MAP policies, clearance flags

example computed sell price with guardrails:
with inputs as:
select sku cost_landed competitor_price inventory_days segment rrp
0.15 numeric as min_gm
0.30 numeric as max_markup_over_rrp
0.10 numeric as max_daily_change
from pricing_inputs
select sku:
greatest cost_landed divided by 1 minus min_gm
least coalesce competitor_price times 0.98 rrp
rrp times 1 plus max_markup_over_rrp
as target_price_pre_smoothing
from inputs

Controls to add before shipping

- Price smoothing cap absolute and relative daily changes
- Canary rollout, 10% of traffic, with automatic rollback on conversion or margin regressions
- Full audit log: inputs, rule version, previous price, new price, author

pseudocode guardrail plus rollback hook:
if pct_change new_price old_price greater than max_daily_change
then new_price equals clamp_by_pct old_price max_daily_change
publish_price sku new_price
if cv_rate_7d_drop greater than threshold or gm_7d_drop greater than threshold
then rollback_price sku old_price

Invoice QA catch overcharges and duplicates

Accounts Payable is where leakage hides. Automate the checks and hand humans a clean, evidence-backed decision.

What to check on every invoice

- Price variance vs PO contract, unit price and discount leakage
- Quantity variance vs GRN or shipped quantity
- Duplicate detection, same supplier, amount, date, PO, fuzzy on invoice no
- VAT Tax mismatches and currency conversions

example checks:
select i.invoice_id l.line_no
l.unit_price minus p.unit_price as unit_price_diff
l.qty minus p.qty as qty_diff
case when d.dup_id is not null then true else false end as possible_duplicate
from ap_invoice_lines l
join purchase_order_lines p using po_line_id
left join potential_duplicates d using invoice_id
where abs l.unit_price minus p.unit_price greater than 0.01
or abs l.qty minus p.qty greater than 0.01
or d.dup_id is not null

Workflow that keeps finance in control

- Extract header plus lines, PDF to structured data
- Diff against PO price list, compute variance and expected VAT
- If beyond tolerance, open a ticket with: PDF, parsed JSON, diff table, supplier contact, suggested resolution
- Require two-click approve deny with a reason code, post the decision to the ledger

Anomaly alerts margin, cost, conversion

Alert fatigue is real. Use robust baselines and route only actionable events.

Signals worth alerting on

- Product-level gross margin percent or COGS per unit spikes
- Supplier cost drift greater than X percent week-over-week
- Conversion-rate dips after a price change, by segment or channel
- Promo and coupon abuse patterns

robust z-score over rolling median iqr:
import numpy as np
def robust_z x window=28:
med equals np.median x slice minus window
iqr equals np.subtract np.percentile x slice minus window 75 25
return x minus 1 minus med divided by max iqr divided by 1.349 1e-6
if robust_z series_margin_pct_sku123 less than minus 3
then notify margin drop on sku123 context make_context sku 123

Routing rules that reduce noise

- Page ops only if the alert links directly to a reversible action, revert price, block supplier, pause promo
- Bundle low-severity alerts into a daily digest with links to pre-filtered dashboards
- Auto-close if the metric returns to normal in N hours

Operator dashboard one screen that matters

Panels to include

- Price changes today: count, avg delta, SKUs with guardrail hits
- Margin waterfall: price to discount to shipping to COGS to fees to net margin
- AP queue: invoices flagged, estimated savings, oldest SLA
- Anomalies: open incidents, owner, ETA to resolution, rollback buttons

Data model that can evolve

Minimal tables

pricing_inputs:
sku cost_landed competitor_price inventory_days segment rrp collected_at

prices:
sku price rule_version changed_at author reason

ap_invoices plus ap_invoice_lines plus potential_duplicates

alerts:
alert_id type subject_id severity status opened_at closed_at

90-day rollout plan

Days 0-15

- Wire data sources, costs, competitors, inventory, orders. Define guardrails and approval workflow

Days 16-45

- Ship pricing rules to canary cohort. Stand up invoice QA with read-only posting and ticket creation

Days 46-75

- Add anomaly alerts with robust baselines. Start daily finance ops standup using the dashboard

Days 76-90

- Expand pricing coverage to 100%. Turn on AP auto-post for invoices within tolerance. Tune alerts and SLAs

What to measure

KPIs that show this is working

- Gross margin percent and pounds by day and by cohort, before after rule rollout
- Overcharge pounds detected per week and duplicate invoices blocked
- Time-to-detect and time-to-rollback for pricing mistakes
- Alert precision, actionable total, and average handle time

Implementation notes

Pragmatic choices

- Prefer deterministic rules first, add ML later for elasticity or demand forecasting
- Keep every decision auditable: inputs, rule version, human approvals
- Make rollback a first-class action across pricing and promotions