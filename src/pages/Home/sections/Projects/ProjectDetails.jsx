import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, motion, useMotionValue } from "framer-motion";
import {
  Activity,
  AppWindow,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Cloud,
  Database,
  GitBranch,
  Globe,
  Images,
  KeyRound,
  LayoutDashboard,
  Layers,
  ListOrdered,
  Lock,
  MessageCircle,
  Monitor,
  Server,
  ShieldCheck,
  Smartphone,
  Store,
  TicketPercent,
  TrendingUp,
  Truck,
  User,
  UserCog,
  Workflow,
  X,
  Zap,
  Code2,
  Container,
  FlaskConical,
  Palette,
  Plug,
} from "lucide-react";
import "./ProjectDetails.css";

const EASE = [0.22, 1, 0.36, 1];

const icons = {
  store: Store,
  user: User,
  dashboard: LayoutDashboard,
  orders: ClipboardList,
  coupon: TicketPercent,
  truck: Truck,
  chart: TrendingUp,
  chat: MessageCircle,
  images: Images,
  code: Code2,
  ui: Palette,
  server: Server,
  key: KeyRound,
  plug: Plug,
  container: Container,
  test: FlaskConical,
  frontend: AppWindow,
  database: Database,
  queue: ListOrdered,
  cache: Zap,
  activity: Activity,
  globe: Globe,
  shield: ShieldCheck,
  browser: Monitor,
  lock: Lock,
};

