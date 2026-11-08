import type { Metadata } from "next";
import "../design-system/css/fonts.css";
import "../design-system/css/tokens.css";
import "../design-system/css/styles.css";
import "../design-system/css/components.css";
import "../design-system/css/preview.css";

export const metadata: Metadata = {
  title: "Madebysatyam-27 — Design system",
  description: "Portfolio design system for Madebysatyam-27. Tokens, type, Tag, and Progressive Blur.",
};

const themeScript = `(function(){try{var t=new URLSearchParams(location.search).get("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
