import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import "./Hero.css";
import profile from "../../../../assets/images/perfil.jpg";
import cvFile from "../../../../assets/docs/CV-Arthur-Eduardo.pdf";
import { ChevronDown } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const LoopingTypewriter = ({ words, waitTime = 1300, typeSpeed = 70, deleteSpeed = 30, initialDelay = 0 }) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReadyToStart, setIsReadyToStart] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsReadyToStart(true);
    }, initialDelay);

    return () => clearTimeout(startTimeout);
  }, [initialDelay]);

  useEffect(() => {
    if (!isReadyToStart) return;

    let timeout;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText((prev) => prev + currentWord[text.length]);
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, waitTime);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, waitTime, typeSpeed, deleteSpeed, isReadyToStart]);
  
  const cursorAnimation = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Infinity,
        repeatDelay: 0.4,
        repeatType: "reverse",
      },
    },
  };

  return (
    <>
      <span className="highlight-name">{text}</span>
      {isReadyToStart && (
        <motion.span
          variants={cursorAnimation}
          initial="initial"
          animate="animate"
          className="ml-1"
        >
          |
        </motion.span>
      )}
    </>
  );
};


const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  inViewMargin = "-50px", 
  blur = "6px",
}) => {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: yOffset > 0 ? 0 : yOffset, opacity: 1, filter: `blur(0px)` }, 
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};


export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="heroContainer">
        <BlurFade delay={0} className="profileImage">
          <img src={profile} alt="Foto de perfil" />
        </BlurFade>
        <BlurFade delay={0.25} className="heroText">
          <h1 className="heroName">
            Olá, eu sou o <span className="highlight-name">Arthur Eduardo</span>
          </h1>
          <h2 className="heroSubtitle">
            Um apaixonado por{" "}
            <LoopingTypewriter
              words={["tecnologia", "programação", "dados", "desafios"]}
              initialDelay={500}
            />
          </h2>
          <div className="heroButtons">
            <a href="#contact" className="BtnContato">
              Entre em contato
            </a>
            <a
              href={cvFile}
              className="BtnDownloadCv"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </div>
          <div className="heroSocial">
            <a
              href="https://www.linkedin.com/in/arthuredu"
              target="_blank"
            >
              <FaLinkedin size="1.7rem" />
            </a>
            <a
              href="https://github.com/ArthurEdu05"
              target="_blank"
            >
              <FaGithub size="1.7rem" />
            </a>
          </div>
        </BlurFade>
      </div>
      <a href="#about" className="scroll-arrow">
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
