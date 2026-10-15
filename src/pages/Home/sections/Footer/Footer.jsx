import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { profile } from "../../../../data/profile";
import "./Footer.css";

const socials = [
  { label: "LinkedIn", href: profile.linkedinUrl, icon: FaLinkedinIn },
  { label: "GitHub", href: profile.githubUrl, icon: FaGithub },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__socials">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label={`${label} (abre em nova aba)`}
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>

        <p className="footer__text">
          © {year} <span className="footer__highlight">{profile.name}</span>. Todos os direitos
          reservados.
        </p>

        <p className="footer__dev">
          Desenvolvido por <span className="footer__highlight">{profile.name.split(" ")[0]}</span>
        </p>
      </div>
    </footer>
  );
}
