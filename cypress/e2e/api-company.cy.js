describe('API - Company CRUD', () => {

  const baseUrl = 'http://localhost:8400'
  let companyId

  it('GET - Listar empresas (200)', () => {
    cy.request(`${baseUrl}/api/company`)
      .its('status')
      .should('eq', 200)
  })

  it('POST - Criar empresa (201)', () => {

    const novaEmpresa = {
      name: "Empresa QA Cypress",
      cnpj: "12345678000195",
      adress: {
        cep: "12345000",
        country: "Brasil",
        state: "SP",
        city: "São Paulo",
        street: "Rua Teste",
        number: "100",
        district: "Centro"
      }
    }

    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/company/create`,
      body: novaEmpresa
    }).then((response) => {
      // Validações apenas do que a API retorna
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')

      // Salva o ID para deletar
      companyId = response.body.id
    })
  })

  it('DELETE - Deletar empresa (200)', () => {
    cy.wrap(null).then(() => {
      expect(companyId, 'companyId não foi criado').to.exist
    })

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/api/company/${companyId}/delete`
    }).its('status').should('eq', 200)
  })

})