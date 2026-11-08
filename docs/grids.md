# Grids

Four grid styles are in the export. Three are column grids at fixed frames. One is an 8px baseline.

| Style | Frame | Columns | Margin (offset) | Gutter | Token hooks |
|---|---:|---:|---:|---:|---|
| Grid/Mobile | 375 | 4 | 16 | 16 | `--layout-mobile`, `--grid-columns-mobile`, `--grid-margin-mobile`, `--grid-gutter-mobile` |
| Grid/Tablet | 768 | 8 | 32 | 24 | `--layout-tablet`, `--grid-columns-tablet`, `--grid-margin-tablet`, `--grid-gutter-tablet` |
| Grid/Desktop | 1440 | 12 | 80 | 24 | `--layout-desktop`, `--grid-columns-desktop`, `--grid-margin-desktop`, `--grid-gutter-desktop` |
| Grid/Baseline 8 | — | — | — | 8px section | `--grid-baseline-unit` |

Column count, margin, and gutter are the hidden Grid tokens. The frame width is the published layout token, which aliases the breakpoint token. Desktop content inside the margins is 1440 − 160 = 1280, which is `--layout-max-content`.

Figma's column grid is `STRETCH`: the offset is the side margin, columns share the remaining width, and the gutter sits between columns. The CSS frames do the same with `padding-inline` and `column-gap`.

```css
.grid-mobile {
  width: var(--layout-mobile);
  display: grid;
  grid-template-columns: repeat(var(--grid-columns-mobile), minmax(0, 1fr));
  column-gap: var(--grid-gutter-mobile);
  padding-inline: var(--grid-margin-mobile);
}
```

`.grid-tablet` and `.grid-desktop` follow the same pattern at 768 and 1440. They are fixed frames, so a desktop frame scrolls if the viewport is narrower. That matches the artboard rather than shrinking the margin.

`.layout-grid` is the responsive page grid. It uses the mobile tokens by default, the tablet tokens from `768px`, and the desktop tokens from `1440px`. Media queries cannot read custom properties in current browsers, so the breakpoints are the literal token values `768px` and `1440px`. `max-width` is `--layout-desktop`.

```html
<div class="layout-grid">
  <div style="grid-column: 1 / -1">Full width of the column area</div>
</div>
```

## Baseline

`.grid-baseline-8` paints a 1px line every `--grid-baseline-unit` (8px). The line colour is the style colour `#3380FF14`, not a semantic token.

The column style colour in Figma is `#FF334D1A`. It is not painted by the layout classes. The preview cells use `colour/blue/tint` so the columns are visible.
