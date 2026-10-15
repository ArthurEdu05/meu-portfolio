import { useLayoutEffect, useRef } from "react";
import { Server, MonitorSmartphone, Database, Wrench } from "lucide-react";
import {
  SiSpringboot,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiFastapi,
  SiSwagger,
  SiRabbitmq,
  SiAngular,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
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
import bullmqLogo from "../../../../assets/images/bullmq.png";

// Cores das marcas, levemente ajustadas para contraste em fundo escuro
const categories = [
  {
    title: "Backend",
    description: "APIs RESTful, Clean Architecture, autenticação, integrações, filas assíncronas, etc.",
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
      { image: bullmqLogo, name: "BullMQ" },
      { icon: SiRabbitmq, color: "#ff6600", name: "RabbitMQ" },
    ],
  },
  {
    title: "Frontend",
    description: "SPAs, componentização, consumo de APIs, interfaces responsivas, etc.",
    icon: MonitorSmartphone,
    skills: [
      { icon: SiAngular, color: "#ff4b6b", name: "Angular" },
      { icon: SiTypescript, color: "#4a9eff", name: "TypeScript" },
      { icon: SiJavascript, color: "#f7df1e", name: "JavaScript" },
      { icon: SiReact, color: "#61dafb", name: "React" },
      { icon: SiNextdotjs, name: "Next.js" },
      { icon: SiTailwindcss, color: "#38bdf8", name: "Tailwind CSS" },
      { icon: SiHtml5, color: "#f06529", name: "HTML" },
      { icon: SiCss3, color: "#3d8fe0", name: "CSS" },
    ],
  },
  {
    title: "Dados & Cloud",
    description: "Modelagem, persistência, cache, infraestrutura e monitoramento.",
    icon: Database,
    skills: [
      { icon: SiDocker, color: "#2496ed", name: "Docker" },
      { icon: SiMysql, color: "#4a9cc4", name: "MySQL" },
      { icon: SiDatadog, color: "#9f6fe8", name: "Datadog" },
      { icon: SiAmazonwebservices, color: "#ff9900", name: "AWS" },
      { icon: SiPostgresql, color: "#699eca", name: "PostgreSQL" },
      { icon: SiSupabase, color: "#3ecf8e", name: "Supabase" },
      { icon: SiRedis, color: "#ff4438", name: "Redis" },
    ],
  },
  {
    title: "Ferramentas & Práticas",
    description: "Versionamento, IA no desenvolvimento, gestão de projetos e documentação técnica.",
    icon: Wrench,
    skills: [
      { icon: SiGit, color: "#f05032", name: "Git" },
      { icon: SiPostman, color: "#ff6c37", name: "Postman" },
      { icon: SiJira, color: "#4c9aff", name: "Jira" },
      { icon: SiConfluence, color: "#4c9aff", name: "Confluence" },
      { icon: SiFigma, color: "#f24e1e", name: "Figma" },
      { icon: SiClaude, color: "#d97757", name: "Claude Code" },
      { icon: SiOpenai, name: "Codex" },
      { icon: SiWordpress, color: "#4ba3d3", name: "WordPress" },
      { icon: SiFilezilla, color: "#e3403b", name: "FileZilla" },
    ],
  },
];

const MOBILE = "(max-width: 767px)";
const MAX_NAME_PX = 11.2; // 0.7rem

// No mobile, cada nome é medido e recebe a maior fonte que cabe em uma linha
// dentro do próprio bloco. Assim todos os blocos mantêm a mesma altura.
function useFitSkillNames() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mq = window.matchMedia(MOBILE);

    const fit = () => {
      root.querySelectorAll(".skill__name").forEach((el) => {
        if (!mq.matches) {
          el.style.fontSize = "";
          return;
        }
        el.style.fontSize = `${MAX_NAME_PX}px`;
        const tile = el.parentElement;
        const cs = getComputedStyle(tile);
        const available = tile.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const width = el.scrollWidth;
        if (width > available) {
          el.style.fontSize = `${Math.floor((MAX_NAME_PX * available * 10) / width) / 10}px`;
        }
      });
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(root);
    mq.addEventListener("change", fit);
    document.fonts?.ready.then(fit);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", fit);
    };
  }, []);

  return ref;
}

export default function Skills() {
  const fitRef = useFitSkillNames();

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          id="skills-title"
          eyebrow="02 · Habilidades"
          title="Stack e competências"
          subtitle="Tecnologias que uso no dia a dia para desenvolver soluções completas."
        />

        <RevealGroup className="skills__grid" stagger={0.1} ref={fitRef}>
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
