# Elevation and blurs

These are effect styles from `styles.json`, not Semantic or Dimensions variables. The blur *radius* they bind is a Dimensions token. The shadow colours are literal 8-digit hex (`#RRGGBBAA`).

## Elevation

| Style | Class | `box-shadow` |
|---|---|---|
| Elevation/s | `.elevation-s` | `0 1px 2px 0 #0F12170F` |
| Elevation/m | `.elevation-m` | `0 4px 8px -2px #0F121714, 0 2px 4px -2px #0F12170A` |
| Elevation/l | `.elevation-l` | `0 12px 24px -4px #0F12171A, 0 4px 8px -2px #0F12170A` |
| Elevation/xl | `.elevation-xl` | `0 24px 48px -12px #0F12172E` |

Order matches the Figma effect list. The same strings are custom properties `--elevation-s` through `--elevation-xl` on `:root`. They are not theme-specific. On a dark surface the light-tinted shadow is faint. The hex is not rewritten per theme.

```html
<div class="elevation-m">Panel</div>
```

## Overlay blur

| Style | Class | Radius | Bound token |
|---|---|---:|---|
| Blur/Overlay/sm | `.blur-overlay-sm` | 8 | `--blur-s` |
| Blur/Overlay/md | `.blur-overlay-md` | 16 | `--blur-m` |
| Blur/Overlay/lg | `.blur-overlay-lg` | 16 | `--blur-m` |

`Blur/Overlay/lg` is described as a modal scrim at `blur/l`, but the effect radius is 16 and it is bound to Dimensions `blur/m`. The class uses 16. Published `--blur-l` is 40 and is not this effect.

```css
.sheet {
  -webkit-backdrop-filter: blur(var(--blur-m));
  backdrop-filter: blur(var(--blur-m));
}
```

## Progressive blur

| Style | Kind | Radius | Direction |
|---|---|---:|---|
| Blur/Progressive/Top/Soft | background | 0 → 16 (`--blur-m`) | strongest at the top (`y` 1 → 0) |
| Blur/Progressive/Top/Strong | background | 0 → 40 (`--blur-l`) | strongest at the top |
| Blur/Progressive/Bottom/Soft | background | 0 → 16 | strongest at the bottom (`y` 0 → 1) |
| Blur/Progressive/Bottom/Strong | background | 0 → 40 | strongest at the bottom |
| Blur/Progressive/Thumbnail/Soft | layer | 0 → 16 | starts at 75% of the height |
| Blur/Progressive/Thumbnail/Strong | layer | 0 → 16 | starts at 60% of the height |

The strong thumbnail description says `blur/l` 24px. The effect radius is 16, bound to `blur/m`. The component uses 16. The start offset in the raw file is `0.6000000238418579`, which is the float32 form of 0.6, so the mask starts at 60%.

CSS has no progressive backdrop blur. Top and bottom use four stacked layers whose radii are 25%, 50%, 75%, and 100% of the effect radius, masked so the stronger layers sit at the strong edge. The 100% layer is `blur(var(--blur-m))` or `blur(var(--blur-l))`. Thumbnail uses `filter: blur(var(--blur-m))` on a masked copy of the artwork, and masks the sharp copy out of that same region.

Fade rectangles are documented with the components, because the gradient colours are literals (`#F7F7F7` / `#0F0F0F`), not variables.
