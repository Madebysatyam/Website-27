# Colours

Published colour tokens are the 42 variables in the Semantic collection. Product UI, including Tag, uses these names. It does not use `neutral/100` or `red/500` directly.

CSS names are the Figma path with `/` replaced by `-` and a `--` prefix. `surface/primary` is `--surface-primary`. `colour/red/solid` is `--colour-red-solid`.

## How a value is chosen

Each semantic token aliases one stop in the Colour collection. The resolved hex is that stop's **Light** value, in both UI themes. Dark mode does not invert the primitive. It points at a different stop.

`surface/secondary` is `neutral/100` in Light (`#E3E3E3`) and `neutral/950` in Dark (`#232323`). Both hexes are the Light-scale values of those stops.

The Colour collection also has a Dark mode. That mode is an inverted scale used by style-sheet frames. It is exposed only on `[data-palette="style-sheet"]`. Do not set that attribute on `<html>` or on a themed component. Semantic aliases read the Light-scale primitives, and the style-sheet selector overwrites those primitives.

Light values live on `:root` and on `[data-theme="light"]`, so a nested light panel can sit inside a dark page. Dark semantic overrides live on `[data-theme="dark"]`. The same overrides are repeated for `@media (prefers-color-scheme: dark)` on `:root:not([data-theme="light"])`. An explicit `data-theme` wins over the system preference.

`overlay/scrim` is the opaque colour `#0F0F0F` in both themes. The 60% strength is the separate dimension token `--opacity-scrim`. Apply it at the use site (`opacity` or an alpha), do not bake it into the colour token.

## Semantic tokens

| Token | CSS | Light | Dark | Alias light | Alias dark |
|---|---|---|---|---|---|
| `surface/primary` | `--surface-primary` | `#FFFFFF` | `#000000` | `Colour:base/white` | `Colour:base/black` |
| `surface/secondary` | `--surface-secondary` | `#E3E3E3` | `#232323` | `Colour:neutral/100` | `Colour:neutral/950` |
| `surface/tertiary` | `--surface-tertiary` | `#D0D0D0` | `#383838` | `Colour:neutral/200` | `Colour:neutral/900` |
| `surface/inverse` | `--surface-inverse` | `#383838` | `#E3E3E3` | `Colour:neutral/900` | `Colour:neutral/100` |
| `overlay/scrim` | `--overlay-scrim` | `#0F0F0F` | `#0F0F0F` | `Colour:neutral/1000` | `Colour:neutral/1000` |
| `text/primary` | `--text-primary` | `#0F0F0F` | `#F7F7F7` | `Colour:neutral/1000` | `Colour:neutral/50` |
| `text/secondary` | `--text-secondary` | `#4F4F4F` | `#D0D0D0` | `Colour:neutral/800` | `Colour:neutral/200` |
| `text/tertiary` | `--text-tertiary` | `#666666` | `#ABABAB` | `Colour:neutral/700` | `Colour:neutral/400` |
| `text/disabled` | `--text-disabled` | `#ABABAB` | `#7F7F7F` | `Colour:neutral/400` | `Colour:neutral/600` |
| `text/inverse` | `--text-inverse` | `#F7F7F7` | `#0F0F0F` | `Colour:neutral/50` | `Colour:neutral/1000` |
| `border/strong` | `--border-strong` | `#BDBDBD` | `#4F4F4F` | `Colour:neutral/300` | `Colour:neutral/800` |
| `border/default` | `--border-default` | `#D0D0D0` | `#383838` | `Colour:neutral/200` | `Colour:neutral/900` |
| `border/subtle` | `--border-subtle` | `#E3E3E3` | `#232323` | `Colour:neutral/100` | `Colour:neutral/950` |
| `colour/red/solid` | `--colour-red-solid` | `#FF6E6B` | `#FF6E6B` | `Colour:red/500` | `Colour:red/500` |
| `colour/red/tint` | `--colour-red-tint` | `#FFDCD9` | `#7D0013` | `Colour:red/100` | `Colour:red/900` |
| `colour/red/text` | `--colour-red-text` | `#A6001D` | `#FFAAA4` | `Colour:red/800` | `Colour:red/300` |
| `colour/red/on` | `--colour-red-on` | `#56000A` | `#56000A` | `Colour:red/950` | `Colour:red/950` |
| `colour/orange/solid` | `--colour-orange-solid` | `#FF8F5C` | `#FF8F5C` | `Colour:orange/500` | `Colour:orange/500` |
| `colour/orange/tint` | `--colour-orange-tint` | `#FFE2D5` | `#732B00` | `Colour:orange/100` | `Colour:orange/900` |
| `colour/orange/text` | `--colour-orange-text` | `#9A3C00` | `#FFBA9D` | `Colour:orange/800` | `Colour:orange/300` |
| `colour/orange/on` | `--colour-orange-on` | `#732B00` | `#732B00` | `Colour:orange/900` | `Colour:orange/900` |
| `colour/yellow/solid` | `--colour-yellow-solid` | `#FFE95C` | `#FFE95C` | `Colour:yellow/500` | `Colour:yellow/500` |
| `colour/yellow/tint` | `--colour-yellow-tint` | `#FFF6BB` | `#5F5400` | `Colour:yellow/100` | `Colour:yellow/900` |
| `colour/yellow/text` | `--colour-yellow-text` | `#5F5400` | `#FFF08F` | `Colour:yellow/900` | `Colour:yellow/300` |
| `colour/yellow/on` | `--colour-yellow-on` | `#5F5400` | `#5F5400` | `Colour:yellow/900` | `Colour:yellow/900` |
| `colour/green/solid` | `--colour-green-solid` | `#6BFF91` | `#6BFF91` | `Colour:green/500` | `Colour:green/500` |
| `colour/green/tint` | `--colour-green-tint` | `#D2FFD9` | `#006127` | `Colour:green/100` | `Colour:green/900` |
| `colour/green/text` | `--colour-green-text` | `#006127` | `#A7FFB8` | `Colour:green/900` | `Colour:green/300` |
| `colour/green/on` | `--colour-green-on` | `#006127` | `#006127` | `Colour:green/900` | `Colour:green/900` |
| `colour/blue/solid` | `--colour-blue-solid` | `#5CA5FF` | `#5CA5FF` | `Colour:blue/500` | `Colour:blue/500` |
| `colour/blue/tint` | `--colour-blue-tint` | `#D5E7FF` | `#003F7E` | `Colour:blue/100` | `Colour:blue/900` |
| `colour/blue/text` | `--colour-blue-text` | `#0055A8` | `#9BC7FF` | `Colour:blue/800` | `Colour:blue/300` |
| `colour/blue/on` | `--colour-blue-on` | `#002957` | `#002957` | `Colour:blue/950` | `Colour:blue/950` |
| `colour/purple/solid` | `--colour-purple-solid` | `#AB6BFF` | `#AB6BFF` | `Colour:purple/500` | `Colour:purple/500` |
| `colour/purple/tint` | `--colour-purple-tint` | `#E7DBFF` | `#4F008C` | `Colour:purple/100` | `Colour:purple/900` |
| `colour/purple/text` | `--colour-purple-text` | `#7F30D0` | `#C8A7FF` | `Colour:purple/700` | `Colour:purple/300` |
| `colour/purple/on` | `--colour-purple-on` | `#370063` | `#370063` | `Colour:purple/950` | `Colour:purple/950` |
| `colour/pink/solid` | `--colour-pink-solid` | `#FF6BBA` | `#FF6BBA` | `Colour:pink/500` | `Colour:pink/500` |
| `colour/pink/tint` | `--colour-pink-tint` | `#FFDBEB` | `#78004D` | `Colour:pink/100` | `Colour:pink/900` |
| `colour/pink/text` | `--colour-pink-text` | `#A10069` | `#FFA9D2` | `Colour:pink/800` | `Colour:pink/300` |
| `colour/pink/on` | `--colour-pink-on` | `#520033` | `#520033` | `Colour:pink/950` | `Colour:pink/950` |
| `accent/default` | `--accent-default` | `#5CA5FF` | `#5CA5FF` | `Colour:blue/500` | `Colour:blue/500` |

