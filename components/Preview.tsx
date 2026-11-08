"use client";

import { useEffect, useState } from "react";
import { ProgressiveBlur, ThumbnailBlur } from "./ProgressiveBlur";
import { Tag, tagColours } from "./Tag";

const colourTokens = [
  "surface-primary",
  "surface-secondary",
  "surface-tertiary",
  "surface-inverse",
  "overlay-scrim",
  "text-primary",
  "text-secondary",
  "text-tertiary",
  "text-disabled",
  "text-inverse",
  "border-strong",
  "border-default",
  "border-subtle",
  "colour-red-solid",
  "colour-red-tint",
  "colour-red-text",
  "colour-red-on",
  "colour-orange-solid",
  "colour-orange-tint",
  "colour-orange-text",
  "colour-orange-on",
  "colour-yellow-solid",
  "colour-yellow-tint",
  "colour-yellow-text",
  "colour-yellow-on",
  "colour-green-solid",
  "colour-green-tint",
  "colour-green-text",
  "colour-green-on",
  "colour-blue-solid",
  "colour-blue-tint",
  "colour-blue-text",
  "colour-blue-on",
  "colour-purple-solid",
  "colour-purple-tint",
  "colour-purple-text",
  "colour-purple-on",
  "colour-pink-solid",
  "colour-pink-tint",
  "colour-pink-text",
  "colour-pink-on",
  "accent-default",
] as const;

const spaces = ["2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl"] as const;

const radii = ["none", "s", "m", "l", "full"] as const;

const typeRows = [
  ["Display/L · Neue Montreal Medium · 72/80 · -4%", "text-display-l", "Display large"],
  ["Display/M · Neue Montreal Medium · 60/68 · -4%", "text-display-m", "Display medium"],
  ["Display/S · Neue Montreal Medium · 48/56 · -2%", "text-display-s", "Display small"],
  ["Heading/H1 · 36/44 · -2%", "text-heading-h1", "Heading one"],
  ["Heading/H2 · 30/38 · -2%", "text-heading-h2", "Heading two"],
  ["Heading/H3 · 24/32 · -2%", "text-heading-h3", "Heading three"],
  ["Heading/H4 · 20/28", "text-heading-h4", "Heading four"],
  ["Heading/H5 · 18/28", "text-heading-h5", "Heading five"],
  ["Heading/H6 · 16/24", "text-heading-h6", "Heading six"],
  ["Body/L · PP Neue Montreal Text Book · 18/28", "text-body-l", "Body large stays in Book, the text cut, at weight 400."],
  ["Body/M · PP Neue Montreal Text Book · 16/24", "text-body-m", "Body medium is the default reading size for this system."],
  ["Body/S · PP Neue Montreal Text Book · 14/20", "text-body-s", "Body small is Book as well, not Medium."],
  ["Label · Neue Montreal Medium · 14/20", "text-label", "Label"],
  ["Caption · PP Neue Montreal Text Book · 12/16", "text-caption", "Caption uses the text Book face."],
  ["Overline · Neue Montreal Medium · 12/16 · +10% · uppercase", "text-overline", "Overline"],
  ["Code · JetBrains Mono Regular · 14/20", "text-code", "il1O0 { font-weight: 400; }"],
] as const;

type ThemeChoice = "light" | "dark" | "system";

function currentTheme(): ThemeChoice {
  const value = document.documentElement.getAttribute("data-theme");
  return value === "light" || value === "dark" ? value : "system";
}

