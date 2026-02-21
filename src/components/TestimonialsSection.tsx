"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "Karman doesn't just build websites — he architects digital experiences. The 3D portfolio system he built for us became our most talked-about asset at every industry event.",
    name: "Alex Chen",
    role: "CEO, Apex Studio",
    company: "Apex Studio",
    initial: "A",
    bg: "var(--mustard)",
  },
  {
    quote: "Working with Karman is like giving a racing engine to a master driver. The performance, the precision, the artistry — everything you'd want in a creative developer.",
    name: "Sarah Kim",
    role: "Creative Director",
    company: "Nucleus Design Co.",
    initial: "S",
    bg: "var(--black)",
    dark: true,
  },
  {
    quote: "He delivered an interactive data platform that our analysts describe as 'genuinely fun to use.' That's not something you hear about B2B software. Karman made it happen.",
    name: "Marcus Webb",
    role: "Head of Product",
    company: "Prism Analytics",
    initial: "M",
    bg: "var(--cream)",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const { ref, visible } = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "3px solid var(--black)",
        background: t.bg,
        padding: "40px",
        position: "relative",
        cursor: "none",
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translateY(${hovered ? "-6px" : "0px"})`
          : "translateY(-50px)",
        boxShadow: hovered ? "9px 9px 0px var(--black)" : "6px 6px 0px var(--black)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.15}s, transform 0.3s cubic-bezier(0.23,1,0.32,1) ${visible ? "0s" : (index * 0.15) + "s"}, box-shadow 0.2s ease`,
      }}
    >
      {/* Quote mark */}
      <div
        style={{
          fontSize: "80px",
          fontWeight: 800,
          lineHeight: 0.8,
          color: t.dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
          marginBottom: "8px",
          fontFamily: "Georgia, serif",
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.75,
          color: t.dark ? "rgba(245,240,232,0.85)" : "rgba(10,10,10,0.8)",
          marginBottom: "32px",
          fontStyle: "italic",
        }}
      >
        {t.quote}
      </p>

      {/* Divider */}
      <div
        style={{
          width: "40px",
          height: "3px",
          background: t.dark ? "var(--mustard)" : "var(--black)",
          marginBottom: "20px",
        }}
      />

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            background: t.dark ? "var(--mustard)" : "var(--black)",
            border: `3px solid ${t.dark ? "var(--cream)" : "var(--black)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: 800,
            color: t.dark ? "var(--black)" : "var(--cream)",
            flexShrink: 0,
          }}
        >
          {t.initial}
        </div>
        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: "14px",
              color: t.dark ? "var(--cream)" : "var(--black)",
              letterSpacing: "-0.01em",
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontFamily: "Courier New, monospace",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: t.dark ? "rgba(245,240,232,0.45)" : "rgba(10,10,10,0.45)",
              marginTop: "2px",
            }}
          >
            {t.role} — {t.company}
          </div>
        </div>
      </div>

      {/* Star rating */}
      <div
        style={{
          position: "absolute",
          top: "24px",
          right: "28px",
          display: "flex",
          gap: "2px",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: "var(--mustard)", fontSize: "12px" }}>★</span>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref, visible } = useInView(0.05);

  return (
    <section
      id="reviews"
      style={{
        background: "var(--cream)",
        borderTop: "3px solid var(--black)",
        padding: "100px 48px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div ref={ref} style={{ marginBottom: "64px" }}>
          <div
            className="section-label"
            style={{
              marginBottom: "24px",
              opacity: visible ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span>06</span>
            <span>Reviews</span>
          </div>
          <h2
            className="display-name"
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            Client Words
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "0px",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
