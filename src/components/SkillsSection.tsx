"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.set(cards, { y: 50, opacity: 0, scale: 0.95 });
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 80%",
          onEnter: () => {
            setVisible(true);
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
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
      id="skills"
      style={{
        background: "var(--cream-dark)",
        borderTop: "3px solid var(--black)",
        padding: "var(--skills-section-padding, 100px 24px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative grid */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          right: "30px",
          width: "180px",
          height: "180px",
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
            <h2 className="display-name" style={{ fontSize: "clamp(44px, 7vw, 90px)" }}>
              Expertise
            </h2>
            <p
              style={{
                maxWidth: "300px",
                fontSize: "13px",
                lineHeight: 1.7,
                opacity: 0.55,
              }}
            >
              A decade of sharpened tools. Each bar is calibrated against real
              production work.
            </p>
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

        {/* Skills grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--skills-grid-gap, 0px)",
          }}
        >
          {skillCategories.map((cat, ci) => (
            <SkillCategory key={cat.category} cat={cat} index={ci} visible={visible} />
          ))}
        </div>

        {/* Bottom "Also fluent in" strip */}
        <div
          style={{
            border: "3px solid var(--black)",
            borderTop: "none",
            background: "var(--black)",
            padding: "20px 32px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
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
            "Webpack", "Vite", "Testing Library", "Playwright", "Blender",
          ].map((tech) => (
            <span
              key={tech}
              style={{
                border: "2px solid rgba(245,240,232,0.15)",
                padding: "4px 12px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "rgba(245,240,232,0.7)",
                background: "rgba(255,255,255,0.04)",
                boxShadow: "2px 2px 0 rgba(245,240,232,0.06)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        #skills {
          --skills-section-padding: 100px 24px;
          --skills-grid-gap: 0px;
          --skills-card-padding: 40px;
        }
        @media (max-width: 1024px) {
          #skills {
            --skills-section-padding: 72px 20px;
            --skills-grid-gap: 12px;
            --skills-card-padding: 32px;
          }
        }
        @media (max-width: 640px) {
          #skills {
            --skills-section-padding: 56px 16px;
            --skills-grid-gap: 12px;
            --skills-card-padding: 24px;
          }
          #skills .display-name {
            font-size: clamp(32px, 8vw, 56px) !important;
          }
        }
        @media (pointer: coarse) {
          #skills * { cursor: auto !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Skill Category Card ─── */
function SkillCategory({
  cat,
  index,
  visible,
}: {
  cat: (typeof skillCategories)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isAlt = index % 2 === 1;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "3px solid var(--black)",
        padding: "var(--skills-card-padding, 40px)",
        background: isAlt ? "var(--cream)" : "var(--cream-dark)",
        position: "relative",
        overflow: "hidden",
        cursor: "none",
        transform: hovered ? "translate(-3px, -3px)" : "translate(0, 0)",
        boxShadow: hovered ? "9px 9px 0px var(--black)" : "none",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      {/* Category header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "32px",
          paddingBottom: "18px",
          borderBottom: "3px solid var(--black)",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            background: "var(--black)",
            color: "var(--mustard)",
            border: "3px solid var(--black)",
            boxShadow: "3px 3px 0 var(--mustard)",
            display: "grid",
            placeItems: "center",
            fontSize: "22px",
            flexShrink: 0,
            transform: hovered ? "rotate(-8deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          {cat.icon}
        </div>
        <span
          style={{
            fontSize: "15px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {cat.category}
        </span>
      </div>

      {/* Skill bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
        {cat.skills.map((skill, si) => (
          <div
            key={skill.name}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.1 + si * 0.08}s`,
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
                {skill.name}
              </span>
              <span
                style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "var(--mustard)",
                  background: "var(--black)",
                  padding: "2px 8px",
                  border: "2px solid var(--black)",
                  letterSpacing: "0.05em",
                }}
              >
                {skill.level}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "10px",
                background: "var(--cream-dark)",
                border: "2px solid var(--black)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "var(--mustard)",
                  borderRight: "2px solid var(--black)",
                  width: visible ? `${skill.level}%` : "0%",
                  transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1 + si * 0.12}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom accent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "5px",
          background: "var(--mustard)",
          width: hovered ? "100%" : "0%",
          transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
