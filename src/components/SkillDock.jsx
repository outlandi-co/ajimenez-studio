import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { skills } from "../utils/data/skills";
import "../styles/skillDock.css";

const skillIcons = {
  "web-design": {
    image: "/icons/uiux.png",
    label: "UI/UX"
  },
  programming: {
    image: "/icons/ai.png",
    label: "AI"
  },
  "3d": {
    image: "/icons/3d.png",
    label: "3D"
  },
  digital: {
    image: "/icons/web.png",
    label: "Web"
  },
  motion: {
    image: "/icons/motion.png",
    label: "Motion"
  }
};

export default function SkillDock() {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const panelRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  const goToSkill = (slug) => {
    setActive(null);
    setMobileOpen(false);
    navigate(`/skills/${slug}`);
    window.scrollTo(0, 0);
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
        aria-label={
          mobileOpen ? "Close skills menu" : "Open skills menu"
        }
        aria-expanded={mobileOpen}
      >
        <span aria-hidden="true">
          {mobileOpen ? "×" : "☷"}
        </span>
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
                  onClick={() => goToSkill(skill.slug)}
                >
                  <span className="skill-mobile-symbol">
                    <img
                      src={skillIcons[skill.slug].image}
                      alt=""
                      draggable={false}
                    />
                  </span>

                  <span>{skill.title}</span>

                  <span aria-hidden="true">›</span>
                </button>
              ))}
            </nav>
          </aside>
        </>
      )}

      {/* Desktop floating SkillDock */}

      <aside
        className="skill-dock"
        aria-label="Skills navigation"
      >
        <div className="skill-dock-label">AJ</div>

        {skills.map((skill, index) => {
          const item = skillIcons[skill.slug];

          const isCurrent =
            location.pathname === `/skills/${skill.slug}`;

          return (
            <button
              type="button"
              key={skill.slug}
              className={`skill-dock-icon ${
                active === index || isCurrent ? "active" : ""
              }`}
              title={skill.title}
              aria-label={`Explore ${skill.title}`}
              aria-expanded={active === index}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => openSkill(index)}
            >
              <img
                className="skill-dock-image"
                src={item.image}
                alt=""
                draggable={false}
              />

              <span className="skill-icon-label">
                {item.label}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Expandable skill panel */}

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
            <img
              src={skillIcons[selected.slug].image}
              alt=""
              draggable={false}
            />
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
            onClick={() => goToSkill(selected.slug)}
          >
            Explore Skillset
            <span aria-hidden="true">↗</span>
          </button>
        </aside>
      )}
    </>
  );
}