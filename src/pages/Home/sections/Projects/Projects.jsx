import { ArrowUpRight, Briefcase, FolderGit2, HeartHandshake, Lock, Plus, ShoppingBag } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SectionHeader from "../../../../components/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "../../../../components/Reveal";
import { projects } from "../../../../data/profile";
import "./Projects.css";

const coverIcons = {
  "E-commerce": ShoppingBag,
  Recrutamento: Briefcase,
  "Saúde · Voluntário": HeartHandshake,
};

const hues = [220, 260, 170];

function ProjectCard({ title, category, description, highlights = [], tags = [], links = [], image, index, ...rest }) {
  const Icon = coverIcons[category] || FolderGit2;
  const isPrivate = rest.private;

  return (
    <RevealItem as="article" className="project card-hover">
      <div className="project__cover" style={{ "--hue": hues[index % hues.length] }}>
        {image ? (
          <img src={image} alt={`Captura de tela do projeto ${title}`} loading="lazy" />
        ) : (
          <>
            <span className="project__cover-grid" aria-hidden="true" />
            <span className="project__cover-icon" aria-hidden="true">
              <Icon />
            </span>
          </>
        )}
        <span className="project__category">{category}</span>
      </div>

      <div className="project__body">
        <h3 className="project__title">{title}</h3>
        <p className="project__desc">{description}</p>

        {highlights.length > 0 && (
          <ul className="project__highlights">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        {tags.length > 0 && (
          <ul className="project__tags" aria-label="Tecnologias utilizadas">
            {tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        <div className="project__links">
          {links.map(({ label, url, kind }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="project__link"
              aria-label={`${label} do projeto ${title} (abre em nova aba)`}
            >
              {kind === "repo" && <FaGithub aria-hidden="true" />}
              {label}
              {kind === "live" && <ArrowUpRight aria-hidden="true" />}
            </a>
          ))}
          {isPrivate && (
            <span className="project__private">
              <Lock aria-hidden="true" />
              Código privado
            </span>
          )}
        </div>
      </div>
    </RevealItem>
  );
}

function ComingSoon() {
  return (
    <div className="soon">
      <Reveal className="soon__message">
        <h3>Em breve…</h3>
        <p>Estou trabalhando nisso! Novos projetos serão publicados aqui.</p>
      </Reveal>

      <RevealGroup className="soon__grid" stagger={0.1} aria-hidden="true">
        {[1, 2, 3, 4].map((n) => (
          <RevealItem key={n} className="soon__card">
            <span className="soon__icon">
              <Plus />
            </span>
            <span className="soon__label">Projeto #{n}</span>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="section section--alt projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects-title"
          eyebrow="03 · Projetos"
          title="Projetos"
          subtitle="Um espaço para os projetos que estou desenvolvendo e publicando."
        />

        {projects.length === 0 ? (
          <ComingSoon />
        ) : (
          <RevealGroup className="projects__grid" stagger={0.12}>
            {projects.map((p, i) => (
              <ProjectCard key={p.title} index={i} {...p} />
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}
