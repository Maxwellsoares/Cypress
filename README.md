# Desafio Técnico – Automação de Testes (QA)

Este repositório contém a automação de testes E2E e API desenvolvida como parte de um desafio técnico para a posição de QA.

Os testes implementados cobrem fluxos críticos da aplicação no frontend, bem como validações de contrato, status code e regras de negócio na camada de API.

A documentação dos cenários mapeados e os bugs identificados durante a execução dos testes estão disponíveis na pasta `docs/`.

---

## Stack Utilizada

- JavaScript  
- Cypress  
- Docker  
- Gherkin (utilizado na documentação dos cenários)

---

## Execução do Ambiente

Antes de executar os testes, é necessário que a aplicação esteja em execução.

Na raiz do projeto da aplicação, execute:

```bash
docker-compose up --build -d
```

Após a inicialização:

- Frontend: http://localhost:5400  
- Backend: http://localhost:8400  

---

## Instalação

Após clonar este repositório, execute na raiz do projeto:

```bash
npm install
```

O Cypress está configurado como dependência de desenvolvimento no `package.json`.

Caso seja necessário instalar manualmente:

```bash
npm install cypress --save-dev
```

---

## Execução dos Testes

### Modo Interativo

```bash
npx cypress open
```

### Modo Headless

```bash
npx cypress run
```

---

## Estrutura do Projeto

```bash
cypress/
  └── e2e/
      ├── api-users.cy.js
      ├── api-company.cy.js
      └── e2e-user-flow.cy.js

docs/
  ├── PLANO_DE_TESTES.md
  └── RELATORIO_DE_BUGS.md
```

---

## Considerações

- Os testes de API validam status code, contrato e regras principais.
- Os testes E2E cobrem o fluxo crítico de criação e listagem de entidades.
- Os bugs identificados foram documentados com evidências e descrição detalhada.
