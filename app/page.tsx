export default function Home() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "36rem", textAlign: "center" }}>
        <p
          style={{
            margin: "0 0 0.75rem",
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--ink-muted)",
          }}
        >
          Madebysatyam
        </p>
        <h1
          style={{
            margin: "0 0 0.75rem",
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontWeight: 500,
          }}
        >
          Portfolio
        </h1>
        <p style={{ margin: 0, color: "var(--ink-muted)" }}>
          Next.js + React is ready. Build from here.
        </p>
      </div>
    </main>
  );
}
