export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--black)",
        borderTop: "3px solid var(--mustard)",
        padding: "40px 48px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: "20px", color: "var(--cream)", letterSpacing: "-0.03em" }}>
          KRM<span style={{ color: "var(--mustard)" }}>.</span>
        </div>

        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Terms", "Sitemap"].map(link => (
            <span
              key={link}
              style={{
                fontFamily: "Courier New, monospace",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.35)",
                cursor: "none",
              }}
            >
              {link}
            </span>
          ))}
        </div>

        <div
          style={{
            fontFamily: "Courier New, monospace",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(245,240,232,0.3)",
          }}
        >
          © 2026 KARMAN — Built with Depth
        </div>
      </div>
    </footer>
  );
}
