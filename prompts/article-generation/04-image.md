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
- **Figures:** stylised human figures with Cubist/geometric faces (split-tone faces — half teal, half gold), bold black outlines, simplified angular features. Figures should be abstract and Picasso-like — geometric fragmented bodies with flat colour blocks, NOT realistic people in suits. Faces MUST be clearly recognisable as portrait-style Cubist heads with visible eyes, nose, and angular jaw — NOT abstract silhouettes or featureless shapes
- **Icons and symbols:** business and tech iconography floating around the figures — charts, graphs, shields, gears, arrows, coins, checkmarks, scales — all rendered in the same flat mid-century style with thick black outlines
- **Diagonal coral/salmon brush stroke** — a single bold diagonal brush stroke in coral/salmon cutting across the composition
- **Texture:** subtle paper/grain texture throughout, giving a hand-printed or screenprint feel — NOT clean digital
- **Composition:** central figure(s) surrounded by floating symbolic elements. The cream background MUST remain the dominant colour — at least 30-40% of the image should be visible cream/beige negative space. The composition should feel open and airy, NOT packed edge-to-edge
- **NO photorealism, NO 3D rendering, NO gradients — strictly flat colour fills with black outlines**
- **NO text or lettering in the image**
- **NO coloured borders or frames around the edges — the cream background should extend to all edges**
- **NO heavy dark fills that dominate the image — keep it light and balanced**

## What to depict

Choose 1-2 stylised human figures (close-up or medium shot, faces clearly visible) and 4-6 symbolic icons that relate to the article's theme. The figures should appear to be interacting with or presenting the icons. Include the signature diagonal coral brush stroke. Keep the composition clean and uncluttered.

## Output

Return ONLY the DALL-E prompt text, nothing else. Keep it under 250 words. Be very specific about the mid-century Cubist illustration style, the exact colour palette (cream background, teal, gold, coral, black), the paper texture, the thick black outlines, and the open airy composition with plenty of cream negative space.
