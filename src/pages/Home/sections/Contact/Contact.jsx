import React, { useRef, useState } from "react";
import "./Contact.css";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();
  const [popup, setPopup] = useState({ visible: false, message: "", type: "" });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_vx22t8y",   
        "template_1mom7rb", 
        form.current,
        "WTIAOOuaecGV7BxX4"    
      )
      .then(
        () => {
          setPopup({ visible: true, message: "Mensagem enviada com sucesso!", type: "success" });
          form.current.reset();
        },
        (error) => {
          console.error("Erro:", error);
          setPopup({ visible: true, message: "Erro ao enviar a mensagem. Tente novamente.", type: "error" });
        }
      );
  };

  const closePopup = () => setPopup({ visible: false, message: "", type: "" });

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

        <form ref={form} onSubmit={sendEmail} className="contact-form">
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

      {popup.visible && (
        <div className={`popup-overlay ${popup.type}`}>
          <div className="popup-box">
            <p>{popup.message}</p>
            <button onClick={closePopup} className="popup-btn">Fechar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
