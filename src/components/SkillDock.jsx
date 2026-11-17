
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { skills } from "../utils/data/skills";
import "../styles/skillDock.css";

export default function SkillDock() {
  const [active, setActive] = useState(null);
  const panelRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const selected = active === null ? null : skills[active];

useEffect(() => {
  if (!panelRef.current || active === null) return;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const animation = gsap.fromTo(
    panelRef.current,
    {
      x: -35,
      autoAlpha: 0
    },
    {
      x: 0,
      autoAlpha: 1,
      duration: 0.35,
      ease: "power3.out"
    }
  );

  return () => animation.kill();
}, [active]);

  

useEffect(() => {
  const handleKey = (event) => {
    if (event.key === "Escape") {
      setActive(null);
      setMobileOpen(false);
    }
  };

  window.addEventListener("keydown", handleKey);

  return () => {
    window.removeEventListener("keydown", handleKey);
  };
}, []);



  const openSkill = (index) => {
    setActive(current => current === index ? null : index);
  };

  return (
    <>
      {selected && (
        <button
          type="button"
          className="skill-dismiss"
          aria-label="Close skills menu"
          onClick={() => setActive(null)}
        />
      )}

{/* Mobile floating trigger */}
<button
  type="button"
  className="skill-mobile-trigger"
  onClick={() => {
    setMobileOpen(current => !current);
    setActive(null);
  }}
  aria-label={mobileOpen ? "Close skills menu" : "Open skills menu"}
  aria-expanded={mobileOpen}
>
  <span aria-hidden="true">{mobileOpen ? "×" : "☷"}</span>
</button>

{/* Mobile skills drawer */}
{mobileOpen && (
  <>
    <button
      type="button"
      className="skill-mobile-backdrop"
      onClick={() => setMobileOpen(false)}
      aria-label="Close skills drawer"
    />

    <aside
      className="skill-mobile-drawer"
      aria-label="Skills navigation"
    >
      <div className="skill-mobile-header">
        <h2>Explore My Skills</h2>

        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Close skills drawer"
        >
          ×
        </button>
      </div>

      <nav className="skill-mobile-list">
        {skills.map(skill => (
          <button
            key={skill.slug}
            type="button"
            onClick={() => {
              setMobileOpen(false);
              navigate(`/skills/${skill.slug}`);
              window.scrollTo(0, 0);
            }}
          >
            <span className="skill-mobile-symbol" aria-hidden="true">
              {skill.icon}
            </span>

            <span>{skill.title}</span>

            <span aria-hidden="true">›</span>
          </button>
        ))}
      </nav>
    </aside>
  </>
)}

      <aside className="skill-dock" aria-label="Skills navigation">
        <div className="skill-dock-label">AJ</div>

        {skills.map((skill, index) => (
          <button
            type="button"
            key={skill.slug}
            className={`skill-dock-icon ${
              active === index ? "active" : ""
            }`}
            title={skill.title}
            aria-label={`Explore ${skill.title}`}
            aria-expanded={active === index}
            onClick={() => openSkill(index)}
          >
            <span aria-hidden="true">{skill.icon}</span>
          </button>
        ))}
      </aside>

      {selected && (
        <aside
          ref={panelRef}
          className="skill-panel"
          aria-label={`${selected.title} details`}
        >
          <button
            type="button"
            className="skill-close"
            onClick={() => setActive(null)}
            aria-label="Close panel"
          >
            ×
          </button>

          <span className="skill-eyebrow">
            CREATIVE TOOLKIT / 0{active + 1}
          </span>

          <div className="skill-panel-symbol">
            {selected.icon}
          </div>

          <h2>{selected.title}</h2>
          <h3>{selected.subtitle}</h3>

          <p>{selected.description}</p>

          <div className="skill-divider" />

          <span className="skill-small-heading">
            TOOLS & TECHNOLOGIES
          </span>

          <div className="skill-tags">
            {selected.tools.map(tool => (
              <span key={tool}>{tool}</span>
            ))}
          </div>

          <span className="skill-small-heading">
            RELATED WORK
          </span>

          <ul className="skill-projects">
            {selected.projects.map(project => (
              <li key={project}>{project}</li>
            ))}
          </ul>

          <button
            type="button"
            className="skill-view-button"
            onClick={() => {
              setActive(null);
              navigate(`/skills/${selected.slug}`);
              window.scrollTo(0, 0);
            }}
          >
            Explore Skillset <span aria-hidden="true">↗</span>
          </button>
        </aside>
      )}
    </>
  );
}
