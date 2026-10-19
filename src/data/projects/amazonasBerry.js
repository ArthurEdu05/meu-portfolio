// Ficha técnica do Amazonas Berry. As capturas foram feitas no site em produção.
import homeHero from "../../assets/images/projects/amazonas-berry/home-hero.jpg";
import homeProdutos from "../../assets/images/projects/amazonas-berry/home-produtos.jpg";
import catalogo from "../../assets/images/projects/amazonas-berry/catalogo.jpg";
import sobre from "../../assets/images/projects/amazonas-berry/sobre.jpg";
import mosaico from "../../assets/images/projects/amazonas-berry/mosaico.jpg";
import ondeEncontrar from "../../assets/images/projects/amazonas-berry/onde-encontrar.jpg";
import login from "../../assets/images/projects/amazonas-berry/login.jpg";
import mobileHome from "../../assets/images/projects/amazonas-berry/mobile-home.jpg";
import mobileCatalogo from "../../assets/images/projects/amazonas-berry/mobile-catalogo.jpg";
import logo from "../../assets/images/projects/amazonas-berry/logo.webp";

export const amazonasBerry = {
  slug: "amazonas-berry",
  title: "Amazonas Berry",
  category: "E-commerce",
  // Capa do card: logo sobre a cor da marca (as capturas aparecem nos detalhes)
  cover: { logo, from: "#4a1468", to: "#14061d" },
  description:
    "E-commerce completo para uma rede de açaí com lojas em São Paulo: vitrine online, área do cliente com pedidos e pagamentos integrados na loja e um painel gerencial para operar pedidos, catálogo, cupons, frete e cancelamentos.",
  tags: ["TypeScript", "React", "TanStack Start", "Node.js", "Express", "Prisma", "MySQL", "Redis", "BullMQ", "Docker"],
  private: true,
  links: [{ label: "Ver site", url: "https://amazonasberry.com.br", kind: "live" }],

  details: {
    tagline: "Do clique no produto ao estorno: toda a operação de venda online da rede, em um só sistema.",
    overview: [
      "A Amazonas Berry é uma rede de açaí com lojas em Botucatu, Taboão da Serra e São Paulo. O sistema substitui a venda manual por uma loja online própria: o cliente monta o carrinho, calcula o frete até o endereço, agenda a entrega, paga sem sair do site e acompanha o pedido. A equipe da loja opera tudo por um painel gerencial.",
      "Como o sistema lida com dinheiro, estoque e dados pessoais, o backend foi desenhado para não perder nem duplicar operações: pedidos idempotentes, eventos gravados na mesma transação do dado (outbox), filas separadas por domínio e reconciliação de pagamentos que chegam atrasados.",
    ],
    meta: [
      { label: "Status", value: "Em produção" },
      { label: "Período", value: "2026" },
    ],
    metrics: [
      { value: "23", label: "Commands (escrita)" },
      { value: "23", label: "Queries (leitura)" },
      { value: "12", label: "Portas de aplicação" },
      { value: "21", label: "Modelos no banco" },
      { value: "6", label: "Processos em produção" },
      { value: "290+", label: "Testes automatizados" },
    ],

    gallery: [
      { src: homeHero, device: "desktop", caption: "Home — chamada principal da loja" },
      { src: homeProdutos, device: "desktop", caption: "Vitrine com carrossel de produtos e animação de “voar para o carrinho”" },
      { src: catalogo, device: "desktop", caption: "Catálogo completo, alimentado pela API com cache" },
      { src: sobre, device: "desktop", caption: "Institucional — Sobre a Amazonas Berry" },
      { src: mosaico, device: "desktop", caption: "Mosaico de fotos da home, gerenciado pelo painel" },
      { src: ondeEncontrar, device: "desktop", caption: "Onde encontrar — mapa e navegação entre as 3 lojas" },
      { src: login, device: "desktop", caption: "Área do cliente — login e cadastro com Clerk (Google ou e-mail)" },
      { src: mobileHome, device: "mobile", caption: "Versão mobile — home" },
      { src: mobileCatalogo, device: "mobile", caption: "Versão mobile — catálogo" },
    ],

    areas: [
      {
        id: "loja",
        icon: "store",
        title: "Loja pública",
        audience: "Visitantes",
        summary:
          "Vitrine renderizada no servidor (SSR) com TanStack Start, boa para SEO e pensada primeiro para o celular.",
        items: [
          "Home com carrossel de produtos, institucional, mosaico de fotos, dúvidas frequentes e “Trabalhe conosco”",
          "Catálogo e carrinho com animação de “voar para o carrinho”; o carrinho persiste no navegador",
          "“Onde encontrar” com mapa e navegação entre as três lojas",
          "Cache público com stale-while-revalidate: se o banco oscilar, o catálogo continua no ar",
          "Analytics próprio de visitas, que respeita Do Not Track e Global Privacy Control",
        ],
      },
      {
        id: "cliente",
        icon: "user",
        title: "Área do cliente",
        audience: "Clientes autenticados",
        summary:
          "Fluxo de compra completo, do endereço ao acompanhamento. O login é feito com Clerk e toda rota do cliente checa se o pedido é dele (ownership) no servidor.",
        items: [
          "Checkout com busca de CEP (ViaCEP), endereços salvos e perfil de compra",
          "Frete calculado pela rota real até a loja mais próxima (Mapbox), com política de preço por km",
          "Agendamento da entrega em janelas de Manhã, Tarde e Noite, até 30 dias à frente",
          "Cupons de desconto e revisão completa do pedido antes de pagar",
          "Pagamento embutido com Mercado Pago Bricks: Pix, crédito, débito e conta Mercado Pago, com contagem regressiva da reserva",
          "“Meus pedidos” com linha do tempo de status, retomada de pagamento pendente e pedido de cancelamento com conversa com a loja",
          "Avisos de status do pedido no WhatsApp",
        ],
      },
      {
        id: "gerencial",
        icon: "dashboard",
        title: "Painel gerencial",
        audience: "Administradores",
        summary:
          "Painel de operação protegido por RBAC. Cada ação administrativa grava um registro de auditoria na mesma transação.",
        modules: [
          { icon: "orders", name: "Pedidos", desc: "Indicadores de faturamento e ticket médio, busca e filtros paginados no servidor, detalhes carregados sob demanda e mudança de status validada por máquina de estados." },
          { icon: "store", name: "Loja", desc: "Cadastro de produtos com upload de imagem validado (formato, dimensões e tamanho), selo, ativação e controle de estoque opcional." },
          { icon: "coupon", name: "Cupons", desc: "Criação, edição e ativação de cupons, com consumo serializado na transação do pedido." },
          { icon: "truck", name: "Frete", desc: "Política de entrega editável: preço mínimo, km incluídos, adicional por km iniciado e distância máxima." },
          { icon: "chart", name: "Análises", desc: "Vendas e pedidos por dia (Recharts), público do site, cadastros e funil de compra." },
          { icon: "chat", name: "Cancelamentos", desc: "Fila de solicitações com conversa com o cliente; ao aprovar, um worker faz o estorno no Mercado Pago." },
          { icon: "images", name: "Mosaico", desc: "Gestão das fotos que aparecem na home." },
        ],
      },
    ],

    architecture: {
      intro:
        "O backend segue Arquitetura Hexagonal (Ports & Adapters) com camadas no estilo Clean Architecture. As dependências apontam sempre para dentro: o domínio não conhece Express, Prisma, Clerk ou Mercado Pago. Testes de arquitetura quebram o build se uma camada importar o que não deve.",
      layers: [
        {
          name: "Presentation",
          path: "presentation/http",
          desc: "Rotas Express, autenticação, RBAC, CORS, headers de segurança e rate limit. Converte HTTP em commands e queries.",
        },
        {
          name: "Application",
          path: "application",
          desc: "Casos de uso: 23 commands, 23 queries e 12 portas (interfaces) que a infraestrutura implementa.",
        },
        {
          name: "Domain",
          path: "domain",
          desc: "Entidades, value objects (Money, Address, OrderStatus), eventos de domínio e regras de transição de status.",
        },
      ],
      infrastructure: {
        name: "Infrastructure",
        path: "infrastructure",
        desc: "Adapters que implementam as portas:",
        adapters: ["Prisma / MySQL", "Mercado Pago", "Clerk", "Mapbox", "WhatsApp (Meta / Chatwoot)", "Redis / BullMQ"],
      },
      compositionRoot:
        "bootstrap/application-container.ts é a composition root: o único arquivo que conhece ao mesmo tempo os handlers e os adapters concretos e faz a injeção de dependências.",

      // Aprofundamento por tema, exibido em blocos na aba Arquitetura
      facets: [
        {
          icon: "frontend",
          title: "Frontend",
          items: [
            { title: "SSR com TanStack Start", desc: "Páginas renderizadas no servidor (Nitro) e hidratadas no navegador, com roteamento por arquivos e rotas tipadas pelo TanStack Router." },
            { title: "Estado do servidor × estado local", desc: "TanStack Query cuida dos dados da API (com staleTime no catálogo); o carrinho é um React Context salvo no localStorage com uma chave por usuário." },
            { title: "Cliente HTTP central", desc: "Injeta o token do Clerk em cada chamada, aplica timeout, lança erros tipados (ex.: AuthenticationRequiredError) e alimenta um overlay global de carregamento." },
            { title: "Formulários validados", desc: "React Hook Form + Zod no checkout e no perfil, com busca de CEP no ViaCEP (timeout de 4 s e cache em memória)." },
            { title: "Design system acessível", desc: "Componentes shadcn/ui sobre Radix UI, estilizados com Tailwind CSS 4 e animados com Motion." },
            { title: "SDK sob demanda", desc: "O SDK do Mercado Pago só é carregado na página de pagamento, o que mantém o resto do site leve e a CSP mais restrita." },
          ],
        },
        {
          icon: "database",
          title: "Dados e consistência",
          items: [
            { title: "Locks pessimistas ordenados", desc: "Produtos, cupom e pedido são travados com SELECT … FOR UPDATE dentro da transação, sempre em ordem de ID para evitar deadlocks." },
            { title: "Pedido com ID determinístico", desc: "O ID é um SHA-256 de usuário + Idempotency-Key. Uma colisão concorrente (P2002) é resolvida com uma nova tentativa que reaproveita o pedido existente." },
            { title: "Preço sempre do servidor", desc: "O backend recalcula preços e grava snapshots de nome, preço e quantidade no pedido. Valores enviados pelo navegador são ignorados." },
            { title: "Reserva de estoque e cupom", desc: "Reservados na criação do pedido e devolvidos uma única vez quando ele expira (devolução idempotente)." },
            { title: "Retry só onde é seguro", desc: "Leituras repetem com backoff exponencial + jitter em erros transitórios do banco (P1001, P1002, P1017, P2024). Escritas de pagamento, estoque e status nunca têm retry automático." },
            { title: "Índices e pool sob medida", desc: "Índices compostos desenhados por consulta (status + data + id, tipo + status + disponibilidade) e pool de conexões limitado por processo: 5 na API e 2 por worker." },
            { title: "Migrations versionadas", desc: "14 migrations aplicadas com prisma migrate deploy no pipeline. db push nunca é usado em produção." },
          ],
        },
        {
          icon: "queue",
          title: "Mensageria e workers",
          items: [
            { title: "Claim atômico (compare-and-set)", desc: "O worker só assume um evento com um UPDATE condicional (PENDING ou lease vencido), gravando um lockToken único." },
            { title: "Lease com heartbeat", desc: "O lease é renovado enquanto o handler roda. Se o worker perder o lease, não confirma o evento e outro pode assumi-lo." },
            { title: "Retentativas controladas", desc: "BullMQ com jobId derivado do evento/tentativa (sem jobs duplicados) e backoff exponencial. Depois do limite, o evento vira FAILED e o admin pode reprocessá-lo." },
            { title: "Filas isoladas (bulkhead)", desc: "Pagamentos, notificações, cancelamentos e estornos rodam em filas, concorrências e containers separados." },
            { title: "Notificação sem duplicidade", desc: "Mensagens de WhatsApp seguem a ordem de cada pedido; a tabela OrderNotificationDelivery impede reenvio quando só a conclusão do evento precisa ser repetida." },
            { title: "Redis não é a fonte da verdade", desc: "Redis dedicado com AOF e noeviction. Se cair, os eventos continuam PENDING no MySQL e são publicados depois." },
          ],
        },
        {
          icon: "cache",
          title: "Cache",
          items: [
            { title: "Stale-while-revalidate", desc: "Catálogo e mosaico respondem do cache fresco; quando ele envelhece, o valor antigo é servido enquanto a atualização roda em segundo plano." },
            { title: "Single-flight", desc: "Requisições simultâneas para a mesma chave compartilham uma única ida ao banco." },
            { title: "Lease distribuída de refresh", desc: "Só uma instância atualiza cada chave, garantido por SET NX PX no Redis e liberação por script Lua que confere o token." },
            { title: "Invalidação por evento", desc: "Mutações no painel (produto, mosaico, cupom) invalidam as chaves afetadas. Se o Redis estiver fora, a falha é tolerada." },
          ],
        },
        {
          icon: "activity",
          title: "Observabilidade e operação",
          items: [
            { title: "Logs estruturados", desc: "Logs em JSON (timestamp, nível, evento). Erros são reduzidos a nome:código, sem payloads nem dados pessoais." },
            { title: "Alertas operacionais", desc: "Monitor periódico que alerta para banco ou BullMQ indisponíveis, eventos FAILED, falhas de pagamento, estorno ou WhatsApp e jobs com erro." },
            { title: "Liveness × readiness", desc: "/health indica que o processo está vivo; /ready só responde OK com o banco disponível. Cada worker tem seu próprio healthcheck HTTP." },
            { title: "Graceful shutdown", desc: "Em SIGTERM/SIGINT a API para de aceitar conexões e fecha filas, Redis e Prisma antes de sair, sem cortar requisições no meio." },
            { title: "Containers enxutos", desc: "Dockerfile multi-stage, dependências de desenvolvimento removidas e execução com usuário não-root." },
          ],
        },
      ],

      runtime: {
        edge: { name: "Caddy", desc: "HTTPS automático e proxy reverso" },
        apps: [
          { name: "Frontend", desc: "TanStack Start (SSR)" },
          { name: "API", desc: "Express · somente HTTP" },
        ],
        data: [
          { name: "MySQL", desc: "Fonte da verdade + outbox" },
          { name: "Redis", desc: "BullMQ, cache e rate limit" },
        ],
        workers: [
          { name: "payments", desc: "Verifica e reconcilia pagamentos" },
          { name: "notifications", desc: "WhatsApp, em ordem por pedido" },
          { name: "cancellations", desc: "Solicitações, mensagens e disputas" },
          { name: "refunds", desc: "Estornos no Mercado Pago" },
          { name: "maintenance", desc: "Expira pedidos e emite alertas" },
        ],
        external: ["Mercado Pago", "Clerk", "Mapbox", "WhatsApp"],
      },
    },

    security: {
      intro:
        "Identidade fica com o Clerk; autorização fica no backend. O frontend usa a role só para decidir o que mostrar (por exemplo, o link do painel). Quem decide o acesso é sempre o servidor, rota por rota.",
      authFlow: [
        { title: "Login", desc: "Telas próprias com componentes do Clerk: Google ou e-mail e senha." },
        { title: "Token Bearer", desc: "O cliente HTTP anexa o JWT da sessão em cada chamada à API." },
        { title: "Verificação", desc: "Assinatura do JWT e claim azp (authorized parties), obrigatório em produção, validados pelo adapter do Clerk." },
        { title: "Role", desc: "Lida do publicMetadata do Clerk. Sem role, o usuário recebe customer, o menor privilégio. Só e-mail verificado é considerado." },
        { title: "Permissão", desc: "Cada rota exige uma permissão específica. Sem token: 401. Sem permissão: 403." },
        { title: "Ownership", desc: "Em rotas *:own, readers e stores filtram pelo dono no banco. Um cliente nunca acessa o pedido de outro." },
      ],
      roles: [
        { id: "admin", label: "Administrador", short: "Admin", desc: "Equipe da loja. Opera o painel gerencial." },
        { id: "customer", label: "Cliente", short: "Cliente", desc: "Qualquer conta criada no site. É a role padrão." },
      ],
      publicNote:
        "Sem login, o visitante acessa apenas rotas públicas: catálogo, mosaico da home, aplicação de cupom e registro de visitas.",
      permissions: [
        { group: "Pedidos", items: [
          { id: "orders:create", desc: "Criar pedidos e cotar frete", admin: true, customer: true },
          { id: "orders:read:own", desc: "Ver os próprios pedidos", admin: true, customer: true },
          { id: "orders:read:any", desc: "Ver pedidos de todos os clientes", admin: true, customer: false },
          { id: "orders:manage", desc: "Atualizar status de pedidos", admin: true, customer: false },
        ] },
        { group: "Cancelamentos e suporte", items: [
          { id: "cancellations:read:own", desc: "Ver os próprios cancelamentos", admin: true, customer: true },
          { id: "cancellations:manage:own", desc: "Solicitar cancelamento e conversar no caso", admin: true, customer: true },
          { id: "cancellations:read:any", desc: "Ver todos os cancelamentos", admin: true, customer: false },
          { id: "cancellations:manage:any", desc: "Aprovar, recusar e encerrar casos", admin: true, customer: false },
          { id: "support:reply", desc: "Responder clientes", admin: true, customer: false },
        ] },
        { group: "Conta", items: [
          { id: "profile:manage:own", desc: "Editar perfil e endereços", admin: true, customer: true },
        ] },
        { group: "Loja", items: [
          { id: "catalog:manage", desc: "Cadastrar e editar produtos", admin: true, customer: false },
          { id: "coupons:manage", desc: "Gerenciar cupons", admin: true, customer: false },
          { id: "shipping:manage", desc: "Editar a política de frete", admin: true, customer: false },
          { id: "mosaic:manage", desc: "Gerenciar fotos da home", admin: true, customer: false },
        ] },
        { group: "Operação", items: [
          { id: "analytics:read", desc: "Ver vendas e público do site", admin: true, customer: false },
          { id: "events:read", desc: "Ver eventos da outbox", admin: true, customer: false },
          { id: "events:retry", desc: "Reprocessar eventos com falha", admin: true, customer: false },
          { id: "audit:read", desc: "Ver o log de auditoria", admin: true, customer: false },
        ] },
      ],
      rbacNotes: [
        "Permissões são declaradas uma única vez (const tipada) e o mapa role → permissões é checado pelo compilador com satisfies.",
        "Controllers pedem permissões, nunca roles: incluir uma nova role não exige mexer em nenhuma rota.",
        "O resultado da autenticação é memoizado por requisição (WeakMap), então o Clerk é consultado uma vez mesmo que a rota cheque várias permissões.",
        "Uploads do painel são autorizados antes do parser de corpo grande: um usuário sem permissão não consegue enviar uma imagem pesada para o servidor.",
        "Toda mutação administrativa grava ator, ação e recurso no AuditLog, na mesma transação da alteração.",
      ],
      layers: [
        { icon: "globe", name: "Borda", items: [
          "Caddy com HTTPS automático e redirecionamento de www",
          "Só as portas 80 e 443 ficam expostas; banco, Redis e workers ficam em rede interna",
          "Chatwoot em uma stack separada, com banco, Redis e segredos próprios",
        ] },
        { icon: "shield", name: "HTTP da API", items: [
          "CORS com allowlist exata de origens em produção",
          "HSTS, CSP default-src 'none', X-Frame-Options DENY, nosniff, Referrer-Policy e Permissions-Policy",
          "Cache-Control: no-store, X-Powered-By desativado e trust proxy configurado explicitamente",
          "Corpo JSON limitado a 128 KB e timeout em toda chamada externa",
        ] },
        { icon: "gauge", name: "Rate limit", items: [
          "Janela fixa no Redis com script Lua atômico (INCR + PEXPIRE), compartilhada entre instâncias",
          "Fallback em memória se o Redis falhar",
          "Limites por rota: API geral, verificação de pagamento, cotação de frete, webhook e analytics",
          "Headers RateLimit-* e Retry-After nas respostas 429",
        ] },
        { icon: "card", name: "Pagamentos", items: [
          "Webhook validado com HMAC-SHA256 e comparação em tempo constante (timingSafeEqual)",
          "Tolerância de 5 minutos no timestamp contra replay; qualquer falha rejeita o webhook (fail-closed)",
          "O backend consulta o Mercado Pago e confere valor, moeda, ambiente e recebedor antes de confirmar",
          "Dados vindos do redirect nunca confirmam pagamento",
        ] },
        { icon: "browser", name: "Frontend", items: [
          "CSP por rota: SDK do Mercado Pago e iframes de 3DS liberados só em /pagamento",
          "Rotas privadas com Cache-Control: private, no-store",
          "URLs de pagamento externas validadas (HTTPS e allowlist de domínios do Mercado Pago)",
        ] },
        { icon: "file", name: "Entrada de dados", items: [
          "Imagens validadas pelos bytes de assinatura (PNG, JPEG…), dimensões, total de pixels e tamanho, sem confiar na extensão",
          "Payloads normalizados e validados antes de chegar aos casos de uso",
        ] },
        { icon: "lock", name: "Privacidade (LGPD)", items: [
          "Logs sem token, telefone, CPF ou endereço",
          "Eventos da outbox carregam só IDs opacos; textos ficam em tabelas protegidas por RBAC",
          "Listagem do admin sem CPF e endereço; detalhes só sob demanda",
          "Analytics pseudônimo, sem IP, que respeita Do Not Track e Global Privacy Control",
        ] },
        { icon: "settings", name: "Configuração", items: [
          "Variáveis de ambiente validadas na inicialização (fail-fast)",
          "Em produção, o boot é bloqueado com sandbox do Mercado Pago ativo, sem origens CORS, sem authorized parties ou sem trust proxy",
          "O deploy roda validate:production-config antes de subir a nova versão",
        ] },
        { icon: "package", name: "Supply chain", items: [
          "npm audit (nível high) na CI do frontend e do backend",
          "Dependabot para npm e GitHub Actions",
          "Imagens Docker multi-stage rodando com usuário não-root",
        ] },
      ],
    },

    patterns: [
      {
        group: "Arquitetura",
        items: [
          { name: "Arquitetura Hexagonal", what: "Regras de negócio isoladas de frameworks e serviços externos, que entram por portas e adapters.", why: "Permite trocar o provedor de WhatsApp (Meta ou Chatwoot) sem mexer em nenhum caso de uso." },
          { name: "Clean Architecture (camadas)", what: "Presentation → Application → Domain, com a infraestrutura plugada por fora.", why: "Express e Prisma são detalhes: os casos de uso não sabem que eles existem." },
          { name: "CQRS", what: "Commands alteram estado; queries só leem e usam read models próprios.", why: "A listagem de pedidos do admin não carrega CPF, endereço nem itens: esses dados só vêm quando o pedido é aberto." },
          { name: "Event-Driven", what: "Mudanças importantes geram eventos de integração consumidos de forma assíncrona.", why: "Pagamento confirmado dispara WhatsApp sem a API esperar o envio." },
          { name: "Composition Root + DI", what: "Todas as dependências são montadas em um único ponto e injetadas por construtor.", why: "Os handlers são testados com fakes, sem banco e sem rede." },
          { name: "Testes de arquitetura", what: "Testes leem o código-fonte e falham se uma camada importar outra indevidamente.", why: "As regras da arquitetura não dependem só de code review." },
        ],
      },
      {
        group: "DDD tático",
        items: [
          { name: "Entidades", what: "Order, Product, Cart e Coupon concentram suas próprias regras.", why: "Um cupom sabe dizer se está ativo, expirado ou esgotado." },
          { name: "Value Objects", what: "Money, Address e OrderStatus são imutáveis e validados na criação.", why: "Valores inválidos não circulam pelo sistema." },
          { name: "Eventos de domínio", what: "OrderCreated, PaymentConfirmed, OrderShipped e outros descrevem fatos do negócio.", why: "O vocabulário do código é o mesmo da operação da loja." },
          { name: "Repositórios e read models", what: "Interfaces de escrita no domínio e leitores dedicados para cada consulta.", why: "Cada tela busca só o que precisa." },
        ],
      },
      {
        group: "Padrões de projeto (GoF)",
        items: [
          { name: "Adapter", what: "Cada serviço externo (Mercado Pago, Clerk, Mapbox, WhatsApp, Redis) implementa uma porta da aplicação.", why: "Trocar ou simular um provedor não afeta o resto do código." },
          { name: "Decorator", what: "CachedQueryHandler envolve qualquer query e acrescenta cache sem alterá-la.", why: "Cache vira configuração na composition root." },
          { name: "Factory", what: "createMessagingGateway escolhe o provedor de WhatsApp a partir da configuração.", why: "Chatwoot quando configurado; API da Meta como alternativa." },
          { name: "Strategy", what: "O transporte da outbox é intercambiável: polling no banco ou BullMQ.", why: "Desenvolvimento local simples, produção com filas." },
          { name: "State (máquina de estados)", what: "As transições válidas de status do pedido ficam no domínio.", why: "Impede marcar como entregue um pedido que não foi pago." },
        ],
      },
      {
        group: "Consistência e resiliência",
        items: [
          { name: "Transactional Outbox", what: "O evento é gravado no MySQL na mesma transação do dado; um relay publica só os IDs no BullMQ.", why: "Se o Redis cair, nenhum evento se perde." },
          { name: "Idempotency Key", what: "O ID do pedido é derivado do usuário + Idempotency-Key; repetir com outro payload gera conflito.", why: "Duplo clique ou reenvio por rede instável nunca gera dois pedidos." },
          { name: "Lock pessimista", what: "SELECT … FOR UPDATE em produtos, cupom e pedido, em ordem determinística.", why: "Dois clientes não consomem o último item ou o último uso do cupom." },
          { name: "Claim com lease", what: "Compare-and-set + token + lease renovável para posse de eventos e do checkout.", why: "Dois workers nunca processam o mesmo pagamento." },
          { name: "Bulkhead", what: "Filas e processos separados por domínio.", why: "Uma falha no WhatsApp não atrasa a confirmação de pagamentos." },
          { name: "Compensação", what: "Uma falha definitiva no provedor desfaz o pedido pendente e devolve o cupom.", why: "Nada fica reservado por um pedido que nunca poderá ser pago." },
          { name: "Tombstone e reconciliação", what: "Pedidos vencidos viram PAYMENT_EXPIRED em vez de serem apagados.", why: "Um Pix pago com atraso reativa o pedido em vez de virar venda perdida." },
          { name: "Retry com backoff e jitter", what: "Nova tentativa exponencial com variação aleatória, só em operações idempotentes.", why: "Oscilações rápidas do banco não viram erro para o usuário." },
          { name: "Single-flight + stale-while-revalidate", what: "Cache servido mesmo velho enquanto uma única atualização roda.", why: "O catálogo aguenta picos e quedas do banco." },
          { name: "Graceful degradation", what: "Rate limit cai para memória e o cache tolera falha do Redis.", why: "Uma dependência fora do ar não derruba a loja." },
        ],
      },
      {
        group: "Segurança",
        items: [
          { name: "RBAC por permissão", what: "Rotas pedem permissões granulares (orders:manage…), não roles.", why: "Novas roles não exigem mudar rotas." },
          { name: "Ownership", what: "Permissões *:own sempre acompanhadas de filtro pelo dono no banco.", why: "Impede acesso a dados de outro cliente (IDOR)." },
          { name: "Menor privilégio", what: "Usuário sem role explícita vira customer.", why: "Um erro de cadastro nunca concede acesso administrativo." },
          { name: "Fail-closed", what: "Webhook com assinatura, segredo ou timestamp inválido é sempre rejeitado.", why: "Ninguém confirma pagamento forjando uma notificação." },
          { name: "Fail-fast", what: "Configuração inválida impede o processo de subir.", why: "Erros de ambiente aparecem no deploy, não com cliente pagando." },
          { name: "Defesa em profundidade", what: "Controles independentes na borda, no HTTP, na aplicação e nos dados.", why: "Uma única falha não expõe o sistema." },
        ],
      },
    ],

    flows: {
      checkout: [
        { title: "Carrinho e endereço", desc: "O cliente informa o CEP; o ViaCEP preenche o endereço." },
        { title: "Frete", desc: "A Mapbox calcula a rota até a loja mais próxima e a política de frete define o preço." },
        { title: "Agendamento e cupom", desc: "O cliente escolhe a janela de entrega e o cupom é validado." },
        { title: "Pedido idempotente", desc: "O servidor recalcula preços, reserva estoque e cupom na transação e grava o pedido como PENDING." },
        { title: "Pagamento embutido", desc: "Payment Brick do Mercado Pago com Pix ou cartão; a reserva vale por 60 minutos." },
        { title: "Webhook assinado", desc: "A assinatura HMAC é validada; o backend consulta o Mercado Pago antes de confirmar valor e recebedor." },
        { title: "Outbox → workers", desc: "PaymentConfirmed vai para a fila e o cliente recebe a confirmação no WhatsApp." },
      ],
      statuses: [
        { id: "PENDING", label: "Pendente" },
        { id: "PAYMENT_CONFIRMED", label: "Pago" },
        { id: "SHIPPED", label: "A caminho" },
        { id: "DELIVERED", label: "Entregue" },
      ],
      statusNotes: [
        "PENDING → PAYMENT_EXPIRED quando a reserva vence (estoque e cupom são devolvidos)",
        "PAYMENT_EXPIRED → PAYMENT_CONFIRMED se um pagamento tardio for aprovado",
        "Pago, a caminho ou entregue → CANCELLED_REFUNDED após cancelamento aprovado e estorno",
      ],
      outbox: [
        { title: "Transação", desc: "Pedido + OutboxEvent gravados juntos no MySQL" },
        { title: "Relay", desc: "Publica apenas IDs elegíveis na fila da partição" },
        { title: "Worker", desc: "Busca o evento no MySQL e adquire claim com lease" },
        { title: "Handler", desc: "Executa o caso de uso (pagamento, WhatsApp, estorno…)" },
        { title: "Resultado", desc: "Persiste sucesso ou agenda retry com backoff" },
      ],
    },

    // `items` são as tecnologias principais (em destaque); `extras` são as bibliotecas e ferramentas de apoio
    stack: [
      {
        group: "Linguagens",
        items: ["TypeScript", "JavaScript", "SQL", "CSS (Tailwind)"],
      },
      {
        group: "Frontend",
        items: ["React 19", "TanStack Start (SSR)", "TanStack Router", "TanStack Query", "Vite 7", "Tailwind CSS 4", "shadcn/ui", "Radix UI"],
        extras: ["React DOM", "Nitro (node-server)", "@vitejs/plugin-react", "vite-tsconfig-paths", "Lovable (base do projeto)", "tailwind-merge", "clsx", "class-variance-authority", "tw-animate-css"],
      },
      {
        group: "Formulários, UI e utilitários",
        items: ["React Hook Form", "Zod", "Motion", "Recharts"],
        extras: ["@hookform/resolvers", "Lucide React", "React Icons", "Embla Carousel", "Sonner", "Vaul", "cmdk", "input-otp", "React Day Picker", "react-resizable-panels", "date-fns"],
      },
      {
        group: "Backend",
        items: ["Node.js 22", "Express 4", "Prisma 5", "BullMQ", "ioredis"],
        extras: ["@clerk/backend", "node:crypto (HMAC, SHA-256)", "dotenv", "ts-node", "concurrently"],
      },
      {
        group: "Dados",
        items: ["MySQL", "Redis 7.4"],
        extras: ["Prisma Migrate (14 migrations)", "Redis com AOF e noeviction", "Scripts Lua no Redis"],
      },
      {
        group: "Autenticação e pagamentos",
        items: ["Clerk", "Mercado Pago Bricks (Pix e cartão)", "Mercado Pago Checkout Pro"],
        extras: ["@clerk/clerk-react", "Webhooks do Clerk assinados", "Webhooks do Mercado Pago com assinatura HMAC", "Estornos via API do Mercado Pago"],
      },
      {
        group: "Integrações",
        items: ["Meta WhatsApp Cloud API", "Chatwoot (self-hosted)", "Mapbox"],
        extras: ["Mapbox Geocoding", "Mapbox Directions", "Mapbox Static Images", "ViaCEP", "Google Analytics 4", "Analytics próprio do site"],
      },
      {
        group: "Infra e DevOps",
        items: ["Docker", "Docker Compose", "Caddy 2.10", "GitHub Actions"],
        extras: ["Build multi-stage (node:22-bookworm-slim)", "Ambientes de dev, staging e produção", "HTTPS automático via ACME", "Deploy via SSH com flock", "VPS Linux", "Dependabot", "npm", "bunfig com trava de 24h contra supply chain"],
      },
      {
        group: "Testes e qualidade",
        items: ["Node.js Test Runner (290+ testes)", "k6 (testes de carga)", "ESLint 9", "Prettier"],
        extras: ["typescript-eslint", "eslint-plugin-react-hooks", "eslint-plugin-react-refresh", "Testes de arquitetura", "Typecheck estrito", "npm audit"],
      },
      {
        group: "Segurança e operação",
        items: ["CSP por rota", "Rate limit distribuído", "Audit log"],
        extras: ["Headers de segurança (HSTS, X-Frame-Options…)", "Logs estruturados sem dados pessoais", "Health e readiness checks", "Graceful shutdown"],
      },
    ],

    pipeline: [
      { title: "Pull request", desc: "Branch por feature, revisão e merge na main" },
      { title: "CI", desc: "Typecheck, validação do Prisma, testes, build e npm audit (front e back)" },
      { title: "Deploy", desc: "Disparado só se a CI passar, via SSH com lock contra deploys concorrentes" },
      { title: "Migrations", desc: "Configuração de produção validada e prisma migrate deploy" },
      { title: "Subida", desc: "docker compose up --wait com healthchecks e checagem de /ready" },
    ],
  },
};