export function Preview() {
  const [theme, setTheme] = useState<ThemeChoice>("system");

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  function choose(next: ThemeChoice) {
    if (next === "system") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  }

  return (
    <>
      <header className="preview-header">
        <div className="preview-header__titles">
          <p className="text-overline">Madebysatyam-27</p>
          <p className="text-label">Design system preview</p>
        </div>
        <div className="theme-switch" role="group" aria-label="Colour theme">
          {(["light", "dark", "system"] as const).map((choice) => (
            <button
              key={choice}
              type="button"
              aria-pressed={theme === choice}
              onClick={() => choose(choice)}
            >
              {choice === "light" ? "Light" : choice === "dark" ? "Dark" : "System"}
            </button>
          ))}
        </div>
      </header>

      <main className="layout-grid preview-main">
        <section className="preview-section span-all" id="intro">
          <h1 className="text-display-s">Tokens, type, tags, blur.</h1>
          <p className="text-body-l lede">
            Body copy is PP Neue Montreal Text Book. Display, headings, labels, and overlines are Neue Montreal Medium. Code is self-hosted JetBrains Mono Regular.
          </p>
          <p className="text-code">const weight = 400; // JetBrains Mono Regular, 14/20</p>
        </section>

        <section className="preview-section span-all" id="colours">
          <div>
            <p className="text-overline">Semantic colour</p>
            <h2 className="text-heading-h2">42 published colour tokens</h2>
          </div>
          <div className="swatches">
            {colourTokens.map((name) => (
              <div key={name} className="swatch">
                <span className="swatch__chip" style={{ background: `var(--${name})` }} />
                <span className="swatch__meta">
                  <span className="text-label">{name.replaceAll("-", "/")}</span>
                  <span className="text-code">--{name}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="preview-section span-all" id="type">
          <div>
            <p className="text-overline">Typography</p>
            <h2 className="text-heading-h2">16 text styles</h2>
          </div>
          <div className="type-list">
            {typeRows.map(([meta, className, sample]) => (
              <div key={className} className="type-row">
                <p className="text-code type-meta">{meta}</p>
                <p className={className}>{sample}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="preview-section span-all" id="dimensions">
          <div>
            <p className="text-overline">Dimensions</p>
            <h2 className="text-heading-h2">Space and radius</h2>
          </div>
          <div className="space-row">
            {spaces.map((name) => (
              <div key={name} className="space-sample">
                <i style={{ width: `var(--space-${name})` }} />
                <span className="text-code">space/{name}</span>
              </div>
            ))}
          </div>
          <div className="radius-row">
            {radii.map((name) => (
              <div key={name} className="radius-sample" style={{ borderRadius: `var(--radius-${name})` }} />
            ))}
          </div>
          <p className="text-caption">
            radius/none, radius/s, radius/m, radius/l, radius/full. Bars above are space/2xs through space/3xl.
          </p>
        </section>

        <section className="preview-section span-all" id="tags">
          <div>
            <p className="text-overline">Tag</p>
            <h2 className="text-heading-h2">Colour × size</h2>
          </div>
          <div className="stack">
            {tagColours.map((colour) => (
              <Tag key={colour} size="s" colour={colour} />
            ))}
          </div>
          <div className="stack">
            {tagColours.map((colour) => (
              <Tag key={colour} size="m" colour={colour} />
            ))}
          </div>
          <div className="stack">
            {tagColours.map((colour) => (
              <Tag key={colour} size="l" colour={colour} />
            ))}
          </div>
          <h3 className="text-heading-h4">Status</h3>
          <div className="stack">
            <Tag size="m" colour="orange" label="Pending" icon="alert" />
            <Tag size="m" colour="blue" label="In progress" icon="progress" />
            <Tag size="m" colour="purple" label="Submitted" icon="send" />
            <Tag size="m" colour="yellow" label="In review" icon="review" />
            <Tag size="m" colour="green" label="Success" icon="check" />
            <Tag size="m" colour="red" label="Failed" icon="x" />
            <Tag size="m" colour="neutral" label="Expired" icon="clock" />
          </div>
          <h3 className="text-heading-h4">Category</h3>
          <div className="stack">
            <Tag size="l" colour="blue" label="Brand & Style" icon="duo-star" />
            <Tag size="l" colour="green" label="Compliance" icon="duo-scroll" />
            <Tag size="l" colour="purple" label="Content Safety" icon="duo-feather" />
            <Tag size="l" colour="neutral" label="Approval Trigger" icon="duo-tap" />
          </div>
          <Tag size="m" colour="blue" label="No icon" showIcon={false} />
        </section>

        <section className="preview-section span-all" id="elevation">
          <div>
            <p className="text-overline">Elevation</p>
            <h2 className="text-heading-h2">Shadows</h2>
          </div>
          <div className="elev-row">
            {(["s", "m", "l", "xl"] as const).map((step) => (
              <div key={step} className={`elev-card elevation-${step}`}>
                <span className="text-label">Elevation/{step}</span>
              </div>
            ))}
          </div>
          <h3 className="text-heading-h4">Overlay blur</h3>
          <div className="blur-overlay-row">
            {(["sm", "md", "lg"] as const).map((step) => (
              <div key={step} className="blur-overlay-card">
                <span className={`blur-overlay-${step} text-label`}>Blur/Overlay/{step}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="preview-section span-all" id="blurs">
          <div>
            <p className="text-overline">Progressive blur</p>
            <h2 className="text-heading-h2">Top, bottom, thumbnail</h2>
          </div>
          <div className="blur-board">
            <BlurStage edge="top" intensity="soft" mode="light" />
            <BlurStage edge="top" intensity="strong" mode="light" />
            <BlurStage edge="bottom" intensity="soft" mode="light" />
            <BlurStage edge="bottom" intensity="strong" mode="dark" />
          </div>
          <div className="thumb-board">
            <ThumbnailBlur intensity="soft" mode="light" />
            <ThumbnailBlur intensity="strong" mode="light" />
            <ThumbnailBlur intensity="soft" mode="dark" />
            <ThumbnailBlur intensity="strong" mode="dark" />
          </div>
        </section>

        <section className="preview-section span-all" id="grids">
          <div>
            <p className="text-overline">Grid</p>
            <h2 className="text-heading-h2">375, 768, 1440</h2>
          </div>
          <div className="grid-scroll">
            <GridFrame className="grid-mobile" count={4} label="Grid/Mobile · 4 · margin 16 · gutter 16" />
            <GridFrame className="grid-tablet" count={8} label="Grid/Tablet · 8 · margin 32 · gutter 24" />
            <GridFrame className="grid-desktop" count={12} label="Grid/Desktop · 12 · margin 80 · gutter 24 · inner 1280" />
          </div>
          <div className="grid-baseline-8 baseline-demo" aria-hidden="true" />
          <p className="text-caption">Baseline grid is 8px. The line colour is the style colour #3380FF14.</p>
        </section>
      </main>
    </>
  );
}

function BlurStage({
  edge,
  intensity,
  mode,
}: {
  edge: "top" | "bottom";
  intensity: "soft" | "strong";
  mode: "light" | "dark";
}) {
  return (
    <div className={mode === "dark" ? "blur-stage blur-stage--dark" : "blur-stage"}>
      <div className="blur-stage__content">
        {Array.from({ length: 12 }, (_, index) => (
          <p key={index} className="text-body-s">
            Sample line {index + 1} behind the blur.
          </p>
        ))}
      </div>
      <ProgressiveBlur edge={edge} intensity={intensity} mode={mode} />
    </div>
  );
}

function GridFrame({
  className,
  count,
  label,
}: {
  className: string;
  count: number;
  label: string;
}) {
  return (
    <div className="grid-frame">
      <p className="text-code">{label}</p>
      <div className={className}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="grid-cell" />
        ))}
      </div>
    </div>
  );
}
