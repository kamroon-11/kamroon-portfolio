"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Spatial UI",
    subtitle: "WebGL Design System",
    year: "2024",
    category: "Creative Dev",
    desc: "A fully interactive 3D design system built in Three.js and React. Features live component previews floating in a WebGL environment with physics-based interactions.",
    tags: ["Three.js", "React", "GLSL", "WebGL"],
    accent: "var(--mustard)",
    bg: "var(--black)",
    dark: true,
  },
  {
    id: "02",
    title: "Momentum",
    subtitle: "Scroll-Driven Brand Site",
    year: "2024",
    category: "Web Dev",
    desc: "Award-winning scroll narrative for a venture capital firm. Camera moves through a 3D city metaphor as you scroll — each building represents a portfolio company.",
    tags: ["GSAP", "ScrollTrigger", "Blender", "Next.js"],
    accent: "var(--black)",
    bg: "var(--mustard)",
    dark: false,
  },
  {
    id: "03",
    title: "Prism",
    subtitle: "Interactive Data Visualization",
    year: "2023",
    category: "UI Engineering",
    desc: "Real-time 3D data visualization platform for financial analysts. Renders 10M+ data points in WebGL with smooth zoom, pan, and filter interactions.",
    tags: ["D3.js", "Three.js", "TypeScript", "WebWorkers"],
    accent: "var(--sage)",
    bg: "var(--cream-dark)",
    dark: false,
  },
  {
    id: "04",
    title: "Vestige",
    subtitle: "Fashion E-Commerce",
    year: "2023",
    category: "Full-Stack",
    desc: "Neo-brutalist e-commerce experience for a luxury fashion brand. Features 3D product viewers, AR try-on, and a custom CMS with editorial layout control.",
    tags: ["Next.js", "Shopify", "Three.js", "Sanity"],
    accent: "var(--black)",
    bg: "var(--cream)",
    dark: false,
  },
];

export default function ProjectsSection() {
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
        gsap.set(cards, { y: 80, opacity: 0 });
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.15,
              ease: "power4.out",
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
      id="projects"
      style={{
        background: "var(--cream)",
        borderTop: "3px solid var(--black)",
        padding: "100px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative diagonal */}
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          left: "-5%",
          width: "40%",
          height: "110%",
          background: "var(--mustard)",
          opacity: 0.04,
          transform: "rotate(8deg)",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "72px" }}>
          <div className="section-label" style={{ marginBottom: "24px" }}>
            <span>04</span>
            <span>Projects</span>
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
              Selected Work
            </h2>
            <button
              className="nb-btn-outline"
              style={{ padding: "12px 24px", fontSize: "11px" }}
            >
              View All Projects ↗
            </button>
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

        {/* Projects — Alternating bento layout */}
        <div ref={cardsRef} style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Project Card ─── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const textColor = project.dark ? "var(--cream)" : "var(--black)";
  const subColor = project.dark ? "rgba(245,240,232,0.5)" : "rgba(10,10,10,0.5)";
  const tagBorder = project.dark ? "rgba(245,240,232,0.25)" : "var(--black)";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: index % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr",
        border: "3px solid var(--black)",
        borderBottom: index < projects.length - 1 ? "none" : "3px solid var(--black)",
        background: project.bg,
        cursor: "none",
        position: "relative",
        overflow: "hidden",
        transform: hovered ? "translate(-4px, -4px)" : "translate(0, 0)",
        boxShadow: hovered ? "10px 10px 0px var(--black)" : "none",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      {/* Number watermark */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "220px",
          fontWeight: 900,
          color: project.accent,
          opacity: 0.04,
          lineHeight: 1,
          pointerEvents: "none",
          fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
        }}
      >
        {project.id}
      </div>

      {/* Content side */}
      <div
        style={{
          padding: "48px 44px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          order: index % 2 === 0 ? 0 : 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "Courier New, monospace",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: subColor,
            }}
          >
            {project.id} / {project.year}
          </span>
          <span
            style={{
              border: `2px solid ${tagBorder}`,
              padding: "3px 10px",
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: textColor,
              background: project.dark ? "rgba(255,255,255,0.06)" : "transparent",
              boxShadow: `2px 2px 0 ${tagBorder}`,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: textColor,
            marginBottom: "6px",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {project.title}
        </h3>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: subColor,
            marginBottom: "20px",
            letterSpacing: "0.02em",
          }}
        >
          {project.subtitle}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            lineHeight: 1.75,
            color: project.dark ? "rgba(245,240,232,0.65)" : "rgba(10,10,10,0.65)",
            marginBottom: "28px",
            maxWidth: "440px",
          }}
        >
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                border: `2px solid ${tagBorder}`,
                padding: "4px 12px",
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: textColor,
                background: project.dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                boxShadow: `2px 2px 0 ${tagBorder}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          style={{
            border: `3px solid ${project.dark ? "var(--cream)" : "var(--black)"}`,
            background: hovered
              ? project.dark ? "var(--cream)" : "var(--black)"
              : "transparent",
            color: hovered
              ? project.dark ? "var(--black)" : "var(--cream)"
              : textColor,
            padding: "12px 24px",
            fontWeight: 800,
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "none",
            transition: "all 0.2s ease",
            boxShadow: `4px 4px 0 ${project.dark ? "var(--mustard)" : "var(--black)"}`,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "flex-start",
          }}
        >
          View Case Study
          <span
            style={{
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.2s ease",
              display: "inline-block",
            }}
          >
            →
          </span>
        </button>
      </div>

      {/* Visual side — decorative composition */}
      <div
        style={{
          padding: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderLeft: index % 2 === 0 ? `3px solid ${project.dark ? "rgba(245,240,232,0.12)" : "var(--black)"}` : "none",
          borderRight: index % 2 !== 0 ? `3px solid ${project.dark ? "rgba(245,240,232,0.12)" : "var(--black)"}` : "none",
          order: index % 2 === 0 ? 1 : 0,
          overflow: "hidden",
        }}
      >
        {/* Abstract composition */}
        <div
          style={{
            width: "200px",
            height: "200px",
            border: `4px solid ${project.dark ? "rgba(245,240,232,0.15)" : "var(--black)"}`,
            display: "grid",
            placeItems: "center",
            position: "relative",
            transform: hovered ? "rotate(-4deg) scale(1.05)" : "rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          {/* Big number */}
          <span
            style={{
              fontSize: "80px",
              fontWeight: 900,
              color: project.accent,
              opacity: 0.25,
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              letterSpacing: "-0.04em",
            }}
          >
            {project.id}
          </span>

          {/* Corner sticker */}
          <div
            style={{
              position: "absolute",
              top: "-16px",
              right: "-16px",
              background: project.accent,
              border: `3px solid ${project.dark ? "var(--cream)" : "var(--black)"}`,
              boxShadow: `3px 3px 0 ${project.dark ? "var(--cream)" : "var(--black)"}`,
              padding: "4px 10px",
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transform: "rotate(6deg)",
              color: project.dark ? "var(--black)" : "var(--black)",
            }}
          >
            {project.year}
          </div>
        </div>

        {/* Accent dot */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "28px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: project.accent,
            border: `3px solid ${project.dark ? "var(--cream)" : "var(--black)"}`,
            opacity: 0.6,
          }}
        />
      </div>

      {/* Bottom accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "5px",
          background: project.accent,
          width: hovered ? "100%" : "0%",
          transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 2,
        }}
      />
    </div>
  );
}
