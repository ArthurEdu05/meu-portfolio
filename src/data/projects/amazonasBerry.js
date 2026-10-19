// Ficha técnica do Amazonas Berry. As capturas foram feitas no site em produção.
import homeHero from "../../assets/images/projects/amazonas-berry/home-hero.jpg";
import homeProdutos from "../../assets/images/projects/amazonas-berry/home-produtos.jpg";
import sobre from "../../assets/images/projects/amazonas-berry/sobre.jpg";
import mosaico from "../../assets/images/projects/amazonas-berry/mosaico.jpg";
import ondeEncontrar from "../../assets/images/projects/amazonas-berry/onde-encontrar.jpg";
import login from "../../assets/images/projects/amazonas-berry/login.jpg";
import carrinho from "../../assets/images/projects/amazonas-berry/carrinho.jpg";
import pagamento from "../../assets/images/projects/amazonas-berry/pagamento.jpg";
import logo from "../../assets/images/projects/amazonas-berry/logo.webp";

export const amazonasBerry = {
  slug: "amazonas-berry",
  title: "Amazonas Berry",
  category: "E-commerce",
  // Capa do card: logo sobre a cor da marca (as capturas aparecem nos detalhes)
  cover: { logo, from: "#4a1468", to: "#14061d" },
  description:
    "E-commerce completo para uma rede de açaí com lojas em São Paulo: vitrine online, área do cliente com pedidos e pagamentos integrados na loja e um painel gerencial para operar pedidos, catálogo, cupons, frete e cancelamentos.",
  tags: ["TypeScript", "React", "Node.js", "Docker", "Express", "Prisma", "MySQL", "Redis", "BullMQ"],
  private: true,
  links: [{ label: "Ver site", url: "https://amazonasberry.com.br", kind: "live" }],

  details: {
    tagline: "Do clique no produto à entrega na sua casa: toda a operação de venda online da rede, em um só sistema.",
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
      { src: homeHero, device: "desktop", caption: "Home - chamada principal da loja" },
      { src: homeProdutos, device: "desktop", caption: "Vitrine com carrossel de produtos" },
      { src: carrinho, device: "desktop", caption: "Carrinho - quantidades, subtotal e resumo do pedido antes de finalizar" },
      { src: pagamento, device: "desktop", caption: "Pagamento integrado - Pix, crédito ou débito sem sair da loja, com resumo do pedido, frete, entrega, contato e outras informações" },
      { src: sobre, device: "desktop", caption: "Institucional - Sobre a Amazonas Berry" },
      { src: mosaico, device: "desktop", caption: "Mosaico de fotos no site, gerenciado pelo painel do administrador para melhor identidade da marca" },
      { src: ondeEncontrar, device: "desktop", caption: "Onde encontrar - mapa, navegação entre as 3 lojas e mais informações" },
      { src: login, device: "desktop", caption: "Área do cliente - login e cadastro com Clerk (Google ou e-mail)" },
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
          "Catálogo e carrinho; o carrinho persiste no navegador",
          "“Onde encontrar” com mapa e navegação entre as três lojas",
          "Cache público com stale-while-revalidate: se o banco oscilar, o catálogo continua no ar",
          "Analytics próprio de visitas",
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
          "Carrinho com quantidades editáveis, subtotal e resumo antes de finalizar",
          "Etapa de confirmação dos dados antes de pagar: produtos e valores, endereço de entrega, data e janela de entrega, unidade que vai atender e dados de contato do cliente",
          "Cupons de desconto aplicados no resumo, com o total recalculado no servidor",
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
          desc: "Casos de uso: 23 commands, 23 queries e 12 portas (interfaces) que a infraestrutura implementa.",
        },
        {
          name: "Domain",
          desc: "Entidades, value objects, eventos de domínio e regras de transição de status.",
        },
      ],
      infrastructure: {
        name: "Infrastructure",
        desc: "Adapters que implementam as portas:",
        adapters: ["Prisma / MySQL", "Mercado Pago", "Clerk", "Mapbox", "WhatsApp (Meta / Chatwoot)", "Redis / BullMQ"],
      },
      compositionRoot:
        "Uma composition root centraliza a montagem do sistema: é o único arquivo que conhece ao mesmo tempo os handlers e os adapters concretos e faz a injeção de dependências.",

      // Aprofundamento por tema, exibido em blocos na aba Arquitetura
      facets: [
        {
          icon: "frontend",
          title: "Frontend",
          items: [
            { title: "SSR com TanStack Start", desc: "Páginas renderizadas no servidor (Nitro) e hidratadas no navegador, com roteamento por arquivos e rotas tipadas pelo TanStack Router." },
            { title: "Estado do servidor × estado local", desc: "TanStack Query cuida dos dados da API (com staleTime no catálogo); o carrinho é um React Context salvo no localStorage com uma chave por usuário." },
            { title: "Cliente HTTP central", desc: "Injeta o token do Clerk em cada chamada, aplica timeout, lança erros tipados (ex.: AuthenticationRequiredError) e alimenta um overlay global de carregamento." },
            { title: "Formulários validados", desc: "React Hook Form + Zod no checkout e no perfil, com busca de CEP no ViaCEP (com cache em memória)." },
            { title: "Design system acessível", desc: "Componentes shadcn/ui sobre Radix UI, estilizados com Tailwind CSS 4 e animados com Motion." },
            { title: "SDK sob demanda", desc: "O SDK do Mercado Pago só é carregado na página de pagamento, o que mantém o resto do site leve e a CSP mais restrita." },
          ],
        },
        {
          icon: "database",
          title: "Dados e consistência",
          items: [
            { title: "Locks pessimistas ordenados", desc: "Produtos, cupom e pedido são travados com SELECT … FOR UPDATE dentro da transação, sempre em ordem de ID para evitar deadlocks." },
            { title: "Pedido com ID determinístico", desc: "Uma colisão concorrente (P2002) é resolvida com uma nova tentativa que reaproveita o pedido existente." },
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
            { title: "Lease distribuída de refresh", desc: "Só uma instância atualiza cada chave e liberação por um script que confere o token." },
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
        { id: "admin", label: "Administrador", desc: "Equipe da loja. Opera o painel gerencial." },
        { id: "customer", label: "Cliente", desc: "Qualquer conta criada no site. É a role padrão." },
      ],
      publicNote:
        "Sem login, o visitante acessa apenas rotas públicas.",
      rbacNotes: [
        "Permissões são declaradas uma única vez (const tipada) e o mapa role → permissões é checado pelo compilador com satisfies.",
        "Controllers pedem permissões, nunca roles: incluir uma nova role não exige mexer em nenhuma rota.",
        "O resultado da autenticação é memoizado por requisição (WeakMap), então o Clerk é consultado uma vez mesmo que a rota cheque várias permissões.",
        "Uploads do painel são autorizados antes do parser de corpo grande: um usuário sem permissão não consegue enviar uma imagem pesada para o servidor.",
        "Toda mutação administrativa grava ator, ação e recurso no AuditLog, na mesma transação da alteração.",
      ],
      protections: [
        "Site e API funcionam só com HTTPS; banco, Redis e workers ficam fora do alcance da internet",
        "A API só aceita chamadas do próprio site e limita a quantidade de requisições por visitante",
        "Um pagamento só é confirmado depois que o backend valida a notificação e consulta o Mercado Pago",
        "Dados pessoais ficam fora dos logs",
        "Uma configuração insegura impede o sistema de subir em produção",
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
          { name: "Entidades", what: "Entidades concentram suas próprias regras.", why: "Um cupom sabe dizer se está ativo, expirado ou esgotado." },
          { name: "Value Objects", what: "Valores do negócio são representados por objetos imutáveis, validados no momento da criação.", why: "Valores inválidos não circulam pelo sistema." },
          { name: "Eventos de domínio", what: "Cada acontecimento importante do negócio vira um evento com nome próprio, que outras partes do sistema podem acompanhar.", why: "O vocabulário do código é o mesmo da operação da loja." },
          { name: "Repositórios e read models", what: "Interfaces de escrita no domínio e leitores dedicados para cada consulta.", why: "Cada tela busca só o que precisa." },
        ],
      },
      {
        group: "Padrões de projeto (GoF)",
        items: [
          { name: "Adapter", what: "Cada serviço externo (Mercado Pago, Clerk, Mapbox, WhatsApp, Redis) implementa uma porta da aplicação.", why: "Trocar ou simular um provedor não afeta o resto do código." },
          { name: "Decorator", what: "Uma camada envolve as consultas e acrescenta cache a elas sem alterar o código original.", why: "Ligar ou desligar o cache de uma consulta é só uma questão de configuração." },
          { name: "Factory", what: "Um ponto central decide qual provedor de mensagens usar a partir da configuração.", why: "O sistema troca de provedor de WhatsApp sem mudar o restante do código." },
          { name: "Strategy", what: "O transporte da outbox é intercambiável: polling no banco ou BullMQ.", why: "Desenvolvimento local simples, produção com filas." },
          { name: "State (máquina de estados)", what: "As transições válidas de status do pedido ficam no domínio.", why: "Impede marcar como entregue um pedido que não foi pago." },
        ],
      },
      {
        group: "Consistência e resiliência",
        items: [
          { name: "Transactional Outbox", what: "O evento é gravado no MySQL na mesma transação do dado; um relay publica só os IDs no BullMQ.", why: "Se o Redis cair, nenhum evento se perde." },
          { name: "Idempotency Key", what: "Cada tentativa de compra recebe uma chave única; repetir a mesma tentativa reaproveita o pedido em vez de criar outro.", why: "Duplo clique ou reenvio por rede instável nunca gera dois pedidos." },
          { name: "Lock pessimista", what: "Produtos, cupom e pedido ficam travados durante a compra, sempre na mesma ordem.", why: "Dois clientes não consomem o último item ou o último uso do cupom." },
          { name: "Claim com lease", what: "Compare-and-set + token + lease renovável para posse de eventos e do checkout.", why: "Dois workers nunca processam o mesmo pagamento." },
          { name: "Bulkhead", what: "Filas e processos separados por domínio.", why: "Uma falha no WhatsApp não atrasa a confirmação de pagamentos." },
          { name: "Compensação", what: "Uma falha definitiva no provedor desfaz o pedido pendente e devolve o cupom.", why: "Nada fica reservado por um pedido que nunca poderá ser pago." },
          { name: "Tombstone e reconciliação", what: "Pedidos não pagos no prazo são marcados como expirados em vez de serem apagados.", why: "Um Pix pago com atraso reativa o pedido em vez de virar venda perdida." },
          { name: "Retry com backoff e jitter", what: "Nova tentativa exponencial com variação aleatória, só em operações idempotentes.", why: "Oscilações rápidas do banco não viram erro para o usuário." },
          { name: "Single-flight + stale-while-revalidate", what: "Cache servido mesmo velho enquanto uma única atualização roda.", why: "O catálogo aguenta picos e quedas do banco." },
          { name: "Graceful degradation", what: "Rate limit cai para memória e o cache tolera falha do Redis.", why: "Uma dependência fora do ar não derruba a loja." },
        ],
      },
      {
        group: "Segurança",
        items: [
          { name: "RBAC por permissão", what: "Cada ação exige uma permissão específica, em vez de checar apenas o tipo de usuário.", why: "Novas roles não exigem mudar rotas." },
          { name: "Ownership", what: "Ações do cliente sempre verificam se o dado pertence a quem está pedindo.", why: "Um cliente nunca acessa pedidos ou dados de outro." },
          { name: "Menor privilégio", what: "Usuário sem role explícita vira customer.", why: "Um erro de cadastro nunca concede acesso administrativo." },
          { name: "Fail-closed", what: "Webhook com assinatura, segredo ou timestamp inválido é sempre rejeitado.", why: "Ninguém confirma pagamento forjando uma notificação." },
          { name: "Fail-fast", what: "Configuração inválida impede o processo de subir.", why: "Erros de ambiente aparecem no deploy, não com cliente pagando." },
          { name: "Defesa em profundidade", what: "Controles independentes na borda, no HTTP, na aplicação e nos dados.", why: "Uma única falha não expõe o sistema." },
        ],
      },
    ],

    flows: {
      checkout: [
        { title: "Carrinho", desc: "O cliente adiciona os produtos ao carrinho." },
        { title: "Endereço", desc: "Os dados salvos do cliente são carregados ou ele informa o CEP, e o ViaCEP preenche o endereço." },
        { title: "Frete", desc: "A Mapbox calcula a rota até a loja mais próxima e a política de frete define o preço." },
        { title: "Agendamento e cupom", desc: "O cliente escolhe a janela de entrega e o cupom é validado." },
        { title: "Confirmação dos dados", desc: "Antes de pagar, o cliente revisa produtos, valores, frete, endereço, agendamento, unidade e contato." },
        { title: "Pedido idempotente", desc: "O servidor recalcula preços, reserva estoque e cupom na transação e grava o pedido como PENDENTE." },
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
      outbox: [
        { title: "Transação", desc: "Pedido + OutboxEvent gravados juntos no MySQL" },
        { title: "Relay", desc: "Publica apenas IDs elegíveis na fila da partição" },
        { title: "Worker", desc: "Busca o evento no MySQL e adquire claim com lease" },
        { title: "Handler", desc: "Executa o caso de uso (pagamento, WhatsApp, estorno…)" },
        { title: "Resultado", desc: "Persiste sucesso ou agenda retry com backoff" },
      ],
    },

    // Cada grupo mostra só as tecnologias principais, com uma frase sobre o papel dele
    stack: [
      {
        group: "Linguagens",
        icon: "code",
        desc: "Base de todo o código, do frontend ao banco",
        items: ["TypeScript", "JavaScript", "SQL", "CSS"],
      },
      {
        group: "Frontend",
        icon: "frontend",
        desc: "Interface renderizada no servidor e hidratada no navegador",
        items: ["React 19", "TanStack Start", "TanStack Router", "TanStack Query", "Vite", "Tailwind CSS 4"],
      },
      {
        group: "Interface e formulários",
        icon: "ui",
        desc: "Componentes acessíveis, animações, gráficos e validação",
        items: ["shadcn/ui", "Radix UI", "React Hook Form", "Zod", "Motion", "Recharts"],
      },
      {
        group: "Backend",
        icon: "server",
        desc: "API e workers que processam pedidos, pagamentos e mensagens",
        items: ["Node.js 22", "Express", "Prisma", "BullMQ"],
      },
      {
        group: "Dados",
        icon: "database",
        desc: "Onde ficam pedidos, produtos, filas e cache",
        items: ["MySQL", "Redis"],
      },
      {
        group: "Login e pagamentos",
        icon: "key",
        desc: "Contas de clientes e cobrança dentro da loja",
        items: ["Clerk", "Mercado Pago"],
      },
      {
        group: "Integrações",
        icon: "plug",
        desc: "Serviços externos de mensagens, mapas e endereços",
        items: ["WhatsApp Cloud API", "Chatwoot", "Mapbox", "ViaCEP"],
      },
      {
        group: "Infra e DevOps",
        icon: "container",
        desc: "Como o sistema é empacotado, publicado e servido",
        items: ["Docker", "Docker Compose", "Caddy", "GitHub Actions"],
      },
      {
        group: "Testes e qualidade",
        icon: "test",
        desc: "O que garante que cada mudança funciona antes de ir ao ar",
        items: ["Node.js Test Runner", "k6", "ESLint", "Prettier"],
      },
    ],

    pipeline: [
      { title: "Pull request", desc: "Branch por feature, revisão e merge na main" },
      { title: "CI", desc: "Typecheck, validação do Prisma, testes, build e npm audit (front e back)" },
      { title: "Deploy", desc: "Disparado só se a CI passar, via SSH com lock contra deploys concorrentes" },
      { title: "Migrations", desc: "Configuração de produção validada e prisma migrate deploy" },
      { title: "Publicação", desc: "A nova versão entra no ar e o deploy só termina quando o site responde normalmente" },
    ],
  },
};
