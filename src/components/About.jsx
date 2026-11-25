import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true
        }
      })

      timeline
        .from(".about-eyebrow", {
          opacity: 0,
          x: -40,
          duration: 0.7,
          ease: "power3.out"
        })

        .from(".about-heading", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power4.out"
        }, "-=0.4")

        .from(".about-tagline", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.5")

        .from(".about-divider", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power3.inOut"
        }, "-=0.4")

        .from(".about-story", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        }, "-=0.4")

        .from(".about-value", {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out"
        }, "-=0.3")

    }, section)

    return () => mm.revert()

  }, [])

  const styles = {
    eyebrow: {
      color: "#69dfe9",
      fontSize: "12px",
      letterSpacing: "3px",
      display: "block",
      marginBottom: "24px"
    },

    heading: {
      fontSize: "clamp(36px, 5vw, 76px)",
      lineHeight: "1.1",
      marginBottom: "24px",
      letterSpacing: "-2px"
    },

    tagline: {
      fontSize: "clamp(18px, 2vw, 26px)",
      color: "#a5adb8",
      lineHeight: "1.6",
      marginBottom: "35px"
    },

    divider: {
      height: "1px",
      width: "100%",
      background: "linear-gradient(90deg, #69dfe9, transparent)",
      margin: "40px 0"
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
      gap: "40px",
      textAlign: "left"
    },

    storyLabel: {
      color: "#69dfe9",
      fontSize: "12px",
      letterSpacing: "2px",
      marginBottom: "20px"
    },

    storyHeading: {
      fontSize: "28px",
      lineHeight: "1.3",
      marginBottom: "20px"
    },

    paragraph: {
      fontSize: "16px",
      lineHeight: "1.9",
      color: "#b7bfc9"
    },

    values: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
      gap: "16px",
      marginTop: "45px"
    },

    card: {
      padding: "24px",
      border: "1px solid rgba(105, 223, 233, 0.2)",
      background: "rgba(105, 223, 233, 0.03)",
      borderRadius: "8px",
      textAlign: "left"
    },

    number: {
      color: "#69dfe9",
      fontSize: "12px",
      letterSpacing: "2px"
    },

    cardTitle: {
      fontSize: "19px",
      marginTop: "15px",
      marginBottom: "10px"
    },

    cardText: {
      color: "#a5adb8",
      fontSize: "14px",
      lineHeight: "1.6"
    }
  }

  const values = [
    {
      number: "01",
      title: "Design",
      description: "Human-centered experiences with clarity, purpose, and visual identity."
    },
    {
      number: "02",
      title: "Development",
      description: "Bridging creative concepts with functional digital solutions."
    },
    {
      number: "03",
      title: "Discipline",
      description: "Military-driven commitment, adaptability, and attention to detail."
    },
    {
      number: "04",
      title: "Innovation",
      description: "Continuous exploration of emerging technologies and creative possibilities."
    }
  ]

  return (
    <section
      id="about"
      className="about"
      ref={sectionRef}
    >

      <span
        className="about-eyebrow"
        style={styles.eyebrow}
      >
        ABOUT / MY JOURNEY / MY PURPOSE
      </span>

      <h2
        className="section-title about-heading"
        style={styles.heading}
      >
        Beyond the Design.
        <br />
        <span style={{ color: "#69dfe9" }}>
          From Ideation to Creation.
        </span>
      </h2>

      <p
        className="about-tagline"
        style={styles.tagline}
      >
        Creative Technologist. Designer. Developer. Veteran.
      </p>

      <div
        className="about-divider"
        style={styles.divider}
      />

      <div style={styles.grid}>

        <div className="about-story">

          <div style={styles.storyLabel}>
            01 / MY CREATIVE JOURNEY
          </div>

          <h3 style={styles.storyHeading}>
            Bridging Creativity and Technology.
          </h3>

          <p style={styles.paragraph}>
            I am a Creative Technologist focused on combining
            design, development, and visual storytelling into
            cohesive digital experiences. My work spans UX/UI
            design, full-stack web development, photography,
            videography, and motion graphics.
          </p>

          <p style={styles.paragraph}>
            My education at Academy of Art University allows
            me to build upon my existing experience while
            exploring new creative technologies and expanding
            my understanding of human-centered design. I strive
            to bridge the gap between functionality and
            aesthetics, transforming ideas into meaningful
            experiences.
          </p>

        </div>

        <div className="about-story">

          <div style={styles.storyLabel}>
            02 / MY FOUNDATION
          </div>

          <h3 style={styles.storyHeading}>
            Built on Discipline. Driven by Purpose.
          </h3>

          <p style={styles.paragraph}>
            As a veteran of the United States Navy and the
            California Army National Guard, I bring a foundation
            of discipline, adaptability, responsibility, and
            resilience to my creative work.
          </p>

          <p style={styles.paragraph}>
            My military experience taught me to perform under
            pressure, collaborate within structured systems,
            and remain focused on achieving objectives. These
            principles continue to influence how I approach
            problem-solving, design challenges, software
            development, and professional collaboration.
          </p>

        </div>

      </div>

      <div
        className="about-divider"
        style={styles.divider}
      />

      <div style={styles.values}>

        {values.map((value) => (

          <div
            key={value.number}
            className="about-value"
            style={styles.card}
          >

            <span style={styles.number}>
              / {value.number}
            </span>

            <h3 style={styles.cardTitle}>
              {value.title}
            </h3>

            <div style={styles.cardText}>
              {value.description}
            </div>

          </div>

        ))}

      </div>

    </section>
  )
}