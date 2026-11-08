# Components

Tag and Progressive Blur are CSS classes in `design-system/css/components.css`. The Next.js app wraps those classes in `components/Tag.tsx` and `components/ProgressiveBlur.tsx`. Colour, spacing, radius, icon size, and blur radius come from Semantic and Dimensions tokens. Strokes, frame sizes, and fade hexes come from the component spec.

```tsx
<Tag size="m" colour="green" label="Success" icon="check" />
<ProgressiveBlur edge="top" intensity="soft" mode="light" />
<ThumbnailBlur intensity="strong" mode="dark" />
```

## Tag

A tag is a horizontal row, vertically centred: icon, then label. It hugs content. It has no border and no shadow.

| Size | Padding x | Padding y | Gap | Radius | Icon | Stroke | Text style | Height |
|---|---|---|---|---|---|---|---|---|
| S | `--space-xs` (8) | `--space-2xs` (4) | `--space-2xs` (4) | `--radius-s` (8) | `--icon-s` (16) | 1.5 | Label | 28 |
| M | `--space-s` (12) | `--space-2xs` (4) | `--space-2xs` (4) | `--radius-m` (12) | `--icon-m` (20) | 1.75 | Heading/H6 | 32 |
| L | `--space-m` (16) | `--space-s` (12) | `--space-xs` (8) | `--radius-l` (16) | `--icon-xl` (32) | 2 | Heading/H3 | 56 |

Stroke widths are the spec numbers (1.5, 1.75, 2). They are applied with `vector-effect: non-scaling-stroke` so they stay those pixel widths when the 24×24 icon is scaled. 1.75 is not a border token.

| Colour class | Background | Text and glyph | Duo tint |
|---|---|---|---|
| `.tag--neutral` | `--surface-secondary` | `--text-secondary` | `--surface-tertiary` |
| `.tag--red` | `--colour-red-tint` | `--colour-red-text` | `--colour-red-solid` |
| `.tag--orange` | `--colour-orange-tint` | `--colour-orange-text` | `--colour-orange-solid` |
| `.tag--yellow` | `--colour-yellow-tint` | `--colour-yellow-text` | `--colour-yellow-solid` |
| `.tag--green` | `--colour-green-tint` | `--colour-green-text` | `--colour-green-solid` |
| `.tag--blue` | `--colour-blue-tint` | `--colour-blue-text` | `--colour-blue-solid` |
| `.tag--purple` | `--colour-purple-tint` | `--colour-purple-text` | `--colour-purple-solid` |
| `.tag--pink` | `--colour-pink-tint` | `--colour-pink-text` | `--colour-pink-solid` |

Outline icons use `stroke: currentColor` and `fill: none`. Duo icons paint the tint shape with `var(--tag-duo)` and the glyph with `currentColor`. `.tag--no-icon` hides the icon.

```html
<span class="tag tag--m tag--green">
  <svg class="tag__icon" viewBox="0 0 24 24" aria-hidden="true">
    <use href="#i-check"></use>
  </svg>
  <span class="tag__label text-heading-h6">Success</span>
</span>
```

The label class must match the size: `.text-label` for S, `.text-heading-h6` for M, `.text-heading-h3` for L. Default label copy is "Label". Default icon is check circle. `Show icon` defaults to true.

Status mapping:

| Status | Colour | Icon |
|---|---|---|
| Pending | orange | Alert |
| In progress | blue | Progress (dashed circle) |
| Submitted | purple | Send |
| In review | yellow | Review |
| Success | green | Check circle |
| Failed | red | X circle |
| Expired | neutral | Clock |

Category tags are size L:

| Category | Colour | Icon |
|---|---|---|
| Brand & Style | blue | Duo badge star |
| Compliance | green | Duo scroll |
| Content Safety | purple | Duo feather |
| Approval Trigger | neutral | Duo tap |

The preview sprite defines `#i-check`, `#i-alert`, `#i-progress`, `#i-send`, `#i-review`, `#i-x`, `#i-clock`, `#i-duo-star`, `#i-duo-scroll`, `#i-duo-feather`, and `#i-duo-tap`. They are 24×24 Lucide-style outlines. The Figma export did not include vector paths, so these are the stand-in glyphs for those names.

