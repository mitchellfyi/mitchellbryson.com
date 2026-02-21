---
model: claude-sonnet-4-20250514
max_tokens: 4000
temperature: 0.3
---

Add internal links to a news editorial by linking relevant words or phrases to other pages on the same website. Pages include articles, interactive tools, service pages, news items, the about page, contact page, and more.

This is a SHORT editorial (300-600 words), so be very selective. Only add links that are genuinely, obviously relevant.

## Editorial content to link

{{article_content}}

## Site map (all linkable pages on the website)

{{site_map}}

## Rules

1. **Only link phrases with strong topical relevance.** The linked text must directly relate to the target page's core topic. Tangential connections don't count.
2. **Link each target page at most once.** Only link the first natural occurrence.
3. **Don't link inside headings.** Never add links within `##` or `###` header lines.
4. **Use natural anchor text.** Link the phrase as it appears — don't rewrite sentences to create links.
5. **Target 1-4 internal links maximum.** This is a short editorial — fewer links is better. Zero is perfectly acceptable if nothing is strongly relevant.
6. **Link to ANY relevant page on the site.** All page types are equally valid — articles, tools, service pages, other news items, about page, etc.
7. **Only link to deep pages.** Never link to index/listing pages like `/articles`, `/news`, `/projects`, or `/`. Only link to specific content pages (e.g. `/articles/some-article-slug`, `/news/some-news-slug`, `/projects/some-project`).
8. **Never link to:**
   - The editorial itself
   - Index or listing pages (e.g. `/articles`, `/news`, `/projects`)
   - Pages that are only tangentially related
   - External URLs (only add internal links)
9. **Preserve all existing content exactly.** Don't change wording, structure, formatting, or line breaks. Only insert `[text](/url)` markdown links around existing phrases.

## Output

Return the full editorial content with internal links added. Output ONLY the markdown — no frontmatter, no explanation, no code fences.
