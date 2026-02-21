"use client";
import { useEffect, useRef, useState } from "react";

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

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { ref, visible } = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }}
      style={{
        border: "3px solid var(--black)",
        background: project.bg,
        padding: "40px",
        position: "relative",
        cursor: "none",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(900px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg) translateY(${hovered ? "-6px" : "0px"})`
          : index % 2 === 0 ? "translateX(-40px)" : "translateX(40px)",
        boxShadow: hovered ? "12px 12px 0px var(--black)" : "6px 6px 0px var(--black)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.2s ease`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            fontFamily: "Courier New, monospace",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: project.dark ? "rgba(245,240,232,0.4)" : "rgba(10,10,10,0.4)",
          }}
        >
          {project.id} / {project.year}
        </div>
        <span
          style={{
            border: `2px solid ${project.dark ? "rgba(245,240,232,0.3)" : "var(--black)"}`,
            padding: "3px 10px",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: project.dark ? "var(--cream)" : "var(--black)",
            background: project.dark ? "rgba(255,255,255,0.06)" : "transparent",
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Large number */}
      <div
        style={{
          fontSize: "80px",
          fontWeight: 800,
          letterSpacing: "-0.06em",
          lineHeight: 0.8,
          color: project.accent,
          marginBottom: "24px",
          opacity: 0.18,
          position: "absolute",
          top: "20px",
          right: "32px",
          fontFamily: "Courier New, monospace",
          pointerEvents: "none",
        }}
      >
        {project.id}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "clamp(28px, 3.5vw, 48px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: project.dark ? "var(--cream)" : "var(--black)",
          marginBottom: "4px",
          lineHeight: 1,
        }}
      >
        {project.title}
      </h3>
      <div
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: project.dark ? "rgba(245,240,232,0.55)" : "rgba(10,10,10,0.55)",
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
          lineHeight: 1.7,
          color: project.dark ? "rgba(245,240,232,0.65)" : "rgba(10,10,10,0.65)",
          marginBottom: "28px",
          maxWidth: "400px",
        }}
      >
        {project.desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              border: `2px solid ${project.dark ? "rgba(245,240,232,0.25)" : "var(--black)"}`,
              padding: "3px 10px",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: project.dark ? "var(--cream)" : "var(--black)",
              background: project.dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* View button */}
      <button
        style={{
          border: `3px solid ${project.dark ? "var(--cream)" : "var(--black)"}`,
          background: hovered ? (project.dark ? "var(--cream)" : "var(--black)") : "transparent",
          color: hovered ? (project.dark ? "var(--black)" : "var(--cream)") : (project.dark ? "var(--cream)" : "var(--black)"),
          padding: "10px 20px",
          fontWeight: 700,
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          cursor: "none",
          transition: "all 0.2s ease",
          boxShadow: `3px 3px 0 ${project.dark ? "var(--mustard)" : "var(--black)"}`,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        View Case Study
        <span
          style={{
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.2s ease",
          }}
        >
          →
        </span>
      </button>

      {/* Accent border bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "4px",
          background: project.accent,
          width: hovered ? "100%" : "0%",
          transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}

export default function ProjectsSection() {
  const { ref, visible } = useInView(0.05);

  return (
    <section
      id="projects"
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
            <h2
              className="display-name"
              style={{
                fontSize: "clamp(40px, 6vw, 80px)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
            >
              Selected Work
            </h2>
            <button
              className="nb-btn-outline"
              style={{ padding: "12px 24px", fontSize: "11px" }}
            >
              View All Projects ↗
            </button>
          </div>
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "0px",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
