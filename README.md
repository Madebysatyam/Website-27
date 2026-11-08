# Website-27

Portfolio site for Madebysatyam-27. The design system is the Figma file `PiRNuJiRECiSiCr6isN26H` (exported 2026-11-08) as CSS: the same token names, the same values, and the Tag and Progressive Blur components.

The site shell is Next.js. React components in `components/` render those CSS classes. Token values stay in `design-system/css/tokens.css`. There is no Tailwind. If a later page adds it, point every utility at these custom properties. Do not copy the hexes into a Tailwind config.

A short map of the system is [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Detailed pages are in [docs/](docs/README.md).

## Setup

Node 18+ and Python 3.9+ are required. Python runs the token check. Next.js serves the site.

```bash
npm install
npm run verify-tokens
npm run dev
```

The preview is http://127.0.0.1:3000. Add `?theme=light` or `?theme=dark` to force a theme before paint. The header switch does the same thing after load.

`npm run build` checks that `tokens.css` still matches the Figma export, then builds the Next.js app.

The CSS specimen also opens on its own, with no React:

```bash
python3 design-system/scripts/verify-tokens.py
python3 -m http.server 4173 --bind 127.0.0.1 --directory design-system
```

That address is http://127.0.0.1:4173/preview.html.

## Folder structure

```
.
├── README.md
├── DESIGN-SYSTEM.md
├── LICENSE                  code and docs only; fonts are excluded
├── CONTRIBUTING.md
├── CHANGELOG.md
├── package.json
├── app/                     Next.js routes
├── components/              Tag and Progressive Blur
├── docs/
│   ├── colours.md
│   ├── typography.md
│   ├── spacing-and-dimensions.md
│   ├── grids.md
│   ├── elevation-and-blurs.md
│   └── components.md
└── design-system/
    ├── preview.html
    ├── css/
    │   ├── fonts.css
    │   ├── tokens.css       generated
    │   ├── styles.css       type, elevation, blur, grids
    │   ├── components.css   Tag, Progressive Blur
    │   └── preview.css
    ├── fonts/               licensed faces plus JetBrains Mono OFL
    ├── source/
    │   ├── tokens.json      282 variables
    │   └── styles.json      text, effect, and grid styles
    └── scripts/
        ├── generate-tokens.py
        ├── verify-tokens.py
        └── build.py
```

Link the stylesheets in this order:

```html
<link rel="stylesheet" href="design-system/css/fonts.css">
<link rel="stylesheet" href="design-system/css/tokens.css">
<link rel="stylesheet" href="design-system/css/styles.css">
<link rel="stylesheet" href="design-system/css/components.css">
```

From a page inside `design-system/`, drop the `design-system/` prefix. Font files are referenced from the CSS as `../fonts/`.

## Tokens

`tokens.css` is generated from `source/tokens.json`. It contains all 282 variables.

Published tokens are the ones components should use:

- Semantic, 42 colour roles: `--surface-primary`, `--text-secondary`, `--colour-red-solid`, `--accent-default`, and the rest of that collection.
- Dimensions, 29 sizes: `--space-m`, `--radius-s`, `--border-width-default`, `--blur-m`, `--icon-s`, `--layout-desktop`, and the rest.

The css name is the Figma path: slashes become hyphens, then a `--` prefix. `border-width/default` is `--border-width-default`.

Hidden primitives (colour scales, raw spacing, type metrics, and so on) are base variables the published tokens reference with `var()`. They are marked `hiddenFromPublishing` in Figma. UI should not read `--neutral-100` or `--red-500` when a semantic token exists.

Twenty-one css names exist on both a primitive and a Dimensions token, and the numbers are not always equal. The published token keeps the public name. The primitive is stored as `--raw-<collection>-<name>` so its value is not discarded. `--space-l` is 24px. The hidden Spacing token `space/l` is 20px, kept as `--raw-spacing-space-l`. The list of differences is in [docs/spacing-and-dimensions.md](docs/spacing-and-dimensions.md).

Floats that are not integers are written with the JSON literal. `--font-line-height-ratio-tight` is `1.149999976158142`. Border width `1.5` stays `1.5px`. Opacity stays on a 0–100 percent scale (`40%`, `60%`).

```css
.card {
  background: var(--surface-primary);
  color: var(--text-primary);
  padding: var(--space-m);
  border-radius: var(--radius-m);
  border: var(--border-width-default) solid var(--border-default);
}
```

## Theming

Light semantic colours are on `:root` and on `[data-theme="light"]`. Dark semantic colours are on `[data-theme="dark"]`.

```html
<html data-theme="dark">
```

Remove the attribute to follow the operating system. The dark values are also applied under `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`, so an explicit light theme stays light when the system is dark.

A nested element can carry its own `data-theme`. The light block re-declares the full light set, so a light card inside a dark page gets the light semantic tokens back.

Semantic dark mode does not flip the colour scale. It points each role at a specific stop, and that stop is read from the Light scale. `text/primary` is `neutral/1000` (`#0F0F0F`) in Light and `neutral/50` (`#F7F7F7`) in Dark.

`[data-palette="style-sheet"]` is a different mode: the Colour collection's inverted Dark values, used by style-sheet frames in Figma. Do not combine it with `data-theme` on the same element. It overwrites the primitives semantic tokens alias.

## Typography

| Use | Face | CSS weight |
|---|---|---|
| Body/L, Body/M, Body/S, Caption, and `body` | PP Neue Montreal Text Book | 400 (`--font-weight-regular`) |
| Display, headings, Label, Overline, buttons | Neue Montreal Medium | 500 (`--font-weight-medium`) |
| Code | JetBrains Mono Regular | 400, 14px / 20px |

Classes are `.text-display-l` through `.text-display-s`, `.text-heading-h1` through `.text-heading-h6`, `.text-body-l`, `.text-body-m`, `.text-body-s`, `.text-label`, `.text-caption`, `.text-overline`, and `.text-code`.

The Text Book file reports OS/2 weight 350. The stylesheet still requests 400, because that is the token and the specified Book weight, and the `@font-face` descriptor maps 400 onto that file. `font-synthesis: none` keeps the browser from inventing a bold.

JetBrains Mono is not part of the Pangram Pangram set. It is the official 2.304 Regular woff2, self-hosted, with the OFL text in `design-system/fonts/JetBrainsMono-OFL.txt`. The code class falls back to `ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace` only if that file does not load.

Letter-spacing tokens are percentages of the font size (`-4%`, `-2%`, `0%`, `10%`), matching Figma. Overline is uppercase.

Full table: [docs/typography.md](docs/typography.md).

## Spacing, radius, and the other dimensions

Use the Dimensions tokens in the table in [docs/spacing-and-dimensions.md](docs/spacing-and-dimensions.md). In short:

- Space runs `none` 0, `2xs` 4, `xs` 8, `s` 12, `m` 16, `l` 24, `xl` 32, `2xl` 48, `3xl` 64. All px.
- Radius runs `none` 0, `s` 8, `m` 12, `l` 16, `full` 9999.
- Border width is `default` 1 and `strong` 2.
- Blur is `s` 8, `m` 16, `l` 40.
- Icons are `s` 16, `m` 20, `l` 24, `xl` 32.
- Layout frames are mobile 375, tablet 768, desktop 1440, max content 1280.
- Opacity is `disabled` 40% and `scrim` 60%.

## Grids

| Frame | Columns | Margin | Gutter |
|---|---:|---:|---:|
| Mobile 375 | 4 | 16 | 16 |
| Tablet 768 | 8 | 32 | 24 |
| Desktop 1440 | 12 | 80 | 24 |

`.grid-mobile`, `.grid-tablet`, and `.grid-desktop` are those frames. `.layout-grid` switches at 768px and 1440px. `.grid-baseline-8` is an 8px baseline. The desktop inner width is `--layout-max-content` (1280). Details: [docs/grids.md](docs/grids.md).

## Components

Tag and Progressive Blur are documented with copy-paste markup in [docs/components.md](docs/components.md).

Tag is `inline-flex`, centred, no border, no shadow. Sizes are `.tag--s`, `.tag--m`, `.tag--l`. Colours are `.tag--neutral` and `.tag--red` through `.tag--pink`. `.tag--no-icon` hides the icon. The label uses Label, Heading/H6, or Heading/H3 for S, M, and L.

```html
<span class="tag tag--s tag--blue">
  <svg class="tag__icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-check"></use></svg>
  <span class="tag__label text-label">Label</span>
</span>
```

Progressive blur frames need four `.progressive-blur__layer` elements and one `.progressive-blur__fade`. Soft tops are 375×96 and blur up to `--blur-m`. Strong tops are 375×160 and blur up to `--blur-l`. Fade colours are the literals `#F7F7F7` and `#0F0F0F`, not theme tokens. Thumbnail cards are 320×400 with radius `--radius-m`.

Elevation classes (`.elevation-s` … `.elevation-xl`) and overlay blur (`.blur-overlay-sm`, `.blur-overlay-md`, `.blur-overlay-lg`) are in [docs/elevation-and-blurs.md](docs/elevation-and-blurs.md). Overlay lg is radius 16, bound to `blur/m`, even though its Figma description says `blur/l`.

## Updating tokens from Figma

1. Export variables in the same JSON shape as `design-system/source/tokens.json`: each entry needs `collection`, `name`, `type`, `modes` (with `value`, `alias`, and `unit` where present), `hidden`, and `css`.
2. Replace `design-system/source/tokens.json`. Do not hand-edit `css/tokens.css`.
3. Regenerate and check:

```bash
npm run generate-tokens
npm run verify-tokens
```

`generate-tokens` rewrites `design-system/css/tokens.css`. `verify-tokens` parses that file, resolves every `var()` chain, and compares the result to the JSON. It checks Light, Dark, the `prefers-color-scheme` copy of Dark, the style-sheet palette, units, and alias targets. The count must stay 282, with 42 semantic and 29 dimension tokens, unless the file itself gains or loses variables. Then update this README and the docs tables in the same change.

Text styles and effects are not variables. If those change in Figma, update `source/styles.json` and the matching rules in `styles.css` or `components.css`. Keep percent letter-spacing and 8-digit shadow colours as exported.

Do not round a value to "clean it up". Do not rename `--colour-red-solid` to `--color-red-solid`. British spelling is the Figma path.

## Verification

```bash
npm run verify-tokens
```

Success prints `ok 282 tokens (42 semantic, 29 dimensions, 211 primitives)`. Any mismatch prints the property, the mode, and the expected value, and exits 1. `npm run build` runs that check and also fails if the body face is not `PPNeueMontrealText-Book.woff2`, if JetBrains Mono is missing, or if a Google Fonts URL appears in `fonts.css`.

## Fonts and licenses

PP Neue Montreal, including the Text Book cut, is licensed from Pangram Pangram and is not redistributable. The files are in this private portfolio so the site can self-host them. The MIT license in [LICENSE](LICENSE) does not cover them. Read [design-system/fonts/LICENSE-NOTE](design-system/fonts/LICENSE-NOTE) before copying a font anywhere.

JetBrains Mono is SIL Open Font License. The license text shipped with the 2.304 release is [design-system/fonts/JetBrainsMono-OFL.txt](design-system/fonts/JetBrainsMono-OFL.txt).

## Preview

`design-system/preview.html` shows semantic swatches, the type ramp, space and radius, every Tag colour and size, status and category tags, elevation, overlay blur, progressive blur in light and dark, thumbnails, and the three grids. Use the Light, Dark, and System controls, or the `theme` query parameter, to check both themes.
