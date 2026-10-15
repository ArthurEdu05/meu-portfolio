import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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
  {
    icon: Languages,
    label: languages.length > 1 ? "Idiomas" : "Idioma",
    // Um idioma por linha
    value: languages.map((l) => (
      <span key={l.name} className="about__fact-item">
        {l.name} {l.level.charAt(0).toLowerCase() + l.level.slice(1)}
      </span>
    )),
  },
  { icon: MapPin, label: "Localização", value: profile.location },
];

const EASE = [0.22, 1, 0.36, 1];

// Trilha única que atravessa Experiência e Formação. A barra acompanha a rolagem
// (linha de leitura a 60% da tela) e cada marco acende quando a ponta passa por ele.
function Journey({ groups }) {
  const ref = useRef(null);
  const nodesRef = useRef([]);
  const [active, setActive] = useState(() => new Set());

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.4 });
  const headTop = useTransform(progress, (v) => `${v * 100}%`);

  const update = useCallback((p) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box || !box.height) return;
    const next = new Set();
    nodesRef.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      if ((r.top + r.height / 2 - box.top) / box.height <= p + 0.002) next.add(i);
    });
    setActive((prev) =>
      prev.size === next.size && [...next].every((i) => prev.has(i)) ? prev : next
    );
  }, []);

  // Os marcos seguem a barra animada (e não a rolagem crua), ficando sempre em sincronia
  useMotionValueEvent(progress, "change", update);
  useEffect(() => update(progress.get()), [update, progress]);

  const register = (i) => (el) => {
    nodesRef.current[i] = el;
  };

  let n = 0;

  return (
    <div className="journey" ref={ref}>
      <span className="journey__track" aria-hidden="true">
        <motion.span className="journey__progress" style={{ scaleY: progress }} />
        <motion.span className="journey__head" style={{ top: headTop }} />
      </span>

      {groups.map(({ icon: Icon, title, items }) => {
        const headingIndex = n++;
        return (
          <section className="journey__group" key={title}>
            <Reveal className="journey__heading">
              <span
                ref={register(headingIndex)}
                className={`journey__node${active.has(headingIndex) ? " is-active" : ""}`}
              >
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
            </Reveal>

            <ol className="journey__list">
              {items.map((item, i) => {
                const index = n++;
                return (
                  <JourneyItem
                    key={item.org}
                    {...item}
                    order={i}
                    isActive={active.has(index)}
                    dotRef={register(index)}
                  />
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

function JourneyItem({
  title,
  org,
  type,
  period,
  location,
  current,
  highlights,
  tags,
  order,
  isActive,
  dotRef,
}) {
  return (
    <motion.li
      className="journey__item"
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: order * 0.08, ease: EASE }}
    >
      <span
        ref={dotRef}
        className={`journey__dot${isActive ? " is-active" : ""}${current ? " is-current" : ""}`}
        aria-hidden="true"
      />
      <article className={`timeline__card card-hover${isActive ? " is-active" : ""}`}>
        <header className="timeline__card-head">
          <div>
            <h4 className="timeline__role">{title}</h4>
            <p className="timeline__org">
              {org}
              {type && <span className="timeline__type">{type}</span>}
            </p>
          </div>
          <div className="timeline__meta">
            <span className="timeline__period">
              <Calendar aria-hidden="true" />
              {period}
            </span>
            {current && <span className="timeline__current">Em andamento</span>}
          </div>
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
    </motion.li>
  );
}

const journeyGroups = [
  {
    icon: Briefcase,
    title: "Experiência profissional",
    items: experience.map((e) => ({
      title: e.role,
      org: e.company,
      type: e.type,
      period: e.period,
      location: e.location,
      current: e.current,
      highlights: e.highlights,
      tags: e.tags,
    })),
  },
  {
    icon: GraduationCap,
    title: "Formação acadêmica",
    items: education.map((e) => ({
      title: e.course,
      org: e.institution,
      type: e.type,
      period: e.period,
      location: e.location,
      current: e.current,
    })),
  },
];

export default function About() {
  return (
    <section className="section section--alt about" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          id="about-title"
          eyebrow="01 · Sobre"
          title="Minha jornada"
        />

        <div className="about__grid">
          <aside className="about__intro">
            <Reveal>
              <div className="about__lead">
                {profile.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
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
            <Journey groups={journeyGroups} />
          </div>
        </div>
      </div>
    </section>
  );
}
