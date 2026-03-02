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


# BUG 04 - Falha na Validação de Campos Obrigatórios
Regra de Negócio: Nome, Email, Telefone, Data de Nascimento e Empresa devem ser obrigatórios.
Problema: A API e o Frontend permitem a criação de registros omitindo Telefone e Data de Nascimento.
Impacto: Alto. Quebra de integridade dos dados e da regra de negócio estabelecida.
#Lógica do Bug#
Se o requisito diz que Telefone e Nascimento são obrigatórios...
...e o teste enviou o JSON sem esses campos
...e o sistema retornou 200 OK (criou o usuário)
Conclusão: O sistema tem um bug de validação, pois ele deveria ter retornado um erro (400 Bad Request) avisando que faltavam campos obrigatórios.
