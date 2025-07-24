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
      description: "",
    },
    {
      side: "right",
      icon: <FaGraduationCap />,
      company: "Universidade Presbiteriana Mackenzie",
      role: "Sistemas de Informação - Graduação",
      date: "01/2024 - 12/2027",
      description: "",
    },
    {
      side: "left",
      icon: <FaBuilding />,
      company: "BeBrasil",
      role: "Analista de Dados - Estágio",
      date: "Fevereiro 2025 - Presente",
      location: "São Paulo, SP | Modelo: Presencial",
      description: [
        "Gerenciar, analisar e tratar dados dos processos de vendas;",
        "Melhorar fluxos e processos da empresa;",
        "Solucionar problemas pós-venda.",
      ],
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

              {Array.isArray(item.description) ? (
                <div className="timeline-description">
                  {item.description.map((line, index) => (
                    <p key={index}>- {line}</p>
                  ))}
                </div>
              ) : (
                item.description && (
                  <p className="timeline-description">{item.description}</p>
                )
              )}

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
