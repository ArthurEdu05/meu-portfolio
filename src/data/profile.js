// Conteúdo centralizado do portfólio. Edite aqui para atualizar o site.
import { amazonasBerry } from "./projects/amazonasBerry";

export const profile = {
  name: "Arthur Eduardo",
  fullName: "Arthur Eduardo de Almeida Santos",
  role: "Desenvolvedor Full Stack",
  location: "São Paulo, SP",
  email: "arthuredu2005@gmail.com",
  phoneDisplay: "+55 (11) 96487-1473",
  whatsappUrl: "https://wa.me/5511964871473",
  linkedinUrl: "https://www.linkedin.com/in/arthuredu/",
  linkedinHandle: "in/arthuredu",
  githubUrl: "https://github.com/ArthurEdu05",
  summary:
    "Desenvolvedor na Tokio Marine Seguradora e estudante de Sistemas de Informação no Mackenzie. Construo aplicações Full Stack utilizando principalmente a linguagem Java, criando soluções que aprimoram fluxos e operações.",
  // Cada item é um parágrafo separado na seção Sobre
  about: [
    "A tecnologia faz parte da minha vida desde a infância. O primeiro passo profissional veio com a formação no curso técnico em Informática na FECAP. Hoje curso Sistemas de Informação na Universidade Mackenzie.",
    "No mercado corporativo, passei por análise de dados e desenvolvimento full stack, entregando de portais completos a automações. Atualmente, desenvolvo sistemas com Spring Boot e Angular na Tokio Marine Seguradora, trabalhando em times ágeis.",
  ],
  passions: ["tecnologia", "programação", "Inteligência Artificial", "dados", "desafios"],
};

export const navItems = [
  { id: "hero", label: "Início" },
  { id: "about", label: "Sobre" },
  { id: "skills", label: "Habilidades" },
  { id: "projects", label: "Projetos" },
  { id: "contact", label: "Contato" },
];

export const experience = [
  {
    company: "Tokio Marine Seguradora",
    role: "Desenvolvedor Full Stack",
    type: "Estágio",
    period: "Mar 2026 — Atual",
    current: true,
    location: "São Paulo, SP · Híbrido",
    highlights: [
      "Desenvolvimento de novos sistemas e manutenção de aplicações com Spring Boot e Angular, apoiando no levantamento de requisitos e nas rotinas de testes.",
      "Acompanhamento de entregas e prazos com metodologias ágeis (Scrum e Kanban), usando Jira para gestão de tarefas e Confluence para documentação técnica.",
    ],
    tags: ["Spring Boot", "Angular", "Scrum", "Jira", "Confluence"],
  },
  {
    company: "Sete Partners",
    role: "Desenvolvedor Full Stack",
    type: "Estágio",
    period: "Jul 2025 — Dez 2025",
    location: "São Paulo, SP · Presencial",
    highlights: [
      "Desenvolvi por completo o Portal de Financiamento NX Boats & Naval Crédito, que gerencia a análise de crédito de clientes interessados em financiamentos náuticos.",
      "Login com controle de acesso, simulador de financiamento com regras dinâmicas, geração automatizada de processos e painel administrativo integrado ao MySQL via AJAX.",
      "Integração com a API do OneDrive para gerenciamento de documentos.",
    ],
    tags: ["WordPress", "PHP", "MySQL", "AJAX", "OneDrive API"],
  },
  {
    company: "BeBrasil",
    role: "Analista de Dados",
    type: "Estágio",
    period: "Fev 2025 — Jul 2025",
    location: "São Paulo, SP · Presencial",
    highlights: [
      "Automatizei processos manuais e atualizei códigos Python, mantendo integrações com APIs ativas e adaptando soluções a mudanças em plataformas externas.",
      "Garanti a estabilidade de uma aplicação web, detectando e resolvendo problemas que afetavam as vendas e a experiência dos clientes.",
    ],
    tags: ["Python", "APIs", "Automação"],
  },
];

export const education = [
  {
    institution: "Universidade Mackenzie",
    course: "Sistemas de Informação",
    type: "Bacharelado",
    period: "Jan 2024 — Dez 2027",
    location: "São Paulo, SP",
    current: true,
  },
  {
    institution: "FECAP",
    course: "Técnico em Informática",
    type: "Ensino Técnico",
    period: "Fev 2021 — Nov 2023",
    location: "São Paulo, SP",
  },
];

export const languages = [
  { name: "Português", level: "Fluente" },
  { name: "Inglês", level: "Avançado (C1)", issuer: "CEL-LEP" },
];

// Enquanto a lista estiver vazia, a seção exibe as caixas de "Em breve".
// Para publicar um projeto, adicione objetos neste formato:
// `links` aceita { label, url, kind: "repo" | "live" }; use `private: true` se o código não for público.
// `details` habilita o botão "Ver detalhes" (ficha técnica em modal); `cover: { logo, from, to }` usa o logo como capa.
// Projetos com ficha técnica completa ficam em ./projects (ex.: amazonasBerry.js).
// Rascunhos prontos (descomente quando o projeto estiver no ar):
//   {
//     title: "Portal de Estágios",
//     category: "Recrutamento",
//     description:
//       "Plataforma para recrutamento de novos talentos, com frontend desacoplado do backend para garantir manutenibilidade e escalabilidade.",
//     highlights: [
//       "API RESTful em Java com Spring Boot e Spring Data JPA",
//       "Persistência em PostgreSQL (Supabase) e documentação com Swagger",
//       "SPA reativa em React, Next.js e Tailwind CSS",
//     ],
//     tags: ["Java", "Spring Boot", "PostgreSQL", "React", "Next.js", "Tailwind CSS"],
//     links: [
//       { label: "Backend", url: "https://github.com/ArthurEdu05/Portal-Estagios-Ps2", kind: "repo" },
//       {
//         label: "Frontend",
//         url: "https://github.com/ArthurEdu05/Portal-Estagios-PS2-NextApplication",
//         kind: "repo",
//       },
//     ],
//   },
//   {
//     title: "Aplicativo TEA",
//     category: "Saúde · Voluntário",
//     description:
//       "Aplicativo para terapeutas que trabalham com crianças do espectro autista: permite elaborar rotinas e consultar atividades de estimulação, respeitando as particularidades de cada criança.",
//     highlights: [
//       "Projeto voluntário com atuação principal no front-end",
//       "Interface pensada para uso diário por terapeutas",
//     ],
//     tags: ["JavaScript", "React", "Node.js", "MySQL"],
//     links: [
//       { label: "Código", url: "https://github.com/ArthurEdu05/TEA-SITE", kind: "repo" },
//       { label: "Ver site", url: "https://tea-site-three.vercel.app", kind: "live" },
//     ],
//   },
export const projects = [amazonasBerry];

// Próximos projetos: aparecem depois dos publicados para mostrar que há mais a caminho.
// Sem `title`, o card fica como "Próximo projeto"; preencha `title`/`category` quando quiser revelar.
export const upcomingProjects = [{}, {}];
