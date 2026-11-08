# Spacing and dimensions

The 29 Dimensions tokens are the public spacing, radius, border, blur, opacity, icon, and layout sizes. Their css names are the Figma paths: `--space-m`, `--radius-s`, `--border-width-default`, `--blur-m`, `--icon-s`, `--layout-desktop`.

Each one aliases a hidden primitive. The published value is the alias target's value, which is not always the primitive that shares the same path.

## Published tokens

| Token | CSS | Value | Alias |
|---|---|---|---|
| `space/none` | `--space-none` | `0px` | `Spacing:space/none` |
| `space/2xs` | `--space-2xs` | `4px` | `Spacing:space/3xs` |
| `space/xs` | `--space-xs` | `8px` | `Spacing:space/xs` |
| `space/s` | `--space-s` | `12px` | `Spacing:space/s` |
| `space/m` | `--space-m` | `16px` | `Spacing:space/m` |
| `space/l` | `--space-l` | `24px` | `Spacing:space/xl` |
| `space/xl` | `--space-xl` | `32px` | `Spacing:space/2xl` |
| `space/2xl` | `--space-2xl` | `48px` | `Spacing:space/4xl` |
| `space/3xl` | `--space-3xl` | `64px` | `Spacing:space/6xl` |
| `radius/none` | `--radius-none` | `0px` | `Radius:radius/none` |
| `radius/s` | `--radius-s` | `8px` | `Radius:radius/m` |
| `radius/m` | `--radius-m` | `12px` | `Radius:radius/l` |
| `radius/l` | `--radius-l` | `16px` | `Radius:radius/xl` |
| `radius/full` | `--radius-full` | `9999px` | `Radius:radius/full` |
| `border-width/default` | `--border-width-default` | `1px` | `Border width:border-width/s` |
| `border-width/strong` | `--border-width-strong` | `2px` | `Border width:border-width/l` |
| `blur/s` | `--blur-s` | `8px` | `Blur:blur/s` |
| `blur/m` | `--blur-m` | `16px` | `Blur:blur/m` |
| `blur/l` | `--blur-l` | `40px` | `Blur:blur/xl` |
| `opacity/disabled` | `--opacity-disabled` | `40%` | `Opacity:opacity/40` |
| `opacity/scrim` | `--opacity-scrim` | `60%` | `Opacity:opacity/60` |
| `icon/s` | `--icon-s` | `16px` | `Icon size:icon/s` |
| `icon/m` | `--icon-m` | `20px` | `Icon size:icon/m` |
| `icon/l` | `--icon-l` | `24px` | `Icon size:icon/l` |
| `icon/xl` | `--icon-xl` | `32px` | `Icon size:icon/xl` |
| `layout/mobile` | `--layout-mobile` | `375px` | `Grid:grid/breakpoint/mobile` |
| `layout/tablet` | `--layout-tablet` | `768px` | `Grid:grid/breakpoint/tablet` |
| `layout/desktop` | `--layout-desktop` | `1440px` | `Grid:grid/breakpoint/desktop` |
| `layout/max-content` | `--layout-max-content` | `1280px` | `Grid:grid/max-content/desktop` |

Opacity tokens are 0–100 percent, matching the export. `opacity: var(--opacity-disabled)` is valid CSS (40%).

## Names that exist twice

Twenty-one css names are used by both a hidden primitive and a Dimensions token. The Dimensions token keeps `--space-l`, `--radius-s`, `--blur-l`, and the rest. The primitive is a private variable `--raw-<collection>-<css-body>`, for example `--raw-spacing-space-l: 20px`.

These published values differ from the primitive of the same name. Use the published one in UI.

| Published token | Published value | Hidden primitive with the same css name |
|---|---|---|
| `space/2xs` | 4px | Spacing `space/2xs` is 6px |
| `space/l` | 24px | Spacing `space/l` is 20px |
| `space/xl` | 32px | Spacing `space/xl` is 24px |
| `space/2xl` | 48px | Spacing `space/2xl` is 32px |
| `space/3xl` | 64px | Spacing `space/3xl` is 40px |
| `radius/s` | 8px | Radius `radius/s` is 4px |
| `radius/m` | 12px | Radius `radius/m` is 8px |
| `radius/l` | 16px | Radius `radius/l` is 12px |
| `blur/l` | 40px | Blur `blur/l` is 24px |

The other shared names (`space/none`, `space/xs`, `space/s`, `space/m`, the matching radii `none` and `full`, the four icon sizes, `blur/s`, `blur/m`) happen to be the same number. They are still split so the published custom property is the one components read.

Hidden steps that do not collide keep their css names: `--space-3xs` is 4px, `--space-4xl` is 48px, `--radius-xl` is 16px, `--blur-xl` is 40px, `--border-width-m` is 1.5px. Tag icon strokes of 1.5, 1.75, and 2 are component spec, not these border tokens. 1.75 is not a token.

## Example

```css
.card {
  padding: var(--space-m);
  border-radius: var(--radius-m);
  border: var(--border-width-default) solid var(--border-default);
  gap: var(--space-s);
}

.icon {
  width: var(--icon-m);
  height: var(--icon-m);
}
```

`layout/max-content` (1280) is the desktop frame (1440) minus two 80px margins. The grid classes use that relationship. See [Grids](grids.md).
