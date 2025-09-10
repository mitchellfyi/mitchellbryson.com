---
author: Mitchell Bryson
date: "2025-12-08"
title: "Agent-to-Agent Procurement: Autonomous negotiation, contracting, and settlement between ERPs"
description: "A philosophical but concrete blueprint for how buyer and supplier agents could negotiate terms, compile enforceable contracts, and settle instantly across today's rails."
---

Most B2B partnerships stall on integration and coordination. The future worth aiming for is simpler: two companies point agents at each other, declare policies and limits, then let them **negotiate, contract, and settle** - with humans staying in charge of goals and guardrails. The pieces for this already exist in the wild: machine-readable business documents (UBL/Peppol), legally recognised **smart legal contracts**, and instant payments over **ISO 20022** rails. Tie them together with agent negotiation and you get "mission in, value out" for procurement. ([docs.oasis-open.org][1], [OpenPeppol][2], [lawcom.gov.uk][3], [ISO20022][4])

## Why imagine agent-to-agent procurement?

Because the expensive part of B2B trade isn't price discovery - it's the **time and variance** between "we should work together" and "money settled, goods moving." Agents that speak in contracts and proofs can compress that path. And unlike consumer chatbots, this isn't novelty: the enterprise stack already has standards for **orders, invoices, and events** (UBL/Peppol) and payment messages (ISO 20022). The open question is orchestration: can autonomous negotiators find terms that satisfy both policies, with humans approving the jump to production? ([docs.oasis-open.org][1], [Peppol Documentation][5], [ISO20022][4])

## Premises (grounded, not sci-fi)

* **Documents are already code-like.** UBL defines Orders, Despatch Advice, and Invoices as structured schemas; Peppol operationalises their exchange at scale. Agents don't need to invent a format - they can compose with it. ([docs.oasis-open.org][1], [OpenPeppol][2])
* **Contracts can execute.** UK law recognises *smart legal contracts* as enforceable; a contract that triggers delivery, invoicing, or price adjustments on data events is viable in mainstream jurisdictions. ([lawcom.gov.uk][3], [Accord Project][6])
* **Settlement can be instant.** ISO 20022 underpins modern payment schemes, including "instant credit transfers" in the EU that make funds available in \~10 seconds - fast enough for event-driven settlement. ([ISO20022][4], [European Central Bank][7])
* **Negotiation is a studied domain.** Automated negotiating agents have been benchmarked for years (ANAC), and multi-agent "contracting" patterns date back to the Contract Net Protocol. We're not starting from zero; we're composing. ([scml.cs.brown.edu][8], [eecs.ucf.edu][9])

## How it might work (end-to-end)

1. **Intent & policy exchange**
   Each side exposes a **policy capsule**: acceptable price ranges, incoterms, SLAs, credit limits, escrow rules, data handling, and escalation paths. Agents verify identity and capabilities, then spin a negotiation sandbox. (Think "procurement robots" shaking hands on scope with hard ceilings.)

2. **Automated negotiation**
   Buyer and supplier agents search the space of terms - price breaks, delivery windows, payment timing, substitution options - using multi-issue bargaining. When they find a Pareto-efficient bundle that satisfies both policies, they generate a **term sheet** for human approval. Lessons from agent negotiation contests apply directly here (multi-issue utilities, concession tactics, reservation points). ([scml.cs.brown.edu][8])

3. **Contract compilation**
   On approval, agents compile a **smart legal contract** that references canonical documents: UBL `Order`, `OrderResponse`, `DespatchAdvice`, and `Invoice` schemas, plus an **events manifest** for status changes. The legal text cites the machine contract; obligations (e.g., send Despatch Advice within N hours) are enforceable and logged. ([docs.oasis-open.org][1])

4. **Execution & observability**
   Agents plug into each ERP via adapters that emit and consume Peppol/UBL messages. Every exchange lands in an **evidence ledger**: who/what/when/why, hashes of payloads, SLAs met or missed. This is boring on purpose - auditors can follow along without bespoke exports. ([OpenPeppol][2])

5. **Settlement**
   On delivery confirmation, the contract triggers payment via **ISO 20022** messages (e.g., pain.001 initiation → pacs.008 clearing). Where supported, use SEPA Instant (SCT Inst) so funds arrive near-real-time. Discounts for early payment or penalties for lateness apply automatically. ([ISO20022][4], [European Central Bank][7])

6. **Title & documents of value**
   For flows that depend on documents of title (bills of lading, warehouse receipts), agents rely on jurisdictions that implemented **UNCITRAL MLETR** - so electronic transferable records are legally valid. No couriers, fewer disputes. ([uncitral.un.org][10], [ICC Academy][11], [World Trade Organization][12])

## A protocol stack for autonomous procurement

* **Identity & trust:** mutual TLS, verified business identifiers, and access via Peppol or equivalent networks. ([OpenPeppol][2])
* **Semantics:** UBL/JSON Schema for documents; Async events for status (order accepted, shipped, delivered). ([docs.oasis-open.org][1])
* **Negotiation:** multi-issue agent bargaining with human gates at term-sheet and contract-signing. Benchmarked tactics from ANAC adapted to procurement utilities. ([scml.cs.brown.edu][8])
* **Contracting:** smart legal contracts that bind machine actions to legal prose; storage of proofs and hashes. Recognised enforceability matters here. ([lawcom.gov.uk][3])
* **Settlement:** ISO 20022 payment initiation; instant schemes where available. ([ISO20022][4], [European Central Bank][7])
* **Evidence:** append-only logs for payloads, SLAs, and approvals; exportable for audit and dispute resolution.

