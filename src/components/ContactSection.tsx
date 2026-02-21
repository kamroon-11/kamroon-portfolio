"use client";
import { useState } from "react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "3px solid var(--black)",
    background: "var(--cream)",
    padding: "16px 20px",
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "var(--font-space-grotesk), sans-serif",
    outline: "none",
    color: "var(--black)",
    transition: "box-shadow 0.2s ease",
    cursor: "none",
  };

  return (
    <section
      id="contact"
      style={{
        background: "var(--black)",
        borderTop: "3px solid var(--black)",
        padding: "100px 48px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0px",
            border: "3px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Left: Info */}
          <div
            style={{
              padding: "64px 56px",
              background: "var(--mustard)",
              border: "3px solid var(--black)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div className="section-label" style={{ marginBottom: "32px" }}>
                <span>07</span>
                <span>Contact</span>
              </div>
              <h2
                className="display-name"
                style={{ fontSize: "clamp(36px, 5vw, 68px)", marginBottom: "24px" }}
              >
                Let's Build Something
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  opacity: 0.75,
                  maxWidth: "340px",
                  marginBottom: "40px",
                }}
              >
                Got an ambitious project? A complex interface to untangle? A brand that needs depth? I want to hear about it.
              </p>

              {/* Contact details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  { label: "Email", value: "karman@studio.io" },
                  { label: "Location", value: "New York, USA" },
                  { label: "Available", value: "Q1 2026 — Booking Open" },
                ].map((item) => (
                  <div key={item.label}>
                    <div
                      style={{
                        fontFamily: "Courier New, monospace",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        opacity: 0.5,
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: "14px" }}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "12px", marginTop: "40px" }}>
              {["GitHub", "LinkedIn", "Twitter", "Dribbble"].map((platform) => (
                <button
                  key={platform}
                  style={{
                    border: "2px solid var(--black)",
                    background: "transparent",
                    padding: "8px 14px",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "none",
                    transition: "all 0.2s ease",
                    boxShadow: "2px 2px 0 var(--black)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "var(--black)";
                    e.currentTarget.style.color = "var(--mustard)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--black)";
                  }}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            style={{
              padding: "64px 56px",
              background: "var(--black)",
              border: "3px solid rgba(255,255,255,0.1)",
            }}
          >
            {sent ? (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  animation: "scaleIn 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "var(--mustard)",
                    border: "3px solid var(--cream)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "36px",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "var(--cream)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Message Sent!
                </h3>
                <p
                  style={{
                    color: "rgba(245,240,232,0.55)",
                    fontSize: "14px",
                    textAlign: "center",
                  }}
                >
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    marginBottom: "24px",
                    fontWeight: 800,
                    fontSize: "24px",
                    color: "var(--cream)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Send a Message
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label
                      style={{
                        fontFamily: "Courier New, monospace",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(245,240,232,0.4)",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      style={{
                        ...inputStyle,
                        background: "rgba(255,255,255,0.04)",
                        color: "var(--cream)",
                        border: "2px solid rgba(255,255,255,0.15)",
                      }}
                      onFocus={e => e.target.style.boxShadow = "4px 4px 0 var(--mustard)"}
                      onBlur={e => e.target.style.boxShadow = "none"}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: "Courier New, monospace",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(245,240,232,0.4)",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      required
                      style={{
                        ...inputStyle,
                        background: "rgba(255,255,255,0.04)",
                        color: "var(--cream)",
                        border: "2px solid rgba(255,255,255,0.15)",
                      }}
                      onFocus={e => e.target.style.boxShadow = "4px 4px 0 var(--mustard)"}
                      onBlur={e => e.target.style.boxShadow = "none"}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: "Courier New, monospace",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(245,240,232,0.4)",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      Project Details
                    </label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Tell me about your project, budget, and timeline..."
                      required
                      rows={5}
                      style={{
                        ...inputStyle,
                        background: "rgba(255,255,255,0.04)",
                        color: "var(--cream)",
                        border: "2px solid rgba(255,255,255,0.15)",
                        resize: "vertical",
                      }}
                      onFocus={e => e.target.style.boxShadow = "4px 4px 0 var(--mustard)"}
                      onBlur={e => e.target.style.boxShadow = "none"}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      border: "3px solid var(--mustard)",
                      background: "var(--mustard)",
                      color: "var(--black)",
                      padding: "16px 32px",
                      fontWeight: 800,
                      fontSize: "12px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: "none",
                      boxShadow: "4px 4px 0 rgba(255,255,255,0.15)",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      justifyContent: "center",
                      marginTop: "8px",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translate(-2px, -2px)";
                      e.currentTarget.style.boxShadow = "6px 6px 0 rgba(255,255,255,0.2)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translate(0, 0)";
                      e.currentTarget.style.boxShadow = "4px 4px 0 rgba(255,255,255,0.15)";
                    }}
                  >
                    Send Message →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
