---
model: claude-sonnet-4-20250514
max_tokens: 500
temperature: 1.0
---

Generate a DALL-E image prompt for a blog article cover image.

## Article

- Title: {{title}}
- Description: {{description}}

## Art style (MUST match exactly)

The existing blog images follow a very specific and consistent style. The generated image MUST match this style:

- **Mid-century modern / Cubist editorial illustration** — think 1950s-1960s graphic design meets Picasso-inspired flat geometric figures
- **Colour palette:** cream/beige background (#f5f0e8), teal (#3d9b8f), mustard/gold (#c8a84e), coral/salmon brush strokes (#e07050), black outlines and fills, muted grey accents
- **Figures:** stylised human figures with Cubist/geometric faces (split-tone faces — half teal, half gold), bold black outlines, simplified angular features, wearing business attire (suits, blazers)
- **Icons and symbols:** business and tech iconography scattered around the figures — charts, graphs, shields, gears, arrows, circuit patterns, coins, checkmarks, magnifying glasses, envelopes, scales, pie charts, bar charts — all rendered in the same flat mid-century style with thick black outlines
- **Diagonal coral/salmon brush stroke** — most images feature a bold diagonal brush stroke in coral/salmon cutting across the composition
- **Texture:** subtle paper/grain texture throughout, giving a hand-printed or screenprint feel — NOT clean digital
- **Composition:** central figure(s) surrounded by floating symbolic elements, with good use of negative space against the cream background
- **NO photorealism, NO 3D rendering, NO gradients — strictly flat colour fills with black outlines**
- **NO text or lettering in the image**

## What to depict

Choose 1-2 stylised human figures and 4-6 symbolic icons that relate to the article's theme. The figures should appear to be interacting with or presenting the icons. Include the signature diagonal coral brush stroke.

## Output

Return ONLY the DALL-E prompt text, nothing else. Keep it under 250 words. Be very specific about the mid-century Cubist illustration style, the exact colour palette (cream background, teal, gold, coral, black), the paper texture, and the thick black outlines.
