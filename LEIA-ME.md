# Rainha dos Compressores – Landing Page Black Friday

Cópia da versão 2 com tema escuro de Black Friday. Mesma estrutura, mesma fonte (Montserrat) e as mesmas seções. Todos os botões de contato levam a um único WhatsApp: (62) 99857-7057.

## O que mudou na versão Black Friday
- Tema escuro (preto grafite) com o dourado da marca como destaque e o verde do WhatsApp nos botões.
- Faixa dourada no topo, fita "Black Friday" entre o hero e os clientes, fita fina antes da chamada final e selo diagonal na foto da loja.
- O banner da loja online virou a seção **Ofertas** (`#ofertas`), com chamada para o WhatsApp.
- Os botões "Loja online" agora levam à seção de ofertas; nada sai da página para a loja.
- Locação e manutenção usam o mesmo número, com mensagem pronta diferente para cada assunto.
- As mensagens do WhatsApp começam com "Vim pelo site na Black Friday", para a equipe identificar a origem.
- Nova pergunta no FAQ: "Como aproveito as ofertas da Black Friday?".

---

## Versão original

Landing page de autoridade com foco em conversão pelo WhatsApp e um botão de apoio para a loja online.

## Como abrir
Dê dois cliques em `index.html`. Para publicar, envie a pasta inteira (sem `_testes/`) para a hospedagem ou para um subdomínio, como `lp.rainhadoscompressores.com.br`.

## Estrutura
- `index.html`: a página.
- `assets/css/style.css`: o visual. A fonte é Montserrat (Google Fonts) em pesos de 400 a 800.
- `assets/js/app.js`: interações.
- `assets/img`, `assets/marcas`, `assets/clientes`, `assets/avaliacoes`: imagens, logos e prints de avaliações do Google.
- `_testes/`: capturas dos testes em vários dispositivos. Não precisa publicar.

## Seções
1. Barra superior com status "aberto/fechado" calculado no fuso de Goiânia.
2. Hero com a foto da loja, nota 4,9 (815 avaliações), 35 anos e 12,6 mil seguidores.
3. Logos de clientes: Ambev, Volvo, Coca-Cola, JBS e outros.
4. Serviços: venda, locação, manutenção e rede de ar, cada um com o seu WhatsApp.
5. "Qual compressor você precisa?": o cliente escolhe o uso e vê o compressor indicado em uma moldura. Pode alternar entre comprar e alugar, e o WhatsApp já vai com a mensagem pronta.
6. Avaliações: nota, distribuição de estrelas e prints reais do Google.
7. Nossa loja: endereço, horário com o dia de hoje destacado e mapa.
8. Instagram, marcas, banner da loja online, perguntas frequentes e chamada final.

## WhatsApp
Todos os botões usam (62) 99857-7057. Para trocar, procure por `5562998577057` em `index.html` e `assets/js/app.js`.

## Medição
Cada clique em um botão envia um evento `lp_click` ao `dataLayer`, com o tipo e a posição na página. Esse evento também chega ao GA4 e ao Pixel da Meta, se estiverem instalados. Para ativar, cole o código do Google Tag Manager no `<head>` do `index.html`.

Os links para a loja levam `utm_source=landing` para aparecer separados no Analytics.

## Ajustes simples
- **Horários:** no `assets/js/app.js`, objeto `H` (minutos desde 0h, de domingo a sábado).
- **Nota e número de avaliações:** procure por `4,9` e `815` no `index.html`.
