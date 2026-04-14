import SlideshowCard from "./SlideshowCard"

const projects = [
  {
    title: "VORTIKO Aerial",
    desc: "Drone cinematography and branding",
    images: [
       //"https://via.placeholder.com/600x400",
       //"https://via.placeholder.com/600x400",
       //"https://via.placeholder.com/600x400"
    ]
  },
  {
    title: "SignaVi Studio",
    desc: "Full-stack production system",
    images: [
       //"https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400"
    ]
  },
  {
    title: "Photography",
    desc: "Exploration of light, color, and composition",
    images: [
       //"https://via.placeholder.com/600x400",
       //"https://via.placeholder.com/600x400"
    ]
  },
  {
    title: "Typography: Caslon",
    desc: "Editorial layout and type study",
    images: [
       //"https://via.placeholder.com/600x400",
       //"https://via.placeholder.com/600x400"
    ]
  }
]

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <h2 className="section-title">Selected Work</h2>

      <div className="grid">
        {projects.map((p, i) => (
          <SlideshowCard
            key={i}
            project={p}
            onClick={() => alert(`Open ${p.title}`)} // 🔥 replace later with routing
          />
        ))}
      </div>
    </section>
  )
}