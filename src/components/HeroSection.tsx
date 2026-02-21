"use client";
import { useEffect, useRef, useState } from "react";

interface ParallaxCard {
  id: string;
  style: React.CSSProperties;
  children: React.ReactNode;
}

function use3DParallax(maxAngle = 6) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotX = -dy * maxAngle;
      const rotY = dx * maxAngle;
      el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`;
    };

    const onMouseLeave = () => {
      el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [maxAngle]);

  return ref;
}

function Tilt3DCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = use3DParallax(6);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      {children}
    </div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    setHasEntered(true);
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const parallaxStyle = (strength: number): React.CSSProperties => ({
    transform: `translate(${mousePos.x * strength}px, ${mousePos.y * strength}px)`,
    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
  });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "68px",
      }}
    >
      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--cream-dark) 1px, transparent 1px), linear-gradient(90deg, var(--cream-dark) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      {/* Horizon gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background:
            "linear-gradient(to top, rgba(232,184,75,0.08), transparent)",
          zIndex: 0,
        }}
      />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "60px 48px",
          width: "100%",
        }}
      >
        {/* Top row: Status badge + scroll hint */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "48px",
            opacity: hasEntered ? 1 : 0,
            transform: hasEntered ? "translateY(0)" : "translateY(-20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 0 3px rgba(74,222,128,0.25)",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "Courier New, monospace",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.6,
              }}
            >
              Available for work
            </span>
          </div>
          <div className="section-label">
            <span>2026</span>
            <span style={{ opacity: 0.4 }}>—</span>
            <span>Portfolio</span>
          </div>
        </div>

        {/* Main composition */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "48px",
            alignItems: "start",
            perspective: "1200px",
          }}
        >
          {/* Left: Big name + tagline */}
          <div>
            {/* Name with 3D depth effect */}
            <div
              style={{
                ...parallaxStyle(-8),
                marginBottom: "32px",
              }}
            >
              <div
                className="display-name"
                style={{
                  fontSize: "clamp(80px, 14vw, 200px)",
                  color: "var(--black)",
                  position: "relative",
                  display: "inline-block",
                  lineHeight: 0.85,
                }}
              >
                {/* Text shadow layering for 3D extrusion */}
                <span
                  style={{
                    position: "relative",
                    display: "block",
                    textShadow:
                      "2px 2px 0 #d4a832, 4px 4px 0 #c99a2e, 6px 6px 0 rgba(0,0,0,0.15)",
                    opacity: hasEntered ? 1 : 0,
                    transform: hasEntered ? "translateX(0)" : "translateX(-60px)",
                    transition:
                      "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                  }}
                >
                  KAR
                </span>
                <span
                  style={{
                    position: "relative",
                    display: "block",
                    color: "transparent",
                    WebkitTextStroke: "3px var(--black)",
                    textShadow: "none",
                    opacity: hasEntered ? 1 : 0,
                    transform: hasEntered ? "translateX(0)" : "translateX(60px)",
                    transition:
                      "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
                  }}
                >
                  MAN
                </span>
              </div>
            </div>

            {/* Tagline row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "40px",
                opacity: hasEntered ? 1 : 0,
                transform: hasEntered ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "3px",
                  background: "var(--mustard)",
                  border: "none",
                }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  opacity: 0.75,
                  maxWidth: "420px",
                  lineHeight: 1.6,
                }}
              >
                Creative Developer & Design Engineer. I build digital experiences that live at the intersection of structure and depth.
              </p>
            </div>

            {/* CTA buttons */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                opacity: hasEntered ? 1 : 0,
                transform: hasEntered ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
              }}
            >
              <button
                className="nb-btn"
                style={{ padding: "14px 28px", fontSize: "12px" }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects ↘
              </button>
              <button
                className="nb-btn-outline"
                style={{ padding: "14px 28px", fontSize: "12px" }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get In Touch →
              </button>
            </div>
          </div>

          {/* Right: Floating cards composition */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "flex-end",
              ...parallaxStyle(6),
              opacity: hasEntered ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            {/* Profile card */}
            <Tilt3DCard
              className="nb-card-mustard float-anim"
              style={{
                padding: "24px",
                width: "260px",
                position: "relative",
                "--rot": "-2deg",
              } as React.CSSProperties}
            >
              {/* Avatar placeholder */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  background: "var(--black)",
                  border: "3px solid var(--black)",
                  borderRadius: "50%",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--mustard)",
                  fontSize: "28px",
                  fontWeight: 800,
                }}
              >
                K
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "18px",
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                }}
              >
                KARMAN
              </div>
              <div
                style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  opacity: 0.6,
                }}
              >
                Creative Developer
              </div>
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  gap: "8px",
                }}
              >
                {["React", "Three.js", "GSAP"].map((t) => (
                  <span key={t} className="tag" style={{ fontSize: "9px" }}>
                    {t}
                  </span>
                ))}
              </div>
            </Tilt3DCard>

            {/* Stats cards row */}
            <div style={{ display: "flex", gap: "12px" }}>
              <Tilt3DCard
                className="nb-card float-anim-slow"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  "--rx": "2deg",
                  "--ry": "-3deg",
                  animationDelay: "1s",
                } as React.CSSProperties}
              >
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: "var(--black)",
                    lineHeight: 1,
                  }}
                >
                  5+
                </div>
                <div
                  style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    opacity: 0.5,
                    marginTop: "4px",
                  }}
                >
                  Years Exp.
                </div>
              </Tilt3DCard>

              <Tilt3DCard
                className="nb-card-black float-anim-slow"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  "--rx": "-2deg",
                  "--ry": "3deg",
                  animationDelay: "1.5s",
                } as React.CSSProperties}
              >
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: "var(--mustard)",
                    lineHeight: 1,
                  }}
                >
                  48
                </div>
                <div
                  style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    opacity: 0.5,
                    marginTop: "4px",
                    color: "var(--cream)",
                  }}
                >
                  Projects Done
                </div>
              </Tilt3DCard>
            </div>

            {/* Location + availability */}
            <Tilt3DCard
              className="nb-card float-anim"
              style={{
                padding: "16px 20px",
                width: "260px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                animationDelay: "0.5s",
                "--rot": "1deg",
              } as React.CSSProperties}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Courier New, monospace",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    opacity: 0.5,
                    marginBottom: "4px",
                  }}
                >
                  Base
                </div>
                <div style={{ fontWeight: 700, fontSize: "14px" }}>
                  New York, USA
                </div>
              </div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "var(--mustard)",
                  border: "2px solid var(--black)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                📍
              </div>
            </Tilt3DCard>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: hasEntered ? 0.5 : 0,
            transition: "opacity 1s 1s",
          }}
        >
          <span
            style={{
              fontFamily: "Courier New, monospace",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "var(--black)",
              animation: "scrollLine 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.25); }
          50% { box-shadow: 0 0 0 6px rgba(74,222,128,0.1); }
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
