import { useNavigate } from "react-router-dom"

/* 🔥 If you still want to use SlideshowCard, keep it.
   Otherwise this file renders cards directly for full control */
import SlideshowCard from "./SlideshowCard"

const projects = [
  {
    slug: "vortiko",
    title: "VORTIKO Aerial",
    desc: "Drone cinematography and branding",
    images: ["/images/vortiko.jpg"]
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

  return (
    <section
      id="projects"
      style={{
        padding: "80px 40px",
        background: "#000",
        color: "#fff"
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "40px" }}>
        Selected Work
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
              borderRadius: "10px",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)"
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            {/* 🖼 IMAGE */}
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

            {/* 🔥 LIVE BADGE */}
            {p.link && (
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#00ffcc",
                  color: "#000",
                  padding: "5px 10px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  fontWeight: "bold"
                }}
              >
                LIVE
              </div>
            )}

            {/* 📝 TEXT */}
            <div style={{ padding: "20px" }}>
              <h3 style={{ marginBottom: "10px" }}>{p.title}</h3>
              <p style={{ opacity: 0.7 }}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}