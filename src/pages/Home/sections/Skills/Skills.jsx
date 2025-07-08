import { useState } from "react";
import "./Skills.css";
import { FaCode, FaServer, FaPaintBrush } from "react-icons/fa";

const skillsData = {
  frontend: {
    title: "Frontend",
    icon: <FaCode />,
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 70 },
      { name: "React", level: 80 },
    ],
  },
  backend: {
    title: "Backend",
    icon: <FaServer />,
    skills: [
      { name: "Node.js", level: 70 },
      { name: "Python", level: 85 },
      { name: "MySQL", level: 75 },

    ],
  },
  design: {
    title: "Outros",
    icon: <FaPaintBrush />,
    skills: [
      { name: "Figma", level: 90 },
      { name: "Photoshop", level: 70 },
    ],
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <section className="skills section" id="skills">
      <h2 className="section-title">
        Habilidades
      </h2>

      <div className="skills-container container grid">
        {Object.entries(skillsData).map(([key, { title, subtitle, icon, skills }]) => (
          <div
            className={`skills-content ${activeTab === key ? "skills-active" : "skills-close"}`}
            key={key}
            data-content
          >
            <div
              className="skills-header"
              onClick={() => setActiveTab(activeTab === key ? "" : key)}
            >
              <i className="skills-icon">{icon}</i>
              <div>
                <h1 className="skills-title">{title}</h1>
                <span className="skills-subtitle">{subtitle}</span>
              </div>
              <i className="skills-arrow">&#9662;</i>
            </div>

            <div className="skills-list grid">
              {activeTab === key &&
                skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="skills-titles">
                      <h3 className="skills-name">{skill.name}</h3>
                      <span className="skills-number">{skill.level}%</span>
                    </div>
                    <div className="skills-bar">
                      <span
                        className="skills-percentage"
                        style={{ width: `${skill.level}%` }}
                      ></span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
