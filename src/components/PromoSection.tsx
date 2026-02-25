 "use client";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import { Separator } from "@/components/ui/separator";
export default function PromoSection() {
  return (
    <section
      id="promo"
      style={{
        background: "var(--cream)",
        borderTop: "3px solid var(--black)",
        borderBottom: "3px solid var(--black)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "48px 32px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  fontFamily: "Courier New, monospace",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: "var(--mustard)",
                  border: "2px solid var(--black)",
                  padding: "6px 10px",
                  boxShadow: "2px 2px 0 var(--black)",
                }}
              >
                Sponsors & Offers
              </span>
              <Separator decorative orientation="vertical" />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  opacity: 0.6,
                }}
              >
                Reach millions with bold ad creatives
              </span>
            </div>
            <div
              style={{
                fontWeight: 900,
                fontSize: "clamp(24px, 5vw, 48px)",
                letterSpacing: "-0.02em",
                color: "var(--black)",
                marginBottom: 16,
              }}
            >
              Big Advertising Packages
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.7,
                maxWidth: 540,
                opacity: 0.8,
                marginBottom: 20,
              }}
            >
              Showcase your product with cinematic spots, motion edits, and 3D ads. Sponsored placements and partner slots available.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
              {["BrandOne", "StudioX", "MakerLab", "Orbit"].map((n) => (
                <span
                  key={n}
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: "var(--mustard)",
                    border: "2px solid var(--black)",
                    padding: "6px 10px",
                    boxShadow: "2px 2px 0 var(--black)",
                  }}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div>
            <ShowcaseGallery
              items={[
                {
                  title: "Ad • Product A",
                  videoSrc: encodeURI("/From KlickPin CF Found a video I want you to see!.mp4"),
                  poster: "/hero-portrait.jpg",
                },
                {
                  title: "Ad • Product B",
                  videoSrc: encodeURI("/From KlickPin CF Pin on Phone.mp4"),
                  poster: "/hero-portrait.jpg",
                },
                {
                  title: "Ad • Product C",
                  videoSrc: encodeURI("/From KlickPin CF Пин от пользователя Tor Stehula на доске Once a year go some place youve never been _ Живописные пейзажи Путешествие в японию ПейзажиAgafonov-max avatar link.mp4"),
                  poster: "/hero-portrait.jpg",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
