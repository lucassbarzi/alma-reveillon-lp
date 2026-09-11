# ALMA Réveillon 2027 — Landing Page

Landing Page oficial do ALMA Réveillon 2027 em Boipeba, Bahia.

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion / Motion
- Lucide React & React Icons

## Arquitetura de Mídia & Google Ads (Diretrizes Vigentes)
1. **Defesa da Marca ALMA**: NÃO criar campanha nem ad group de defesa da marca ALMA (captura orgânica e direta preservada, evitando canibalização de investimento).
2. **Campanhas de Google Ads**: Exatamente 3 campanhas de Pesquisa no plano:
   - **C1 — Alta Consciência / Intenção Premium**: termos de boutique, premium, open bar e destino direto.
   - **C2 — Média Consciência / Descoberta de Destino**: ad group único unificado de destinos Bahia + Nordeste (Boipeba, Morro de São Paulo, Barra Grande, Itacaré, Caraíva, etc.).
   - **C3 — Baixa Consciência / Descoberta de Réveillon**: termos genéricos e qualificadores com filtro progressivo de renda familiar.

## Mensuração & Tag Management
- **Google Tag Manager**: Container `GTM-KP4XXHQJ` instalado no `index.html` com o snippet oficial e `noscript` imediatamente após a abertura da tag `<body>`.
- **Tracking Hooks**: Disparo padronizado em `window.dataLayer` nos cliques de ingresso/checkout (`begin_checkout` / `ticket_click`), registrando URL do Sympla, localização do CTA no layout e idioma ativo do usuário.
- **Validação de Compra (`purchase`)**: A mensuração de compra real é realizada e validada exclusivamente no checkout da Sympla, sem simulação artificial na landing page.

## Localização & Internacionalização (i18n)
- **Idiomas suportados**: `pt-BR` (padrão), `en` (Inglês) e `es` (Espanhol).
- **Detecção automática**: `localStorage` (preferência salva pelo usuário); fallback para `navigator.languages`/`navigator.language` (`pt*` -> `pt-BR`, `es*` -> `es`, `en*` -> `en`, demais idiomas -> `pt-BR`).
- **Sincronização DOM**: Atualização dinâmica de `document.documentElement.lang`, `document.title`, `meta[name="description"]` e tags Open Graph (`og:title`, `og:description`, `og:locale`).
- **Seletores de Idioma**: Controles discretos e integrados no menu lateral e no rodapé, respeitando o grid e a identidade visual do projeto.
- **Integridade de Marca**: Nomes próprios, atrações, marcas parceiras, lotes e URLs preservados integralmente sem traduções indevidas.
