describe('E2E - Fluxos de Usuário', () => {

  // Hook para recarregar a página antes de cada teste devido à instabilidade do ambiente
  beforeEach(() => {
    cy.visit('http://localhost:5400', { timeout: 10000 })
  })

  it('Cenário 01: Deve cadastrar um usuário preenchendo todos os campos obrigatórios', () => {
    cy.contains(/Novo Usuário/i).click({ force: true })

    // Preenchimento dos dados conforme interface e Regra de Negócio (Seção 2)
    cy.get('input').eq(0).type('Maxwell QA Teste')
    cy.get('input').eq(1).type('maxwell@empresa.com')
    cy.get('input').eq(2).type('11999998888') // Telefone
    cy.get('input').eq(3).type('São Paulo') // Cidade
    cy.get('input[type="date"]').type('1990-01-01')

    // Seleção da Empresa via SearchBox (ID #search_input identificado)
    cy.get('#search_input').click({ force: true }).type('Empresa 1')
    cy.contains('Empresa 1', { timeout: 5000 }).click({ force: true })

    cy.contains(/Salvar/i).click({ force: true })

    // Validação de sucesso na listagem principal
    cy.contains('Maxwell QA Teste', { timeout: 10000 }).should('be.visible')
  })

  it('Cenário 02: Deve exibir alerta de obrigatoriedade da empresa', () => {
    cy.contains(/Novo Usuário/i).click({ force: true })

    // Preenche campos obrigatórios exceto empresa
    cy.get('input').eq(0).type('Usuário Teste Exceção')
    cy.get('input').eq(1).type('teste_erro@empresa.com')
    cy.get('input').eq(2).type('11999991111')
    cy.get('input').eq(3).type('Cidade Teste')
    cy.get('input[type="date"]').type('1995-05-05')
    
    // Tenta salvar para disparar o alerta
    cy.contains('button', /Salvar/i).click({ force: true })

    // 1. Valida que as mensagens de erro apareceram na tela
    cy.get('body').should('contain', 'Atenção!')
    cy.get('body').should('contain', 'Insira as empresas do usuário!')
    
    // 2. Valida a presença do botão OK no modal de erro
    cy.contains('button', 'OK').should('be.visible').click({ force: true })
    
    // 3. Valida que o alerta sumiu (Fim da validação de erro)
    cy.get('.swal2-container').should('not.exist')
    
    cy.log('Validação de campo obrigatório concluída com sucesso.')
  })

  it('Cenário 03: Deve validar a presença de usuários na listagem (Leitura)', () => {
    // Verifica se a tabela carregou ao menos um usuário (GET /api/user)
    cy.get('table', { timeout: 8000 }).should('be.visible')
    cy.get('tbody tr').should('have.length.at.least', 1)
  })

})