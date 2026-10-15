import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronDown, FileDown, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { profile } from "../../../../data/profile";
import photo from "../../../../assets/images/perfil.JPG";
import cvFile from "../../../../assets/docs/CV-Arthur-Eduardo.pdf";
import "./Hero.css";

const EASE = [0.22, 1, 0.36, 1];

function Typewriter({ words, typeSpeed = 70, deleteSpeed = 35, wait = 1600 }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[index];
    let timeout;
    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), wait);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, wait, reduce]);

  if (reduce) return <span className="typewriter__text">{words[0]}</span>;

  return (
    <span className="typewriter" aria-hidden="true">
      <span className="typewriter__text">{text}</span>
      <span className="typewriter__caret" />
    </span>
  );
}

// Cada elemento anima por conta própria (sem depender do pai), com atraso escalonado
const fadeUp = (order) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.1 + order * 0.08, ease: EASE },
});

function PhotoCard() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      className="hero__visual"
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: EASE }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div className="hero__photo-wrap" style={{ rotateX, rotateY }}>
        <div className="hero__photo-glow" aria-hidden="true" />
        <div className="hero__photo">
          <img
            src={photo}
            alt={`Retrato de ${profile.name}`}
            width="2144"
            height="3330"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.h1 {...fadeUp(0)} className="hero__title" id="hero-title">
            <span className="hero__hello">Olá, eu sou</span>
            <span className="hero__name">{profile.name}</span>
          </motion.h1>

          <motion.p {...fadeUp(1)} className="hero__role">
            {profile.role}
          </motion.p>

          <motion.p {...fadeUp(2)} className="hero__passion">
            <span className="sr-only">
              Apaixonado por {profile.passions.join(", ")}.
            </span>
            <span aria-hidden="true">Apaixonado por </span>
            <Typewriter words={profile.passions} />
          </motion.p>

          <motion.p {...fadeUp(3)} className="hero__summary">
            {profile.summary}
          </motion.p>

          <motion.div {...fadeUp(4)} className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              Entre em contato
              <ArrowRight aria-hidden="true" />
            </a>
            <a href={cvFile} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <FileDown aria-hidden="true" />
              Baixar currículo
            </a>
          </motion.div>

          <motion.div {...fadeUp(5)} className="hero__meta">
            <div className="hero__socials">
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn (abre em nova aba)"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="GitHub (abre em nova aba)"
              >
                <FaGithub />
              </a>
            </div>
            <span className="hero__divider" aria-hidden="true" />
            <span className="hero__location">
              <MapPin aria-hidden="true" />
              {profile.location}
            </span>
          </motion.div>
        </div>

        <PhotoCard />
      </div>

      <motion.a
        href="#about"
        className="hero__scroll"
        aria-label="Rolar para a seção Sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span>Role para explorar</span>
        <ChevronDown aria-hidden="true" />
      </motion.a>
    </section>
  );
}
