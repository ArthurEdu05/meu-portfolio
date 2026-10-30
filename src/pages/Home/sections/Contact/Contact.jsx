import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "emailjs-com";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Send,
  AlertCircle,
} from "lucide-react";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import SectionHeader from "../../../../components/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "../../../../components/Reveal";
import { profile } from "../../../../data/profile";
import "./Contact.css";

const EMAILJS = {
  serviceId: "service_vx22t8y",
  templateId: "template_1mom7rb",
  publicKey: "WTIAOOuaecGV7BxX4",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Informe seu nome.";
  if (!values.email.trim()) errors.email = "Informe seu e-mail.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "Verifique o e-mail - ex.: nome@empresa.com";
  if (values.message.trim().length < 10)
    errors.message = "Escreva uma mensagem com pelo menos 10 caracteres.";
  return errors;
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Plano B para navegadores que bloqueiam a área de transferência
      const field = document.createElement("textarea");
      field.value = profile.email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      className={`channel__copy${copied ? " is-copied" : ""}`}
      onClick={copy}
      aria-label={copied ? "E-mail copiado" : "Copiar e-mail"}
      title={copied ? "E-mail copiado" : "Copiar e-mail"}
    >
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      <span className="channel__copy-label" aria-live="polite">
        {copied ? "Copiado" : "Copiar"}
      </span>
    </button>
  );
}

const channels = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: profile.phoneDisplay,
    href: profile.whatsappUrl,
    external: true,
  },
  {
    icon: Mail,
    label: "E-mail",
    value: profile.email,
    // Sem link: neste card, só o botão "Copiar" é clicável
    copy: true,
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    value: profile.linkedinHandle,
    href: profile.linkedinUrl,
    external: true,
  },
  {
    icon: MapPin,
    label: "Localização",
    value: `${profile.location} · Brasil`,
  },
];

// Ao enviar, o avião "decola" antes do texto "Enviando…" entrar
const submitLabel = {
  enter: { opacity: 0, y: 12 },
  rest: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
  launch: { opacity: 0, transition: { duration: 0.2, delay: 0.12 } },
};

const submitPlane = {
  enter: { x: 0, y: 0 },
  rest: { x: 0, y: 0, rotate: 0, opacity: 1 },
  launch: {
    x: 28,
    y: -22,
    rotate: -12,
    opacity: 0,
    transition: { duration: 0.32, ease: [0.55, 0, 0.75, 0.2] },
  },
};

// Barra que esvazia até a notificação sumir
function FeedbackTimer({ duration, onEnd }) {
  return (
    <span
      className="form__feedback-timer"
      style={{ "--duration": `${duration}s` }}
      onAnimationEnd={onEnd}
      aria-hidden="true"
    />
  );
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>
        {label} <span aria-hidden="true">*</span>
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            className="field__error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AlertCircle aria-hidden="true" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const errors = validate(values);
  const showError = (field) => (touched[field] ? errors[field] : undefined);

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    if (status === "success" || status === "error") setStatus("idle");
  };
  const dismissFeedback = () => setStatus("idle");
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errors).length) {
      const first = formRef.current.querySelector(`[name="${Object.keys(errors)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        formRef.current,
        EMAILJS.publicKey
      );
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
      setTouched({});
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setStatus("error");
    }
  };

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    "aria-invalid": showError(name) ? "true" : "false",
    "aria-describedby": showError(name) ? `contact-${name}-error` : undefined,
    disabled: status === "sending",
  });

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          id="contact-title"
          eyebrow="04 · Contato"
          title="Vamos conversar?"
          subtitle="Aberto a conversas sobre oportunidades, projetos e parcerias. Escolha o canal que preferir ou envie uma mensagem pelo formulário."
        />

        <div className="contact__grid">
          <RevealGroup className="channels" stagger={0.08}>
            {channels.map(({ icon: Icon, label, value, href, external, copy }) => {
              const content = (
                <>
                  <span className="channel__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="channel__text">
                    <span className="channel__label">{label}</span>
                    <span className={`channel__value${copy ? " channel__value--email" : ""}`}>{value}</span>
                  </span>
                </>
              );
              return (
                <RevealItem key={label} className="channel">
                  {href ? (
                    <a
                      href={href}
                      className="channel__link"
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      aria-label={`${label}: ${value}${external ? " (abre em nova aba)" : ""}`}
                    >
                      {content}
                      {!copy && <ArrowUpRight className="channel__arrow" aria-hidden="true" />}
                    </a>
                  ) : (
                    <div className="channel__link channel__link--static">{content}</div>
                  )}
                  {copy && <CopyEmailButton />}
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal delay={0.1}>
            <form
              ref={formRef}
              className="form"
              onSubmit={onSubmit}
              noValidate
              aria-labelledby="form-title"
            >
              <div className="form__head">
                <h3 id="form-title">Envie uma mensagem</h3>
                <p>
                  Campos marcados com <span aria-hidden="true">*</span>
                  <span className="sr-only">asterisco</span> são obrigatórios.
                </p>
              </div>

              <div className="form__row">
                <Field id="contact-name" label="Nome" error={showError("name")}>
                  <input type="text" autoComplete="name" placeholder="Seu nome completo" {...fieldProps("name")} />
                </Field>
                <Field id="contact-email" label="E-mail" error={showError("email")}>
                  <input type="email" autoComplete="email" placeholder="nome@empresa.com" {...fieldProps("email")} />
                </Field>
              </div>

              <Field id="contact-message" label="Mensagem" error={showError("message")}>
                <textarea
                  rows={5}
                  placeholder="Conte um pouco sobre a oportunidade ou projeto…"
                  {...fieldProps("message")}
                />
              </Field>

              <button
                type="submit"
                className={`btn btn--primary form__submit${status === "sending" ? " is-sending" : ""}`}
                disabled={status === "sending"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "sending" ? (
                    <motion.span
                      key="sending"
                      className="form__submit-label"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Loader2 className="spin" aria-hidden="true" />
                      Enviando…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      className="form__submit-label"
                      variants={submitLabel}
                      initial="enter"
                      animate="rest"
                      exit="launch"
                    >
                      Enviar mensagem
                      <motion.span className="form__submit-plane" variants={submitPlane}>
                        <Send aria-hidden="true" />
                      </motion.span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <div aria-live="polite" role="status">
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.p
                      key="ok"
                      className="form__feedback form__feedback--success"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, transition: { duration: 0.18 } }}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    >
                      <motion.span
                        className="form__feedback-icon"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 16, delay: 0.12 }}
                      >
                        <CheckCircle2 aria-hidden="true" />
                      </motion.span>
                      Mensagem enviada com sucesso! Retornarei o contato em breve.
                      <FeedbackTimer duration={5} onEnd={dismissFeedback} />
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      key="err"
                      className="form__feedback form__feedback--error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
                      exit={{ opacity: 0, y: -4, transition: { duration: 0.18 } }}
                      transition={{
                        opacity: { duration: 0.2 },
                        y: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                        x: { duration: 0.45, delay: 0.1 },
                      }}
                    >
                      <AlertCircle aria-hidden="true" />
                      <span>
                        Não foi possível enviar agora. Tente novamente ou escreva direto para{" "}
                        <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                      </span>
                      <FeedbackTimer duration={8} onEnd={dismissFeedback} />
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
