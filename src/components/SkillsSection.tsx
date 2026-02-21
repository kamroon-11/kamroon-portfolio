"use client";
import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    category: "Frontend",
    icon: "⬡",
    skills: [
      { name: "React / Next.js", level: 96 },
      { name: "TypeScript", level: 92 },
      { name: "CSS / Tailwind", level: 94 },
      { name: "WebGL / GLSL", level: 78 },
    ],
  },
  {
    category: "Animation",
    icon: "◈",
    skills: [
      { name: "GSAP / ScrollTrigger", level: 95 },
      { name: "Framer Motion", level: 90 },
      { name: "Three.js / R3F", level: 85 },
      { name: "Lottie / SVG", level: 82 },
    ],
  },
  {
    category: "Design",
    icon: "▦",
    skills: [
      { name: "Figma", level: 93 },
      { name: "Motion Design", level: 88 },
      { name: "Design Systems", level: 91 },
      { name: "Brand Identity", level: 80 },
    ],
  },
  {
    category: "Backend",
    icon: "◉",
    skills: [
      { name: "Node.js / Express", level: 82 },
      { name: "PostgreSQL", level: 75 },
      { name: "Supabase", level: 80 },
      { name: "REST / GraphQL", level: 85 },
    ],
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

function SkillBar({ name, level, visible, delay }: { name: string; level: number; visible: boolean; delay: number }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.02em",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "Courier New, monospace",
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--mustard)",
            letterSpacing: "0.05em",
          }}
        >
          {level}%
        </span>
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);
  const { ref: gridRef, visible: gridVisible } = useInView(0.1);

  return (
    <section
      id="skills"
      style={{
        background: "var(--cream-dark)",
        borderTop: "3px solid var(--black)",
        padding: "100px 48px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "64px" }}>
          <div
            className="section-label"
            style={{
              marginBottom: "24px",
              opacity: headerVisible ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <span>05</span>
            <span>Skills</span>
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
                opacity: headerVisible ? 1 : 0,
                transform: headerVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
            >
              Expertise
            </h2>
            <p
              style={{
                maxWidth: "280px",
                fontSize: "13px",
                lineHeight: 1.65,
                opacity: headerVisible ? 0.55 : 0,
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
              }}
            >
              A decade of sharpened tools. Each bar is calibrated against real production work.
            </p>
          </div>
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0px",
          }}
        >
          {skillCategories.map((cat, ci) => (
            <div
              key={cat.category}
              style={{
                border: "3px solid var(--black)",
                padding: "36px",
                background: ci % 2 === 1 ? "var(--cream)" : "var(--cream-dark)",
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${ci * 0.1}s`,
              }}
            >
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "32px",
                  paddingBottom: "16px",
                  borderBottom: "2px solid var(--black)",
                }}
              >
                <span
                  style={{
                    fontSize: "24px",
                    color: "var(--mustard)",
                    background: "var(--black)",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid var(--black)",
                    flexShrink: 0,
                  }}
                >
                  {cat.icon}
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.category}
                </span>
              </div>

              {/* Skill bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    visible={gridVisible}
                    delay={ci * 0.1 + si * 0.08}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tech stack icons row */}
        <div
          style={{
            marginTop: "0px",
            border: "3px solid var(--black)",
            borderTop: "none",
            background: "var(--black)",
            padding: "24px 36px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Courier New, monospace",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginRight: "8px",
            }}
          >
            Also fluent in:
          </span>
          {[
            "Docker", "Vercel", "AWS", "Prisma", "Redis",
            "Webpack", "Vite", "Testing Library", "Playwright", "Blender"
          ].map((tech) => (
            <span
              key={tech}
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "4px 12px",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "rgba(245,240,232,0.7)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
