import { useState } from "react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import "./ThemeToggle.css";

const STORAGE_KEY = "theme";
const DURATION = 600;
// Entrada e saída suaves: o círculo acelera e desacelera de forma contínua
const EASING = "cubic-bezier(0.65, 0, 0.35, 1)";
const ICON_SPRING = { type: "spring", stiffness: 260, damping: 22 };
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

// Raio necessário para o círculo cobrir a tela inteira a partir do ponto (x, y)
function coverRadius(x, y) {
  return Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [pulse, setPulse] = useState(0);
  const isDark = theme === "dark";

  const toggle = (event) => {
    const next = isDark ? "light" : "dark";
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const r = coverRadius(x, y);
    const clip = [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setPulse((p) => p + 1);

    // Durante a troca, desliga as transições de cor/animações em CSS para que
    // a página mude de uma vez só, sem "brigar" com o círculo se expandindo
    const root = document.documentElement;
    root.classList.add("theme-switching");
    const done = () => requestAnimationFrame(() => root.classList.remove("theme-switching"));

    const commit = () => {
      flushSync(() => setTheme(next));
      applyTheme(next);
    };

    if (reduce) {
      commit();
      done();
      return;
    }

    // Navegadores com View Transitions: o novo tema "nasce" do botão
    if (document.startViewTransition) {
      const transition = document.startViewTransition(commit);
      transition.ready.then(() => {
        root.animate(
          { clipPath: clip },
          { duration: DURATION, easing: EASING, pseudoElement: "::view-transition-new(root)" }
        );
      });
      transition.finished.finally(done);
      return;
    }

    // Fallback: camada circular com a cor do novo tema
    const overlay = document.createElement("div");
    overlay.className = "theme-overlay";
    overlay.style.background = THEME_BG[next];
    document.body.appendChild(overlay);
    overlay
      .animate({ clipPath: clip }, { duration: DURATION, easing: EASING, fill: "forwards" })
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
