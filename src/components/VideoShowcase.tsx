import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

type Comment = { author: string; text: string; avatar?: string }

export default function VideoShowcase({
  videoSrc = "/ads-3d.mp4",
  poster = "/video-poster.jpg",
  comments = [
    { author: "Director", text: "Clean edit, strong narrative pacing." },
    { author: "Client", text: "Color grading sells the mood perfectly." },
    { author: "Producer", text: "Transitions feel premium and modern." },
  ],
}: {
  videoSrc?: string
  poster?: string
  comments?: Comment[]
}) {
  const [broken, setBroken] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
      style={{
        width: 540,
        height: 280,
        border: "3px solid var(--black)",
        borderRadius: 12,
        background: "var(--cream)",
        boxShadow: "6px 6px 0 rgba(0,0,0,0.15)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "60% 40%",
      }}
    >
      <div style={{ position: "relative", background: "#000" }}>
        {broken ? (
          <div style={{ position: "absolute", inset: 0 }}>
            <Image
              src="/globe.svg"
              alt="Video unavailable"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        ) : (
          <video
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            controls
            onError={() => setBroken(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            left: 12,
            bottom: 12,
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            padding: "6px 10px",
            fontSize: 10,
            letterSpacing: "0.06em",
            borderRadius: 8,
            border: "2px solid var(--mustard)",
          }}
        >
          3D Ad Edit • Premiere Pro • After Effects • Color Grading
        </div>
      </div>
      <div
        style={{
          padding: 14,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          background: "linear-gradient(180deg, #fff, #f7f2e9)",
          borderLeft: "3px solid var(--black)",
        }}
      >
        <div
          style={{
            fontWeight: 900,
            fontSize: 16,
            letterSpacing: "-0.01em",
            color: "var(--black)",
          }}
        >
          Comments
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {comments.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 32, delay: 0.08 * i }}
              style={{
                display: "grid",
                gridTemplateColumns: "28px 1fr",
                gap: 8,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "2px solid var(--black)",
                  background: "var(--mustard)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                {c.author.slice(0, 1)}
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700 }}>{c.author}:</span> {c.text}
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
          <span
            className="tag"
            style={{
              fontSize: 10,
              border: "2px solid var(--black)",
              padding: "4px 8px",
              boxShadow: "2px 2px 0 var(--black)",
            }}
          >
            4K HDR
          </span>
          <span
            className="tag"
            style={{
              fontSize: 10,
              border: "2px solid var(--black)",
              padding: "4px 8px",
              boxShadow: "2px 2px 0 var(--black)",
            }}
          >
            60 FPS
          </span>
        </div>
      </div>
    </motion.div>
  )
}

