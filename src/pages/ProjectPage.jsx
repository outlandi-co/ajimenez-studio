import { useParams, useNavigate } from "react-router-dom"

const projectData = {
  vortiko: {
    title: "VORTIKO Aerial",
    desc: "Drone cinematography and branding",
    video: "https://www.youtube.com/embed/OiGWppcsh2k"
  },
  venex: {
    title: "Venex",
    desc: "Real-time chat platform for creative collaboration",
    video: "https://client-venex.vercel.app/Intro.mp4",
    link: "https://client-venex.vercel.app" // 🔥 LIVE APP
  },
  signavi: {
    title: "SignaVi Studio",
    desc: "Full-stack production system"
  },
  photography: {
    title: "Photography",
    desc: "Exploration of light, color, and composition"
  },
  caslon: {
    title: "Typography: Caslon",
    desc: "Editorial layout and type study"
  }
}

const projectKeys = Object.keys(projectData)

export default function ProjectPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const project = projectData[slug]
  const currentIndex = projectKeys.indexOf(slug)

  const goHome = () => navigate("/")
  const goNext = () => {
    const nextIndex = (currentIndex + 1) % projectKeys.length
    navigate(`/work/${projectKeys[nextIndex]}`)
  }
  const goPrev = () => {
    const prevIndex =
      (currentIndex - 1 + projectKeys.length) % projectKeys.length
    navigate(`/work/${projectKeys[prevIndex]}`)
  }

  if (!project) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        <h1>Project Not Found</h1>
        <button style={btnStyle} onClick={goHome}>← Back Home</button>
      </div>
    )
  }

  return (
    <div style={{ color: "white", background: "#000", minHeight: "100vh" }}>

      {/* 🔥 NAV */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 20,
          display: "flex",
          gap: "10px"
        }}
      >
        <button style={btnStyle} onClick={goHome}>← Home</button>
        <button style={btnStyle} onClick={goPrev}>← Prev</button>
        <button style={btnStyle} onClick={goNext}>Next →</button>
      </div>

      {/* 🎥 VIDEO */}
      {project.video && (
        project.video.includes(".mp4") ? (
          <video
            src={project.video}
            controls
            style={{
              width: "100%",
              maxHeight: "80vh",
              objectFit: "cover"
            }}
          />
        ) : (
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe
              src={project.video}
              title={project.title}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
            />
          </div>
        )
      )}

      {/* 📝 CONTENT */}
      <div style={{ padding: "60px 40px", maxWidth: "1000px", margin: "0 auto" }}>
        
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
          {project.title}
        </h1>

        <p style={{ fontSize: "1.2rem", lineHeight: "1.6", opacity: 0.9 }}>
          {project.desc}
        </p>

        {/* 🚀 LIVE APP BUTTON */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "25px",
              padding: "12px 20px",
              background: "#00ffcc",
              color: "#000",
              fontWeight: "bold",
              textDecoration: "none",
              borderRadius: "6px"
            }}
          >
            🚀 Launch Live App
          </a>
        )}

        <p style={{ marginTop: "15px", opacity: 0.6 }}>
          ▶️ Click play to hear audio
        </p>

        <div style={{ marginTop: "40px", opacity: 0.8 }}>
          <h2>About This Project</h2>
          <p>
            This project demonstrates real-time communication, frontend deployment,
            and interactive user experience design.
          </p>
        </div>
      </div>

    </div>
  )
}

const btnStyle = {
  padding: "10px 15px",
  background: "#fff",
  color: "#000",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
}