most companies tune price and inventory with own data
leap is doing this together
multiple firms feeding shared privacy-preserving simulation that runs controlled experiments
returns actionable firm-specific recommendations in near real time
call it synthetic market twin
compute space where competitors suppliers logistics partners contribute encrypted signals
explore what ifs get individual outputs
no raw data shared no secret back channels
auditable safeguards against collusion

Why this, why now

three rails have matured at once
first data clean rooms let organizations compute over each other data with strong access rules and built-in controls like differential privacy
major platforms now ship this natively
second privacy-enhancing technologies such as differential privacy secure multi-party computation federated learning have moved from theory to guidance and production deployments
third event standards like gs1 epcis 2.0 make it practical to stream inventory and shipment facts across firms in common schema

What a Synthetic Market Twin is and is not

shared experiment harness
neutral environment where parties publish aggregated or privacy-protected demand price inventory logistics signals
propose interventions
price tests allocation shifts
receive personalized policy-safe recommendations
not place to swap everyone prices or coordinate outcomes
competition law remains guardrail
twin works only if design prevents illegal information exchange and preserves independent decision-making

How it might work end-to-end

Signals in, safely

Each participant streams a minimal set of fields. Item, region, stock position, fulfillment lead time, recent price and demand elasticities. Never raw customer identifiers. Streams land in clean rooms with query rules and logs. Sensitive aggregates add differential privacy to bound leakage. Where joint model training helps, regional demand shocks, participants use federated learning or secure aggregation so the shared model learns without moving raw data.

Compile a live market twin

The platform synthesizes a dynamic model of supply, demand, constraints. EPCIS-style logistics events enrich the state. What moved, where, when. Giving the twin a factual backbone for availability and lead times.

Run policy-safe experiments

Participants submit experiment intents. Lift price 2-5% for SKU set in region A if stock greater than X. Along with competition-law-aware constraints. No sharing of current or future individual prices. Results must be firm-specific and differentially private. The twin runs multi-arm bandits, counterfactual simulations to estimate impacts, then proposes per-firm actions and confidence bands. Clean-room logs provide a paper trail.

Recommendations out, not secrets

Each firm receives only its own recommended prices and allocations, plus coarse market health signals. Demand shock likelihood with privacy guarantees. No party sees a competitor granular strategy or data.

Continuous learning with drift watch

Models re-fit as fresh EPCIS events and sales aggregates arrive, with drift detection that pauses recommendations if data shifts beyond policy bounds. Again logged inside the clean room.

A reference stack conceptual

PET Layer: differential privacy with tested guarantees, secure MPC aggregation, federated learning to keep raw data local. Evidence Ledger: immutable logs of who queried what, with clean-room analysis logs and DP parameters. Useful for audits. Policy Gate: automated checks against info-exchange risks and algorithmic collusion patterns. Recommendations must be independently computable and not contingent on competitors specific prices.

Novel design patterns

Programmatic antitrust. Encode horizontal-guideline constraints as code. Ban queries that reconstruct competitor price paths. Throttle experiment cadence. Require independence proofs. Recommendation changes only with costs constraints, not a rival specific bid. This shifts compliance from training slides to compute policy.

Confidence as a contract. Recommendations ship with statistical confidence and the privacy budget expended. Epsilon. Finance can then govern risk. Accept actions only above a confidence threshold and within an epsilon budget per quarter, aligning to NIST guidance on evaluating DP guarantees.

Zero raw joins. Instead of centralizing data, use federated joins or secure MPC to compute cross-firm metrics. Regional stockout risk without exposing tables. The twin gets the metric. Nobody sees the join keys.

Event-first reality. Make logistics the source of truth via EPCIS 2.0 events. When a pallet leaves a site or arrives at a depot, the twin state updates instantly, shrinking the lag between physical movement and price availability decisions.

Risks, ethics, and law

The promise dies if the twin becomes a coordination tool. Bake in independence, privacy, logging from day one. Give regulators and internal counsel a read-only window into clean-room logs and policy checks. Track the public debate on algorithmic pricing and collusion. Rules are evolving and controls should evolve with them.

What to pilot first

Start with two non-competing partners that share a bottleneck. A supplier and a retailer. Then add a single competing retailer under strict clean-room policies. Use a Snowflake or AWS clean room to prototype. Limit scope to one SKU family and one region. Send only aggregates with differential privacy. Measure time-to-insight and forecast error vs baseline. If the guardrails hold, expand the SKU set and participants.
