import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const projects = [
  {
    slug: "Play_Octopus",
    title: "Play Octopus",
    desc: "Ice Cream Shop Branding",
    images: ["/images/Play_Octopus.jpg"],
    link: "https://www.figma.com/proto/AOyLczE5E5sHeGpUKeOyZt/Play-Octopus?node-id=136-38391&p=f&t=aBE9o2U61YViIMi9-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=136%3A17203&show-proto-sidebar=1"
  },
  {
    slug: "The_Garden_Creamery",
    title: "The Garden Creamery",
    desc: "Ice Cream Shop Branding",
    images: ["/images/Garden_Creamery.jpg"],
    link: "https://www.figma.com/proto/UpnSZlpON9y8p3XUnYAWKR/Garden-Creamery?node-id=46-9230&t=drR33WXXZ3A6Axau-1&scaling=min-zoom&content-scaling=fixed&page-id=11%3A1816&starting-point-node-id=13%3A2457"
  },
  {
    slug: "Plenty_Market",
    title: "Plenty Market",
    desc: "Local Farmer's market Site",
    images: ["/images/Plenty_Market.jpg"],
    link: "https://www.figma.com/proto/KJOkt1O8sieXQi1Hs3Rh1H/Plenty-Market?node-id=132-4250&t=Rl2J1uf70aogS3hP-1"
  },
  {
    slug: "venex",
    title: "Venex",
    desc: "Real-time chat platform for creative collaboration",
    images: ["/images/venex.jpg"],
    link: "https://client-venex.vercel.app"
  },
  {
    slug: "signavi",
    title: "SignaVi Studio",
    desc: "Full-stack production system",
    images: ["/images/signavi.jpg"],
    link: "https://signavistudio.store"
  }
]

export default function Projects() {
  const navigate = useNavigate()
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setColumns(1)
      } else if (window.innerWidth < 1200) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section
      id="projects"
      style={{
        padding: "80px 24px",
        background: "#000",
        color: "#fff"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%"
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "40px" }}>
          Selected Work
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "30px"
          }}
        >
          {projects.map((p, i) => (
            <div
              key={i}
              onClick={() => {
                if (p.link) {
                  window.open(p.link, "_blank", "noopener,noreferrer")
                } else {
                  navigate(`/work/${p.slug}`)
                }
              }}
              style={{
                cursor: "pointer",
                background: "#111",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)"
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0,0,0,0.6)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              {p.images?.[0] && (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover"
                  }}
                />
              )}

              {p.link && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "#00ffcc",
                    color: "#000",
                    padding: "6px 10px",
                    fontSize: "11px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    letterSpacing: "0.5px"
                  }}
                >
                  LIVE
                </div>
              )}

              <div style={{ padding: "20px" }}>
                <h3 style={{ marginBottom: "10px" }}>{p.title}</h3>
                <p style={{ opacity: 0.7, fontSize: "14px" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}