const tabs = [
  { id: "areas", label: "Áreas do sistema", Icon: LayoutDashboard },
  { id: "stack", label: "Stack & DevOps", Icon: GitBranch },
  { id: "fluxos", label: "Fluxos", Icon: Workflow },
  { id: "arquitetura", label: "Arquitetura", Icon: Layers },
  { id: "padroes", label: "Padrões", Icon: Boxes },
  { id: "seguranca", label: "Segurança & Acesso", Icon: KeyRound },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* ---------------------------------------------------------------- Galeria */

// Arraste mínimo (fração da largura) ou velocidade para trocar de imagem
const SWIPE_DISTANCE = 0.18;
const SWIPE_VELOCITY = 450;

function Gallery({ items, title }) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef(null);
  const thumbsRef = useRef(null);
  const x = useMotionValue(0);
  const current = items[index];
  const last = items.length - 1;

  const go = (next) => setIndex((next + items.length) % items.length);

  // Largura da moldura: a faixa de imagens anda de uma largura por vez
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  const snapTo = useCallback(
    (i) => animate(x, -i * width, { type: "spring", stiffness: 320, damping: 36 }),
    [x, width],
  );

  // Desliza até a imagem atual (setas, miniaturas, teclado ou fim do arraste)
  useEffect(() => {
    if (!width) return undefined;
    const controls = snapTo(index);
    return () => controls.stop();
  }, [index, width, snapTo]);

  // Centraliza a miniatura ativa rolando só a faixa de miniaturas (na horizontal),
  // sem mexer na rolagem vertical da ficha
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[index];
    if (!strip || !thumb) return;
    const stripRect = strip.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const left = strip.scrollLeft + (thumbRect.left - stripRect.left) - (strip.clientWidth - thumbRect.width) / 2;
    strip.scrollTo({ left, behavior: "smooth" });
  }, [index]);

  const onDragEnd = (_, info) => {
    setDragging(false);
    let next = index;
    if (info.offset.x < -width * SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) next = index + 1;
    else if (info.offset.x > width * SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) next = index - 1;
    next = Math.min(Math.max(next, 0), last);
    if (next === index) snapTo(index);
    else setIndex(next);
  };

  return (
    <div
      className="pd-gallery"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div
        ref={stageRef}
        className={`pd-gallery__stage${dragging ? " is-dragging" : ""}`}
        role="region"
        aria-roledescription="carrossel"
        aria-label={`Imagens do projeto ${title}`}
      >
        {/* Faixa com todas as imagens lado a lado: arrastável com dedo ou mouse */}
        <motion.div
          className="pd-gallery__track"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -last * width, right: 0 }}
          dragElastic={0.15}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
        >
          {items.map((item, i) => (
            <div
              key={item.src}
              className={`pd-gallery__slide pd-gallery__slide--${item.device}`}
              aria-hidden={i !== index}
            >
              <img src={item.src} alt={`${title}: ${item.caption}`} draggable={false} />
            </div>
          ))}
        </motion.div>

        <button type="button" className="pd-gallery__nav pd-gallery__nav--prev" onClick={() => go(index - 1)} aria-label="Imagem anterior">
          <ChevronLeft aria-hidden="true" />
        </button>
        <button type="button" className="pd-gallery__nav pd-gallery__nav--next" onClick={() => go(index + 1)} aria-label="Próxima imagem">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>

      <p className="pd-gallery__caption" aria-live="polite">
        {current.device === "mobile" ? <Smartphone aria-hidden="true" /> : <Monitor aria-hidden="true" />}
        <span>{current.caption}</span>
        <span className="pd-gallery__count">
          {index + 1}/{items.length}
        </span>
      </p>

      <div className="pd-gallery__thumbs" ref={thumbsRef}>
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            className={`pd-gallery__thumb pd-gallery__thumb--${item.device}`}
            onClick={() => setIndex(i)}
            aria-label={`Ver imagem ${i + 1}: ${item.caption}`}
            aria-current={i === index}
          >
            <img src={item.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- Abas */

function AreasTab({ areas }) {
  return (
    <div className="pd-areas">
      {areas.map((area) => {
        const Icon = icons[area.icon] || Store;
        return (
          <article key={area.id} className={`pd-area pd-area--${area.id}`}>
            <header className="pd-area__head">
              <span className="pd-icon">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <h4>{area.title}</h4>
                <span className="pd-area__audience">{area.audience}</span>
              </div>
            </header>
            <p className="pd-area__summary">{area.summary}</p>

            {area.items && (
              <ul className="pd-list">
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {area.modules && (
              <div className="pd-modules">
                {area.modules.map((m) => {
                  const ModIcon = icons[m.icon] || ClipboardList;
                  return (
                    <div key={m.name} className="pd-module">
                      <span className="pd-module__name">
                        <ModIcon aria-hidden="true" />
                        {m.name}
                      </span>
                      <p>{m.desc}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function ArchitectureTab({ architecture }) {
  const { layers, infrastructure, runtime } = architecture;

  // Camadas aninhadas: a de fora depende da de dentro, nunca o contrário
  const nested = layers.reduceRight(
    (inner, layer, i) => (
      <div className={`pd-layer pd-layer--${i}`}>
        <div className="pd-layer__label">
          <strong>{layer.name}</strong>
          {layer.path && <code>{layer.path}</code>}
        </div>
        <p>{layer.desc}</p>
        {inner}
      </div>
    ),
    null,
  );

  return (
    <div className="pd-arch">
      <p className="pd-lead">{architecture.intro}</p>

      <h4 className="pd-subtitle">Camadas do backend</h4>
      <div className="pd-hex">
        <div className="pd-hex__core">
          {nested}
          <span className="pd-hex__rule">
            <ArrowRight aria-hidden="true" />
            Dependências apontam para dentro
          </span>
        </div>

        <div className="pd-hex__infra">
          <div className="pd-layer__label">
            <strong>{infrastructure.name}</strong>
            {infrastructure.path && <code>{infrastructure.path}</code>}
          </div>
          <p>{infrastructure.desc}</p>
          <ul className="pd-plugs">
            {infrastructure.adapters.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="pd-note">
        <ShieldCheck aria-hidden="true" />
        {architecture.compositionRoot}
      </p>

      <h4 className="pd-subtitle">Topologia em produção</h4>
      <div className="pd-topo" role="list">
        <div className="pd-topo__row" role="listitem">
          <span className="pd-topo__tag">Internet</span>
          <div className="pd-node pd-node--edge">
            <Globe aria-hidden="true" />
            <div>
              <strong>{runtime.edge.name}</strong>
              <span>{runtime.edge.desc}</span>
            </div>
          </div>
        </div>
        <ArrowDown className="pd-topo__arrow" aria-hidden="true" />

        <div className="pd-topo__row" role="listitem">
          <span className="pd-topo__tag">Aplicação</span>
          <div className="pd-topo__group">
            {runtime.apps.map((n) => (
              <div key={n.name} className="pd-node">
                <Server aria-hidden="true" />
                <div>
                  <strong>{n.name}</strong>
                  <span>{n.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ArrowDown className="pd-topo__arrow" aria-hidden="true" />

        <div className="pd-topo__row" role="listitem">
          <span className="pd-topo__tag">Dados</span>
          <div className="pd-topo__group">
            {runtime.data.map((n) => (
              <div key={n.name} className="pd-node pd-node--data">
                <Database aria-hidden="true" />
                <div>
                  <strong>{n.name}</strong>
                  <span>{n.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ArrowDown className="pd-topo__arrow" aria-hidden="true" />

        <div className="pd-topo__row" role="listitem">
          <span className="pd-topo__tag">Workers</span>
          <div className="pd-topo__group pd-topo__group--workers">
            {runtime.workers.map((n) => (
              <div key={n.name} className="pd-node pd-node--worker">
                <div>
                  <strong>
                    <code>{n.name}</code>
                  </strong>
                  <span>{n.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ArrowDown className="pd-topo__arrow" aria-hidden="true" />

        <div className="pd-topo__row" role="listitem">
          <span className="pd-topo__tag">Externos</span>
          <div className="pd-topo__group pd-topo__group--external">
            {runtime.external.map((name) => (
              <div key={name} className="pd-node pd-node--external">
                <Cloud aria-hidden="true" />
                <strong>{name}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mesmo padrão visual dos cards da aba Padrões, sem numeração */}
      {architecture.facets.map((facet) => (
        <section key={facet.title} className="pd-facet">
          <h4 className="pd-subtitle">
            {facet.title}
            <span className="pd-subtitle__count">{facet.items.length}</span>
          </h4>
          <div className="pd-patterns">
            {facet.items.map((item) => (
              <article key={item.title} className="pd-pattern">
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SecurityTab({ security }) {
  return (
    <div className="pd-security">
      <p className="pd-lead">{security.intro}</p>

      <h4 className="pd-subtitle">Do login à autorização</h4>
      <ol className="pd-chain pd-chain--3">
        {security.authFlow.map((step, i) => (
          <li key={step.title}>
            <span className="pd-chain__n">{i + 1}</span>
            <strong>{step.title}</strong>
            <span>{step.desc}</span>
          </li>
        ))}
      </ol>

      <h4 className="pd-subtitle">Roles e permissões (RBAC)</h4>
      <div className="pd-roles">
        {security.roles.map((r) => (
          <div key={r.id} className="pd-role">
            <span className="pd-icon pd-icon--sm">
              {r.id === "admin" ? <UserCog aria-hidden="true" /> : <User aria-hidden="true" />}
            </span>
            <div>
              <strong>{r.label}</strong>
              <span>{r.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="pd-note pd-note--muted">
        <Globe aria-hidden="true" />
        {security.publicNote}
      </p>
      <ul className="pd-list pd-list--compact">
        {security.rbacNotes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>

      <h4 className="pd-subtitle">Outras proteções</h4>
      <ul className="pd-list">
        {security.protections.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function PatternsTab({ patterns }) {
  let counter = 0;
  return (
    <div className="pd-pattern-groups">
      {patterns.map((group) => (
        <section key={group.group}>
          <h4 className="pd-subtitle">
            {group.group}
            <span className="pd-subtitle__count">{group.items.length}</span>
          </h4>
          <div className="pd-patterns">
            {group.items.map((p) => {
              counter += 1;
              return (
                <article key={p.name} className="pd-pattern">
                  <span className="pd-pattern__index">{String(counter).padStart(2, "0")}</span>
                  <h5>{p.name}</h5>
                  <p>{p.what}</p>
                  <p className="pd-pattern__why">
                    <span>Na prática</span>
                    {p.why}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function FlowsTab({ flows }) {
  return (
    <div className="pd-flows">
      <section>
        <h4 className="pd-subtitle">Máquina de estados do pedido</h4>
        <div className="pd-states" aria-label="Fluxo principal de status do pedido">
          {flows.statuses.map((s, i) => (
            <div key={s.id} className="pd-states__item">
              <span className="pd-state">{s.label}</span>
              {i < flows.statuses.length - 1 && <ArrowRight className="pd-states__arrow" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="pd-subtitle">Transactional Outbox</h4>
        <ol className="pd-chain">
          {flows.outbox.map((step, i) => (
            <li key={step.title}>
              <span className="pd-chain__n">{i + 1}</span>
              <strong>{step.title}</strong>
              <span>{step.desc}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className="pd-subtitle">Jornada de compra, do carrinho à confirmação</h4>
        <ol className="pd-timeline">
          {flows.checkout.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <span>{step.desc}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function StackTab({ stack, pipeline }) {
  return (
    <div className="pd-stack">
      <p className="pd-lead">Tecnologias organizadas por camada, com o papel de cada grupo no sistema.</p>

      <ul className="pd-stack__rows">
        {stack.map((g) => {
          const GroupIcon = icons[g.icon] || Layers;
          return (
            <li key={g.group} className="pd-stack__row">
              <div className="pd-stack__head">
                <span className="pd-icon pd-icon--sm">
                  <GroupIcon aria-hidden="true" />
                </span>
                <div>
                  <h4>{g.group}</h4>
                  <p>{g.desc}</p>
                </div>
              </div>

              <div className="pd-stack__body">
                <ul className="pd-stack__chips" aria-label={`${g.group}: tecnologias principais`}>
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      <h4 className="pd-subtitle">Pipeline de entrega contínua</h4>
      <ol className="pd-chain">
        {pipeline.map((step, i) => (
          <li key={step.title}>
            <span className="pd-chain__n">{i + 1}</span>
            <strong>{step.title}</strong>
            <span>{step.desc}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ Modal */

export default function ProjectDetails({ project, onClose }) {
  const { title, category, description, links = [], details } = project;
  const [tab, setTab] = useState(tabs[0].id);
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const tabsAnchorRef = useRef(null);
  const keepTabsPinned = useRef(false);
  const [panelMinHeight, setPanelMinHeight] = useState(0);
  const tabsRef = useRef(null);
  const titleId = `pd-title-${project.slug}`;

  // Trava a rolagem da página e devolve o foco ao fechar
  useEffect(() => {
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // Foca o próprio diálogo (sem contorno); o X recebe foco só pela navegação com Tab
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      // Mantém o foco do teclado dentro do diálogo
      if (e.key === "Tab" && panelRef.current) {
        const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null);
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  // Troca de aba sem mover a tela: a faixa de abas fica exatamente onde estava.
  // Se ela estiver presa no topo, a nova aba aparece logo abaixo dela, desde o início.
  const selectTab = (id) => {
    if (id === tab) return;
    const area = scrollRef.current;
    const bar = tabsRef.current;
    if (area && bar) {
      keepTabsPinned.current = bar.getBoundingClientRect().top - area.getBoundingClientRect().top <= 1;
    }
    setTab(id);
  };

  useLayoutEffect(() => {
    if (!keepTabsPinned.current) return;
    keepTabsPinned.current = false;
    const area = scrollRef.current;
    const anchor = tabsAnchorRef.current;
    if (area && anchor) area.scrollTop = anchor.offsetTop;
  }, [tab]);

  // Altura mínima do conteúdo das abas: uma aba mais curta nunca força a tela a subir
  useLayoutEffect(() => {
    const area = scrollRef.current;
    const bar = tabsRef.current;
    if (!area || !bar) return undefined;
    const update = () => setPanelMinHeight(Math.max(0, area.clientHeight - bar.offsetHeight));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  const onTabKey = (e) => {
    const i = tabs.findIndex((t) => t.id === tab);
    let next = null;
    if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
    if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
    if (!next) return;
    e.preventDefault();
    selectTab(next.id);
    document.getElementById(`pd-tab-${next.id}`)?.focus({ preventScroll: true });
  };

  return createPortal(
    <motion.div
      className="pd-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        ref={panelRef}
        className="pd-panel"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="pd-topbar">
          <span className="pd-topbar__title">
            <span className="pd-dot" aria-hidden="true" />
            {title}
            <span className="pd-topbar__sub">· Ficha técnica</span>
          </span>
          <button type="button" className="pd-close" onClick={onClose} aria-label="Fechar detalhes do projeto">
            <X aria-hidden="true" />
          </button>
        </div>

        {/* A rolagem fica nesta área interna, abaixo do cabeçalho, para a barra não escapar das bordas */}
        <div className="pd-scroll" ref={scrollRef}>
          <div className="pd-content">
            <header className="pd-hero">
              <div className="pd-hero__text">
                <span className="pd-chip">{category}</span>
                <h3 id={titleId} className="pd-hero__title">
                  {title}
                </h3>
                <p className="pd-hero__tagline">{details.tagline}</p>
                <p className="pd-hero__desc">{description}</p>

                <div className="pd-hero__actions">
                  {links.map(({ label, url, kind }) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${kind === "live" ? "btn--primary" : "btn--ghost"}`}
                    >
                      {label}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ))}
                  {project.private && (
                    <span className="pd-private">
                      <Lock aria-hidden="true" />
                      Repositório privado
                    </span>
                  )}
                </div>
              </div>

              <dl className="pd-meta">
                {details.meta.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>
                      {m.value === "Em produção" && <span className="pd-live" aria-hidden="true" />}
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </header>

            <Gallery items={details.gallery} title={title} />

            <section className="pd-overview" aria-label="Visão geral">
              <div className="pd-overview__text">
                {details.overview.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <ul className="pd-metrics">
                {details.metrics.map((m) => (
                  <li key={m.label}>
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div ref={tabsAnchorRef} aria-hidden="true" />
            <div className="pd-tabs" ref={tabsRef}>
              <div className="pd-tabs__list" role="tablist" aria-label="Seções da ficha técnica" onKeyDown={onTabKey}>
                {tabs.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    id={`pd-tab-${id}`}
                    type="button"
                    role="tab"
                    aria-selected={tab === id}
                    aria-controls={`pd-panel-${id}`}
                    tabIndex={tab === id ? 0 : -1}
                    className="pd-tabs__tab"
                    onClick={() => selectTab(id)}
                  >
                    <Icon aria-hidden="true" />
                    {label}
                    {tab === id && <motion.span layoutId="pd-tab-indicator" className="pd-tabs__indicator" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Caixa fixa que nunca sai da página: ao trocar de aba, a altura não encolhe
                nem por um instante (no Safari/WebKit isso fazia a tela pular) */}
            <div className="pd-tabpanels" style={{ minHeight: panelMinHeight }}>
              <motion.div
                key={tab}
                id={`pd-panel-${tab}`}
                role="tabpanel"
                aria-labelledby={`pd-tab-${tab}`}
                className="pd-tabpanel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {tab === "areas" && <AreasTab areas={details.areas} />}
                {tab === "arquitetura" && <ArchitectureTab architecture={details.architecture} />}
                {tab === "seguranca" && <SecurityTab security={details.security} />}
                {tab === "padroes" && <PatternsTab patterns={details.patterns} />}
                {tab === "fluxos" && <FlowsTab flows={details.flows} />}
                {tab === "stack" && <StackTab stack={details.stack} pipeline={details.pipeline} />}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
