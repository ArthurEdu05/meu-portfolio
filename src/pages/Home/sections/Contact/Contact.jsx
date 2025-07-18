import React from "react";
import "./Contact.css";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-title">Contato</h2>
      <p className="contact-subtitle">Vamos conversar? Estou à disposição!</p>

      <div className="contact-container">
        <div className="contact-item">
          <FaWhatsapp className="contact-icon" />
          <span>(11) 96487-1473</span>
        </div>

        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <span>arthuredu2005@gmail.com</span>
        </div>

        <div className="contact-item">
          <FaMapMarkerAlt className="contact-icon" />
          <span>São Paulo, SP</span>
        </div>
      </div>

      <a href="mailto:arthuredu2005@gmail.com" className="contact-btn">
        Enviar E-mail
      </a>
    </section>
  );
};

export default Contact;
