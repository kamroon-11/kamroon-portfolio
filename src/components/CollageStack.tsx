import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function CollageStack({
  images = ["/hero-portrait.jpg", "/collage-1.jpg", "/collage-2.jpg", "/collage-3.jpg"],
  size = 240,
}: {
  images?: string[]
  size?: number
}) {
  const [order, setOrder] = useState(images.slice(0, 4))
  const fallbacks = ["/globe.svg", "/next.svg", "/vercel.svg", "/window.svg"]

  const onSwap = (index: number) => {
    if (index === 0) return
    const next = order.slice()
    const temp = next[0]
    next[0] = next[index]
    next[index] = temp
    setOrder(next)
  }
  const onErrorAt = (index: number) => {
    setOrder(prev => {
      const arr = prev.slice()
      arr[index] = fallbacks[index] || "/globe.svg"
      return arr
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }
  const mainVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.92, rotate: -1 },
    show: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 420, damping: 32 } },
  }
  const thumbVariants = {
    hidden: { opacity: 0, x: 40, y: 24, scale: 0.94, rotate: 2 },
    show: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 420, damping: 32 } },
  }

  return (
    <motion.div
      style={{
        width: size + 140,
        height: size,
        position: "relative",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        layout
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: size,
          height: size,
          border: "3px solid var(--black)",
          borderRadius: 12,
          background: "var(--cream)",
          boxShadow: "6px 6px 0 rgba(0,0,0,0.15)",
          overflow: "hidden",
          zIndex: 3,
        }}
        variants={mainVariants}
      >
        <Image
          src={order[0]}
          alt="Selected image"
          fill
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          priority
          onError={() => onErrorAt(0)}
        />
      </motion.div>

      {order.slice(1, 4).map((src, i) => {
        const offsetX = 40 + i * 50
        const offsetY = 20 + i * 12
        const z = 2 - i
        const w = size - 40
        const h = size - 40
        return (
          <motion.button
            key={src}
            layout
            onClick={() => onSwap(i + 1)}
            style={{
              position: "absolute",
              left: offsetX,
              top: offsetY,
              width: w,
              height: h,
              border: "3px solid var(--black)",
              borderRadius: 12,
              background: "var(--cream)",
              boxShadow: "6px 6px 0 rgba(0,0,0,0.12)",
              overflow: "hidden",
              zIndex: z,
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            aria-label="Swap image into main"
            variants={thumbVariants}
          >
            <Image
              src={src}
              alt="Thumbnail"
              fill
              style={{ objectFit: "cover", objectPosition: "center 45%" }}
              onError={() => onErrorAt(i + 1)}
            />
          </motion.button>
        )
      })}
    </motion.div>
  )
}
