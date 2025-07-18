import React from "react";
import "./Footer.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-socials">
          <a
            href="https://www.linkedin.com/in/arthuredu/"
            target="_blank"
        
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/ArthurEdu05"
            target="_blank"
          >
            <FaGithub />
          </a>
        </div>

        <p className="footer-text">
          © 2025 <span className="footer-name">Arthur Eduardo</span>. Todos os direitos reservados
        </p>

        <p className="footer-dev">
          Desenvolvido por <span className="footer-highlight">Arthur</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
