import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "./PrivateRepoBadge.css";

const EDGE_GAP = 8;

// Limites do ancestral que cortaria o balão (card ou ficha técnica) ou, sem ele, da janela
function getClipBounds(el) {
  for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
    if (getComputedStyle(node).overflowX !== "visible") return node.getBoundingClientRect();
  }
  return { left: 0, right: document.documentElement.clientWidth };
}

export default function PrivateRepoBadge({ label = "Repositório privado" }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const tipRef = useRef(null);
  const hoveringRef = useRef(false);
  const tipId = useId();

  // O balão fica centralizado no selo e só desliza o necessário para não ser cortado
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const root = rootRef.current;
      const tip = tipRef.current;
      const bounds = getClipBounds(root);
      tip.style.setProperty("--tip-max", `${bounds.right - bounds.left - EDGE_GAP * 2}px`);

      const rect = root.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const half = tip.offsetWidth / 2;
      const min = bounds.left + EDGE_GAP + half;
      const max = bounds.right - EDGE_GAP - half;
      const shift = Math.min(Math.max(center, min), max) - center;
      tip.style.setProperty("--tip-shift", `${shift}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [open]);

  // Toque fora ou Esc fecham o balão; a captura evita que o Esc também feche a ficha técnica
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open]);

  const onPointerEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    hoveringRef.current = true;
    setOpen(true);
  };
  const onPointerLeave = (e) => {
    if (e.pointerType !== "mouse") return;
    hoveringRef.current = false;
    setOpen(false);
  };
  const onFocus = (e) => {
    if (e.target.matches(":focus-visible")) setOpen(true);
  };

  return (
    <span className="private-repo" ref={rootRef} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <button
        type="button"
        className={`private-repo__badge${open ? " is-active" : ""}`}
        aria-label="Repositório privado"
        aria-describedby={tipId}
        onClick={() => setOpen((o) => hoveringRef.current || !o)}
        onFocus={onFocus}
        onBlur={() => setOpen(false)}
      >
        <FaGithub aria-hidden="true" />
        {label}
        <Info aria-hidden="true" />
      </button>
      <span
        ref={tipRef}
        id={tipId}
        role="tooltip"
        className={`private-repo__tip${open ? " is-open" : ""}`}
      >
        <strong>Este é um projeto real.</strong>
        Entre em contato para ter acesso ao código em um ambiente controlado.
      </span>
    </span>
  );
}
