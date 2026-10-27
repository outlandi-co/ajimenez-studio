import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        [
          "h1",
          "h2",
          ".tagline",
          ".button"
        ],
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          clearProps: "transform"
        }
      )
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <h1>Adam Jimenez</h1>
      <h2>Creative Technologist</h2>
      <p className="tagline">From Ideation to Creation</p>

      <a href="#projects" className="button">
        View Work
      </a>
    </section>
  )
}
