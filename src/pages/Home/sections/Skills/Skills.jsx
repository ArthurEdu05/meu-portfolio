import { Server, MonitorSmartphone, Database, Wrench } from "lucide-react";
import {
  SiSpringboot,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiFastapi,
  SiSwagger,
  SiAngular,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiMysql,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiAmazonwebservices,
  SiDatadog,
  SiSupabase,
  SiGit,
  SiClaude,
  SiOpenai,
  SiJira,
  SiConfluence,
  SiFigma,
  SiPostman,
  SiWordpress,
  SiFilezilla,
} from "react-icons/si";
import SectionHeader from "../../../../components/SectionHeader";
import { RevealGroup, RevealItem } from "../../../../components/Reveal";
import "./Skills.css";
import javaLogo from "../../../../assets/images/java.png";
import pythonLogo from "../../../../assets/images/python.png";

// Cores das marcas, levemente ajustadas para contraste em fundo escuro
const categories = [
  {
    title: "Backend",
    description: "APIs RESTful, regras de negócio e arquitetura de serviços.",
    icon: Server,
    skills: [
      { image: javaLogo, name: "Java" },
      { icon: SiSpringboot, color: "#6db33f", name: "Spring Boot" },
      { icon: SiNodedotjs, color: "#5fa04e", name: "Node.js" },
      { icon: SiExpress, name: "Express" },
      { image: pythonLogo, name: "Python" },
      { icon: SiFastapi, color: "#009688", name: "FastAPI" },
      { icon: SiPrisma, name: "Prisma" },
      { icon: SiSwagger, color: "#85ea2d", name: "Swagger" },
    ],
  },
  {
    title: "Frontend",
    description: "Interfaces reativas, responsivas e bem estruturadas.",
    icon: MonitorSmartphone,
    skills: [
      { icon: SiAngular, color: "#ff4b6b", name: "Angular" },
      { icon: SiReact, color: "#61dafb", name: "React" },
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiTypescript, color: "#4a9eff", name: "TypeScript" },
      { icon: SiJavascript, color: "#f7df1e", name: "JavaScript" },
      { icon: SiTailwindcss, color: "#38bdf8", name: "Tailwind CSS" },
      { icon: SiHtml5, color: "#f06529", name: "HTML & CSS" },
    ],
  },
  {
    title: "Dados & Cloud",
    description: "Modelagem, persistência, cache, infraestrutura e monitoramento.",
    icon: Database,
    skills: [
      { icon: SiMysql, color: "#4a9cc4", name: "MySQL" },
      { icon: SiPostgresql, color: "#699eca", name: "PostgreSQL" },
      { icon: SiSupabase, color: "#3ecf8e", name: "Supabase" },
      { icon: SiRedis, color: "#ff4438", name: "Redis" },
      { icon: SiDocker, color: "#2496ed", name: "Docker" },
      { icon: SiAmazonwebservices, color: "#ff9900", name: "AWS" },
      { icon: SiDatadog, color: "#9f6fe8", name: "Datadog" },
    ],
  },
  {
    title: "Ferramentas & Práticas",
    description: "Versionamento, IA no desenvolvimento, metodologias ágeis e design.",
    icon: Wrench,
    skills: [
      { icon: SiGit, color: "#f05032", name: "Git" },
      { icon: SiClaude, color: "#d97757", name: "Claude Code" },
      { icon: SiOpenai, name: "Codex" },
      { icon: SiJira, color: "#4c9aff", name: "Jira" },
      { icon: SiConfluence, color: "#4c9aff", name: "Confluence" },
      { icon: SiFigma, color: "#f24e1e", name: "Figma" },
      { icon: SiPostman, color: "#ff6c37", name: "Postman" },
      { icon: SiWordpress, color: "#4ba3d3", name: "WordPress" },
      { icon: SiFilezilla, color: "#e3403b", name: "FileZilla" },
    ],
  },
];

export default function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          id="skills-title"
          eyebrow="02 · Habilidades"
          title="Stack e competências"
          subtitle="Tecnologias que uso no dia a dia para desenvolver soluções completas, do banco de dados à interface."
        />

        <RevealGroup className="skills__grid" stagger={0.1}>
          {categories.map(({ title, description, icon: Icon, skills }) => (
            <RevealItem
              as="article"
              key={title}
              className="skills__card card-hover"
            >
              <header className="skills__head">
                <span className="skills__icon">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h3 className="skills__title">{title}</h3>
                  <p className="skills__desc">{description}</p>
                </div>
              </header>

              <ul className="skills__list">
                {skills.map(({ icon: SkillIcon, image, color, name }) => (
                  <li key={name} className="skill">
                    <span className="skill__logo">
                      {image ? (
                        <img src={image} alt="" width="20" height="20" loading="lazy" />
                      ) : (
                        <SkillIcon color={color} aria-hidden="true" />
                      )}
                    </span>
                    <span className="skill__name">{name}</span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
