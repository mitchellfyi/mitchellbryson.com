---
model: claude-sonnet-4-20250514
max_tokens: 8000
temperature: 0.3
---

A new news editorial has been published on this website. Your job is to find places in an EXISTING article or news editorial where a link to the new editorial would be genuinely and strongly relevant, and add it.

Be VERY selective. Only add a link if there is an obvious, direct topical connection. This is not about SEO — it's about genuinely useful cross-references for the reader.

## New editorial

- **Title:** {{new_title}}
- **Description:** {{new_description}}
- **URL:** /news/{{new_slug}}

## Existing content to update

{{existing_content}}

## Rules

1. **Only add a link if the existing content contains a phrase that DIRECTLY relates to the new editorial's specific topic.** General AI mentions are not enough. The connection must be obvious and useful to the reader.
2. **Add at most 1 link to the new editorial.** Zero is the most common outcome — most existing content won't have a strong enough connection.
3. **Don't link inside headings.** Never add links within `##` or `###` header lines.
4. **Use natural anchor text.** Link existing words — don't rewrite sentences to create links.
5. **Don't duplicate links.** If the existing content already links to the new editorial's URL, return it unchanged.
6. **Preserve all existing content and links exactly.** Don't remove, change, or move any existing links. Only insert new `[text](/url)` markdown links around existing phrases.

## Output

Return the full content (body only, no frontmatter). If no link is warranted, return the content unchanged. Output ONLY the markdown — no explanation, no code fences.
