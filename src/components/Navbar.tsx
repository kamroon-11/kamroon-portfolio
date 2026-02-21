"use client";
import { useEffect, useRef } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 80) {
          navRef.current.style.background = "rgba(245,240,232,0.95)";
          navRef.current.style.backdropFilter = "blur(8px)";
          navRef.current.style.borderBottom = "3px solid var(--black)";
        } else {
          navRef.current.style.background = "transparent";
          navRef.current.style.backdropFilter = "none";
          navRef.current.style.borderBottom = "3px solid transparent";
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        background: "transparent",
        borderBottom: "3px solid transparent",
        transition: "all 0.3s ease",
        padding: "0 48px",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => scrollTo("hero")}
        style={{
          fontWeight: 800,
          fontSize: "20px",
          letterSpacing: "-0.03em",
          textTransform: "uppercase",
          color: "var(--black)",
          background: "none",
          border: "none",
          cursor: "none",
        }}
      >
        KRM<span style={{ color: "var(--mustard)" }}>.</span>
      </button>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {["services", "work", "projects", "skills", "contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            style={{
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--black)",
              background: "none",
              border: "none",
              cursor: "none",
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
          >
            {item}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={() => scrollTo("contact")}
        className="nb-btn"
        style={{ padding: "10px 20px", fontSize: "11px" }}
      >
        Hire Me ↗
      </button>
    </nav>
  );
}
