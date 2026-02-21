---
title: 'Agentic Commerce Protocol'
description: 'RFC: Fulfilment for the Agentic Commerce Protocol - defines the fulfilment lifecycle (order confirmation, shipment, delivery, returns), agent↔merchant messages, and state transitions.'
author: Mitchell Bryson
date: '2025-07-01'
link:
  href: 'https://github.com/mitchellfyi/agentic-commerce-protocol'
  label: 'View on GitHub'
---

The Agentic Commerce Protocol (ACP) is an open standard for AI agents to facilitate commerce transactions between buyers and businesses. The agent acts as an intermediary for product discovery and purchase facilitation — without becoming the merchant of record.

## How it works

Three parties connect through standardised API contracts: businesses, AI agents, and payment providers. Merchants expose their catalogue and checkout endpoints via OpenAPI specs. Agents discover offerings and facilitate transactions by passing secure payment tokens between buyers and sellers. The agent never handles money directly.

## Fulfilment RFC

I authored an optional profile extension (`acp.fulfilment.v1`) that adds post-checkout order lifecycle tracking to the protocol:

- **13 event types** covering the full order lifecycle: accepted, rejected, in preparation, handed to carrier, in transit, out for delivery, delivered, partially delivered, cancelled, return requested/received, refunded, and chargeback
- **Two transport patterns** — pull (required, paginated GET) and push (optional, merchant webhooks with HMAC signatures and at-least-once delivery)
- **Per-line-item tracking** for partial fulfilment and returns
- **Shipment metadata** — carrier, tracking number, tracking URL, and estimated delivery without prescribing specific carriers
- **Capability discovery** via a `capabilities.fulfilment` field in existing ACP responses

The extension reuses ACP Core auth, signatures, and idempotency with no new PII introduced.

## Spec format

Machine-readable OpenAPI (YAML) and JSON Schema specifications with reference implementations. Apache 2.0 licensed, currently in draft status.
