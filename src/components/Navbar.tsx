"use client";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    const onScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 80) {
          navRef.current.style.background = "var(--cream)";
          navRef.current.style.backdropFilter = "none";
          navRef.current.style.borderBottom = "3px solid var(--black)";
          navRef.current.style.boxShadow = "6px 6px 0 var(--black)";
        } else {
          navRef.current.style.background = "var(--cream)";
          navRef.current.style.backdropFilter = "none";
          navRef.current.style.borderBottom = "3px solid var(--black)";
          navRef.current.style.boxShadow = "6px 6px 0 var(--black)";
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
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
        background: "var(--cream)",
        borderBottom: "3px solid var(--black)",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: "6px 6px 0 var(--black)",
        padding: isMobile ? "0 16px" : "0 48px",
        height: isMobile ? "56px" : "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => scrollTo("hero")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "18px",
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: "var(--black)",
          background: "var(--mustard)",
          border: "3px solid var(--black)",
          borderRadius: "6px",
          boxShadow: "4px 4px 0 var(--black)",
          padding: "10px 14px",
          cursor: "pointer",
          transform: "translateY(0)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "3px 3px 0 var(--black)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "4px 4px 0 var(--black)";
        }}
      >
        KRM<span style={{ marginLeft: 2 }}>.</span>
      </button>

      {/* Nav links or menu toggle */}
      {!isMobile ? (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {["services", "work", "projects", "skills", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              style={{
                fontWeight: 800,
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--black)",
                background: "var(--cream)",
                border: "3px solid var(--black)",
                borderRadius: "6px",
                boxShadow: "3px 3px 0 var(--black)",
                padding: "10px 14px",
                cursor: "pointer",
                transform: "translateY(0)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease, opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "2px 2px 0 var(--black)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.95";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "3px 3px 0 var(--black)";
              }}
            >
              {item}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              fontWeight: 800,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--black)",
              background: "var(--cream)",
              border: "3px solid var(--black)",
              borderRadius: "6px",
              boxShadow: "3px 3px 0 var(--black)",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Menu
          </button>
          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                border: "3px solid var(--black)",
                background: "var(--cream)",
                boxShadow: "6px 6px 0 var(--black)",
                borderRadius: "8px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "220px",
              }}
            >
              {["services", "work", "projects", "skills", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  style={{
                    textAlign: "left",
                    fontWeight: 800,
                    fontSize: "11px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--black)",
                    background: "var(--cream)",
                    border: "3px solid var(--black)",
                    borderRadius: "6px",
                    boxShadow: "3px 3px 0 var(--black)",
                    padding: "10px 12px",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="nb-btn"
                style={{ padding: "10px 12px", fontSize: "11px", boxShadow: "4px 4px 0 var(--black)" }}
              >
                Hire Me ↗
              </button>
            </div>
          )}
        </div>
      )}

      {/* CTA (hidden on mobile, inside menu) */}
      {!isMobile && (
        <button
          onClick={() => scrollTo("contact")}
          className="nb-btn"
          style={{
            padding: "12px 22px",
            fontSize: "11px",
            boxShadow: "4px 4px 0 var(--black)",
          }}
        >
          Hire Me ↗
        </button>
      )}
    </nav>
  );
}