`accent/default` and `colour/blue/solid` are the same stop, `#5CA5FF`, in both themes.

Hue solids (`*/solid`) and the `*/on` colours do not change between Light and Dark. Tints and text colours do.

## Usage

```css
.panel {
  background: var(--surface-primary);
  color: var(--text-primary);
  border: var(--border-width-default) solid var(--border-default);
}

.scrim {
  background: var(--overlay-scrim);
  opacity: var(--opacity-scrim);
}
```

Tag maps a hue like this: background `var(--colour-red-tint)`, label and icon `var(--colour-red-text)`, duo-tone shape `var(--colour-red-solid)`. Neutral tags use `surface/secondary`, `text/secondary`, and `surface/tertiary` instead of a hue.

## Contrast

Ratios use the WCAG relative-luminance formula on the resolved hexes. They describe the tokens as paired below. They are not a reason to change a token.

WCAG 2 AA is 4.5:1 for normal text and 3:1 for large text (18px and up at regular weight, or 14px bold). Label is 14px Medium (500), which is normal text. Heading/H3 at 24px Medium is large text.

| Pair | Light | Dark |
|---|---:|---:|
| `text/primary` on `surface/primary` | 19.17 | 19.60 |
| `text/secondary` on `surface/primary` | 8.19 | 13.62 |
| `text/tertiary` on `surface/primary` | 5.74 | 9.14 |
| `text/disabled` on `surface/primary` | 2.30 | 5.24 |
| `text/inverse` on `surface/inverse` | 10.95 | 14.94 |
| `text/primary` on `surface/secondary` | 14.94 | 14.67 |
| `text/secondary` on `surface/secondary` | 6.38 | 10.19 |
| `text/secondary` on `surface/tertiary` | 5.31 | 7.60 |

`text/disabled` on `surface/primary` in Light is below 4.5:1. That is the exported pair. Disabled text is not bumped to a darker neutral.

Tag label on tag background (`*/text` on `*/tint`, and neutral `text/secondary` on `surface/secondary`):

| Tag | Light | Dark |
|---|---:|---:|
| neutral | 6.38 | 10.19 |
| red | 6.25 | 6.13 |
| orange | 5.66 | 6.15 |
| yellow | 6.95 | 6.58 |
| green | 6.95 | 6.44 |
| blue | 5.83 | 5.97 |
| purple | 4.94 | 6.09 |
| pink | 6.10 | 6.22 |

Purple in Light is the lowest tag pair, at 4.94:1, still above 4.5:1. Yellow's text stop is the dark olive `#5F5400` on `#FFF6BB` in Light, which is why that pair passes.

The thumbnail caption is not a semantic token. It is `#111827` in Light and `#FFFFFF` in Dark, painted on a gradient, so a single ratio would not describe it.

## Primitives

The other 98 colour variables (neutral, red, orange, yellow, green, blue, purple, pink, and `base/white` / `base/black`) are `hiddenFromPublishing`. They exist so semantic tokens can reference them. Their css names are unchanged (`--neutral-50`, `--red-500`, `--base-white`). Steps run from 50 through 1000. Mid stops 500 and 600 are the same hex in Light and Dark; the ends of each scale swap in the style-sheet palette.
