
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

  const selected = active === null ? null : skills[active];

  useEffect(() => {
    setActive(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!panelRef.current || active === null) return;

    if (window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches) return;

    gsap.fromTo(
      panelRef.current,
      { x: -35, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.35, ease: "power3.out" }
    );
  }, [active]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") setActive(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
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
