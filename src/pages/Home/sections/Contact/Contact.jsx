import React from "react";
import "./Contact.css";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <h2 className="contact-title">Contato</h2>
      <p className="contact-subtitle">
        Vamos conversar? Entre em contato pelo formulário ou pelos canais abaixo.
      </p>

      <div className="contact-content">

        <div className="contact-info">
          <div className="contact-card">
            <FaWhatsapp className="contact-icon" />
            <div>
              <h3>Whatsapp</h3>
              <p>(11) 96487-1473</p>
            </div>
          </div>

          <div className="contact-card">
            <FaEnvelope className="contact-icon" />
            <div>
              <h3>E-mail</h3>
              <p>arthuredu2005@gmail.com</p>
            </div>
          </div>

          <div className="contact-card">
            <FaMapMarkerAlt className="contact-icon" />
            <div>
              <h3>Localização</h3>
              <p>São Paulo, SP</p>
            </div>
          </div>
        </div>

        <form className="contact-form">
          <div className="form-group">
            <input type="text" name="name" placeholder="Seu Nome" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Seu E-mail" required />
          </div>
          <div className="form-group">
            <textarea name="message" placeholder="Sua Mensagem" rows="5" required></textarea>
          </div>
          <button type="submit" className="contact-btn">Enviar Mensagem</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
