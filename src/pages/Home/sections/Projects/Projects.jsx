import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Code2,
  FolderGit2,
  HeartHandshake,
  Lock,
  Maximize2,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SectionHeader from "../../../../components/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "../../../../components/Reveal";
import { profile, projects, upcomingProjects } from "../../../../data/profile";
import ProjectDetails from "./ProjectDetails";
import "./Projects.css";

const coverIcons = {
  "E-commerce": ShoppingBag,
  Recrutamento: Briefcase,
  "Saúde · Voluntário": HeartHandshake,
};

const hues = [220, 260, 170];

function ProjectCard({ title, category, summary, description, highlights = [], tags = [], links = [], image, cover, index, details, onOpen, ...rest }) {
  const Icon = coverIcons[category] || FolderGit2;
  const isPrivate = rest.private;
  const CoverTag = details ? "button" : "div";

  return (
    <RevealItem as="article" className="project card-hover">
      <CoverTag
        className="project__cover"
        style={{ "--hue": hues[index % hues.length] }}
        {...(details && { type: "button", onClick: onOpen, "aria-label": `Ver detalhes do projeto ${title}` })}
      >
        {cover?.logo ? (
          <span
            className="project__cover-brand"
            style={{ "--brand-from": cover.from, "--brand-to": cover.to }}
          >
            <img src={cover.logo} alt={details ? "" : `Logo do projeto ${title}`} loading="lazy" />
          </span>
        ) : image ? (
          <img src={image} alt={details ? "" : `Captura de tela do projeto ${title}`} loading="lazy" />
        ) : (
          <>
            <span className="project__cover-grid" aria-hidden="true" />
            <span className="project__cover-icon" aria-hidden="true">
              <Icon />
            </span>
          </>
        )}
        {details && (
          <span className="project__cover-cta" aria-hidden="true">
            <Maximize2 />
            Ver ficha técnica
          </span>
        )}
        <span className="project__category">{category}</span>
      </CoverTag>

      <div className="project__body">
        <h3 className="project__title">{title}</h3>
        <p className="project__desc">{summary || description}</p>

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
          {details && (
            <button type="button" className="project__details" onClick={onOpen}>
              Ver detalhes
              <Maximize2 aria-hidden="true" />
            </button>
          )}
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

// Próximos projetos: mesmo formato e tamanho dos cards publicados, com conteúdo ainda "carregando"
function UpcomingCard({ title, category, number }) {
  return (
    <RevealItem as="article" className="upcoming">
      <div className="upcoming__cover">
        <span className="project__cover-grid" aria-hidden="true" />
        <span className="upcoming__number" aria-hidden="true">
          #{String(number).padStart(2, "0")}
        </span>
        <span className="upcoming__icon" aria-hidden="true">
          <Code2 />
        </span>
      </div>
      <div className="upcoming__body">
        <h3 className="upcoming__title">
          {title || "Próximo projeto"}
          <span className="sr-only"> (projeto {number})</span>
        </h3>
        {category ? <p className="upcoming__category">{category}</p> : null}
        <div className="upcoming__skeleton" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="upcoming__chips" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="upcoming__footer" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>
    </RevealItem>
  );
}

function FollowCard() {
  return (
    <RevealItem as="aside" className="upcoming upcoming--cta">
      <div className="upcoming__cta">
        <span className="upcoming__cta-icon" aria-hidden="true">
          <Plus />
        </span>
        <h3>Mais projetos a caminho</h3>
        <p>Novos projetos entram aqui assim que forem publicados.</p>
        <div className="upcoming__cta-actions">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="project__link">
            <FaGithub aria-hidden="true" />
            Ver GitHub
          </a>
          <a href="#contact" className="project__link">
            Falar comigo
            <ArrowRight aria-hidden="true" />
          </a>
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
  const [active, setActive] = useState(null);

  return (
    <section className="section section--alt projects" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects-title"
          eyebrow="03 · Projetos"
          title="Projetos"
          subtitle="Projetos onde transformo ideias e necessidades em soluções que geram valor. Abra cada projeto para conhecer a arquitetura, as tecnologias e as decisões técnicas por trás dele."
        />

        {projects.length === 0 ? (
          <ComingSoon />
        ) : (
          // Publicados e próximos dividem a mesma grade (2 por linha), para a seção já ter o formato final
          <RevealGroup className="projects__grid" stagger={0.1}>
            {projects.map((p, i) => (
              <ProjectCard key={p.title} index={i} {...p} onOpen={() => setActive(p)} />
            ))}
            {upcomingProjects.map((p, i) => (
              <UpcomingCard key={`upcoming-${i}`} {...p} number={projects.length + i + 1} />
            ))}
            {upcomingProjects.length > 0 && <FollowCard />}
          </RevealGroup>
        )}

        <AnimatePresence>
          {active && <ProjectDetails key={active.title} project={active} onClose={() => setActive(null)} />}
        </AnimatePresence>
      </div>
    </section>
  );
}
