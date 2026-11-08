import { Icon, type IconName } from "./icons";

export const tagColours = [
  "neutral",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
] as const;

export type TagColour = (typeof tagColours)[number];
export type TagSize = "s" | "m" | "l";

const labelClass: Record<TagSize, string> = {
  s: "text-label",
  m: "text-heading-h6",
  l: "text-heading-h3",
};

export function Tag({
  colour = "neutral",
  size = "s",
  label = "Label",
  icon = "check",
  showIcon = true,
}: {
  colour?: TagColour;
  size?: TagSize;
  label?: string;
  icon?: IconName;
  showIcon?: boolean;
}) {
  const classes = ["tag", `tag--${size}`, `tag--${colour}`];
  if (!showIcon) classes.push("tag--no-icon");

  return (
    <span className={classes.join(" ")}>
      {showIcon ? <Icon name={icon} /> : null}
      <span className={`tag__label ${labelClass[size]}`}>{label}</span>
    </span>
  );
}
