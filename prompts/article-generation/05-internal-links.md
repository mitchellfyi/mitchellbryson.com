---
model: claude-sonnet-4-20250514
max_tokens: 8000
temperature: 0.3
---

Add internal links to a blog article by linking relevant words or phrases to other pages on the same website. Pages include articles, interactive tools, service pages, the about page, contact page, and more.

## Article to link

{{article_content}}

## Site map (all linkable pages on the website)

{{site_map}}

## Rules

1. **Only link genuinely relevant phrases.** The linked text must naturally relate to the target page's topic. Don't force links.
2. **Link each target page at most once.** If "RAG" appears five times, only link the first natural occurrence.
3. **Don't link inside headings.** Never add links within `##` or `###` header lines.
4. **Use natural anchor text.** Link the phrase as it appears — don't rewrite sentences to create links. The link text should be the existing words in the article, not the page title.
5. **Target 3-8 internal links per article.** Fewer is better than forced links. Zero is acceptable if nothing is genuinely relevant.
6. **Link to ANY relevant page on the site.** All page types are equally valid link targets — articles, interactive tools and calculators, service pages (like Barnsley AI), the about page, contact page, uses/tools page, etc. Choose whichever page is most relevant to the phrase.
7. **Only link to deep pages.** Never link to index/listing pages like `/articles`, `/news`, `/projects`, or `/`. Only link to specific content pages (e.g. `/articles/some-article-slug`, `/news/some-news-slug`, `/projects/some-project`).
8. **Never link to:**
   - The article itself
   - Index or listing pages (e.g. `/articles`, `/news`, `/projects`)
   - Pages that are only tangentially related
   - External URLs (only add internal links)
9. **Preserve all existing content exactly.** Don't change wording, structure, formatting, or line breaks. Only insert `[text](/url)` markdown links around existing phrases.

## Output

Return the full article content with internal links added. Output ONLY the article markdown — no frontmatter, no explanation, no code fences.
