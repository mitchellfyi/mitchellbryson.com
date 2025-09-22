b2b partnerships stall on integration
coordination kills deals
two companies point agents at each other
declare policies
declare limits
let them negotiate
let them contract
let them settle
humans stay in charge of goals
humans stay in charge of guardrails

pieces already exist
machine-readable business documents
UBL/Peppol
smart legal contracts
instant payments over ISO 20022 rails
https://docs.oasis-open.org/ubl/UBL-2.1.html
https://peppol.org/
https://lawcom.gov.uk/project/smart-contracts/
https://www.iso20022.org/iso-20022

expensive part of b2b trade isn't price discovery it's time variance between "we should work together" and "money settled goods moving"
agents that speak in contracts and proofs can compress that path
enterprise stack already has standards for orders invoices events
UBL/Peppol
payment messages ISO 20022
https://docs.peppol.eu/poacc/billing/3.0/bis/

documents are already code-like
UBL defines Orders Despatch Advice Invoices as structured schemas
Peppol operationalises their exchange at scale
agents don't need to invent a format
they can compose with it

contracts can execute
UK law recognises smart legal contracts as enforceable
contract that triggers delivery invoicing price adjustments on data events
is viable in mainstream jurisdictions
https://accordproject.org/news/smart-legal-contracts-are-recognised-as-being-legally-enforceable-in-england-and-wales/

settlement can be instant
ISO 20022 underpins modern payment schemes
instant credit transfers in the EU make funds available in ~10 seconds fast enough for event-driven settlement
https://www.ecb.europa.eu/paym/integration/retail/instant_payments/html/index.en.html

negotiation is a studied domain
automated negotiating agents have been benchmarked for years ANAC
multi-agent contracting patterns date back to the Contract Net Protocol
https://scml.cs.brown.edu/
https://www.eecs.ucf.edu/~lboloni/Teaching/EEL6788_2008/papers/The_Contract_Net_Protocol_Dec-1980.pdf

how it might work end-to-end

intent policy exchange
each side exposes a policy capsule
acceptable price ranges incoterms SLAs credit limits escrow rules data handling escalation paths
agents verify identity capabilities spin a negotiation sandbox
procurement robots shaking hands on scope with hard ceilings

automated negotiation
buyer supplier agents search the space of terms
price breaks delivery windows payment timing substitution options
using multi-issue bargaining
when they find a Pareto-efficient bundle that satisfies both policies
they generate a term sheet for human approval
lessons from agent negotiation contests apply directly here
multi-issue utilities concession tactics reservation points

contract compilation
on approval agents compile a smart legal contract
that references canonical documents
UBL Order OrderResponse DespatchAdvice Invoice schemas
plus an events manifest for status changes
legal text cites the machine contract
obligations e.g. send Despatch Advice within N hours are enforceable and logged

execution observability
agents plug into each ERP via adapters that emit and consume Peppol/UBL messages
every exchange lands in an evidence ledger
who/what/when/why hashes of payloads SLAs met missed
boring on purpose auditors can follow along without bespoke exports

settlement
on delivery confirmation the contract triggers payment via ISO 20022 messages
e.g. pain.001 initiation → pacs.008 clearing
where supported use SEPA Instant SCT Inst so funds arrive near-real-time
discounts for early payment penalties for lateness apply automatically

title documents of value
for flows that depend on documents of title bills of lading warehouse receipts
agents rely on jurisdictions that implemented UNCITRAL MLETR
so electronic transferable records are legally valid
no couriers fewer disputes
https://uncitral.un.org/en/texts/ecommerce/modellaw/electronic_transferable_records
https://academy.iccwbo.org/digital-trade/article/mletr-an-overview-of-uncitrals-model-law-on-electronic-transferable-records
https://www.wto.org/english/tratop_e/msmes_e/uncitral_240621.pdf

protocol stack for autonomous procurement
identity trust: mutual TLS verified business identifiers access via Peppol or equivalent networks
semantics: UBL/JSON Schema for documents Async events for status order accepted shipped delivered
negotiation: multi-issue agent bargaining with human gates at term-sheet contract-signing
benchmarked tactics from ANAC adapted to procurement utilities
contracting: smart legal contracts that bind machine actions to legal prose storage of proofs hashes
settlement: ISO 20022 payment initiation instant schemes where available
evidence: append-only logs for payloads SLAs approvals exportable for audit dispute resolution

novel patterns

negotiation sandboxes
before any real data money moves agents rehearse deals against synthetic RFQs historical constraints
they surface two three viable bundles for a human to approve
along with counterfactuals "+2-day lead time reduces price 3.1%"
closer to procurement strategy than chatbot banter it's bounded by policy

programmable trust
contracts carry self-checks "if Invoice total mismatches Order by >X% block settlement raise a dispute case with all evidence attached"
because UBL ISO-20022 are structured these checks are implementable as rules not emails

policy markets
suppliers publish machine-readable policies e.g. carbon limits data retention warranty that agents can query like an API
buyers rank policies alongside price to reduce hidden switching costs

title as an API
in MLETR jurisdictions the "document of title" is an API object with a history
assignment of title can trigger release of funds insurance updates without manual paperwork

zero-integration by construction
because the agents speak Peppol/UBL on the wire log ISO-20022 payment proofs
onboarding a new partner becomes a policy + adapter exercise rather than a six-week project

what still needs solving
governance: who signs who can raise budgets who can change policies mid-negotiation
liability: when agents misprice misroute the enforceable contract helps but humans are still accountable
cross-border gaps: MLETR adoption is uneven instant payment access Peppol coverage vary by region
none are showstoppers but they shape where to pilot first

cautious path to first pilots
start with a single commodity SKU willing partner already using Peppol
limit funds with per-deal caps gate agent proposals behind human approval
route payments via ISO 20022 instant rails where possible
measure time to first data contract test pass-rate breakage per 1,000 messages
if you can consistently go from handshake to first settled order in days instead of weeks scale the scope
https://www.ecb.europa.eu/paym/integration/retail/instant_payments/shared/pdf/ECB_Document_MIP_Brochure_FinalVersion.pdf

bottom line agent-to-agent procurement isn't about inventing new rails
it's about using the rails we already have UBL/Peppol smart legal contracts ISO 20022 instant payments
giving agents narrow authority to negotiate within policies compile enforceable contracts settle with proofs
when that loop is tight reversible the integration tax fades trade gets faster
