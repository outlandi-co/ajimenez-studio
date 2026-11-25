import "../styles/Contact.css"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const initialForm = {
  name: "",
  email: "",
  message: ""
}

export default function Contact() {
  const sectionRef = useRef(null)
  const buttonRef = useRef(null)
  const submittingRef = useRef(false)

  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [statusType, setStatusType] = useState("")

  useEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true
        }
      })

      timeline
        .from(".contact-eyebrow", {
          opacity: 0,
          x: -40,
          duration: 0.7,
          ease: "power3.out"
        })
        .from(".section-title", {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power4.out"
        }, "-=0.4")
        .from(".contact-description", {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.5")
        .from(".contact-field", {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        }, "-=0.4")
        .from(".contact-submit", {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out"
        }, "-=0.3")

    }, section)

    return () => {
      mm.revert()
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value
    }))

    if (statusType === "error" || statusType === "success") {
      setStatus("")
      setStatusType("")
    }
  }

  const handleButtonHover = (scale) => {
    if (
      isSending ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return

    gsap.to(buttonRef.current, {
      scale,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (submittingRef.current) return

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim()
    }

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("Please complete all required fields.")
      setStatusType("error")
      return
    }

    submittingRef.current = true
    setIsSending(true)
    setStatus("Sending your message...")
    setStatusType("loading")

    try {
      const res = await fetch(
        "https://ajimenez-backend.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      )

      if (!res.ok) {
        throw new Error("Message failed to send")
      }

      setStatus("Thank you! Your message has been sent.")
      setStatusType("success")
      setForm(initialForm)

    } catch {
      setStatus("Unable to send your message. Please try again.")
      setStatusType("error")

    } finally {
      setIsSending(false)
      submittingRef.current = false
    }
  }

  return (
    <section
      id="contact"
      className="contact"
      ref={sectionRef}
    >
      <div className="contact-header">

        <span className="contact-eyebrow">
          CONNECT / COLLABORATE / CREATE
        </span>

        <h2 className="section-title">
          Let's Create Something Together.
        </h2>

        <p className="contact-description">
          From ideation to creation, every great experience
          begins with a conversation. Let's connect and
          explore what we can create together.
        </p>

      </div>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        aria-busy={isSending}
      >

        <div className="contact-field">

          <label htmlFor="contact-name">
            01 / YOUR NAME
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            maxLength={100}
            disabled={isSending}
            required
          />

        </div>

        <div className="contact-field">

          <label htmlFor="contact-email">
            02 / YOUR EMAIL
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            maxLength={254}
            disabled={isSending}
            required
          />

        </div>

        <div className="contact-field">

          <label htmlFor="contact-message">
            03 / YOUR MESSAGE
          </label>

          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell me about your project, idea, or opportunity..."
            value={form.message}
            onChange={handleChange}
            rows={6}
            maxLength={2000}
            disabled={isSending}
            required
          />

          <span className="contact-character-count">
            {form.message.length} / 2000
          </span>

        </div>

        <button
          ref={buttonRef}
          className="contact-submit"
          type="submit"
          disabled={isSending}
          onMouseEnter={() => handleButtonHover(1.03)}
          onMouseLeave={() => handleButtonHover(1)}
        >
          {isSending ? "Sending Message..." : "Send Message ↗"}
        </button>

        <p
          className={`contact-status ${statusType}`}
          role="status"
          aria-live="polite"
        >
          {status}
        </p>

      </form>

    </section>
  )
}
