import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Languages,
  MapPin,
  Target,
} from "lucide-react";
import SectionHeader from "../../../../components/SectionHeader";
import { Reveal } from "../../../../components/Reveal";
import {
  education,
  experience,
  languages,
  profile,
} from "../../../../data/profile";
import "./About.css";

const facts = [
  { icon: Target, label: "Foco", value: "Desenvolvimento Full Stack" },
  { icon: GraduationCap, label: "Formação", value: "Sistemas de Informação · Mackenzie" },
  ...languages.map((l) => ({ icon: Languages, label: "Idioma", value: `${l.name} · ${l.level}` })),
  { icon: MapPin, label: "Localização", value: profile.location },
];

function TimelineGroup({ icon: Icon, title, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="timeline">
      <Reveal className="timeline__heading">
        <span className="timeline__heading-icon">
          <Icon aria-hidden="true" />
        </span>
        <h3>{title}</h3>
      </Reveal>
      <div className="timeline__body" ref={ref}>
        <span className="timeline__track" aria-hidden="true">
          <motion.span className="timeline__progress" style={{ scaleY }} />
        </span>
        <ol className="timeline__list">{children}</ol>
      </div>
    </div>
  );
}

function TimelineItem({ title, org, type, period, location, current, highlights, tags, index }) {
  return (
    <Reveal as="li" className="timeline__item" delay={index * 0.05}>
      <span className={`timeline__dot${current ? " is-current" : ""}`} aria-hidden="true" />
      <article className="timeline__card card-hover">
        <header className="timeline__card-head">
          <div>
            <h4 className="timeline__role">{title}</h4>
            <p className="timeline__org">
              {org}
              {type && <span className="timeline__type">{type}</span>}
            </p>
          </div>
          <span className="timeline__period">
            <Calendar aria-hidden="true" />
            {period}
            {current && <span className="timeline__current">Em andamento</span>}
          </span>
        </header>
        {location && <p className="timeline__location">{location}</p>}
        {highlights?.length > 0 && (
          <ul className="timeline__highlights">
            {highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}
        {tags?.length > 0 && (
          <ul className="timeline__tags" aria-label="Tecnologias e práticas">
            {tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </article>
    </Reveal>
  );
}

export default function About() {
  return (
    <section className="section section--alt about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          id="about-title"
          eyebrow="01 · Sobre"
          title="Minha jornada"
          subtitle="Uma trajetória construída entre a sala de aula e projetos reais, unindo desenvolvimento de software e análise de dados."
        />

        <div className="about__grid">
          <aside className="about__intro">
            <Reveal>
              <p className="about__lead">{profile.about}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="about__facts">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div className="about__fact" key={label}>
                    <span className="about__fact-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </aside>

          <div className="about__timelines">
            <TimelineGroup icon={Briefcase} title="Experiência profissional">
              {experience.map((e, i) => (
                <TimelineItem
                  key={e.company}
                  index={i}
                  title={e.role}
                  org={e.company}
                  type={e.type}
                  period={e.period}
                  location={e.location}
                  current={e.current}
                  highlights={e.highlights}
                  tags={e.tags}
                />
              ))}
            </TimelineGroup>

            <TimelineGroup icon={GraduationCap} title="Formação acadêmica">
              {education.map((e, i) => (
                <TimelineItem
                  key={e.institution}
                  index={i}
                  title={e.course}
                  org={e.institution}
                  type={e.type}
                  period={e.period}
                  current={e.current}
                />
              ))}
            </TimelineGroup>

          </div>
        </div>
      </div>
    </section>
  );
}
