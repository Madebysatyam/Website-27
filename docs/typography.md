# Typography

Sixteen text styles are classes in `design-system/css/styles.css`. The metrics are the Figma styles. Sizes and line heights are the bound typography tokens. Letter-spacing is a percent of font size, stored on the letter-spacing tokens (`-4%`, `-2%`, `0%`, `10%`).

## Faces

| Role | CSS `font-family` | Weight | File |
|---|---|---|---|
| Body/L, Body/M, Body/S, Caption | `"PP Neue Montreal Text"` | 400 Book | `PPNeueMontrealText-Book.woff2` (otf kept) |
| Display, Heading, Label, Overline | `"Neue Montreal"` | 500 Medium | `PPNeueMontreal-Medium.woff2` (otf kept) |
| Code | `"JetBrains Mono"` | 400 Regular | `JetBrainsMono-Regular.woff2` |
| Umbrella token `font/family/sans` only | `"PP Neue Montreal"` | 400 Regular | `PPNeueMontreal-Regular.woff2` |

`PPNeueMontreal-Book` is the Book cut of family "PP Neue Montreal". It is not "PP Neue Montreal Text". Body and caption do not use it.

The Text Book file's OS/2 `usWeightClass` is 350. The design token `font/weight/regular` is 400, and Book styles are specified at 400, so `@font-face` declares `font-weight: 400`. The browser uses the file as-is. `font-synthesis: none` is set so the Book file is not faux-bolded into Medium. Medium styles use the other family.

Neue Montreal Medium's name-table family is "Neue Montreal", style "Medium", full name "Neue Montreal Medium", `usWeightClass` 500.

JetBrains Mono was not in the designer's archive. The Code style asks for JetBrains Mono Regular at 14px / 20px. The file is the official Regular woff2 from the JetBrains Mono 2.304 release, weight 400. It is self-hosted. The class adds a fallback stack after the token:

```css
font-family: var(--font-family-mono), ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
```

The fallback is only reached if the woff2 fails to load. The license is `design-system/fonts/JetBrainsMono-OFL.txt`.

`body` uses the text family at `font/weight/regular`, size `font/size/m`, line-height `font/line-height/m`. Headings and buttons use Neue Montreal at `font/weight/medium` so unclassed headings do not synthesise a bold.

## Styles

| Style | Class | Family | Weight | Size / line | Tracking | Case |
|---|---|---|---|---|---|---|
| Display/L | `.text-display-l` | Neue Montreal Medium | 500 | 72 / 80 | -4% | original |
| Display/M | `.text-display-m` | Neue Montreal Medium | 500 | 60 / 68 | -4% | original |
| Display/S | `.text-display-s` | Neue Montreal Medium | 500 | 48 / 56 | -2% | original |
| Heading/H1 | `.text-heading-h1` | Neue Montreal Medium | 500 | 36 / 44 | -2% | original |
| Heading/H2 | `.text-heading-h2` | Neue Montreal Medium | 500 | 30 / 38 | -2% | original |
| Heading/H3 | `.text-heading-h3` | Neue Montreal Medium | 500 | 24 / 32 | -2% | original |
| Heading/H4 | `.text-heading-h4` | Neue Montreal Medium | 500 | 20 / 28 | 0 | original |
| Heading/H5 | `.text-heading-h5` | Neue Montreal Medium | 500 | 18 / 28 | 0 | original |
| Heading/H6 | `.text-heading-h6` | Neue Montreal Medium | 500 | 16 / 24 | 0 | original |
| Body/L | `.text-body-l` | PP Neue Montreal Text Book | 400 | 18 / 28 | 0 | original |
| Body/M | `.text-body-m` | PP Neue Montreal Text Book | 400 | 16 / 24 | 0 | original |
| Body/S | `.text-body-s` | PP Neue Montreal Text Book | 400 | 14 / 20 | 0 | original |
| Label | `.text-label` | Neue Montreal Medium | 500 | 14 / 20 | 0 | original |
| Caption | `.text-caption` | PP Neue Montreal Text Book | 400 | 12 / 16 | 0 | original |
| Overline | `.text-overline` | Neue Montreal Medium | 500 | 12 / 16 | 10% | uppercase |
| Code | `.text-code` | JetBrains Mono Regular | 400 | 14 / 20 | 0 | original |

Paragraph spacing on every style is 0. The classes set `margin: 0`.

Tracking tokens:

| Token | Value |
|---|---|
| `--font-letter-spacing-tighter` | -4% |
| `--font-letter-spacing-tight` | -2% |
| `--font-letter-spacing-normal` | 0% |
| `--font-letter-spacing-wide` | 2% |
| `--font-letter-spacing-wider` | 5% |
| `--font-letter-spacing-widest` | 10% |

Line-height ratios are unitless and kept at the exported floats. `--font-line-height-ratio-tight` is `1.149999976158142`, not 1.15. The text styles use the pixel line-height tokens, not these ratios.

## Example

```html
<p class="text-overline">Section</p>
<h1 class="text-display-s">Title in Medium</h1>
<p class="text-body-l">Reading text in PP Neue Montreal Text Book.</p>
<p class="text-code">const size = 14;</p>
```

Tag sizes borrow these styles: S uses Label, M uses Heading/H6, L uses Heading/H3.
