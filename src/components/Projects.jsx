
import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import "../styles/Projects.css"

gsap.registerPlugin(ScrollTrigger)

// ==========================================
// FEATURED PROJECTS
// ==========================================

const projects = [
  {
    slug: "venex",
    title: "VENEX",
    desc: "An event management experience connecting customers, vendors, and event coordinators through user-centered design.",
    category: "UX/UI Design · Mobile Application",

    imageName: "venex",

    link: "https://client-venex.vercel.app",

    slideLink:
      "https://docs.google.com/presentation/d/e/2PACX-1vTuYh51QJgHive3_RbQOD6EDHQWB3KAt8_K3xH6FwnnSKU01RmtAmYrk74KS4y6fWk90Tclk4qOewxO/pub?start=false&loop=false&delayms=3000",

    status: "LIVE"
  },
  {
    slug: "The_Garden_Creamery",
    title: "The Garden Creamery",
    desc: "A responsive website designed to help customers discover ice cream flavors, explore the brand, and find shop locations.",
    category: "Responsive Web Design · Front-End Development",

    imageName: "gardenCreamery",

    link: null,

    slideLink:
      "https://docs.google.com/presentation/d/e/2PACX-1vRvJHeWErW2j_U1oRzjI9N-7ozlJ6uJC2u09-eFQo_XAPDGzt2l94pbgcMk4nGkDgZnu1DL7FHIduSq/pub?start=false&loop=false&delayms=3000",

    status: "CASE STUDY"
  },
  {
    slug: "yosemite-go",
    title: "Yosemite Go",
    desc: "A mobile experience designed to help Yosemite visitors explore destinations, discover activities, and plan their adventures.",
    category: "UX/UI Design · Mobile Experience",

    imageName: "yosemiteGo",

    link: null,

    slideLink:
      "https://docs.google.com/presentation/d/e/2PACX-1vSAJ81HAUBxTJEotCb3y0M4HpEQwu4Ni5tQW5pp9um7Y-XfD5BvDSJsU2UMH8rrBvskFWXIcFPbukOn/pub?start=false&loop=false&delayms=3000",

    status: "CASE STUDY"
  }
]

// ==========================================
// IMAGE COMPONENT
// Supports PNG, JPG, JPEG and WEBP
// ==========================================

const imageExtensions = [
  "png",
  "jpg",
  "jpeg",
  "webp"
]

function ProjectImage({ imageName, title }) {
  const [imageIndex, setImageIndex] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setImageIndex(0)
    setImageFailed(false)
  }, [imageName])

  const imagePath =
    `/images/${imageName}.${imageExtensions[imageIndex]}`

  const handleImageError = () => {
    if (imageIndex < imageExtensions.length - 1) {
      setImageIndex((previous) => previous + 1)
    } else {
      setImageFailed(true)
    }
  }

  if (imageFailed) {
    return (
      <div
        style={{
          width: "100%",
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#151515",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
          boxSizing: "border-box"
        }}
      >
        {title}
      </div>
    )
  }

  return (
    <img
      key={imagePath}
      src={imagePath}
      alt={`${title} project preview`}
      loading="lazy"
      onError={handleImageError}
      style={{
        display: "block",
        width: "100%",
        height: "220px",
        objectFit: "cover"
      }}
    />
  )
}

// ==========================================
// PROJECTS COMPONENT
// ==========================================

export default function Projects() {
  const [columns, setColumns] = useState(3)
  const sectionRef = useRef(null)

  // ========================================
  // GSAP SCROLL ANIMATION
  // ========================================

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return
    }

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(
        "[data-project-card]",
        section
      )

      
cards.forEach((card, index) => {
  const isDesktop = window.innerWidth >= 1200

  // ORIGINAL ANIMATION — TABLET AND MOBILE
  const originalDirection = index % 2 === 0 ? 1 : -1

  const originalRotation = originalDirection * -70

  const originalOrigin =
    originalDirection > 0
      ? "right center"
      : "left center"

  // NEW ANIMATION — DESKTOP ONLY
  const desktopRotation =
    index === 0 ? 65 :
    index === 2 ? -65 :
    0

  const desktopOrigin =
    index === 0 ? "right center" :
    index === 2 ? "left center" :
    "center center"

  gsap.fromTo(
    card,
    {
      autoAlpha: 0.25,

      y:
        isDesktop && index === 1
          ? 25
          : 55,

      rotationY: isDesktop
        ? desktopRotation
        : originalRotation,

      scale:
        isDesktop && index === 1
          ? 1
          : 0.9,

      transformOrigin: isDesktop
        ? desktopOrigin
        : originalOrigin,

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

  // ========================================
  // RESPONSIVE GRID
  // ========================================

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

    return () =>
      window.removeEventListener("resize", handleResize)
  }, [])

  // ========================================
  // RENDER
  // ========================================

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="portfolio-projects-section"
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
          background: "rgba(17, 17, 17, 0.74)",
          padding: "40px",
          borderRadius: "16px"
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "40px",
            color: "#fff"
          }}
        >
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
          {projects.map((p) => (
            <div
              key={p.slug}
              data-project-trigger
              style={{
                perspective: "1100px",
                minWidth: 0
              }}
            >
              <div
                data-project-card
                style={{
                  background: "#000",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  transition:
                    "filter 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter =
                    "brightness(1.08)"

                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(0,0,0,0.6)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter =
                    "brightness(1)"

                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                {/* CLICKABLE PROJECT IMAGE */}

                <a
                  href={p.slideLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${p.title} case study`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    cursor: "pointer"
                  }}
                >
                  <ProjectImage
                    imageName={p.imageName}
                    title={p.title}
                  />
                </a>

                {/* LIVE STATUS BADGE */}

                {p.status === "LIVE" && (
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
                      pointerEvents: "none"
                    }}
                  >
                    LIVE
                  </div>
                )}

                {/* PROJECT INFORMATION */}

                <div
                  style={{
                    padding: "20px",
                    color: "#fff"
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "10px"
                    }}
                  >
                    {p.title}
                  </h3>

                  <p
                    style={{
                      opacity: 0.7,
                      fontSize: "14px"
                    }}
                  >
                    {p.desc}
                  </p>

                  {/* PROJECT LINKS */}

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "16px",
                      marginTop: "20px"
                    }}
                  >
                    <a
                      href={p.slideLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#00ffcc",
                        fontSize: "13px",
                        fontWeight: 600,
                        textDecoration: "none"
                      }}
                    >
                      View Case Study ↗
                    </a>

                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#fff",
                          fontSize: "13px",
                          textDecoration: "underline",
                          textUnderlineOffset: "4px"
                        }}
                      >
                        View Live App ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
