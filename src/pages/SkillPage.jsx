import { Link, useParams } from "react-router-dom";
import { skills } from "../utils/data/skills";
import "../styles/SkillPage.css";

// Enable when project visuals are ready
const SHOW_SELECTED_WORK = false;

// Original AJ Studio icons
const skillIcons = {
  "web-design": "/icons/uiux.png",
  programming: "/icons/ai.png",
  "3d": "/icons/3d.png",
  digital: "/icons/web.png",
  motion: "/icons/motion.png"
};

export default function SkillPage() {
  const { slug } = useParams();
  const skill = skills.find(item => item.slug === slug);

  if (!skill) {
    return (
      <main className="skill-page">
        <h1>Skill not found</h1>
        <Link to="/">Return Home</Link>
      </main>
    );
  }

  return (
    <main className="skill-page">
      <div className="skill-page-container">

        <Link className="skill-back" to="/">
          ← Back to Portfolio
        </Link>

        <header className="skill-page-header">

          <div className="skill-page-icon">
            <img
              src={skillIcons[skill.slug]}
              alt=""
              draggable={false}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
                display: "block"
              }}
            />
          </div>

          <span className="skill-page-label">
            CREATIVE TECHNOLOGIST / SKILLSET
          </span>

          <h1>{skill.title}</h1>
          <h2>{skill.subtitle}</h2>
          <p>{skill.description}</p>

        </header>

        <section className="skill-page-section">
          <h2>Tools & Technologies</h2>

          <div className="skill-page-tools">
            {skill.tools.map(tool => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </section>

        {/* SELECTED WORK — TEMPORARILY HIDDEN */}

        {SHOW_SELECTED_WORK && (
          <section className="skill-page-section">

            <h2>Selected Work</h2>

            <p>
              Projects demonstrating this area of my
              creative and technical practice.
            </p>

            <div className="skill-page-projects">
              {skill.projects.map(project => (
                <div
                  className="skill-project-card"
                  key={project}
                >
                  <div className="skill-project-placeholder">
                    <span>PROJECT VISUAL</span>
                  </div>

                  <h3>{project}</h3>
                </div>
              ))}
            </div>

          </section>
        )}

      </div>
    </main>
  );
}