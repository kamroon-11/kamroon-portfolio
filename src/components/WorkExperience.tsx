"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
        gsap.set(cards, { x: -60, opacity: 0 });
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 75%",
          onEnter: () => {
            gsap.to(cards, { x: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.2)" });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = experiences[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        background: "var(--black)",
        borderTop: "3px solid var(--black)",
        padding: "var(--work-section-padding, 100px 24px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative cross-hatch */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(232,184,75,0.03) 0px, rgba(232,184,75,0.03) 1px, transparent 1px, transparent 14px)",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: "72px" }}>
          <div className="section-label" style={{ marginBottom: "24px", background: "var(--mustard)" }}>
            <span>03</span>
            <span>Experience</span>
          </div>

          <h2
            className="display-name"
            style={{
              fontSize: "clamp(44px, 7vw, 90px)",
              color: "var(--cream)",
            }}
          >
            Work Timeline
          </h2>

          <div
            style={{
              width: "100%",
              height: "3px",
              background: "rgba(245,240,232,0.1)",
              marginTop: "32px",
            }}
          />
        </div>

        {/* Timeline Grid */}
        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "var(--work-grid-gap, 0px)",
          }}
        >
          {experiences.map((exp, i) => (
            <div
              key={exp.year}
              onClick={() => setActiveIndex(i)}
              style={{
                display: "grid",
                gridTemplateColumns: "var(--work-item-grid, 120px 1fr)",
                border: "3px solid rgba(245,240,232,0.12)",
                borderBottom: i < experiences.length - 1 ? "none" : "3px solid rgba(245,240,232,0.12)",
                background: i === activeIndex ? "rgba(232,184,75,0.06)" : "transparent",
                cursor: "none",
                transition: "background 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Active indicator */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "5px",
                  background: i === activeIndex ? "var(--mustard)" : "transparent",
                  transition: "background 0.3s ease",
                }}
              />

              {/* Year column */}
              <div
                style={{
                  padding: "var(--work-year-pad, 32px 24px)",
                  borderRight: "3px solid rgba(245,240,232,0.12)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "28px",
                    fontWeight: 800,
                    color: i === activeIndex ? "var(--mustard)" : "rgba(245,240,232,0.2)",
                    transition: "color 0.3s ease",
                    lineHeight: 1,
                  }}
                >
                  {exp.year}
                </div>
                {/* Node dot */}
                <div
                  style={{
                    width: i === activeIndex ? "14px" : "8px",
                    height: i === activeIndex ? "14px" : "8px",
                    background: i === activeIndex ? "var(--mustard)" : "rgba(245,240,232,0.2)",
                    border: i === activeIndex ? "3px solid var(--mustard)" : "none",
                    transition: "all 0.3s ease",
                  }}
                />
              </div>

              {/* Detail column */}
              <div style={{ padding: "32px 36px" }}>
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: i === activeIndex ? "var(--mustard)" : "rgba(245,240,232,0.1)",
                      border: "2px solid var(--mustard)",
                      color: i === activeIndex ? "var(--black)" : "var(--mustard)",
                      padding: "3px 10px",
                      fontSize: "9px",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      boxShadow: i === activeIndex ? "2px 2px 0 var(--cream)" : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {exp.type}
                  </span>
                  <span
                    style={{
                      fontFamily: "Courier New, monospace",
                      fontSize: "10px",
                      color: "rgba(245,240,232,0.35)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    @ {exp.company}
                  </span>
                </div>

                {/* Role */}
                <h3
                  style={{
                    fontSize: "clamp(20px, 2.5vw, 32px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: i === activeIndex ? "var(--cream)" : "rgba(245,240,232,0.4)",
                    marginBottom: "12px",
                    lineHeight: 1.1,
                    transition: "color 0.3s ease",
                  }}
                >
                  {exp.role}
                </h3>

                {/* Description (only show for active) */}
                <div
                  style={{
                    maxHeight: i === activeIndex ? "200px" : "0px",
                    opacity: i === activeIndex ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease",
                  }}
                >
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.75,
                      color: "rgba(245,240,232,0.6)",
                      marginBottom: "20px",
                      maxWidth: "560px",
                    }}
                  >
                    {exp.desc}
                  </p>

                  {/* Skills */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          border: "2px solid rgba(245,240,232,0.2)",
                          padding: "4px 12px",
                          fontSize: "10px",
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--cream)",
                          background: "rgba(255,255,255,0.04)",
                          boxShadow: "2px 2px 0 rgba(245,240,232,0.08)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div
          style={{
            border: "3px solid rgba(245,240,232,0.12)",
            borderTop: "none",
            background: "var(--mustard)",
            height: "6px",
          }}
        />
      </div>
      <style>{`
        #work {
          --work-section-padding: 100px 24px;
          --work-grid-gap: 0px;
          --work-item-grid: 120px 1fr;
          --work-year-pad: 32px 24px;
        }
        @media (max-width: 1024px) {
          #work {
            --work-section-padding: 72px 20px;
            --work-grid-gap: 12px;
            --work-item-grid: 100px 1fr;
            --work-year-pad: 24px 20px;
          }
        }
        @media (max-width: 640px) {
          #work {
            --work-section-padding: 56px 16px;
            --work-grid-gap: 12px;
            --work-item-grid: 1fr;
            --work-year-pad: 16px 16px;
          }
          #work .display-name {
            font-size: clamp(32px, 8vw, 56px) !important;
          }
        }
        @media (pointer: coarse) {
          #work * { cursor: auto !important; }
        }
      `}</style>
    </section>
  );
}
