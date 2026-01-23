import "./Hero.css";
import profile from "../../../../assets/images/perfil.jpg";
import cvFile from "../../../../assets/docs/Arthur_Eduardo_de_Almeida_Santos-CV.pdf";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="heroContainer">

        <div className="profileImage">
          <img src={profile} alt="Foto de perfil" className="profileImage" />
        </div>

        <div className="heroText">
          <h1 className="heroName">Arthur Eduardo.</h1>
          <h2 className="heroTitle">Dev Full Stack</h2>
          <p className="heroDesc">
            Estagiário como Analista de Dados na BeBrasil e Desenvolvedor Full Stack nas horas vagas!
            <br></br>
            Atualmente estou cursando Sistemas de Informação na Universidade Presbiteriana Mackenzie.
          </p>
          <div className="heroButtons">
            <a href="#contact"
            className="BtnContato">Entre em contato</a>
            <a href={cvFile} className="BtnDownloadCv" target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </div>

          <div className="heroSocial">
            <a href="https://www.linkedin.com/in/arthuredu" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/ArthurEdu05" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        
      </div>
      <a
        href="#about"
        className="scroll-arrow"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
