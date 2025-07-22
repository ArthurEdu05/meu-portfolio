import React from "react";
import "./About.css";
import { FaBuilding, FaGraduationCap } from "react-icons/fa";

const About = () => {
  const timeline = [
    {
      side: "left",
      icon: <FaGraduationCap />,
      company: "Colégio FECAP",
      role: "Ensino Técnico em Informática",
      date: "02/2021 - 11/2023",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      side: "right",
      icon: <FaGraduationCap />,
      company: "Universidade Presbiteriana Mackenzie",
      role: "Graduação - Sistemas de Informação",
      date: "01/2024 - 12/2027",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      side: "left",
      icon: <FaBuilding />,
      company: "BeBrasil",
      role: "Estagiário como Analista de Dados",
      date: "Fevereiro 2025 - Presente",
      location: "São Paulo, SP | Modelo: Presencial",
      description:
        "Gerenciar, analisar e tratar dados dos processos de vendas; Melhorar fluxos e processos da empresa; Solucionar problemas pós-venda.",
    },
  ];

  return (
    <section className="about section" id="about">
      <h2 className="section-title">Minha Jornada</h2>

      <div className="timeline-container">
        {timeline.map((item, i) => (
          <div className={`timeline-item ${item.side}`} key={i}>
            <div className="timeline-icon">{item.icon}</div>
            <div className="timeline-content">
              <h3 className="timeline-role">{item.role}</h3>
              <p className="timeline-description">{item.description}</p>
              <div className="timeline-meta">
                <h4 className="timeline-company">{item.company}</h4>
                {item.location && (
                  <span className="timeline-date">{item.location}</span>
                )}
                <span className="timeline-date">{item.date}</span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
