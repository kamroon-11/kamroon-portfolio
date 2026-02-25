"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

/* ─── 3D Tilt Hook ─── */
function use3DTilt(maxAngle = 8) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const dy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.transform = `perspective(800px) rotateY(${dx * maxAngle}deg) rotateX(${-dy * maxAngle}deg) translateZ(10px)`;
    };
    const onLeave = () => {
      el.style.transform = `perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)`;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxAngle]);

  return ref;
}

/* ─── Magnetic Button ─── */
function MagneticButton({
  children,
  className,
  style,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: dx * 0.3, y: dy * 0.3, duration: 0.3, ease: "power2.out" });
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  }, []);

  return (
    <button
      ref={ref}
      className={className}
      style={style}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
}

/* ─── Floating Tag ─── */
function FloatingTag({
  label,
  style,
  delay = 0,
}: {
  label: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      y: -10,
      rotation: "+=2",
      duration: 2 + Math.random(),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay,
    });
  }, [delay]);

  return (
    <span
      ref={ref}
      className="hero-floating-tag"
      style={{
        position: "absolute",
        fontSize: "10px",
        fontWeight: 800,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        background: "var(--mustard)",
        border: "3px solid var(--black)",
        padding: "6px 12px",
        boxShadow: "3px 3px 0 var(--black)",
        whiteSpace: "nowrap",
        zIndex: 5,
        ...style,
      }}
    >
      {label}
    </span>
  );
}

/* ─── Sponsored Ad Video Carousel ─── */
const adVideos = [
  { src: encodeURI("/From KlickPin CF Found a video I want you to see!.mp4"), label: "Showcase Collage" },
  { src: encodeURI("/From KlickPin CF Pin on Phone.mp4"), label: "Pin on Phone" },
  { src: encodeURI("/From KlickPin CF \u041f\u0438\u043d \u043e\u0442 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f Tor Stehula \u043d\u0430 \u0434\u043e\u0441\u043a\u0435 Once a year go some place youve never been _ \u0416\u0438\u0432\u043e\u043f\u0438\u0441\u043d\u044b\u0435 \u043f\u0435\u0439\u0437\u0430\u0436\u0438 \u041f\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0435 \u0432 \u044f\u043f\u043e\u043d\u0438\u044e \u041f\u0435\u0439\u0437\u0430\u0436\u0438Agafonov-max avatar link.mp4"), label: "Scenic Journey" },
];

function SponsoredAdCarousel({ isMobile }: { isMobile: boolean }) {
  const vid = adVideos[0];
  return (
    <div
      style={{
        border: "3px solid var(--black)",
        borderRadius: "14px",
        background: "var(--cream)",
        boxShadow: "4px 4px 0 var(--black)",
        overflow: "hidden",
        width: isMobile ? "160px" : "140px",
        maxWidth: "160px",
        flexShrink: 0,
        margin: isMobile ? "0 auto" : "0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "6px",
          alignItems: "center",
          padding: "10px 12px",
          borderBottom: "3px solid var(--black)",
          flexWrap: "wrap",
        }}
      >
        {["Sponsored", "Ad"].map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "var(--mustard)",
              border: "2px solid var(--black)",
              padding: "4px 8px",
              boxShadow: "2px 2px 0 var(--black)",
            }}
          >
            {t}
          </span>
        ))}
        <span
          style={{
            fontFamily: "Courier New, monospace",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            opacity: 0.5,
          }}
        >
          Showcase
        </span>
      </div>

      <div style={{ overflow: "hidden", position: "relative" }}>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                background: "var(--cream-dark)",
              }}
            >
              <video
                src={vid.src}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                controlsList="nodownload noplaybackrate nofullscreen"
                onContextMenu={(e) => e.preventDefault()}
                preload="auto"
                disablePictureInPicture
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "var(--black)",
            color: "var(--mustard)",
            border: "2px solid var(--black)",
            padding: "3px 8px",
            fontSize: "9px",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          ▶ {vid.label}
        </div>
      </div>

      <div
        style={{
          borderTop: "3px solid var(--black)",
          padding: "8px 10px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <button
          className="nb-btn"
          style={{ padding: "3px 6px", fontSize: "8px" }}
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          View
        </button>
      </div>
    </div>
  );
}

