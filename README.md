Desafio de Automação de Testes - QA Este repositório contém a solução para o desafio técnico de QA, abrangendo a automação de testes E2E (Interface) e API (Backend), além da documentação estratégica do projeto.

O Plano de Testes dos cenários encontra-se na pasta "docs" *
Tecnologias Utilizadas Cypress (Framework de automação)

JavaScript (Linguagem de programação)

Gherkin/BDD (Documentação de cenários)

Pré-requisitos Antes de executar os testes, certifique-se de que o ambiente do desafio (Docker) está rodando:

Acesse a pasta raiz do projeto via terminal.

Execute o comando: docker-compose up --build -d

O Frontend estará disponível em: http://localhost:5400

O Backend estará disponível em: http://localhost:8400

Instalação das Dependências Após clonar este repositório, execute o comando abaixo na pasta raiz para instalar o Cypress e suas dependências:

npm install

Como Executar os Testes

Modo Interativo (Interface Gráfica) Para abrir o Cypress e escolher qual teste rodar visualmente:
npx cypress open

Ao abrir a janela, selecione "E2E Testing", escolha o navegador (Chrome/Electron) e clique no arquivo de teste desejado.

Modo Headless (Terminal) Para rodar todos os testes de uma vez e gerar o relatório no terminal:
npx cypress run

Organização do Projeto cypress/e2e/api-users.cy.js: Testes de contrato e lógica da API de Usuários.

cypress/e2e/api-company.cy.js: Testes de contrato da API de Empresas.

cypress/e2e/e2e-user-flow.cy.js: Fluxo principal de usuário via Frontend.

docs/PLANO_DE_TESTES.md: Mapeamento dos cenários em BDD.

docs/RELATORIO_DE_BUGS.md: Detalhamento das falhas encontradas durante os testes.
