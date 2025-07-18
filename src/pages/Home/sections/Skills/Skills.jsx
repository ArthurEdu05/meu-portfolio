import "./Skills.css";
import {
  FaCode, FaServer, FaHtml5, FaCss3Alt, FaJsSquare,
  FaReact, FaNodeJs, FaGitAlt, FaPaintBrush, FaLaptopCode
} from "react-icons/fa";
import { GrMysql } from "react-icons/gr";

import nextIcon from "../../../../assets/images/Next.js.png";
import javaIcon from "../../../../assets/images/java.png";
import pythonIcon from "../../../../assets/images/python.png";
import excelIcon from "../../../../assets/images/excel.png";
import photoshopIcon from "../../../../assets/images/photoshop.png";

const skillsData = {
  backend: {
    title: "Backend",
    icon: <FaServer />,
    skills: [
      { image: javaIcon, name: "Java" },
      { image: pythonIcon, name: "Python" },
      { icon: GrMysql, color: "#00758F", name: "MySQL" },
      { icon: FaNodeJs, color: "#83CD29", name: "Node.js" },
    ],
  },
  frontend: {
    title: "Frontend",
    icon: <FaCode />,
    skills: [
      { icon: FaReact, color: "#61DBFB", name: "React" },
      { icon: FaJsSquare, color: "#F7DF1E", name: "JavaScript" },
      { icon: FaHtml5, color: "#E44D26", name: "HTML5" },
      { icon: FaCss3Alt, color: "#264de4", name: "CSS3" },
    ],
  },
  design: {
    title: "Outros",
    icon: <FaLaptopCode />,
    skills: [
      { icon: FaGitAlt, color: "#f1502f", name: "Git" },
      { image: nextIcon, name: "Next.js" },
      { image: photoshopIcon, name: "Photoshop" },
      { image: excelIcon, name: "Excel" },
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
              {skills.map(({ icon: Icon, color, image, name }, index) => (
                <div key={index} className="skill-icon-wrapper" data-name={name}>
                  {image ? (
                    <img src={image} alt={name} className="skill-image-icon" />
                  ) : (
                    <Icon className="skill-icon" color={color} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
