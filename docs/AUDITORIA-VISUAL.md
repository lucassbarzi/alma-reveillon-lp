# Auditoria visual — ALMA Réveillon 2027

## Resultado implementado

As seis páginas principais agora compartilham uma composição visual: fotografia em tela ampla, paleta da home, marca ALMA, títulos leves, espaçamento consistente e navegação entre os destinos.

| Página | Função |
| --- | --- |
| /experiencia | Destino, experiência e cuidado com a ilha |
| /midia | Apenas galeria: 24 fotografias do acervo, com ampliação |
| /programacao | Cinco noites, datas, horários e acesso aos ingressos |
| /pacotes-alma-com-hospedagem | Acomodações, períodos, fotos e detalhes |
| /como-chegar | Rotas organizadas em seções expansíveis |
| /onde-ficar | Guia das regiões para escolher a localização da estadia |

## Correções realizadas

- Mídia passou a ter um endereço próprio no menu e deixou de repetir depoimentos.
- Pacotes passou a ter página própria, separada do guia Onde ficar.
- Ilha de Boipeba no menu aponta diretamente à seção do destino em Experiência.
- Removidos blocos repetidos de celebridades/depoimentos nas subpáginas principais.
- Textos encurtados; títulos excessivamente pesados substituídos, inclusive nos detalhes dos pacotes.
- Acomodações esgotadas ficam em uma seção expansível, reduzindo a altura inicial da página.
- Galeria regular, com colunas simétricas e fotos ampliáveis sem recorte no visualizador.
- Fotos em WebP de 640, 1280 e 2000 pixels, seleção responsiva e carregamento sob demanda.
- Menu com contenção do foco por teclado e retorno ao botão ao fechar.
- Títulos, descrições e endereço canônico específicos das páginas; novas rotas adicionadas ao sitemap.
- Nenhuma página removida.

## Verificação

Navegador Microsoft Edge/Chromium local, nas larguras 320, 390, 768 e 1440 pixels. Foram examinadas a home, as seis páginas principais e os dois endereços legados de depoimentos: 36 combinações de página e largura.

Nos cenários verificados: um título principal por página, ausência de rolagem horizontal, nenhuma imagem quebrada e nenhum erro de execução JavaScript. A home também teve as seções capturadas individualmente para avaliar as áreas animadas, FAQ e rodapé.

Verificações adicionais: 24 fotos carregadas na galeria em todas as larguras; abertura, troca e fechamento com Esc; retorno de foco à foto; navegação por Tab no menu; detalhes das hospedagens; expansão das acomodações esgotadas; abertura das rotas de chegada. Compilação TypeScript e versão de produção aprovadas. A revisão automática de Subpages.tsx não apontou problemas; as observações informativas de cores no CSS usam a paleta documentada do projeto.

Capturas e resultados detalhados ficam em `.audit/subpages/`. A origem das fotos está em `docs/curadoria-fotos.json`.

## Redundâncias e observações para decisão

1. **/historias e /boi-people:** exibem o mesmo conjunto de depoimentos. Recomendo escolher um endereço principal e redirecionar o outro. Ambos foram preservados.
2. **Home — Boi People e Histórias:** há sobreposição de prova social. Uma futura redução pode reunir o conteúdo em uma seção. A composição da home foi mantida conforme solicitado.
3. **Home — marca sobre fundos claros:** a marca fixa branca perde contraste em algumas seções após a rolagem. É um ajuste pontual recomendado para uma próxima revisão da home.
4. **Idiomas:** o texto editorial das subpáginas continua em português, como antes; a tradução integral para EN/ES permanece fora desta revisão visual. Menu e janela de hospedagem mantêm o sistema de idiomas existente.

Esta validação cobre o ambiente local e as interações descritas. Não inclui Safari/iOS real, compra no checkout, confirmação comercial dos pacotes ou publicação em produção.

## Ajustes de 18/09/2026 — tipografia, fotos e Boi People

- Tusker Grotesk 4500 Medium nas subpáginas: desenho mais aberto, títulos menores e destaques Georgia em itálico. Sem deformação por escala ou peso sintético.
- Cards fotográficos arredondados: 22px no desktop, 16px no celular e 14px na galeria móvel.
- Boi People da home refeito com duas fotos obtidas de posts originais verificados (Sasha Meneghel e Fernanda Paes Leme), créditos, datas e links diretos. Removidos contadores e legendas inventados, controles sociais sem função, matéria com atribuição não comprovada e guia de praias repetido. Demais celebridades não entram na nova seleção sem fonte verificada.
- A foto de Sasha mantém a luz difusa presente no arquivo original. Nenhuma imagem de pessoa foi gerada ou retocada.
- Fontes e confirmação do destino registradas em `docs/boi-people-sources.json`. Os registros de viagem não são apresentados como endosso do evento ou presença confirmada em 2027.
- Compilação TypeScript e versão de produção aprovadas após esses ajustes.
- Seis subpáginas verificadas em 320, 390, 768 e 1440px sem rolagem horizontal ou conteúdo dos títulos excedendo os próprios blocos (24 combinações). Boi People inspecionado visualmente em 390 e 1440px, fotos carregadas e links originais conferidos. Corrigido também o aviso de compatibilidade do atributo fetchpriority com React 18.

## Curadoria vibrante da galeria — 18/09/2026

Substituída a seleção de /midia por 18 fotos com mar azul/turquesa, coqueirais verdes, céu azul e luz de sol. Nova capa de praia com coqueiros. Fotos escolhidas visualmente no acervo FOTOS_UNIFICADAS, sem filtros de cor. Catálogo da galeria separado das imagens editoriais usadas nas outras páginas. Arquivos WebP nas resoluções 640/1280/2000, limitados à largura original para não ampliar imagens pequenas. Origem em `docs/curadoria-galeria-vibrante.json`.
