# Relatório de Bugs #

# BUG 01 - Erro Crítico (500) na Atualização de Usuário
Endpoint: PATCH /api/user/{id}/update
Cenário: Ao tentar atualizar um usuário recém-criado.
Comportamento Atual: O servidor retorna 500 Internal Server Error.
Impacto: Crítico. Impede a manutenção de dados dos usuários no sistema.


# BUG 02 - Divergência de Status Code (Criação)
Endpoint: POST /api/user/create
Documentação: Especifica retorno 201 Created.
Comportamento Atual: Retorna 200 OK.
Impacto: Baixo. Inconsistência com o padrão REST e o contrato da API.


# BUG 03 - Inconsistência de Nomenclatura no Payload (Contrato)
Endpoint: POST /api/user/create
Cenário: Envio do campo de e-mail conforme documentação ("e-mail" com hífen).
Comportamento Atual: O sistema não reconhece o campo com hífen, aceitando apenas "email".
Impacto: Médio. Divergência entre a documentação técnica (Seção 5) e a implementação real.


# Bug 04 - Falha de Validação de Campos Obrigatórios (Backend vs Frontend)
Comportamento no Frontend (Cenário E2E 04): O teste passou com sucesso pois confirmou que o sistema impede o cadastro quando campos obrigatórios (Telefone e Nascimento) estão ausentes. O sistema exibe a mensagem de alerta esperada e não insere o registro na listagem.
Comportamento no Backend (Teste de API): O sistema apresenta uma falha de segurança/consistência, permitindo a criação do usuário via requisição direta (POST) mesmo sem os campos obrigatórios.
Conclusão: Existe uma validação apenas no "cliente" (Front), mas o "servidor" (Back) está vulnerável, o que permite a entrada de lixo eletrônico no banco de dados via API.
