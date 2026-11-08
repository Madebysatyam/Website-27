export const iconNames = [
  "check",
  "alert",
  "progress",
  "send",
  "review",
  "x",
  "clock",
  "duo-star",
  "duo-scroll",
  "duo-feather",
  "duo-tap",
] as const;

export type IconName = (typeof iconNames)[number];

const stroke = {
  fill: "none",
  stroke: "currentColor",
  vectorEffect: "non-scaling-stroke" as const,
};

export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="tag__icon" viewBox="0 0 24 24" aria-hidden="true">
      {name === "check" && (
        <>
          <circle cx="12" cy="12" r="10" {...stroke} />
          <path d="m9 12 2 2 4-4" {...stroke} />
        </>
      )}
      {name === "alert" && (
        <>
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" {...stroke} />
          <path d="M12 9v4" {...stroke} />
          <path d="M12 17h.01" {...stroke} />
        </>
      )}
      {name === "progress" && (
        <circle cx="12" cy="12" r="10" strokeDasharray="3.2 2.4" {...stroke} />
      )}
      {name === "send" && (
        <>
          <path d="m22 2-7 20-4-9-9-4Z" {...stroke} />
          <path d="M22 2 11 13" {...stroke} />
        </>
      )}
      {name === "review" && (
        <>
          <rect x="6" y="3.5" width="12" height="17" rx="2" {...stroke} />
          <path d="M9 8h6M9 12h6M9 16h3" {...stroke} />
        </>
      )}
      {name === "x" && (
        <>
          <circle cx="12" cy="12" r="10" {...stroke} />
          <path d="m15 9-6 6M9 9l6 6" {...stroke} />
        </>
      )}
      {name === "clock" && (
        <>
          <circle cx="12" cy="12" r="10" {...stroke} />
          <path d="M12 7v5l3 2" {...stroke} />
        </>
      )}
      {name === "duo-star" && (
        <>
          <path fill="var(--tag-duo)" stroke="none" d="M12 2.2 19.2 5v6.3c0 4.4-3 7.6-7.2 9.1C7.8 18.9 4.8 15.7 4.8 11.3V5L12 2.2z" />
          <path fill="currentColor" stroke="none" d="m12 7.2 1.15 2.33 2.57.37-1.86 1.81.44 2.56L12 13.06l-2.3 1.21.44-2.56-1.86-1.81 2.57-.37L12 7.2z" />
        </>
      )}
      {name === "duo-scroll" && (
        <>
          <path fill="var(--tag-duo)" stroke="none" d="M7 3.5h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" {...stroke} />
        </>
      )}
      {name === "duo-feather" && (
        <>
          <path fill="var(--tag-duo)" stroke="none" d="M20 4c-7.2.6-13 6.2-15.2 14.6 5.2-.8 9.4-4.2 12.2-9.2.8 3.2.2 6.2-1.2 8.6C18.2 13.2 20 8 20 4z" />
          <path d="M8 16.2c2.2-2.4 5.2-5.4 8.4-8" {...stroke} />
        </>
      )}
      {name === "duo-tap" && (
        <>
          <circle cx="12" cy="12" r="8" fill="var(--tag-duo)" stroke="none" />
          <circle cx="12" cy="12" r="3.25" {...stroke} />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
