# Paleta ALMA — revisão de 20/09/2026

## Refinamento solicitado em 21/09/2026 (prevalece sobre a aplicação inicial)

- `#FEE0B5` adicionado como bege claro. Programação, pacote completo, histórias e FAQ usam uma mistura clara desse bege com branco, com textura SVG de papel reciclado.
- Hero volta ao overlay branco original e ao destaque azul de “ALMA LAVADA”. Bloco 2 usa azul suave com detalhe bege no título. Retirado o overlay azul adicionado a “Primeiro, o paraíso”.
- Textos dos cards de experiência e hospedagem brancos; bege reservado aos títulos em blocos azuis.
- Indicadores verdes para Pedra de Sal e Vila Jesuíta; vermelhos para hospedagens esgotadas. Status e conteúdo preservados.
- Cores originais do rodapé restauradas, incluindo texto branco e detalhes em ciano. Essas exceções à paleta inicial foram pedidas explicitamente por Lucas.
- Build e conferência em 1440/390 px aprovados; cores, indicadores, remoção do overlay e aplicação das quatro texturas verificados no DOM. Evidência: `.audit/palette/refined-report.json`.

Paleta definida por Lucas para toda a interface:

| Token | Cor | Uso |
| --- | --- | --- |
| `--alma-ocean` | `#13586F` | Texto sobre bege, botões e blocos azuis |
| `--alma-blue` | `#73ACBF` | Detalhes, bordas e fundos animados |
| `--alma-blue-soft` | `#7BAFBD` | Variação suave nos fundos e detalhes |
| `--alma-sand` | `#F1D2A7` | Superfícies de leitura e legendas em blocos azuis |
| `--alma-sand-light` | `#FBDDA0` | Texto em blocos azuis, controles e destaques |

Fonte das cores: `src/palette.css`. Os shaders leem os canais RGB desse arquivo por `src/lib/palette.ts`. Transparências e gradientes derivam dessas cinco cores. Fotografias, vídeos e marcas originais conservam suas cores; preto/branco técnicos das máscaras SVG/CSS conservam sua função.

Azul profundo sobre bege oferece contraste de 5,47:1; sobre bege claro, 6,01:1. Os azuis suaves sobre azul profundo ficam abaixo de 4,5:1 e não devem substituir o bege em textos pequenos. Fundos de vídeo, fotografia e shaders exigem inspeção visual, pois variam ao longo do tempo.

## Escopo e validação

- Home e nove páginas internas: experiência, mídia, programação, pacotes, como chegar, onde ficar, histórias, Boi People e ilha de Boipeba.
- Textos, blocos, botões, bordas, sombras, hover, foco, badges, menu, idiomas, rodapé, modais e quatro componentes de shaders revisados.
- Ajustes de contraste em textos secundários, galeria expansível, fundos animados, seletor de idioma e botão de fechar hospedagem.
- Navegação em 1440 px e 390 px: sem erros de JavaScript, imagens quebradas ou overflow horizontal nos 20 casos verificados.
- Menu, modal de hospedagem e lightbox verificados, incluindo navegação e fechamento da galeria.
- `npm run build` e `git diff --check` aprovados. `21st review src --json`: zero erros; nove avisos preexistentes de animação/interação fora deste escopo.
- Evidências locais em `.audit/palette/` (ignorado pelo Git). A triagem automática de contraste não interpreta fundos em camadas como uma auditoria WCAG completa.

O Antigravity editou simultaneamente conteúdo e páginas internas. As mudanças foram aplicadas sobre os arquivos atuais, preservando suas alterações. Novos elementos devem reutilizar os tokens acima para evitar a reintrodução da paleta antiga.
