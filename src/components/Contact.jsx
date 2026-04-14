import { useState } from "react"

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [status, setStatus] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("Sending...")

    try {
      const res = await fetch("https://ajimenez-backend.onrender.com/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(form)
})

      if (res.ok) {
        setStatus("Message sent ✅")
        setForm({ name: "", email: "", message: "" })
      } else {
        setStatus("Failed to send ❌")
      }
    } catch {
      setStatus("Server error ❌")
    }
  }

  return (
    <section id="contact" className="contact">
      <h2 className="section-title">Contact</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
        />

        <button type="submit">Send Message</button>
      </form>

      <p>{status}</p>
    </section>
  )
}