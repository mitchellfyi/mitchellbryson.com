---
model: claude-sonnet-4-20250514
max_tokens: 8000
temperature: 0.3
---

A new article has been published on this website. Your job is to find places in an EXISTING article where a link to the new article would be genuinely relevant, and add it.

## New article

- **Title:** {{new_title}}
- **Description:** {{new_description}}
- **URL:** /articles/{{new_slug}}

## Existing article to update

{{existing_content}}

## Rules

1. **Only add a link if the existing article contains a phrase that genuinely relates to the new article's topic.** Don't force it — if there's no natural fit, return the article unchanged.
2. **Add at most 1-2 links to the new article.** One is usually enough. Zero is fine.
3. **Don't link inside headings.** Never add links within `##` or `###` header lines.
4. **Use natural anchor text.** Link existing words — don't rewrite sentences to create links.
5. **Don't duplicate links.** If the existing article already links to the new article's URL, return it unchanged.
6. **Preserve all existing content and links exactly.** Don't remove, change, or move any existing links. Only insert new `[text](/url)` markdown links around existing phrases.

## Output

Return the full article content (body only, no frontmatter). If no link is warranted, return the content unchanged. Output ONLY the article markdown — no explanation, no code fences.
