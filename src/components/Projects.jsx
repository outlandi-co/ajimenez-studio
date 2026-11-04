import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches) {
      return
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(
        "[data-project-card]",
        section
      )

      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? 1 : -1

        gsap.fromTo(
          card,
          {
            autoAlpha: 0.25,
            y: 55,
            rotationY: direction * -70,
            scale: 0.9,
            transformOrigin: direction > 0
              ? "right center"
              : "left center",
            force3D: true
          },
          {
            autoAlpha: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: card.parentElement,
              start: "top 95%",
              end: "top 60%",
              scrub: 0.9,
              invalidateOnRefresh: true
            }
          }
        )
      })
    }, section)

    return () => context.revert()
  }, [columns])

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
      ref={sectionRef}
  id="projects"
  style={{
    padding: "80px 24px"
  }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          background: "rgba(17, 17, 17, 0.74)", // 🔥 constrained background
          padding: "40px",
          borderRadius: "16px"
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "40px", color: "#fff" }}>
          Selected Work
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: "30px",
            perspective: "1100px"
          }}
        >
          {projects.map((p, i) => (
            <div
              key={i}
              data-project-trigger
              style={{
                perspective: "1100px",
                minWidth: 0
              }}
            >
              <div
              data-project-card
              onClick={() => {
                if (p.link) {
                  window.open(p.link, "_blank", "noopener,noreferrer")
                } else {
                  navigate(`/work/${p.slug}`)
                }
              }}
              style={{
                cursor: "pointer",
                background: "#000",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                transition: "filter 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "brightness(1.08)"
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0,0,0,0.6)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "brightness(1)"
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
                    fontWeight: "bold"
                  }}
                >
                  LIVE
                </div>
              )}

              <div style={{ padding: "20px", color: "#fff" }}>
                <h3 style={{ marginBottom: "10px" }}>{p.title}</h3>
                <p style={{ opacity: 0.7, fontSize: "14px" }}>{p.desc}</p>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}