## Progressive Blur

Top and bottom are clipped frames with two layers: stacked backdrop blur, then a linear fade. The fade colours are literal. Light `#F7F7F7` (neutral/50). Dark `#0F0F0F` (neutral/1000). Alpha `99` hex is 60%. Alpha `D9` hex is 85%.

| Variant | Size | Blur | Fade |
|---|---|---|---|
| Top / Soft | 375 × 96 | 0 → `--blur-m` (16), strongest at top | top `#F7F7F799` → bottom `#F7F7F700` |
| Top / Strong | 375 × 160 | 0 → `--blur-l` (40), strongest at top | top `#F7F7F7D9` → bottom `#F7F7F700` |
| Bottom / Soft | 375 × 120 | 0 → 16, strongest at bottom | top `#F7F7F700` → bottom `#F7F7F799` |
| Bottom / Strong | 375 × 200 | 0 → 40, strongest at bottom | top `#F7F7F700` → bottom `#F7F7F7D9` |

Dark swaps `#F7F7F7` for `#0F0F0F` and keeps the same alphas. Width 375 is `--layout-mobile`. Heights are the component frames.

```html
<div class="progressive-blur progressive-blur--top progressive-blur--soft progressive-blur--light">
  <div class="progressive-blur__layer"></div>
  <div class="progressive-blur__layer"></div>
  <div class="progressive-blur__layer"></div>
  <div class="progressive-blur__layer"></div>
  <div class="progressive-blur__fade"></div>
</div>
```

Four layer elements are required. The nth-child rules set the ramp. `progressive-blur--dark` forces the dark fade. `progressive-blur--light` forces the light fade, including on a dark page. With neither class, the fade follows `data-theme`.

Place the frame over the content it should blur (`position: absolute` on a `position: relative` stage). The component itself is `pointer-events: none`.

## Thumbnail bottom

320 × 400, corner radius 12 (`--radius-m`), content clipped. The image frame is filled `#F7F7F7` in Light and `#0F0F0F` in Dark. A layer blur of 16px (`--blur-m`) runs from 75% of the height (soft) or 60% (strong) to the bottom. The sharp artwork is masked out of that region so the bottom is the blurred copy, not a blur stacked on sharp pixels.

The fade is a rectangle at the bottom, not full-bleed:

| Intensity | Fade size | Gradient |
|---|---|---|
| Soft | 320 × 100 | `#F7F7F700` → `#F7F7F799` |
| Strong | 320 × 160 | `#F7F7F700` → `#F7F7F7D9` |

The caption reads "Card caption". It sits above the fade. Colour is `#111827` in Light and `#FFFFFF` in Dark. The type class is `.text-caption`.

Placeholder art is nine ellipses plus nine lines ("Thumbnail content row 1" … "9"). The export has widths, heights, and fills, and no x/y. The preview places the circles so the blur has something to act on. Light fills, in order: `#FFE95C`, `#6BFF91`, `#5CA5FF`, `#AB6BFF`, `#FF6BBA`, `#FF6E6B`, `#FF8F5C`, `#FFE95C`, `#6BFF91`. Dark fills, in order: `#FF6BBA`, `#FF6E6B`, `#FF8F5C`, `#FFE95C`, `#6BFF91`, `#5CA5FF`, `#AB6BFF`, `#FF6BBA`, `#FF6E6B`. Row text stays `#111827` in both modes, as exported.

```html
<article class="thumbnail-blur thumbnail-blur--soft thumbnail-blur--light">
  <div class="thumbnail-blur__sharp">
    <div class="thumbnail-blur__art"></div>
  </div>
  <div class="thumbnail-blur__blur" aria-hidden="true">
    <div class="thumbnail-blur__art"></div>
  </div>
  <div class="thumbnail-blur__fade"></div>
  <p class="thumbnail-blur__caption text-caption">Card caption</p>
</article>
```

Repeat the artwork in both the sharp layer and the blurred layer. `aria-hidden` keeps the duplicate out of the accessibility tree.
