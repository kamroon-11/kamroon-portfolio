 "use client";
import { useState } from "react"
import Image from "next/image"

export default function ShowcaseCard({
  title = "Showcase",
  image = "/hero-portrait.jpg",
  videoSrc,
  poster,
  variant = "small",
}: {
  title?: string
  image?: string
  videoSrc?: string
  poster?: string
  variant?: "small" | "large"
}) {
  const [failed, setFailed] = useState(false)
  const isLarge = variant === "large"
  return (
    <div
      style={{
        width: "100%",
        maxWidth: isLarge ? 260 : 140,
        border: "3px solid var(--black)",
        borderRadius: isLarge ? 14 : 10,
        background: "var(--cream)",
        boxShadow: isLarge ? "5px 5px 0 rgba(0,0,0,0.18)" : "3px 3px 0 rgba(0,0,0,0.18)",
        overflow: "hidden",
        display: "block",
      }}
    >
      <div
        style={{
          position: "relative",
          minHeight: isLarge ? "clamp(140px, 18vw, 200px)" : "clamp(48px, 6vw, 72px)",
          background: "var(--cream)",
          border: "2px solid var(--black)",
          borderRadius: isLarge ? 10 : 8,
          boxShadow: isLarge ? "3px 3px 0 var(--black)" : "2px 2px 0 var(--black)",
          padding: isLarge ? 6 : 3,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", background: "#000", borderRadius: 6, overflow: "hidden" }}>
          {videoSrc && !failed ? (
            <video
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              onError={() => setFailed(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
              priority
            />
          )}
        </div>
      </div>
    </div>
  )
}
