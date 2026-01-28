import "./Skills.css";
import {
  FaCode, FaServer, FaHtml5, FaCss3Alt, FaJsSquare,
  FaReact, FaGitAlt, FaPaintBrush, FaLaptopCode
} from "react-icons/fa";
import { GrMysql } from "react-icons/gr";

import nextIcon from "../../../../assets/images/Next.js.png";
import javaIcon from "../../../../assets/images/java.png";
import pythonIcon from "../../../../assets/images/python.png";
import excelIcon from "../../../../assets/images/excel.png";
import nodejsIcon from "../../../../assets/images/nodejs.png";
import postgresqlIcon from "../../../../assets/images/postgresql.png";
import springIcon from "../../../../assets/images/spring.png";
import postmanIcon from "../../../../assets/images/postman.png";
import gitIcon from "../../../../assets/images/git.png";
import wordpressIcon from "../../../../assets/images/wordpress.png";


const skillsData = {
  backend: {
    title: "Backend",
    icon: <FaServer />,
    skills: [
      { image: javaIcon, name: "Java" },
      { image: springIcon, name: "Spring" },
      { image: pythonIcon, name: "Python" },
      { icon: GrMysql, color: "#00758F", name: "MySQL" },
      { image: postgresqlIcon, name: "PostgreSQL" },
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
      { image: gitIcon, name: "Git" },
      { image: nextIcon, name: "Next.js" },
      { image: postmanIcon, name: "Postman" },
      { image: nodejsIcon, name: "Node.js" },
      { image: excelIcon, name: "Excel" },
      { image: wordpressIcon, name: "WordPress" },
    ],
  },
};

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <h2 className="section-title">Habilidades</h2>
      <p className="skills-subtitle">
        Desenvolvo soluções e busco aprimorar meus conhecimentos nas seguintes tecnologias:
      </p>

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
