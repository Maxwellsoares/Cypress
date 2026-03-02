# Plano de Teste – CRUD Usuários e Empresas

* Modelagem de Cenários (Gherkin/BDD) * 

* e2e-user-flow.cy:*

Funcionalidade: Gestão de Usuários Como analista de QA, quero validar o cadastro e a listagem de usuários para garantir que as regras de obrigatoriedade de campos sejam respeitadas e os dados sejam persistidos corretamente.

Cenário 01: Cadastro de usuário com sucesso (Caminho Feliz)

Dado que estou no formulário de "Cadastrar novo usuário"
Quando preencho Nome, E-mail, Telefone, Cidade, Data de Nascimento e seleciono uma Empresa
E clico no botão "Salvar"
Então o sistema deve processar o cadastro com sucesso
E o usuário deve ser exibido na listagem principal

Cenário 02: Validar obrigatoriedade do campo Empresa (Fluxo de Exceção)

Dado que estou no formulário de "Cadastrar novo usuário"
Quando clico no botão "Salvar" sem selecionar uma empresa
E o sistema exibe o alerta "Atenção! Insira as empresas do usuário!"
Quando clico no botão "OK"
Então o alerta é encerrado e o sistema retorna para a tela de listagem

Cenário 03: Visualização da listagem de usuários (Leitura/Sanity)

Dado que a página inicial foi carregada 
Quando o sistema realiza a busca de dados na API (GET /api/user) 
Então uma tabela com a listagem de usuários deve estar visível 
E deve conter pelo menos um registro de usuário cadastrado

Cenário 04: Impedir cadastro sem campos obrigatórios (Telefone/Nascimento)

Dado que preencho apenas Nome, E-mail e Empresa, omitindo Telefone e Data de Nascimento
Quando clico em "Salvar"
Então o sistema deve impedir o cadastro e o novo usuário não deve constar na listagem.


Além da modelagem e dos testes bem-sucedidos, identifiquei um comportamento crítico no Cenário 02:
•	Defeito de UX/Fluxo: Ao clicar em "OK" no alerta de obrigatoriedade de empresa, o sistema redireciona o usuário para a página inicial em vez de mantê-lo no formulário.
•	Impacto: Isso causa a perda de todos os dados já preenchidos (Nome, E-mail, etc.), forçando o usuário a reiniciar o processo do zero.
•	Comportamento Correto: O formulário deveria permanecer aberto após o fechamento do alerta para permitir a correção do campo ausente.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Modelagem de Cenários (Gherkin/BDD)

* api-users.cy: * 

Funcionalidade: API de Gestão de Usuários Como sistema integrador, quero realizar operações de CRUD via endpoints REST para garantir a persistência e integridade dos dados de usuários e seus vínculos com empresas.

Cenário 01: Criação de novo usuário (POST)

Dado que possuo os dados de um novo usuário e um ID de empresa válido 
Quando envio uma requisição POST para o endpoint /api/user/create 
Então o status code da resposta deve ser 201 (Created) ou 200 (OK) 
E o corpo da resposta deve conter o ID do usuário gerado (id_user)

Cenário 02: Consulta de usuário por ID (GET)

Dado que possuo um ID de usuário previamente cadastrado 
Quando envio uma requisição GET para o endpoint /api/user/{id} 
Então o status code da resposta deve ser 200 (OK) 
E os dados retornados devem corresponder ao usuário consultado

Cenário 03: Atualização de dados do usuário (PATCH)

Dado que possuo um ID de usuário existente e novos dados para atualização 
Quando envio uma requisição PATCH para o endpoint /api/user/{id}/update 
Então o sistema deve processar a atualização retornando status 200 (OK) E (BUG IDENTIFICADO) caso o sistema retorne status 500, deve-se reportar erro interno no servidor.

Cenário 04: Exclusão de usuário (DELETE)

Dado que possuo um ID de usuário que deve ser removido do sistema 
Quando envio uma requisição DELETE para o endpoint /api/user/{id}/delete 
Então o status code da resposta deve ser 200 (OK) confirmando a exclusão

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Modelagem de Cenários (Gherkin/BDD)

* api-company.cy: *

Funcionalidade: API de Gestão de Empresas Como analista de QA, quero validar os endpoints de empresas para garantir que a listagem, criação e exclusão de entidades corporativas funcionem conforme o contrato da API.

Cenário 01: Listar todas as empresas cadastradas (GET)

Dado que a API de empresas está disponível em http://localhost:8400 
Quando envio uma requisição GET para o endpoint /api/company 
Então o status code da resposta deve ser 200 (OK) 
E o corpo da resposta deve retornar a lista de empresas.

Cenário 02: Cadastro de nova empresa (POST)

Dado que possuo os dados válidos de uma nova empresa (Nome, CNPJ e Endereço) 
Quando envio uma requisição POST para o endpoint /api/company/create 
Então o sistema deve processar o cadastro e retornar status 201 (Created) 
E o corpo da resposta deve conter o ID da empresa gerada.

Cenário 03: Exclusão de empresa por ID (DELETE)

Dado que possuo o ID de uma empresa previamente cadastrada 
Quando envio uma requisição DELETE para o endpoint /api/company/{id}/delete
Então o status code da resposta deve ser 200 (OK) 
E a empresa não deve mais constar na base de dados.


