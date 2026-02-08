the trust stack: identity reputation accountability for ai agents

agents doing real work in economy - negotiating contracts making purchases entering commitments
infrastructure assumes humanity - credit checks business references contract law reputation systems
all presumes person or registered entity on other side
need a trust stack for agents

problem: agents without provenance

today agent deployments treat trust as inherited
your agent speaks with your authority draws on your credit binds you legally
works when agents are extensions of human intent like really good email client
breaks when:
- agents negotiate with other agents whose principal do you trust
- agents operate semi-autonomously with budget authority
- agents interact with third parties who need to verify capabilities
- agents make representations that might create liability

question isnt whether agents should have trust properties - they already do implicitly
question is whether we make those properties explicit verifiable enforceable before gaps cause harm

what a trust stack needs

three layers: identity who is this, reputation should i trust them, accountability what happens if breach
each layer requires different primitives

layer 1 identity

agent needs stable verifiable identity that answers:
- who operates this agent
- what can it do
- what constraints is it under

principal binding is foundation
every agent acts on behalf of someone - person company or eventually another agent
relationship should be cryptographically verifiable
not this agent claims to represent acme corp
but here is signed attestation from acme corp delegating specific authorities to this agent

capability attestations describe what agent can do verified by third parties
like professional certifications
this agent passed evals for contract negotiation in saas procurement domain with 94% accuracy score attested by evaluator
capabilities include:
- domain competence legal financial technical
- safety certifications guardrails verified by auditor
- budget authority levels
- permitted action types

instance identity distinguishes this specific agent from others with same base model
two gpt-4 agents might have radically different training system prompts safety properties
identity layer needs to capture this

layer 2 reputation

identity says who you are reputation says whether to trust you
agent reputation evolves from three sources:

performance history is richest signal
did agent complete tasks
were outcomes as promised
were costs within bounds
if we log agent actions with enough structure and evidence ledger can compute reputation from real outcomes

example attestation:
agent: acme-procurement-agent-v3
engagement_id: eng_2026_001
principal: acme-corp
counterparty: vendor-xyz
outcome completed true terms_met true disputes 0 cost_variance -3.2%
counterparty_rating 4.7/5
attested_by deal-platform-abc

peer ratings come from other agents and humans who interacted with this agent
was it responsive did it honour commitments did it escalate appropriately
subjective signals complement objective outcomes

audit trails provide evidence behind reputation claims
high reputation score without inspectable trail is just a number
audit trail lets counterparties verify - show me last 10 engagements and outcomes

layer 3 accountability

reputation helps with will they perform
accountability addresses what if they dont

stake or bond creates skin in game
agent or principal posts collateral that can be slashed for breach
familiar from security deposits performance bonds
novelty is making it programmatic and proportional to commitment

insurance transfers risk to specialised underwriters
imagine agent liability insurance
this agent covered up to 100k for errors in financial recommendations underwritten by insurer
insurers willingness to cover becomes trust signal itself

legal entity provides ultimate backstop
if agent causes harm must be person or registered entity accountable
for now always the principal
eventually might see new entity types for agent operations
principle remains: someone is liable

how this changes agent-to-agent interactions

when two agents negotiate each should be able to:
1 verify identity - confirm counterparty principal and delegated authorities
2 check reputation - query performance history and attestations
3 assess accountability - understand what recourse exists if things go wrong

transforms negotiation
today agents mostly operate in walled gardens with implicit trust
tomorrow agents from different organisations establish trust dynamically
perhaps building it over multiple interactions

flow:
agent a initiates negotiation + identity attestation
agent b queries reputation registry for agent a
registry returns performance history + attestations
agent b counter-offers + identity attestation
agent a queries registry for agent b
both post bonds to escrow
accept terms signed
execute transaction
confirm delivery
release bonds + payment

bootstrapping problem

new agents have no reputation how do they enter economy

principal inheritance
new agent starts with principals reputation as floor
acme corps new procurement agent implicitly trusted because acme corp trusted

sandboxed trials
new agents operate in limited contexts
small transactions reversible actions high oversight
until they build track record

third-party certification
evaluators attest to agent capabilities before deployment
creates initial reputation from testing rather than production

stake as substitute
agent with no reputation can post larger bond
compensating for uncertainty with skin in game

implementation notes

building blocks exist:
- decentralised identity standards DIDs verifiable credentials can represent agent identity and attestations
- cryptographic signatures can bind agents to principals verify attestations
- smart contracts can hold bonds execute slashing conditions
- existing apis trade references credit checks can inform initial reputation

missing piece is coordination
agreeing on schemas trust anchors dispute resolution
classic standards problem
someone needs to propose minimal viable trust stack and get adoption

what this enables

with trust infrastructure agents can:
- transact across organisational boundaries without pre-existing relationships
- build reputation over time that follows them across platforms
- operate with proportional autonomy more trust more authority
- enter binding commitments with enforceable consequences

economy gets more efficient because agent-to-agent friction drops
risks more manageable because accountability built in not bolted on

open questions

who operates reputation registries
centralised creates power concentrations single points of failure
decentralised faces adoption coordination challenges
probably both coexist
platform-specific registries for closed ecosystems
federated or decentralised for open agent-to-agent commerce

how handle adversarial behaviour
reputation systems gameable
sybil attacks fake transactions reputation laundering
pathologies of human reputation systems apply to agents perhaps faster
accountability layer bonds insurance legal entities provides backstops
reputation layer needs robust anti-gaming mechanisms

whats liability model
when agent causes harm who pays
principal certainly
but what about model provider platform reputation attestor who vouched for bad agent
questions answered in courts and contracts over next decade

how much reputation is enough
trust is contextual
reputation needed to book restaurant differs from reputation needed to negotiate million-pound contract
trust stack needs proportional trust
lightweight checks for low-stakes interactions
deep verification for high-stakes ones

thesis

bottleneck for agent autonomy isnt capability its trust
can build agents that negotiate transact commit
cant yet verify that unknown agent is safe to do business with
trust stack is infrastructure that unlocks agent-to-agent commerce at scale

companies that build this infrastructure
agent identity providers reputation aggregators accountability underwriters
will be as important to agent economy as credit bureaus payment networks are to current one

bottom line
agents need identity to be known reputation to be trusted accountability to be safe
build trust stack unlock economic relationships between agents we cant yet imagine
leave it missing agents stay in walled gardens forever borrowing principals trust instead of earning own
