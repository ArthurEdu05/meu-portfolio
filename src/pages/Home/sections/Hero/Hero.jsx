import "./Hero.css";
import profile from "../../../../assets/images/perfil.jpg";
import cvFile from "../../../../assets/docs/Arthur_Eduardo_de_Almeida_Santos-CV.pdf";

export default function Hero() {
  return (
    <section className="hero">
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
            <a href="mailto:arthuredu2005@gmail.com?subject=Interesse%20e%20oportunidade%20de%20colaboração%20-%20Portfólio&body=Olá%20Arthur,%0D%0A%0D%0AAcessei%20seu%20portfólio%20recentemente%20e%20fiquei%20bastante%20interessado(a)%20no%20seu%20trabalho.%20Gostaria%20de%20conversar%20melhor%20sobre%20uma%20possível%20colaboração%20ou%20oportunidade%20profissional.%0D%0A%0D%0AQuando%20estiver%20disponível,%20por%20favor,%20me%20retorne%20este%20e-mail%20para%20seguirmos%20com%20a%20conversa.%0D%0A%0D%0ADesde%20já,%20agradeço%20pela%20atenção!%0D%0A%0D%0AAtenciosamente,%0D%0A[Seu%20nome]"
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
    </section>
  );
}
