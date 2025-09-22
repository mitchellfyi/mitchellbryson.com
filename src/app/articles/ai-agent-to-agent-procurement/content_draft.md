most b2b partnerships stall on integration and coordination
future worth aiming for is simpler
two companies point agents at each other
declare policies and limits
then let them negotiate contract settle
with humans staying in charge of goals and guardrails
pieces for this already exist in wild
machine-readable business documents ubl peppol legally recognised smart legal contracts
instant payments over iso 20022 rails
tie them together with agent negotiation and get mission in value out for procurement

Why imagine agent-to-agent procurement

expensive part of b2b trade is not price discovery
it is time and variance between we should work together and money settled goods moving
agents that speak in contracts and proofs can compress that path
unlike consumer chatbots this is not novelty
enterprise stack already has standards for orders invoices events ubl peppol payment messages iso 20022
open question is orchestration
can autonomous negotiators find terms that satisfy both policies with humans approving jump to production

Premises grounded, not sci-fi

documents are already code-like
ubl defines orders despatch advice invoices as structured schemas
peppol operationalises their exchange at scale
agents do not need to invent format
they can compose with it

contracts can execute
uk law recognises smart legal contracts as enforceable
contract that triggers delivery invoicing price adjustments on data events is viable in mainstream jurisdictions

settlement can be instant
iso 20022 underpins modern payment schemes including instant credit transfers in eu that make funds available in 10 seconds
fast enough for event-driven settlement

negotiation is studied domain
automated negotiating agents have been benchmarked for years anac multi-agent contracting patterns date back to contract net protocol
not starting from zero
composing

How it might work end-to-end

Intent and policy exchange

Each side exposes a policy capsule. Acceptable price ranges, incoterms, SLAs, credit limits, escrow rules, data handling, escalation paths. Agents verify identity and capabilities, then spin a negotiation sandbox. Procurement robots shaking hands on scope with hard ceilings.

Automated negotiation

Buyer and supplier agents search the space of terms. Price breaks, delivery windows, payment timing, substitution options. Using multi-issue bargaining. When they find a Pareto-efficient bundle that satisfies both policies, they generate a term sheet for human approval. Lessons from agent negotiation contests apply directly here. Multi-issue utilities, concession tactics, reservation points.

Contract compilation

On approval, agents compile a smart legal contract that references canonical documents. UBL Order, OrderResponse, DespatchAdvice, Invoice schemas, plus an events manifest for status changes. The legal text cites the machine contract. Obligations, send Despatch Advice within N hours, are enforceable and logged.

Execution and observability

Agents plug into each ERP via adapters that emit and consume Peppol UBL messages. Every exchange lands in an evidence ledger. Who what when why, hashes of payloads, SLAs met or missed. This is boring on purpose. Auditors can follow along without bespoke exports.

Settlement

On delivery confirmation, the contract triggers payment via ISO 20022 messages. Pain.001 initiation to pacs.008 clearing. Where supported, use SEPA Instant SCT Inst so funds arrive near-real-time. Discounts for early payment, penalties for lateness apply automatically.

Title and documents of value

For flows that depend on documents of title, bills of lading, warehouse receipts, agents rely on jurisdictions that implemented UNCITRAL MLETR. So electronic transferable records are legally valid. No couriers, fewer disputes.

A protocol stack for autonomous procurement

- Identity and trust: mutual TLS, verified business identifiers, access via Peppol or equivalent networks
- Semantics: UBL JSON Schema for documents, async events for status, order accepted, shipped, delivered
- Negotiation: multi-issue agent bargaining with human gates at term-sheet, contract-signing. Benchmarked tactics from ANAC adapted to procurement utilities
- Contracting: smart legal contracts that bind machine actions to legal prose, storage of proofs and hashes. Recognised enforceability matters here
- Settlement: ISO 20022 payment initiation, instant schemes where available
- Evidence: append-only logs for payloads, SLAs, approvals, exportable for audit and dispute resolution

Novel patterns philosophical, but workable

Negotiation sandboxes. Before any real data or money moves, agents rehearse deals against synthetic RFQs and historical constraints. They surface two or three viable bundles for a human to approve, along with counterfactuals. Plus 2-day lead time reduces price 3.1%. This is closer to procurement strategy than chatbot banter. It is bounded by policy.

Programmable trust. Contracts carry self-checks. If Invoice total mismatches Order by greater than X percent, block settlement and raise a dispute case with all evidence attached. Because UBL and ISO-20022 are structured, these checks are implementable as rules, not emails.

Policy markets. Suppliers publish machine-readable policies. Carbon limits, data retention, warranty that agents can query like an API. Buyers rank policies alongside price to reduce hidden switching costs.

Title as an API. In MLETR jurisdictions, the document of title is an API object with a history. Assignment of title can trigger release of funds or insurance updates without manual paperwork.

Zero-integration by construction. Because the agents speak Peppol UBL on the wire and log ISO-20022 payment proofs, onboarding a new partner becomes a policy plus adapter exercise rather than a six-week project.

What still needs solving

Three open fronts remain. Governance: who signs, who can raise budgets, who can change policies mid-negotiation. Liability: when agents misprice or misroute, the enforceable contract helps, but humans are still accountable. Cross-border gaps: MLETR adoption is uneven, instant payment access and Peppol coverage vary by region. None are showstoppers, but they shape where to pilot first.

A cautious path to first pilots

Start with a single commodity SKU and a willing partner already using Peppol. Limit funds with per-deal caps. Gate agent proposals behind human approval. Route payments via ISO 20022 instant rails where possible. Measure time to first data, contract test pass-rate, breakage per 1000 messages. If handshake to first settled order can consistently go in days instead of weeks, scale the scope.
