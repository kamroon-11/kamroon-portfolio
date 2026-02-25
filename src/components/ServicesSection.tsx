"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Creative Development",
    desc: "High-performance web experiences built with React, Next.js, and cutting-edge animation libraries. Pixel-perfect and buttery smooth.",
    icon: "⬡",
    tags: ["React", "Next.js", "GSAP"],
  },
  {
    number: "02",
    title: "3D & Motion Design",
    desc: "Interactive 3D scenes, WebGL shaders, and cinematic scroll animations that turn your brand into an unforgettable experience.",
    icon: "◈",
    tags: ["Three.js", "R3F", "Framer"],
  },
  {
    number: "03",
    title: "Design Systems",
    desc: "Structured, scalable design systems with clear tokens, components, and documentation that teams actually love using.",
    icon: "▦",
    tags: ["Figma", "Tailwind", "Storybook"],
  },
  {
    number: "04",
    title: "Brand & Identity",
    desc: "Visual identities with depth and intention. From logo mark to motion guidelines — cohesive brand systems for modern companies.",
    icon: "◉",
    tags: ["Branding", "Typography", "Strategy"],
  },
];

const cardStyles: { bg: string; accent: string; dark?: boolean }[] = [
  { bg: "var(--cream)", accent: "var(--mustard)" },
  { bg: "var(--mustard)", accent: "var(--black)" },
  { bg: "var(--black)", accent: "var(--mustard)", dark: true },
  { bg: "var(--cream)", accent: "var(--black)" },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const els = headerRef.current.children;
        gsap.set(els, { y: 50, opacity: 0 });
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(els, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power4.out",
            });
          },
        });
      }

      // Card animations
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.set(cards, { y: 60, opacity: 0, rotation: (i) => (i % 2 === 0 ? -3 : 3) });
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 75%",
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              rotation: 0,
              duration: 0.9,
              stagger: 0.1,
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
      id="services"
      style={{
        background: "var(--cream)",
        borderTop: "3px solid var(--black)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative dot grid */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "40px",
          width: "160px",
          height: "160px",
          backgroundImage: "radial-gradient(var(--black) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
          opacity: 0.06,
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "72px" }}>
          <div className="section-label" style={{ marginBottom: "24px" }}>
            <span>02</span>
            <span>Services</span>
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
            <h2
              className="display-name"
              style={{ fontSize: "clamp(44px, 7vw, 90px)" }}
            >
              What I Do
            </h2>
            <p
              style={{
                maxWidth: "340px",
                fontSize: "14px",
                lineHeight: 1.7,
                opacity: 0.6,
              }}
            >
              Specializing in the craft of interactive digital products — where
              engineering meets design at maximum depth.
            </p>
          </div>

          {/* Thick divider */}
          <div
            style={{
              width: "100%",
              height: "4px",
              background: "var(--black)",
              marginTop: "32px",
            }}
          />
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0px",
          }}
        >
          {services.map((service, i) => {
            const cs = cardStyles[i];
            return (
              <ServiceCard
                key={service.number}
                service={service}
                bg={cs.bg}
                accent={cs.accent}
                dark={cs.dark}
                index={i}
              />
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div
          style={{
            border: "3px solid var(--black)",
            borderTop: "none",
            background: "var(--black)",
            padding: "20px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "Courier New, monospace",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.5)",
            }}
          >
            ✦ Need something custom? Let&apos;s talk.
          </span>
          <button
            className="nb-btn"
            style={{ padding: "10px 20px", fontSize: "10px" }}
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start a Project →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Service Card ─── */
function ServiceCard({
  service,
  bg,
  accent,
  dark,
  index,
}: {
  service: (typeof services)[0];
  bg: string;
  accent: string;
  dark?: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const textColor = dark ? "var(--cream)" : "var(--black)";
  const tagBorder = dark ? "rgba(245,240,232,0.3)" : "var(--black)";
  const tagBg = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "3px solid var(--black)",
        background: bg,
        padding: "40px",
        position: "relative",
        cursor: "none",
        overflow: "hidden",
        transform: hovered ? "translate(-4px, -4px)" : "translate(0, 0)",
        boxShadow: hovered ? "10px 10px 0px var(--black)" : "6px 6px 0px var(--black)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      {/* Number watermark */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "20px",
          fontFamily: "Courier New, monospace",
          fontSize: "72px",
          fontWeight: 900,
          color: accent,
          opacity: 0.1,
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        {service.number}
      </div>

      {/* Icon block */}
      <div
        style={{
          width: "52px",
          height: "52px",
          background: accent,
          border: `3px solid ${dark ? "var(--cream)" : "var(--black)"}`,
          boxShadow: `3px 3px 0 ${dark ? "var(--cream)" : "var(--black)"}`,
          display: "grid",
          placeItems: "center",
          fontSize: "24px",
          marginBottom: "28px",
          transform: hovered ? "rotate(-6deg) scale(1.1)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "24px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginBottom: "14px",
          color: textColor,
          lineHeight: 1.1,
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.7,
          opacity: 0.7,
          marginBottom: "28px",
          color: textColor,
        }}
      >
        {service.desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              border: `2px solid ${tagBorder}`,
              padding: "4px 12px",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: tagBg,
              color: textColor,
              boxShadow: `2px 2px 0 ${tagBorder}`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Accent fill bar on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "5px",
          background: accent,
          width: hovered ? "100%" : "0%",
          transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
