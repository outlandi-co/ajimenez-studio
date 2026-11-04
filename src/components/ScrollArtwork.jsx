import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollArtwork() {
  const visualRef = useRef(null)

  useEffect(() => {
    const visual = visualRef.current
    if (!visual) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (reduceMotion) return

    const context = gsap.context(() => {
      gsap.to(visual, {
        rotation: 220,
        yPercent: -12,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "max",
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
    })

    return () => context.revert()
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        pointerEvents: "none", background: "transparent",
        zIndex: 1
      }}
    >
      <div
        ref={visualRef}
        style={{
          width: "min(58vw, 560px)",
          aspectRatio: "1 / 1",
          opacity: 0.45,
          willChange: "transform", background: "transparent", mixBlendMode: "screen"
        }}
      >
        <svg
          viewBox="0 0 600 600"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="center-glow">
              <stop
                offset="0%"
                stopColor="#00E5EF"
                stopOpacity="0.23"
              />
              <stop
                offset="100%"
                stopColor="#00E5EF"
                stopOpacity="0"
              />
            </radialGradient>
            <linearGradient id="center-lines">
              <stop stopColor="#48EDF0" />
              <stop offset="100%" stopColor="#26639C" />
            </linearGradient>
          </defs>


          <g
            stroke="url(#center-lines)"
            strokeWidth="1.8"
          >
            <ellipse
              cx="300"
              cy="300"
              rx="245"
              ry="105"
              transform="rotate(-34 300 300)"
            />

            <ellipse
              cx="300"
              cy="300"
              rx="245"
              ry="105"
              transform="rotate(34 300 300)"
            />

            <circle cx="300" cy="300" r="185" />

            <circle
              cx="300"
              cy="300"
              r="126"
              strokeDasharray="7 13"
            />

            <rect
              x="187"
              y="187"
              width="226"
              height="226"
              rx="20"
              transform="rotate(45 300 300)"
            />
          </g>

          <circle
            cx="300"
            cy="300"
            r="70"
            fill="#0A2630"
            stroke="#4AEEF0"
            strokeWidth="2"
          />

          <path
            d="M258 329L300 260L342 329M272 309H328"
            stroke="#B8FAFC"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="105"
            cy="177"
            r="9"
            fill="#33DFE8"
          />

          <circle
            cx="493"
            cy="427"
            r="11"
            fill="#33DFE8"
          />
        </svg>
      </div>
    </div>
  )
}
