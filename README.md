Desafio de Automacao de Testes - QA
Este repositorio contem a solucao para o desafio tecnico de QA, abrangendo a automacao de testes E2E (Interface) e API (Backend), alem da documentacao estrategica do projeto.

Tecnologias Utilizadas
Cypress (Framework de automacao)

JavaScript (Linguagem de programacao)

Gherkin/BDD (Documentacao de cenarios)

Pre-requisitos
Antes de executar os testes, certifique-se de que o ambiente do desafio (Docker) esta rodando:

Acesse a pasta raiz do projeto via terminal.

Execute o comando: docker-compose up --build -d

O Frontend estara disponivel em: http://localhost:5400

O Backend estara disponivel em: http://localhost:8400

Instalacao das Dependencias
Apos clonar este repositorio, execute o comando abaixo na pasta raiz para instalar o Cypress e suas dependencias:

npm install

Como Executar os Testes
1. Modo Interativo (Interface Grafica)
Para abrir o Cypress e escolher qual teste rodar visualmente:

npx cypress open

Ao abrir a janela, selecione "E2E Testing", escolha o navegador (Chrome/Electron) e clique no arquivo de teste desejado.

2. Modo Headless (Terminal)
Para rodar todos os testes de uma vez e gerar o relatorio no terminal:

npx cypress run

# Organizacao do Projeto
- cypress/e2e/api-users.cy.js: Testes de contrato e logica da API de Usuarios.
- cypress/e2e/api-company.cy.js: Testes de contrato da API de Empresas.
- cypress/e2e/e2e-user-flow.cy.js: Fluxo principal de usuario via Frontend.
- docs/PLANO_DE_TESTES.md: Mapeamento dos cenarios em BDD.
- docs/RELATORIO_DE_BUGS.md: Detalhamento das falhas encontradas durante os testes.