# Madebysatyam-27

Plain CSS implementation of the Figma file `PiRNuJiRECiSiCr6isN26H`, exported 2026-11-08. Names and values match the export. Nothing is renamed, rounded, or restyled.

The portfolio has no framework and no Tailwind, so there is no Tailwind theme. Components are CSS classes.

## Files

| Path | Role |
|---|---|
| `design-system/css/tokens.css` | 282 variables. Light on `:root` and `[data-theme="light"]`. Semantic dark on `[data-theme="dark"]` and `prefers-color-scheme`. |
| `design-system/css/fonts.css` | PP Neue Montreal Text Book, Neue Montreal Medium, PP Neue Montreal Regular, JetBrains Mono Regular. |
| `design-system/css/styles.css` | 16 text styles, elevation, overlay blur, grids. |
| `design-system/css/components.css` | Tag and Progressive Blur. |
| `design-system/preview.html` | Light and dark specimen. |
| `design-system/source/tokens.json` | Source of truth for `tokens.css`. |
| `design-system/scripts/verify-tokens.py` | Fails if a CSS value drifts from the JSON. |

Published tokens are Semantic (42) and Dimensions (29). Components use those, plus the text-style classes. Raw primitives are private base variables. Where a primitive css name collides with a published Dimensions token, the published name wins and the primitive is `--raw-*`.

## Themes

Set `data-theme="light"` or `data-theme="dark"` on `<html>`. With no attribute, the page follows `prefers-color-scheme`. Do not put `data-palette="style-sheet"` on the same element. That selector is the inverted Colour collection used only by style-sheet frames.

## Type

Body and caption: PP Neue Montreal Text Book at 400. Everything in the other text styles: Neue Montreal Medium at 500. Code: JetBrains Mono Regular at 400, 14/20, self-hosted, with a system mono fallback.

## Check

```bash
npm run verify-tokens
npm run dev
```

Longer notes: [README](README.md) and the pages under [docs/](docs/README.md). Font terms: [design-system/fonts/LICENSE-NOTE](design-system/fonts/LICENSE-NOTE).
