import ShowcaseCard from "@/components/ShowcaseCard"

type Item = {
  title: string
  image?: string
  videoSrc?: string
  poster?: string
  comments?: string[]
  sources?: string[]
}

export default function ShowcaseGallery({ items }: { items: Item[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gridTemplateRows: "auto auto",
        gridTemplateAreas: `"main sideTop" "main sideBottom"`,
        gap: 12,
        alignItems: "start",
        transform: "scale(0.82)",
        transformOrigin: "top left",
      }}
    >
      <div style={{ gridArea: "main", display: "flex", justifyContent: "center", transform: "rotate(-1.5deg)" }}>
        {items[0] && (
          <ShowcaseCard
            title={items[0].title}
            image={items[0].image}
            videoSrc={items[0].videoSrc}
            poster={items[0].poster}
            variant="large"
          />
        )}
      </div>
      <div style={{ gridArea: "sideTop", display: "flex", justifyContent: "center", transform: "rotate(1deg)" }}>
        {items[1] && (
          <ShowcaseCard
            title={items[1].title}
            image={items[1].image}
            videoSrc={items[1].videoSrc}
            poster={items[1].poster}
            variant="small"
          />
        )}
      </div>
      <div style={{ gridArea: "sideBottom", display: "flex", justifyContent: "center", transform: "rotate(-0.5deg)" }}>
        {items[2] && (
          <ShowcaseCard
            title={items[2].title}
            image={items[2].image}
            videoSrc={items[2].videoSrc}
            poster={items[2].poster}
            variant="small"
          />
        )}
      </div>
    </div>
  )
}
