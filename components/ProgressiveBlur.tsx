export type BlurEdge = "top" | "bottom";
export type BlurIntensity = "soft" | "strong";
export type BlurMode = "light" | "dark";

export function ProgressiveBlur({
  edge,
  intensity,
  mode,
}: {
  edge: BlurEdge;
  intensity: BlurIntensity;
  mode?: BlurMode;
}) {
  const classes = [
    "progressive-blur",
    `progressive-blur--${edge}`,
    `progressive-blur--${intensity}`,
  ];
  if (mode) classes.push(`progressive-blur--${mode}`);

  return (
    <div className={classes.join(" ")}>
      <div className="progressive-blur__layer" />
      <div className="progressive-blur__layer" />
      <div className="progressive-blur__layer" />
      <div className="progressive-blur__layer" />
      <div className="progressive-blur__fade" />
    </div>
  );
}

function ThumbnailArt() {
  return (
    <>
      <div className="thumbnail-blur__art" />
      <ol className="thumbnail-blur__rows">
        {Array.from({ length: 9 }, (_, index) => (
          <li key={index} className="text-body-s">
            Thumbnail content row {index + 1}
          </li>
        ))}
      </ol>
    </>
  );
}

export function ThumbnailBlur({
  intensity,
  mode,
  caption = "Card caption",
}: {
  intensity: BlurIntensity;
  mode?: BlurMode;
  caption?: string;
}) {
  const classes = ["thumbnail-blur", `thumbnail-blur--${intensity}`];
  if (mode) classes.push(`thumbnail-blur--${mode}`);

  return (
    <article className={classes.join(" ")}>
      <div className="thumbnail-blur__sharp">
        <ThumbnailArt />
      </div>
      <div className="thumbnail-blur__blur" aria-hidden="true">
        <ThumbnailArt />
      </div>
      <div className="thumbnail-blur__fade" />
      <p className="thumbnail-blur__caption text-caption">{caption}</p>
    </article>
  );
}
