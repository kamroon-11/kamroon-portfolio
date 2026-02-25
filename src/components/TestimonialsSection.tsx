"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Karman doesn't just build websites — he architects digital experiences. The 3D portfolio system he built for us became our most talked-about asset at every industry event.",
    name: "Alex Chen",
    role: "CEO, Apex Studio",
    company: "Apex Studio",
    initial: "A",
    style: "mustard" as const,
  },
  {
    quote:
      "Working with Karman is like giving a racing engine to a master driver. The performance, the precision, the artistry — everything you'd want in a creative developer.",
    name: "Sarah Kim",
    role: "Creative Director",
    company: "Nucleus Design Co.",
    initial: "S",
    style: "dark" as const,
  },
  {
    quote:
      "He delivered an interactive data platform that our analysts describe as 'genuinely fun to use.' That's not something you hear about B2B software. Karman made it happen.",
    name: "Marcus Webb",
    role: "Head of Product",
    company: "Prism Analytics",
    initial: "M",
    style: "cream" as const,
  },
];

const styleMap = {
  mustard: {
    bg: "var(--mustard)",
    text: "var(--black)",
    sub: "rgba(10,10,10,0.55)",
    quote: "rgba(10,10,10,0.08)",
    divider: "var(--black)",
    avatarBg: "var(--black)",
    avatarColor: "var(--mustard)",
    avatarBorder: "var(--black)",
    starColor: "var(--black)",
    tagBorder: "var(--black)",
  },
  dark: {
    bg: "var(--black)",
    text: "var(--cream)",
    sub: "rgba(245,240,232,0.45)",
    quote: "rgba(255,255,255,0.06)",
    divider: "var(--mustard)",
    avatarBg: "var(--mustard)",
    avatarColor: "var(--black)",
    avatarBorder: "var(--cream)",
    starColor: "var(--mustard)",
    tagBorder: "rgba(245,240,232,0.2)",
  },
  cream: {
    bg: "var(--cream)",
    text: "var(--black)",
    sub: "rgba(10,10,10,0.45)",
    quote: "rgba(0,0,0,0.05)",
    divider: "var(--black)",
    avatarBg: "var(--black)",
    avatarColor: "var(--cream)",
    avatarBorder: "var(--black)",
    starColor: "var(--mustard)",
    tagBorder: "var(--black)",
  },
};

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        const els = headerRef.current.children;
        gsap.set(els, { y: 50, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(els, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power4.out" });
          },
        });
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.set(cards, { y: 60, opacity: 0, rotation: (i) => [-3, 2, -2][i % 3] });
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              rotation: 0,
              duration: 0.9,
              stagger: 0.15,
              ease: "back.out(1.4)",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      style={{
        background: "var(--cream)",
        borderTop: "3px solid var(--black)",
        padding: "var(--reviews-section-padding, 100px 24px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative element */}
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "40px",
          width: "140px",
          height: "140px",
          backgroundImage: "radial-gradient(var(--black) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
          opacity: 0.05,
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "72px" }}>
          <div className="section-label" style={{ marginBottom: "24px" }}>
            <span>06</span>
            <span>Reviews</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <h2 className="display-name" style={{ fontSize: "clamp(44px, 7vw, 90px)" }}>
              Client Words
            </h2>
            <div
              style={{
                border: "3px solid var(--black)",
                background: "var(--mustard)",
                boxShadow: "4px 4px 0 var(--black)",
                padding: "8px 16px",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transform: "rotate(-3deg)",
              }}
            >
              ★ 5.0 Average Rating
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "4px",
              background: "var(--black)",
              marginTop: "32px",
            }}
          />
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--reviews-grid-gap, 0px)",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
      <style>{`
        #reviews {
          --reviews-section-padding: 100px 24px;
          --reviews-grid-gap: 0px;
          --review-card-padding: 44px;
        }
        @media (max-width: 1024px) {
          #reviews {
            --reviews-section-padding: 72px 20px;
            --reviews-grid-gap: 12px;
            --review-card-padding: 32px;
          }
        }
        @media (max-width: 640px) {
          #reviews {
            --reviews-section-padding: 56px 16px;
            --reviews-grid-gap: 12px;
            --review-card-padding: 24px;
          }
          #reviews .display-name {
            font-size: clamp(32px, 8vw, 56px) !important;
          }
        }
        @media (pointer: coarse) {
          #reviews * { cursor: auto !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const s = styleMap[t.style];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "3px solid var(--black)",
        background: s.bg,
        padding: "var(--review-card-padding, 44px)",
        position: "relative",
        cursor: "none",
        overflow: "hidden",
        transform: hovered ? "translate(-4px, -4px)" : "translate(0, 0)",
        boxShadow: hovered ? "10px 10px 0px var(--black)" : "6px 6px 0px var(--black)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      {/* Quote mark watermark */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "20px",
          fontSize: "120px",
          fontWeight: 900,
          lineHeight: 1,
          color: s.quote,
          fontFamily: "Georgia, serif",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        &ldquo;
      </div>

      {/* Star rating */}
      <div
        style={{
          position: "absolute",
          top: "24px",
          right: "28px",
          display: "flex",
          gap: "3px",
          zIndex: 1,
        }}
      >
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            style={{
              color: s.starColor,
              fontSize: "14px",
              fontWeight: 900,
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote text */}
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.8,
          color: s.text,
          marginBottom: "36px",
          marginTop: "24px",
          fontStyle: "italic",
          position: "relative",
          zIndex: 1,
          opacity: 0.85,
        }}
      >
        {t.quote}
      </p>

      {/* Divider */}
      <div
        style={{
          width: "48px",
          height: "4px",
          background: s.divider,
          marginBottom: "24px",
        }}
      />

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            background: s.avatarBg,
            border: `3px solid ${s.avatarBorder}`,
            boxShadow: `3px 3px 0 ${s.avatarBorder}`,
            display: "grid",
            placeItems: "center",
            fontSize: "20px",
            fontWeight: 900,
            color: s.avatarColor,
            flexShrink: 0,
            transform: hovered ? "rotate(-6deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          {t.initial}
        </div>
        <div>
          <div
            style={{
              fontWeight: 800,
              fontSize: "15px",
              color: s.text,
              letterSpacing: "-0.01em",
              marginBottom: "4px",
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontFamily: "Courier New, monospace",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: s.sub,
            }}
          >
            {t.role} — {t.company}
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "5px",
          background: s.divider,
          width: hovered ? "100%" : "0%",
          transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
