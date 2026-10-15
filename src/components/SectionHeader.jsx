import { Reveal } from "./Reveal";

export default function SectionHeader({ eyebrow, title, subtitle, id, center = false }) {
  return (
    <Reveal className={`section-header${center ? " section-header--center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </Reveal>
  );
}
