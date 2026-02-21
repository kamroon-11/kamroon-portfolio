"use client";

const marqueeItems = [
  "Creative Development",
  "★",
  "UI/UX Design",
  "★",
  "Three.js",
  "★",
  "Motion Design",
  "★",
  "React",
  "★",
  "Full-Stack Engineering",
  "★",
  "Design Systems",
  "★",
  "Brand Identity",
  "★",
];

export default function MarqueeBanner() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div
      style={{
        borderTop: "3px solid var(--black)",
        borderBottom: "3px solid var(--black)",
        background: "var(--black)",
        padding: "14px 0",
        overflow: "hidden",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              color: item === "★" ? "var(--mustard)" : "var(--cream)",
              fontWeight: item === "★" ? 400 : 700,
              fontSize: item === "★" ? "16px" : "12px",
              letterSpacing: item === "★" ? "0" : "0.12em",
              textTransform: "uppercase",
              marginRight: "32px",
              whiteSpace: "nowrap",
              fontFamily:
                item === "★"
                  ? "inherit"
                  : "var(--font-space-grotesk), sans-serif",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
