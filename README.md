# ORDEM VOCACIONAL

Site estático funcional feito com HTML, CSS e JavaScript puro.

## Estrutura

- `index.html` → página inicial
- `sobre.html` → explicação do projeto
- `teste.html` → teste vocacional interativo
- `resultado.html` → resultado do teste
- `rpg.html` → caminhos da experiência RPG
- `mapa.html` → mapa/filtro de profissões
- `css/style.css` → todo o visual
- `js/main.js` → menu responsivo
- `js/teste.js` → perguntas, pontuação e navegação do teste
- `js/resultado.js` → mostra o resultado salvo
- `js/rpg.js` → interação dos caminhos RPG
- `js/mapa.js` → filtros do mapa

## Como executar no Visual Studio Code

1. Abra a pasta `OrdemVocacional`.
2. Instale a extensão **Live Server**.
3. Clique com o botão direito em `index.html`.
4. Escolha **Open with Live Server**.
5. O site abrirá no navegador.

## Como colocar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos e pastas mantendo a estrutura.
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve.
7. Aguarde o GitHub publicar o site.

## Importante

O teste usa `localStorage` do navegador para guardar o resultado. Não existe banco de dados nem login neste projeto. Para um TCC, isso permite demonstrar o funcionamento do protótipo sem servidor.

## RPG atualizado

A página `rpg.html` possui cinco abas funcionais: Regras, Guia do Mestre, Criação de Personagem, Introdução e Materiais.

### Funcionalidades
- Tabs com troca dinâmica de conteúdo e suporte às setas do teclado.
- Acordeões individuais com abertura/fechamento animado.
- Formulário de criação de personagem.
- Ficha atualizada automaticamente e persistida em `localStorage`.
- Rolagem virtual D6 de 1 a 6.
- Botões rápidos para navegar entre abas.
- Botões de materiais que geram arquivos `.txt` provisórios para substituir pelos materiais finais.
- Molduras vazias prontas para imagens futuras.

### Imagens
As molduras estão vazias de propósito. Para inserir uma imagem, substitua uma moldura como:

```html
<div class="empty-image-frame portrait-frame"></div>
```

por:

```html
<div class="empty-image-frame portrait-frame">
  <img src="img/nome-da-imagem.png" alt="Descrição da imagem">
</div>
```
