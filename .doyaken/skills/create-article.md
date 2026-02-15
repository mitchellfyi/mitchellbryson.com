---
name: create-article
description: Create a new blog article with raw draft and polished content
---

# Create Article

Create blog articles following the dual-file pattern: raw human notes → polished content.

## File Structure

Each article lives in `src/app/articles/{slug}/` with two files:

```
src/app/articles/{slug}/
├── content_draft.md    # Raw stream-of-consciousness notes
└── content.md          # AI-polished article with frontmatter
```

## content_draft.md Format

The draft should look like **human-written notes** — stream of consciousness, not a polished article:

- **Lowercase** — no capital letters (except proper nouns if needed)
- **Minimal punctuation** — no periods at end of lines, few commas
- **No markdown formatting** — no headers, bold, italic, links
- **Bullet points optional** — but keep them simple, no nested structure
- **Shorthand/fragments** — not full sentences
- **Raw ideas** — the thinking process, not the presentation

### Example (content_draft.md)

```
most ideas are bad at the start
not a reason to quit
it is the baseline
fear and doubt are useful signals
show early quality is not delusional
job is to move idea from bad to workable fast enough to learn

fear and doubt are productive
skepticism reduces distance between belief and reality
treat as debugging tool not mood
ask what would make this fail
ask what would have to be true for this to work
if no answer it is gambling not building

why now matters more than brilliance
bill gross analysis shows 42% of startup success comes from timing
```

## content.md Format

The polished version with proper frontmatter:

```markdown
---
author: Mitchell Bryson
date: "YYYY-MM-DD"
title: "Article Title"
description: "One-line description for SEO and previews."
---

Full article content with:
- Proper capitalization and punctuation
- Markdown headers (##, ###)
- **Bold** and *italic* emphasis
- Proper paragraph structure
- Links where appropriate
- Bullet lists and numbered lists
- Code blocks if relevant
```

## Workflow

### When Creating New Content

1. **Generate the draft first** (`content_draft.md`)
   - Write as raw notes/thinking
   - Capture all ideas without polish
   - Use stream-of-consciousness style

2. **Polish into content.md**
   - Transform notes into readable article
   - Add structure (headers, sections)
   - Add frontmatter with metadata
   - Maintain the ideas but improve presentation

### When Given Polished Content

If you receive or generate polished content first:

1. Use the polished version as `content.md`
2. **Create a raw draft** (`content_draft.md`) by:
   - Stripping formatting
   - Converting to lowercase
   - Removing punctuation
   - Breaking into fragments
   - Making it look like human notes

## Slug Naming

- Lowercase with hyphens: `economics-of-delegation`
- Descriptive but concise
- No dates in slug (date goes in frontmatter)

## Checklist

- [ ] `content_draft.md` exists and looks like raw notes
- [ ] `content.md` exists with proper frontmatter
- [ ] Slug is lowercase with hyphens
- [ ] Date in frontmatter is correct format: `"YYYY-MM-DD"`
- [ ] Description is one line, good for SEO
- [ ] Both files cover the same topics (draft is source for content)
