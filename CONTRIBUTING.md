# Contributing

This repository is the Website-27 portfolio. The design system under `design-system/` is a direct record of the Figma file Madebysatyam-27. Keep the exported names and values.

## Setup

Node 18 or newer and Python 3.9 or newer are required. Install packages with `npm install`, then:

```bash
npm run verify-tokens
npm run dev
```

Open http://127.0.0.1:3000. Tag and Progressive Blur in React must keep using the classes in `design-system/css/components.css`. Do not restate colours or spacing as raw values in a component.

## Tokens

Do not edit `design-system/css/tokens.css` by hand. Replace `design-system/source/tokens.json` with a new export that keeps the same shape (`tokens[]` with `collection`, `name`, `type`, `modes`, `hidden`, `css`), then:

```bash
python3 design-system/scripts/generate-tokens.py
npm run verify-tokens
```

The verifier resolves `var()` aliases and compares every mode to the JSON value, including units and the unrounded line-height ratios. A mismatch exits non-zero.

Do not rename a published custom property. Semantic and Dimensions names are the Figma path with `/` replaced by `-` and a `--` prefix (`surface/primary` → `--surface-primary`). Components use those tokens, not raw colour or spacing primitives.

When a hidden primitive shares a css name with a published Dimensions token, the published token keeps the name. The primitive is stored as `--raw-<collection>-<name>` so both values survive. Do not "correct" a published value to the primitive's value. `space/l` is 24px. The hidden Spacing token `space/l` is 20px.

## Type, effects, components

Text styles, shadows, grids, Tag, and Progressive Blur live in `design-system/css/styles.css` and `design-system/css/components.css`. Frame sizes and fade colours that are not variables stay as the values in the component spec.

Body and caption use PP Neue Montreal Text Book. Display, headings, labels, and overlines use Neue Montreal Medium. Code uses the self-hosted JetBrains Mono Regular file. Do not point body styles at `PPNeueMontreal-Book`.

## Fonts

PP Neue Montreal files are licensed from Pangram Pangram and are not redistributable. Read `design-system/fonts/LICENSE-NOTE` before adding or moving a font file. JetBrains Mono stays under its OFL file.

## Checks

`npm run build` runs the token verifier, checks that the preview references the self-hosted faces, and writes a static copy to `dist/` (gitignored). `npm test` is not used; `npm run verify-tokens` is the token check.
