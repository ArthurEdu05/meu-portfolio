import "./Skills.css";
import { FaCode, FaServer, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaPython, FaPaintBrush } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import { SiFigma, SiAdobephotoshop } from "react-icons/si";

const skillsData = {
  frontend: {
    title: "Frontend",
    icon: <FaCode />,
    skills: [
      { icon: FaHtml5, color: "#e44d26", name: "HTML5" },
      { icon: FaCss3Alt, color: "#264de4", name: "CSS3" },
      { icon: FaJsSquare, color: "#f7df1e", name: "JavaScript" },
      { icon: FaReact, color: "#61dbfb", name: "React" },
    ],
  },
  backend: {
    title: "Backend",
    icon: <FaServer />,
    skills: [
      { icon: FaNodeJs, color: "#83CD29", name: "Node.js" },
      { icon: FaPython, color: "#3776ab", name: "Python" },
      { icon: GrMysql, color: "#00758F", name: "MySQL" },
    ],
  },
  design: {
    title: "Outros",
    icon: <FaPaintBrush />,
    skills: [
      { icon: SiFigma, color: "#a259ff", name: "Figma" },
      { icon: SiAdobephotoshop, color: "#31A8FF", name: "Photoshop" },
    ],
  },
};

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <h2 className="section-title">Habilidades</h2>

      <div className="skills-wrapper">
        {Object.entries(skillsData).map(([key, { title, icon, skills }]) => (
          <div className="skills-content" key={key}>
            <div className="skills-header">
              <i className="skills-icon">{icon}</i>
              <h1 className="skills-title">{title}</h1>
            </div>

            <div className="skills-list">
              {skills.map(({ icon: Icon, color, name }, index) => (
                <div key={index} className="skill-icon-wrapper" data-name={name}>
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