/* ─── Main Hero ─── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = use3DTilt(10);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickersRef = useRef<HTMLDivElement>(null);
  const sponsoredRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* GSAP timeline */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      /* Name letters */
      const letters = nameRef.current?.querySelectorAll(".hero-letter");
      if (letters) {
        gsap.set(letters, { y: 120, opacity: 0, rotateX: -90 });
        tl.to(letters, {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.06,
          ease: "back.out(1.7)",
        });
      }

      /* Subtitle */
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { y: 40, opacity: 0 });
        tl.to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5");
      }

      /* Tagline */
      if (taglineRef.current) {
        gsap.set(taglineRef.current, { y: 30, opacity: 0 });
        tl.to(taglineRef.current, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
      }

      /* CTAs */
      if (ctaRef.current) {
        const btns = ctaRef.current.children;
        gsap.set(btns, { y: 30, opacity: 0 });
        tl.to(btns, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, "-=0.2");
      }

      /* Portrait card */
      if (cardRef.current) {
        gsap.set(cardRef.current, { x: 80, opacity: 0, rotation: 8 });
        tl.to(cardRef.current, { x: 0, opacity: 1, rotation: -2, duration: 0.9, ease: "elastic.out(1, 0.6)" }, "-=0.7");
      }

      /* Sponsored ad carousel */
      if (sponsoredRef.current) {
        gsap.set(sponsoredRef.current, { x: -60, opacity: 0, scale: 0.85, rotation: -6 });
        tl.to(sponsoredRef.current, {
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
        }, "-=0.6");
      }


      /* Badge */
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { scale: 0, rotation: -12 });
        tl.to(badgeRef.current, { scale: 1, rotation: -6, duration: 0.6, ease: "back.out(2)" }, "-=0.4");
      }

      /* Stickers */
      if (stickersRef.current) {
        const stickers = stickersRef.current.children;
        gsap.set(stickers, { scale: 0, opacity: 0 });
        tl.to(stickers, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "back.out(3)" }, "-=0.3");
      }

      /* Scroll indicator */
      if (scrollRef.current) {
        gsap.set(scrollRef.current, { opacity: 0 });
        tl.to(scrollRef.current, { opacity: 0.5, duration: 0.8 }, "-=0.2");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Parallax on mouse */
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const px = (s: number): React.CSSProperties => ({
    transform: `translate(${mouse.x * s}px, ${mouse.y * s}px)`,
    transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
  });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const firstName = "KAR";
  const lastName = "MAN";

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* ── Grid Texture ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--cream-dark) 1px, transparent 1px), linear-gradient(90deg, var(--cream-dark) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.45,
          zIndex: 0,
        }}
      />

      {/* ── Diagonal accent stripe ── */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "50%",
          height: "120%",
          background: "var(--mustard)",
          opacity: 0.06,
          transform: "rotate(-12deg)",
          zIndex: 0,
        }}
      />

      {/* ── Dot Grid Accent ── */}
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "3%",
          width: "200px",
          height: "200px",
          backgroundImage:
            "radial-gradient(var(--black) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          opacity: 0.08,
          zIndex: 0,
        }}
      />

      {/* ── Main Container ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "100px 20px 60px" : "120px 48px 60px",
          width: "100%",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: isMobile ? "40px" : "56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#22c55e",
                border: "2px solid var(--black)",
                boxShadow: "0 0 0 4px rgba(34,197,94,0.2)",
                animation: "heroPulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "Courier New, monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
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

        {/* ── Two Column Layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 480px",
            gap: isMobile ? "48px" : "32px",
            alignItems: "center",
          }}
        >
          {/* ─── LEFT: Typography + CTA ─── */}
          <div style={{ ...px(-6) }}>
            {/* Name */}
            <div
              ref={nameRef}
              style={{
                marginBottom: "24px",
                perspective: "600px",
              }}
            >
              {/* Line 1: Solid fill */}
              <div
                style={{
                  display: "flex",
                  overflow: "hidden",
                  lineHeight: 0.9,
                }}
              >
                {firstName.split("").map((char, i) => (
                  <span
                    key={`f-${i}`}
                    className="hero-letter"
                    style={{
                      fontSize: isMobile ? "clamp(64px, 18vw, 100px)" : "clamp(80px, 9vw, 140px)",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      textTransform: "uppercase",
                      color: "var(--black)",
                      display: "inline-block",
                      textShadow:
                        "3px 3px 0 var(--mustard), 6px 6px 0 rgba(0,0,0,0.12)",
                      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>

              {/* Line 2: Outline stroke */}
              <div
                style={{
                  display: "flex",
                  overflow: "hidden",
                  lineHeight: 0.9,
                  marginTop: "-4px",
                }}
              >
                {lastName.split("").map((char, i) => (
                  <span
                    key={`l-${i}`}
                    className="hero-letter"
                    style={{
                      fontSize: isMobile ? "clamp(64px, 18vw, 100px)" : "clamp(80px, 9vw, 140px)",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      textTransform: "uppercase",
                      color: "transparent",
                      WebkitTextStroke: "3px var(--black)",
                      display: "inline-block",
                      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                    }}
                  >
                    {char}
                  </span>
                ))}

                {/* Inline decorative block */}
                <div
                  ref={badgeRef}
                  style={{
                    alignSelf: "flex-end",
                    marginLeft: "16px",
                    marginBottom: "8px",
                    background: "var(--mustard)",
                    border: "3px solid var(--black)",
                    boxShadow: "4px 4px 0 var(--black)",
                    padding: "8px 14px",
                    transform: "rotate(-6deg)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: "Courier New, monospace",
                    }}
                  >
                    Creative Dev ✦
                  </span>
                </div>
              </div>
            </div>

            {/* Role subtitle */}
            <div
              ref={subtitleRef}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "4px",
                  background: "var(--mustard)",
                  border: "2px solid var(--black)",
                }}
              />
              <p
                style={{
                  fontSize: isMobile ? "15px" : "17px",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  lineHeight: 1.7,
                  maxWidth: "460px",
                  opacity: 0.8,
                }}
              >
                Creative Developer & Design Engineer — I build digital
                experiences that live at the intersection of{" "}
                <span
                  style={{
                    background: "var(--mustard)",
                    padding: "1px 6px",
                    border: "2px solid var(--black)",
                    fontWeight: 700,
                  }}
                >
                  structure
                </span>{" "}
                and{" "}
                <span
                  style={{
                    background: "var(--black)",
                    color: "var(--mustard)",
                    padding: "1px 6px",
                    border: "2px solid var(--black)",
                    fontWeight: 700,
                  }}
                >
                  depth
                </span>
                .
              </p>
            </div>

            {/* Tagline */}
            <div
              ref={taglineRef}
              style={{
                marginBottom: "32px",
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              {["UI / UX", "3D Web", "Motion Design", "Full-Stack"].map(
                (tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      border: "2px solid var(--black)",
                      padding: "6px 14px",
                      background: "var(--cream)",
                      boxShadow: "3px 3px 0 var(--black)",
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <MagneticButton
                className="nb-btn"
                style={{
                  padding: "16px 32px",
                  fontSize: "13px",
                }}
                onClick={() => scrollTo("projects")}
              >
                View Projects ↘
              </MagneticButton>
              <MagneticButton
                className="nb-btn-outline"
                style={{
                  padding: "16px 32px",
                  fontSize: "13px",
                }}
                onClick={() => scrollTo("contact")}
              >
                Get In Touch →
              </MagneticButton>
            </div>
          </div>

          {/* ─── RIGHT: Profile + Sponsored Ad ─── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              gap: isMobile ? "20px" : "20px",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "flex-start",
              marginLeft: isMobile ? "0" : "-120px",
            }}
          >
            {/* (Removed Sponsored Ad) */}

            {/* Portrait Card */}
            <div
              ref={cardRef}
              style={{
                position: "relative",
                border: "4px solid var(--black)",
                borderRadius: "16px",
                background: "var(--cream)",
                boxShadow: "8px 8px 0 var(--black)",
                padding: "16px",
                width: isMobile ? "min(96vw, 360px)" : "360px",
                flexShrink: 0,
                margin: isMobile ? "0 auto" : "0",
                transformStyle: "preserve-3d",
                transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                zIndex: 3,
              }}
            >
              {/* Image container */}
              <div
                style={{
                  border: "3px solid var(--black)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  height: isMobile ? "360px" : "420px",
                  position: "relative",
                  background: "linear-gradient(135deg, #f1e9ff 0%, #fff8e7 100%)",
                }}
              >
                {/* Overlay tech badges */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    display: "flex",
                    gap: "6px",
                    zIndex: 2,
                  }}
                >
                  {["GSAP", "Framer"].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: isMobile ? "9px" : "10px",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background: "var(--black)",
                        color: "var(--mustard)",
                        border: "2px solid var(--black)",
                        padding: "4px 8px",
                        boxShadow: "2px 2px 0 var(--mustard)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {/* Fallback avatar */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    zIndex: 0,
                  }}
                >
                  <span
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "var(--black)",
                      color: "var(--mustard)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 32,
                      fontWeight: 900,
                      border: "3px solid var(--black)",
                      boxShadow: "4px 4px 0 var(--mustard)",
                    }}
                  >
                    K
                  </span>
                </div>
                <img
                  src="/user.jpg"
                  alt="Karman — Creative Developer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 30%",
                    borderRadius: "8px",
                  }}
                />
              </div>

              {/* Card footer */}
              <div style={{ marginTop: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "13px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Karman
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      background: "#22c55e",
                      color: "var(--black)",
                      border: "2px solid var(--black)",
                      padding: "3px 8px",
                      boxShadow: "2px 2px 0 var(--black)",
                    }}
                  >
                    ● Online
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    marginTop: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {["React", "Three.js", "TypeScript", "Next.js"].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background: "var(--mustard)",
                        border: "2px solid var(--black)",
                        padding: "4px 8px",
                        boxShadow: "2px 2px 0 var(--black)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative stickers on profile card */}
              <div ref={stickersRef}>
                {isMobile ? (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      right: "-10px",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "var(--mustard)",
                      border: "3px solid var(--black)",
                      boxShadow: "3px 3px 0 var(--black)",
                      display: "grid",
                      placeItems: "center",
                      transform: "rotate(10deg)",
                      zIndex: 5,
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: 900 }}>✦</span>
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        top: "-24px",
                        left: "-20px",
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "var(--mustard)",
                        border: "3px solid var(--black)",
                        boxShadow: "3px 3px 0 var(--black)",
                        display: "grid",
                        placeItems: "center",
                        transform: "rotate(12deg)",
                        zIndex: 5,
                      }}
                    >
                      <span style={{ fontSize: "16px", fontWeight: 900 }}>✦</span>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        bottom: "-14px",
                        right: "-14px",
                        background: "var(--black)",
                        color: "var(--mustard)",
                        border: "3px solid var(--black)",
                        boxShadow: "3px 3px 0 var(--mustard)",
                        padding: "5px 10px",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        transform: "rotate(-4deg)",
                        zIndex: 5,
                      }}
                    >
                      ← Hire Me
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Floating skill tags */}
            {!isMobile && (
              <>
                <FloatingTag
                  label="GSAP"
                  delay={0}
                  style={{ top: "-16px", right: "-20px", transform: "rotate(6deg)" }}
                />
                <FloatingTag
                  label="Framer"
                  delay={0.4}
                  style={{ top: "50%", right: "-50px", transform: "rotate(-4deg)" }}
                />
              </>
            )}
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div
          style={{
            display: "flex",
            gap: isMobile ? "16px" : "32px",
            marginTop: isMobile ? "48px" : "64px",
            flexWrap: "wrap",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          {[
            { number: "3+", label: "Years Experience" },
            { number: "25+", label: "Projects Delivered" },
            { number: "12k", label: "Lines of Joy" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                border: "3px solid var(--black)",
                background: i === 0 ? "var(--mustard)" : "var(--cream)",
                boxShadow: "4px 4px 0 var(--black)",
                padding: isMobile ? "14px 20px" : "16px 28px",
                minWidth: "140px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "28px" : "36px",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "6px",
                  opacity: 0.6,
                  fontFamily: "Courier New, monospace",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "Courier New, monospace",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "var(--black)",
            animation: "heroScrollLine 1.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Inline Keyframes ── */}
      <style>{`
        @keyframes heroPulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 8px rgba(34,197,94,0.08); }
        }
        @keyframes heroScrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        /* Responsive overrides */
        @media (max-width: 768px) {
          .hero-floating-tag {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
