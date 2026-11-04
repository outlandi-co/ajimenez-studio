import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        ".section-title, p",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true
          }
        }
      )
    }, section)

    return () => context.revert()
  }, [])

  return (
    <section id="about" className="about" ref={sectionRef}>
      <h2 className="section-title">About</h2>

      <p>
        I’m a Creative Technologist focused on combining design, development, and visual storytelling 
        into cohesive digital experiences. My work spans UX and UI design, full stack web development, 
        photography, videography, and motion graphics. I approach each project with a balance of 
        functionality and aesthetics, ensuring that every solution is both effective and visually 
        engaging. I enjoy building systems that take ideas from concept to execution with clarity 
        and purpose.
        </p>

      <p>
      I am also a veteran of the United States Navy and the California Army National Guard, where I developed 
      a strong sense of discipline, adaptability, and responsibility. My military experience taught me how to 
      perform under pressure, work within structured systems, and stay mission focused in challenging 
      environments. These values continue to shape my approach to problem solving and creative work today. I 
      bring a high level of commitment, attention to detail, and resilience into every project I take on.
      </p>
    </section>
  )
}