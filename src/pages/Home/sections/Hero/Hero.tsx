import "./Hero.css";
import profile from "../../../../assets/images/perfil.jpg";
import cvFile from "../../../../assets/docs/Arthur_Eduardo_de_Almeida_Santos-CV.pdf";

export default function Hero() {
  return (
    <section className="hero">
      <div className="heroContainer">
        <div className="heroText">
          <h1 className="heroName">Arthur Eduardo.</h1>
          <h2 className="heroTitle">Dev Full Stack</h2>
          <p className="heroDesc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            vitae tincidunt nulla. Morbi eu ullamcorper elit. Vivamus varius
            augue vel arcu porttitor, vel malesuada lorem suscipit.
          </p>

          <div className="heroButtons">
            <a href="#!" className="BtnContato">Entre em contato</a>
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
            <a href={cvFile} download>
              <i className="fas fa-file-download"></i>
            </a>
          </div>
        </div>

        <div className="profileImage">
          <img src={profile} alt="Foto de perfil" className="profileImage" />
        </div>
      </div>
    </section>
  );
}
