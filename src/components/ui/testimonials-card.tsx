import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

export type TestimonialItem = {
  id: number
  title: string
  description: string
  image: string
}

export function TestimonialsCard({ items }: { items: TestimonialItem[] }) {
  const safeItems = useMemo(
    () =>
      items.map((it, i) => ({
        ...it,
        image: it.image || ["/globe.svg", "/next.svg", "/vercel.svg"][i % 3],
      })),
    [items]
  )
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % safeItems.length), 3000)
    return () => clearInterval(id)
  }, [safeItems.length])

  return (
    <div
      style={{
        width: 360,
        height: 240,
        border: "3px solid var(--black)",
        borderRadius: 12,
        background: "var(--cream)",
        boxShadow: "6px 6px 0 rgba(0,0,0,0.15)",
        overflow: "hidden",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "140px 1fr",
      }}
    >
      <div style={{ position: "relative" }}>
        <AnimatePresence initial={true} mode="wait">
          <motion.div
            key={safeItems[index].id}
            initial={{ opacity: 0, scale: 0.92, x: -12 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 12 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={safeItems[index].image}
              alt={safeItems[index].title}
              fill
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement
                el.src = "/globe.svg"
              }}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <AnimatePresence initial={true} mode="wait">
          <motion.div
            key={`text-${safeItems[index].id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            <div style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em" }}>
              {safeItems[index].title}
            </div>
            <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>
              {safeItems[index].description}
            </div>
          </motion.div>
        </AnimatePresence>
        <div style={{ marginTop: "auto", display: "flex", gap: 6 }}>
          {safeItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "2px solid var(--black)",
                background: i === index ? "var(--mustard)" : "transparent",
                boxShadow: "2px 2px 0 var(--black)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

