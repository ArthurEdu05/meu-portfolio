import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// Revela o conteúdo suavemente quando entra na viewport.
export function Reveal({ children, delay = 0, y = 24, as = "div", className, ...rest }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
}

// Container que escalona a entrada dos filhos (use com RevealItem).
export function RevealGroup({ children, stagger = 0.08, delay = 0, as = "div", className, ...rest }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

const revealItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function RevealItem({ children, as = "div", className, ...rest }) {
  const Component = motion[as];
  return (
    <Component className={className} variants={revealItemVariants} {...rest}>
      {children}
    </Component>
  );
}
