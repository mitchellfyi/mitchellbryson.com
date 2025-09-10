---
author: Mitchell Bryson
date: "2025-07-14"
title: "Margin protection with AI: live pricing rules, invoice QA, and anomaly alerts for e-commerce"
description: "A practical playbook to protect gross margin in e-commerce using rule-based pricing, automated invoice checks, and anomaly detection with clear audit trails."
---

AI is useful when it ties directly to money. This playbook covers three systems that usually pay for themselves fast: live pricing rules, invoice QA, and anomaly alerts. Each section includes defaults, implementation notes, and an operator checklist that real teams can run.

## TL;DR

#### Defaults that work

* Start with rules, not reinforcement learning: formula-based prices with guardrails and a human override lane.
* Automate invoice checks against POs and price lists before posting to the ledger; escalate with evidence.
* Alert on margin deltas, cost drift, and conversion anomalies using robust baselines; page a human only when action is clear.

---

## Live pricing rules (real-time and defensible)

Dynamic pricing is a rules engine plus clean data. Keep the model simple, auditable, and fast to roll back.

#### What goes into the price

* Base cost (landed), competitor index, inventory position, delivery SLA, and customer segment.
* Floors and ceilings: min gross margin %, max price delta vs. RRP, and max daily change %.
* Exceptions: VIP accounts, MAP policies, and clearance flags.

```sql
-- Example: computed sell price with guardrails
WITH inputs AS (
  SELECT
    sku,
    cost_landed,
    competitor_price,
    inventory_days,
    segment,                -- 'trade' | 'retail'
    rrp,
    0.15::numeric AS min_gm,           -- 15% floor
    0.30::numeric AS max_markup_over_rrp,
    0.10::numeric AS max_daily_change   -- 10%
  FROM pricing_inputs
)
SELECT
  sku,
  GREATEST(
    cost_landed / (1 - min_gm),                        -- margin floor
    LEAST(
      COALESCE(competitor_price * 0.98, rrp),          -- comp index
      rrp * (1 + max_markup_over_rrp)                  -- cap over RRP
    )
  )                                                       AS target_price_pre_smoothing
FROM inputs;
```

#### Controls to add before you ship

* Price smoothing (cap absolute and relative daily changes).
* Canary rollout (e.g., 10% of traffic) with automatic rollback on conversion or margin regressions.
* Full audit log: inputs, rule version, previous price, new price, author.

```python
# Pseudocode: guardrail + rollback hook
if pct_change(new_price, old_price) > max_daily_change:
    new_price = clamp_by_pct(old_price, max_daily_change)

publish_price(sku, new_price)
if cv_rate_7d_drop > threshold or gm_7d_drop > threshold:
    rollback_price(sku, old_price)
```

---

## Invoice QA (catch overcharges and duplicates)

Accounts Payable is where leakage hides. Automate the checks and hand humans a clean, evidence-backed decision.

#### What to check on every invoice

* Price variance vs. PO/contract (unit price and discount leakage).
* Quantity variance vs. GRN or shipped quantity.
* Duplicate detection (same supplier, amount, date, PO; fuzzy on invoice no.).
* VAT/Tax mismatches and currency conversions.

```sql
-- Example checks
SELECT i.invoice_id, l.line_no,
       (l.unit_price - p.unit_price) AS unit_price_diff,
       (l.qty - p.qty)               AS qty_diff,
       CASE WHEN d.dup_id IS NOT NULL THEN true ELSE false END AS possible_duplicate
FROM ap_invoice_lines l
JOIN purchase_order_lines p USING (po_line_id)
LEFT JOIN potential_duplicates d USING (invoice_id)
WHERE ABS(l.unit_price - p.unit_price) > 0.01
   OR ABS(l.qty - p.qty) > 0.01
   OR d.dup_id IS NOT NULL;
```

#### Workflow that keeps finance in control

* Extract header + lines (PDF → structured data).
* Diff against PO/price list; compute variance and expected VAT.
* If beyond tolerance, open a ticket with: PDF, parsed JSON, diff table, supplier contact, and a suggested resolution.
* Require two-click approve/deny with a reason code; post the decision to the ledger.

---

## Anomaly alerts (margin, cost, conversion)

Alert fatigue is real. Use robust baselines and route only actionable events.

#### Signals worth alerting on

* Product-level gross margin % or COGS per unit spikes.
* Supplier cost drift > X% week-over-week.
* Conversion-rate dips after a price change (by segment or channel).
* Promo and coupon abuse patterns.

```python
# Robust z-score over rolling median/IQR
import numpy as np

def robust_z(x, window=28):
    med = np.median(x[-window:])
    iqr = np.subtract(*np.percentile(x[-window:], [75, 25]))
    return (x[-1] - med) / max(iqr/1.349, 1e-6)

if robust_z(series_margin_pct_sku123) < -3:
    notify("Margin drop on SKU123", context=make_context(sku="123"))
```

#### Routing rules that reduce noise

* Page ops only if the alert links directly to a reversible action (e.g., revert price, block supplier, pause promo).
* Bundle low-severity alerts into a daily digest with links to pre-filtered dashboards.
* Auto-close if the metric returns to normal in N hours.

---

## Operator dashboard (one screen that matters)

#### Panels to include

* Price changes today: count, avg delta, SKUs with guardrail hits.
* Margin waterfall: price → discount → shipping → COGS → fees → net margin.
* AP queue: invoices flagged, estimated savings, oldest SLA.
* Anomalies: open incidents, owner, ETA to resolution, rollback buttons.

---

## Data model you can evolve

#### Minimal tables

* `pricing_inputs(sku, cost_landed, competitor_price, inventory_days, segment, rrp, collected_at)`
* `prices(sku, price, rule_version, changed_at, author, reason)`
* `ap_invoices` + `ap_invoice_lines` + `potential_duplicates`
* `alerts(alert_id, type, subject_id, severity, status, opened_at, closed_at)`

---

## 90-day rollout plan

#### Days 0–15

* Wire data sources (costs, competitors, inventory, orders). Define guardrails and approval workflow.

#### Days 16–45

* Ship pricing rules to canary cohort. Stand up invoice QA with read-only posting and ticket creation.

#### Days 46–75

* Add anomaly alerts with robust baselines. Start daily finance/ops standup using the dashboard.

#### Days 76–90

* Expand pricing coverage to 100%. Turn on AP auto-post for invoices within tolerance. Tune alerts and SLAs.

---

## What to measure

#### KPIs that show this is working

* Gross margin % and £ by day and by cohort (before/after rule rollout).
* Overcharge £ detected per week and duplicate invoices blocked.
* Time-to-detect and time-to-rollback for pricing mistakes.
* Alert precision (actionable / total) and average handle time.

---

## Implementation notes

#### Pragmatic choices

* Prefer deterministic rules first; add ML later for elasticity or demand forecasting.
* Keep every decision auditable: inputs, rule version, and human approvals.
* Make rollback a first-class action across pricing and promotions.
