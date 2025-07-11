import { useState } from "react";
import "./Skills.css";
import { FaCode, FaServer, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import { SiFigma, SiAdobephotoshop } from "react-icons/si";
import { FaPaintBrush } from "react-icons/fa";

const skillsData = {
  frontend: {
    title: "Frontend",
    icon: <FaCode />,
    skills: [
      { icon: FaHtml5, color: "#e44d26" },
      { icon: FaCss3Alt, color: "#264de4" },
      { icon: FaJsSquare, color: "#f7df1e" },
      { icon: FaReact, color: "#61dbfb" },
    ],
  },
  backend: {
    title: "Backend",
    icon: <FaServer />,
    skills: [
      { icon: FaNodeJs, color: "#83CD29" },
      { icon: FaPython, color: "#3776ab" },
      { icon: GrMysql, color: "#00758F" },
    ],
  },
  design: {
    title: "Outros",
    icon: <FaPaintBrush />,
    skills: [
      { icon: SiFigma, color: "#a259ff" },
      { icon: SiAdobephotoshop, color: "#31A8FF" },
    ],
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");

  return (
    <section className="skills section" id="skills">
      <h2 className="section-title">Habilidades</h2>

      <div className="skills-container container grid">
        {Object.entries(skillsData).map(([key, { title, icon, skills }]) => (
          <div
            className={`skills-content ${activeTab === key ? "skills-active" : "skills-close"}`}
            key={key}
          >
            <div
              className="skills-header"
              onClick={() => setActiveTab(activeTab === key ? "" : key)}
            >
              <i className="skills-icon">{icon}</i>
              <div>
                <h1 className="skills-title">{title}</h1>
              </div>
              <i className="skills-arrow">&#9662;</i>
            </div>

            <div className="skills-list">
  {activeTab === key &&
    skills.map(({ icon: Icon, color }, index) => (
      <div key={index} className="skill-icon-wrapper">
        <Icon className="skill-icon" color={color} />
      </div>
    ))}
</div>

          </div>
        ))}
      </div>
    </section>
  );
}