## Novel patterns (philosophical, but workable)

**Negotiation sandboxes.** Before any real data or money moves, agents rehearse deals against **synthetic RFQs** and historical constraints. They surface two or three viable bundles for a human to approve, along with counterfactuals: "+2-day lead time reduces price 3.1%." (This is closer to procurement strategy than chatbot banter; it's bounded by policy.)

**Programmable trust.** Contracts carry **self-checks**: "if Invoice total mismatches Order by >X%, block settlement and raise a dispute case with all evidence attached." Because UBL and ISO-20022 are structured, these checks are implementable as rules, not emails. ([docs.oasis-open.org][1], [ISO20022][4])

**Policy markets.** Suppliers publish *machine-readable* policies (e.g., carbon limits, data retention, warranty) that agents can query like an API. Buyers rank policies alongside price to reduce hidden switching costs.

**Title as an API.** In MLETR jurisdictions, the "document of title" is an API object with a history; assignment of title can trigger release of funds or insurance updates without manual paperwork. ([uncitral.un.org][10])

**Zero-integration by construction.** Because the agents speak Peppol/UBL on the wire and log ISO-20022 payment proofs, onboarding a new partner becomes a **policy + adapter** exercise rather than a six-week project. ([OpenPeppol][2], [docs.oasis-open.org][1])

## What still needs solving

Three open fronts remain. **Governance:** who signs, who can raise budgets, who can change policies mid-negotiation. **Liability:** when agents misprice or misroute, the enforceable contract helps, but humans are still accountable. **Cross-border gaps:** MLETR adoption is uneven; instant payment access and Peppol coverage vary by region. None are showstoppers, but they shape where to pilot first. ([lawcom.gov.uk][3], [uncitral.un.org][10])

## A cautious path to first pilots

Start with a single commodity SKU and a willing partner already using **Peppol**. Limit funds with per-deal caps; gate agent proposals behind human approval; route payments via **ISO 20022** instant rails where possible. Measure **time to first data**, **contract test pass-rate**, and **breakage per 1,000 messages**. If you can consistently go from handshake to first settled order in **days** instead of **weeks**, scale the scope. ([OpenPeppol][2], [European Central Bank][13])

**Bottom line:** agent-to-agent procurement isn't about inventing new rails. It's about using the rails we already have - UBL/Peppol, smart legal contracts, ISO 20022, instant payments - and giving agents narrow authority to negotiate within policies, compile enforceable contracts, and settle with proofs. When that loop is tight and reversible, the integration tax fades and trade gets faster. ([docs.oasis-open.org][1], [OpenPeppol][2], [lawcom.gov.uk][3], [ISO20022][4], [European Central Bank][7])

[1]: https://docs.oasis-open.org/ubl/UBL-2.1.html?utm_source=chatgpt.com "Universal Business Language Version 2.1 - Index of /"
[2]: https://peppol.org/?utm_source=chatgpt.com "OpenPeppol: The Future Is Open"
[3]: https://lawcom.gov.uk/project/smart-contracts/?utm_source=chatgpt.com "Smart contracts"
[4]: https://www.iso20022.org/iso-20022?utm_source=chatgpt.com "ISO 20022 | ISO20022"
[5]: https://docs.peppol.eu/poacc/billing/3.0/bis/?utm_source=chatgpt.com "Peppol BIS Billing"
[6]: https://accordproject.org/news/smart-legal-contracts-are-recognised-as-being-legally-enforceable-in-england-and-wales/?utm_source=chatgpt.com "Smart Legal Contracts are recognised as being ..."
[7]: https://www.ecb.europa.eu/paym/integration/retail/instant_payments/html/index.en.html?utm_source=chatgpt.com "What are instant payments? - European Central Bank"
[8]: https://scml.cs.brown.edu/?utm_source=chatgpt.com "Automated Negotiating Agents Competition (ANAC)"
[9]: https://www.eecs.ucf.edu/~lboloni/Teaching/EEL6788_2008/papers/The_Contract_Net_Protocol_Dec-1980.pdf?utm_source=chatgpt.com "The Contract Net Protocol: High-Level Communication and ..."
[10]: https://uncitral.un.org/en/texts/ecommerce/modellaw/electronic_transferable_records?utm_source=chatgpt.com "UNCITRAL Model Law on Electronic Transferable Records ..."
[11]: https://academy.iccwbo.org/digital-trade/article/mletr-an-overview-of-uncitrals-model-law-on-electronic-transferable-records/?utm_source=chatgpt.com "MLETR: An overview of UNCITRAL's Model Law on Electronic ..."
[12]: https://www.wto.org/english/tratop_e/msmes_e/uncitral_240621.pdf?utm_source=chatgpt.com "Overview of the UNCITRAL Model Law on Electronic ..."
[13]: https://www.ecb.europa.eu/paym/integration/retail/instant_payments/shared/pdf/ECB_Document_MIP_Brochure_FinalVersion.pdf?utm_source=chatgpt.com "Benefits of SEPA Instant Credit Transfer (SCT Inst)"
