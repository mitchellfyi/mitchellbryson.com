if agents are to move fast and stay safe two things are needed
clear autonomy ladder and explicit human gates
article proposes maintainable ladder l0-l5
controls required at each step
kpis that prove scaling without losing governance
borrows idea of staged autonomy from mature safety-critical domains
then adapts it to b2b software and services

Why a ladder not a leap

Risk frameworks emphasise governance, traceability, human oversight as autonomy increases. A ladder lets autonomy be earned with evidence rather than granted by belief. Use NIST AI RMF to drive governance, measurement, manage functions. ISO IEC 42001 to institutionalise the management system behind them.

Human-in on-the-loop working definitions

Use human-in-the-loop when a person must approve or co-produce an outcome. Use human-on-the-loop when a person supervises, with authority to intervene or stop. These are common regulatory and research notions. They vary by context but capture the oversight needed.

The autonomy ladder L0 to L5

Each level defines what agents may do, the required gates controls, upgrade criteria. Keep evidence in a tamper-evident log. Traces, evals, costs, decisions.

L0 Suggest

- Scope: Drafts, analyses, candidate actions, no external effects
- Gates controls: Prompt and output schema validation, logging, basic evals
- Upgrade criteria: 90% eval pass-rate on curated cases for 2 weeks, no safety policy violations

L1 Execute with pre-approval

- Scope: Executes actions after a human taps approve
- Gates controls: Mandatory review UI, per-action diff, spend estimate, rollback button
- Upgrade criteria: Reviewer acceptance 95%, average approval latency less than 5 min, zero unapproved sends

L2 Templated autonomy

- Scope: Executes within tight templates, support replies with citations, price updates with bounds
- Gates controls: Guardrails, schema, policy allow-lists, rate limits, per-route cost caps, audit trail
- Upgrade criteria: KPI lift with no increase in incident rate, cost unit stable, MTTR less than 15 min on rollbacks

L3 Budget-bounded autonomy

- Scope: Executes and spends inside pre-set budgets, tokens media, with human gates at milestones
- Gates controls: Daily and per-request spend ceilings with alerts, milestone approvals, canary traffic only
- Upgrade criteria: Meet targets on a 10-20% cohort for 2-4 weeks, zero critical incidents

L4 Canary end-to-end

- Scope: Full mission slice, leadgen for one segment, end-to-end in a canary
- Gates controls: Release gates tied to evals and SLOs, change-management, incident playbooks
- Upgrade criteria: KPI deltas hold at canary to 50% without regressions, budget variance less than 10%

L5 Broad autonomy policy-bounded

- Scope: Wide execution with policy and budget guardrails, humans handle exceptions and audits
- Gates controls: Continuous monitoring, drift detection, periodic post-hoc audits, kill-switch
- Stay conditions: No systemic issues, compliance duties, oversight, logging, continue under EU AI Act where applicable

Control stack what changes as autonomy rises

Governance: Map decision rights, who can raise budgets, switch models, expand scope. Align to NIST AI RMF GOVERN MAP MEASURE MANAGE functions. Make them visible in docs and dashboards.

Oversight: Keep humans in or on the loop depending on level. Enforce gates at external-facing milestones, brand, legal, financial. The EU AI Act requires human oversight and logging for high-risk uses. Design for this from L1 upward.

Management system: Treat the ladder as a management process, policy to plan to operate to review, per ISO IEC 42001.

Traceability: Capture inputs outputs, tokens, cost, latency, model plus prompt versions, tool I O, decisions for every action. This underpins audits and post-mortems recommended by NIST.

Reference workflow

Mission Spec to Risk and Scope Check to Level Assignment L0-L5 to Controls and Budgets Loaded to Canary Execution to Evals and KPIs Gate. Pass leads to Scale Up Level or Traffic. Fail leads to Rollback and Post-mortem, which feeds back to Risk and Scope Check.

KPIs that prove moving up a level

- Reliability: p95 latency, error rate, MTTR, incident count severity, weekly
- Quality: Eval pass-rate, faithfulness accuracy, QA acceptance rate, policy-violation count
- Economics: Cost per outcome, tokens plus infra plus minutes, budget utilisation, unit margin
- Control health: percent actions with approver, percent actions with complete traces, audit findings closed

30-day pilot to introduce the ladder

Week 1 Frame and assign. Pick one mission and run a structured risk scope check. Start at L0 L1. Publish decision rights, budgets, gates. Ground oversight in NIST AI RMF concepts, govern, measure, manage.

Week 2 Templated autonomy L2. Add schemas, policy filters, rate limits, per-route cost ceilings. Start a small canary, implement rollback.

Week 3 Budget-bounded autonomy L3. Introduce daily per-request caps and milestone approvals. Track KPIs and evals, aim for MTTR less than 15 min.

Week 4 Canary E2E L4. Expand to a full slice with release gates and post-mortems tied to traces. If operating in the EU, verify human-oversight and logging align with the AI Act high-risk controls before scaling.

Compliance touchpoints do not bolt them on later

Human oversight and logging: Designate oversight roles. Ensure logs capture what a regulator or auditor would need, who, what, when, why. This tracks with EU AI Act obligations for high-risk systems.

Management system: Document policies, roles, competence, supplier controls, continual improvement loops. That is the spine of ISO IEC 42001.

Notes on analogy

The ladder idea is drawn from established autonomy taxonomies, SAE J3016 Levels 0-5 in driving, where capability rises while human responsibility changes form. The analogy is conceptual. The levels are for B2B agents, not vehicles. But the staged approach helps avoid all-or-nothing thinking.
