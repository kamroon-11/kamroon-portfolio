"use client";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Creative Development",
    desc: "High-performance web experiences built with React, Next.js, and cutting-edge animation libraries. Pixel-perfect and buttery smooth.",
    icon: "⬡",
    tags: ["React", "Next.js", "GSAP"],
    bg: "var(--cream)",
  },
  {
    number: "02",
    title: "3D & Motion Design",
    desc: "Interactive 3D scenes, WebGL shaders, and cinematic scroll animations that turn your brand into an unforgettable experience.",
    icon: "◈",
    tags: ["Three.js", "R3F", "Framer"],
    bg: "var(--mustard)",
  },
  {
    number: "03",
    title: "Design Systems",
    desc: "Structured, scalable design systems with clear tokens, components, and documentation that teams actually love using.",
    icon: "▦",
    tags: ["Figma", "Tailwind", "Storybook"],
    bg: "var(--black)",
    dark: true,
  },
  {
    number: "04",
    title: "Brand & Identity",
    desc: "Visual identities with depth and intention. From logo mark to motion guidelines — cohesive brand systems for modern companies.",
    icon: "◉",
    tags: ["Branding", "Typography", "Strategy"],
    bg: "var(--cream)",
  },
];

function useInView(threshold = 0.2) {
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

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { ref, visible } = useInView(0.15);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={onMouseMove}
      style={{
        border: "3px solid var(--black)",
        background: service.bg,
        padding: "36px",
        position: "relative",
        overflow: "hidden",
        cursor: "none",
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(800px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg) translateZ(${hovered ? "12px" : "0px"})`
          : `translateY(40px)`,
        boxShadow: hovered
          ? "9px 9px 0px var(--black)"
          : "6px 6px 0px var(--black)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.2s ease`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Number */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          fontFamily: "Courier New, monospace",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          opacity: 0.3,
          color: service.dark ? "var(--cream)" : "var(--black)",
        }}
      >
        {service.number}
      </div>

      {/* Icon */}
      <div
        style={{
          fontSize: "40px",
          marginBottom: "24px",
          color: service.dark ? "var(--mustard)" : "var(--black)",
          transform: hovered ? "translateZ(20px)" : "translateZ(0)",
          transition: "transform 0.3s ease",
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginBottom: "12px",
          color: service.dark ? "var(--cream)" : "var(--black)",
          lineHeight: 1.1,
        }}
      >
        {service.title}
      </h3>

      {/* Desc */}
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.65,
          opacity: 0.7,
          marginBottom: "24px",
          color: service.dark ? "var(--cream)" : "var(--black)",
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
              border: `2px solid ${service.dark ? "var(--cream)" : "var(--black)"}`,
              padding: "3px 10px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: service.dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              color: service.dark ? "var(--cream)" : "var(--black)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "4px",
          background: "var(--mustard)",
          width: hovered ? "100%" : "0%",
          transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}

export default function ServicesSection() {
  const { ref, visible } = useInView(0.1);

  return (
    <section
      id="services"
      style={{
        background: "var(--cream)",
        borderTop: "3px solid var(--black)",
        padding: "100px 48px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div ref={ref} style={{ marginBottom: "64px" }}>
        <div
          className="section-label"
          style={{
            marginBottom: "24px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
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
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            What I Do
          </h2>
          <p
            style={{
              maxWidth: "320px",
              fontSize: "14px",
              lineHeight: 1.65,
              opacity: visible ? 0.6 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            Specializing in the craft of interactive digital products — where engineering meets design at maximum depth.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "0px",
        }}
      >
        {services.map((service, i) => (
          <ServiceCard key={service.number} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
