"use client";
import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    year: "2024",
    role: "Senior Creative Developer",
    company: "Studio Apex",
    type: "Full-Time",
    desc: "Led frontend architecture for award-winning interactive campaigns. Built WebGL environments and scroll-driven narratives used by Fortune 500 clients.",
    skills: ["Three.js", "GSAP", "React", "WebGL"],
    active: true,
  },
  {
    year: "2022",
    role: "UI Engineer",
    company: "Nucleus Design Co.",
    type: "Contract",
    desc: "Designed and engineered a complete design system serving 12 product teams. Reduced UI inconsistency by 80% through tokenized component architecture.",
    skills: ["React", "Figma", "Storybook", "Tailwind"],
    active: false,
  },
  {
    year: "2021",
    role: "Motion Developer",
    company: "Kinetic Labs",
    type: "Full-Time",
    desc: "Specialized in complex animation systems for digital products. Developed proprietary easing curves and micro-interaction libraries used across 30+ projects.",
    skills: ["Framer Motion", "GSAP", "SVG", "CSS"],
    active: false,
  },
  {
    year: "2019",
    role: "Frontend Developer",
    company: "Foundry Studio",
    type: "Full-Time",
    desc: "Built performant, accessible web interfaces for tech startups. Shipped 20+ products from concept to launch, gaining deep expertise in React ecosystems.",
    skills: ["React", "TypeScript", "Next.js", "Node.js"],
    active: false,
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

export default function WorkExperience() {
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="work"
      style={{
        background: "var(--black)",
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
              background: "var(--mustard)",
            }}
          >
            <span>03</span>
            <span>Experience</span>
          </div>
          <h2
            className="display-name"
            style={{
              fontSize: "clamp(40px, 6vw, 80px)",
              color: "var(--cream)",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            Work Timeline
          </h2>
        </div>

        {/* Timeline layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "0px",
            borderLeft: "3px solid rgba(255,255,255,0.12)",
          }}
        >
          {/* Left: Year nodes */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {experiences.map((exp, i) => (
              <button
                key={exp.year}
                onClick={() => setActiveIndex(i)}
                style={{
                  all: "unset",
                  cursor: "none",
                  padding: "28px 32px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  borderLeft: i === activeIndex ? "4px solid var(--mustard)" : "4px solid transparent",
                  background: i === activeIndex ? "rgba(232,184,75,0.06)" : "transparent",
                  transition: "all 0.3s ease",
                  position: "relative",
                }}
              >
                {/* Node dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-2px",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: i === activeIndex ? "14px" : "10px",
                    height: i === activeIndex ? "14px" : "10px",
                    background: i === activeIndex ? "var(--mustard)" : "rgba(255,255,255,0.25)",
                    border: `2px solid ${i === activeIndex ? "var(--mustard)" : "transparent"}`,
                    borderRadius: i === activeIndex ? "0" : "50%",
                    transition: "all 0.3s ease",
                    zIndex: 1,
                  }}
                />

                <div
                  style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: i === activeIndex ? "var(--mustard)" : "rgba(255,255,255,0.2)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: "6px",
                    transition: "color 0.3s ease",
                  }}
                >
                  {exp.year}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: i === activeIndex ? "var(--cream)" : "rgba(255,255,255,0.35)",
                    letterSpacing: "0.04em",
                    transition: "color 0.3s ease",
                  }}
                >
                  {exp.company}
                </div>
              </button>
            ))}
          </div>

          {/* Right: Detail panel */}
          <div
            style={{
              borderLeft: "3px solid rgba(255,255,255,0.1)",
              padding: "40px 48px",
            }}
          >
            {experiences.map((exp, i) => (
              <div
                key={exp.year}
                style={{
                  display: i === activeIndex ? "block" : "none",
                  animation: i === activeIndex ? "fadeSlideIn 0.4s cubic-bezier(0.16,1,0.3,1)" : "none",
                }}
              >
                {/* Role badge */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <span
                    style={{
                      background: "var(--mustard)",
                      border: "2px solid var(--mustard)",
                      color: "var(--black)",
                      padding: "4px 12px",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {exp.type}
                  </span>
                  <span
                    style={{
                      fontFamily: "Courier New, monospace",
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {exp.year} — Present
                  </span>
                </div>

                {/* Role title */}
                <h3
                  style={{
                    fontSize: "clamp(24px, 3vw, 40px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--cream)",
                    marginBottom: "8px",
                    lineHeight: 1.1,
                  }}
                >
                  {exp.role}
                </h3>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "var(--mustard)",
                    marginBottom: "24px",
                  }}
                >
                  @ {exp.company}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.75,
                    color: "rgba(245,240,232,0.65)",
                    marginBottom: "32px",
                    maxWidth: "540px",
                  }}
                >
                  {exp.desc}
                </p>

                {/* Skills used */}
                <div>
                  <div
                    style={{
                      fontFamily: "Courier New, monospace",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                      marginBottom: "12px",
                    }}
                  >
                    Technologies Used
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          border: "2px solid rgba(255,255,255,0.2)",
                          padding: "4px 12px",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--cream)",
                          background: "rgba(255,255,255,0.04)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
