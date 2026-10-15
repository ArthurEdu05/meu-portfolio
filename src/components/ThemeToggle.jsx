import { useState } from "react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import "./ThemeToggle.css";

const DURATION = 850;
// A animação tem duas etapas: primeiro um círculo pequeno "nasce" no botão
// (para o olho registrar a origem), depois ele se expande até cobrir a tela.
// Sem essa etapa, em telas grandes o primeiro movimento perceptível já é a
// borda do círculo cruzando o meio da tela.
const SEED_RADIUS_PX = 110;
const SEED_AT = 0.22; // fração da duração usada no "nascimento"
const ICON_SPRING = { type: "spring", stiffness: 260, damping: 22 };
const STORAGE_KEY = "theme";
const THEME_BG = { dark: "#070b14", light: "#f6f8fb" };

function getInitialTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_BG[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* armazenamento indisponível: segue sem persistir */
  }
}

// Círculo que cobre a tela inteira a partir do centro do botão, em PORCENTAGEM
// da própria camada animada. Pixels absolutos podem não bater com o sistema de
// coordenadas da camada da transição quando há zoom do navegador, escala do
// Windows ou barra de rolagem; porcentagem é sempre relativa à camada.
function circleFrom(button) {
  const rect = button.getBoundingClientRect();
  const w = window.innerWidth;
  const h = window.innerHeight;
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
  // Em clip-path, raio em % é relativo a √(w² + h²) / √2
  const toPct = (px) => ((px / (Math.hypot(w, h) / Math.SQRT2)) * 100).toFixed(3);
  const at = `at ${((x / w) * 100).toFixed(3)}% ${((y / h) * 100).toFixed(3)}%`;
  return [
    { clipPath: `circle(0% ${at})`, offset: 0, easing: "cubic-bezier(0.2, 0.8, 0.3, 1)" },
    { clipPath: `circle(${toPct(SEED_RADIUS_PX)}% ${at})`, offset: SEED_AT, easing: "cubic-bezier(0.55, 0, 0.25, 1)" },
    { clipPath: `circle(${toPct(radius)}% ${at})`, offset: 1 },
  ];
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [pulse, setPulse] = useState(0);
  const isDark = theme === "dark";

  const toggle = (event) => {
    const next = isDark ? "light" : "dark";
    const clip = circleFrom(event.currentTarget);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    setPulse((p) => p + 1);

    const commit = () => {
      flushSync(() => setTheme(next));
      applyTheme(next);
    };

    if (reduce) {
      commit();
      return;
    }

    // Navegadores com View Transitions: o novo tema "nasce" do botão. Durante a
    // transição o navegador exibe imagens congeladas da página, então não é
    // preciso pausar animações/transições do site (o que custava desempenho).
    if (document.startViewTransition) {
      const transition = document.startViewTransition(commit);
      transition.ready.then(() => {
        root.animate(clip, {
          duration: DURATION,
          fill: "both",
          pseudoElement: "::view-transition-new(root)",
        });
      });
      return;
    }

    // Fallback (sem View Transitions): durante a troca, desliga as transições de
    // cor para a página mudar de uma vez só, atrás da camada circular
    root.classList.add("theme-switching");
    const done = () => requestAnimationFrame(() => root.classList.remove("theme-switching"));

    // Fallback: camada circular com a cor do novo tema
    const overlay = document.createElement("div");
    overlay.className = "theme-overlay";
    overlay.style.background = THEME_BG[next];
    document.body.appendChild(overlay);
    overlay
      .animate(clip, { duration: DURATION, fill: "forwards" })
      .finished.then(() => {
        commit();
        return overlay.animate({ opacity: [1, 0] }, { duration: 300, fill: "forwards" }).finished;
      })
      .finally(() => {
        overlay.remove();
        done();
      });
  };

  return (
    <motion.button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Modo claro" : "Modo escuro"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <span
        key={pulse}
        className={`theme-toggle__pulse${pulse ? " is-active" : ""}`}
        aria-hidden="true"
      />
      {/* Os dois ícones ficam sempre montados e trocam ao mesmo tempo (sem "vazio") */}
      <motion.span
        className="theme-toggle__icon"
        initial={false}
        animate={isDark ? { rotate: 0, scale: 1, opacity: 1 } : { rotate: 90, scale: 0.4, opacity: 0 }}
        transition={ICON_SPRING}
        aria-hidden="true"
      >
        <Sun />
      </motion.span>
      <motion.span
        className="theme-toggle__icon"
        initial={false}
        animate={isDark ? { rotate: -90, scale: 0.4, opacity: 0 } : { rotate: 0, scale: 1, opacity: 1 }}
        transition={ICON_SPRING}
        aria-hidden="true"
      >
        <Moon />
      </motion.span>
    </motion.button>
  );
}
