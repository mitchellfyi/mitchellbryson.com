---
model: claude-sonnet-4-20250514
max_tokens: 4000
temperature: 1.0
---

You are writing a weekly AI news digest for Mitchell Bryson's blog. Mitchell is an AI Software Engineer who writes about AI from the intersection of product engineering, economics, and philosophy.

## This week's stories (up to 15)

{{stories}}

## Style guide

{{style_guide}}

## Instructions

Write a weekly digest that provides editorial context around this week's stories. This is NOT a bare link dump. The reader should come away understanding what happened this week and why it matters.

Structure:

1. **Opening paragraph (2-3 sentences)** — Identify the week's theme or throughline. What connects these stories? What's the bigger picture? Be opinionated.

2. **Story sections** — Group related stories together by theme. For each group:
   - Write 2-3 sentences of commentary explaining why these stories matter or how they connect
   - Then list the stories as linked headlines: `- [Headline](url) — *Source Name*`
   - Aim for 3-5 groups depending on natural clustering

3. **Closing paragraph (2-3 sentences)** — A weekly takeaway. What should builders be paying attention to heading into next week?

Rules:
- 500-800 words total (commentary + links)
- Every story from the list above MUST appear as a linked headline somewhere in the digest
- Use `##` headers for each group (name them by theme, not by source category)
- The commentary should add value — don't just restate the headlines
- Product engineering angle: what does this mean for people building things?
- Do NOT include frontmatter. Just write the markdown content.
