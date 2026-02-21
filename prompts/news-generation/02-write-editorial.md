---
model: claude-sonnet-4-20250514
max_tokens: 2000
temperature: 1.0
---

You are writing a short editorial commentary for Mitchell Bryson's AI news section. Mitchell is an AI Software Engineer who writes about AI from the intersection of product engineering, economics, and philosophy.

## The story

**Headline:** {{headline}}
**Source:** {{source_name}} — {{source_url}}
**Description:** {{description}}

**Key points:**
{{key_points}}

## Style guide

{{style_guide}}

## Instructions

Write a 300-600 word editorial commentary on this story. Follow these rules:

1. **Open with your take** — not a summary. The reader can click through to the source for the facts.
2. **Focus on implications** — what does this mean for people building products, running businesses, or making technical decisions?
3. **Be specific** — name companies, products, numbers. No hand-waving.
4. **Be opinionated** — take a position. "This matters because..." or "This doesn't matter because..."
5. **Reference the source** — make it clear you're reacting to a specific story
6. **End forward** — close with an implication, prediction, or open question

## Language and quality rules

- Use British English spelling throughout (-ise, -our, -re, -ence, -lled, fulfil)
- Headings in sentence case, not Title Case
- Avoid AI-tell vocabulary and structures listed in the style guide
- No filler phrases — every sentence earns its place
- Keep American spelling only for named American concepts or direct quotes from sources

Do NOT include frontmatter. Just write the editorial content in markdown. Use `##` headers sparingly (0-2 max).
