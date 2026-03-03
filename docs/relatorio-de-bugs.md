# Relatório de Bugs – CRUD Usuários e Empresas

Este documento consolida os defeitos identificados durante a execução dos testes E2E e API.

---

## BUG 01 – Erro 500 na Atualização de Usuário

**Severidade:** Crítica  
**Prioridade:** Alta  
**Tipo:** Backend / API  
**Endpoint:** `PATCH /api/user/{id}/update`

### Descrição
Ao tentar atualizar um usuário recém-criado, o sistema retorna erro interno do servidor.

### Passos para Reproduzir
1. Criar um novo usuário via `POST /api/user/create`.
2. Capturar o `id` retornado.
3. Enviar requisição `PATCH /api/user/{id}/update` com novos dados válidos.

### Resultado Esperado
O sistema deve atualizar o usuário e retornar status `200 OK`.

### Resultado Atual
O sistema retorna `500 Internal Server Error`.

### Impacto
Impossibilita a manutenção de dados dos usuários, comprometendo a integridade operacional do sistema.

---

## BUG 02 – Divergência de Status Code na Criação de Usuário

**Severidade:** Baixa  
**Prioridade:** Média  
**Tipo:** Contrato de API  
**Endpoint:** `POST /api/user/create`

### Descrição
A documentação da API especifica retorno `201 Created`, porém o sistema retorna `200 OK`.

### Resultado Esperado
Retorno `201 Created`, conforme padrão REST e documentação oficial.

### Resultado Atual
Retorno `200 OK`.

### Impacto
Inconsistência com o contrato da API e com boas práticas REST. Pode gerar falhas em integrações que dependam do status code correto.

---

## BUG 03 – Inconsistência de Nomenclatura no Payload (Contrato)

**Severidade:** Média  
**Prioridade:** Média  
**Tipo:** Contrato / Documentação  
**Endpoint:** `POST /api/user/create`

### Descrição
A documentação técnica especifica o campo `"e-mail"` (com hífen), porém a implementação aceita apenas `"email"` (sem hífen).

### Passos para Reproduzir
1. Enviar requisição `POST /api/user/create` com payload utilizando `"e-mail"`.
2. Observar comportamento da API.

### Resultado Esperado
A API deve aceitar o campo conforme documentado ou atualizar a documentação para refletir a implementação real.

### Resultado Atual
O campo `"e-mail"` não é reconhecido. Apenas `"email"` é aceito.

### Impacto
Divergência entre documentação e implementação, podendo causar falhas de integração com sistemas externos.

---

## BUG 04 – Falha de Validação de Campos Obrigatórios no Backend

**Severidade:** Crítica  
**Prioridade:** Alta  
**Tipo:** Segurança / Validação  
**Endpoint:** `POST /api/user/create`

### Descrição
Embora o frontend impeça o cadastro sem campos obrigatórios (Telefone e Data de Nascimento), o backend permite a criação do usuário via requisição direta à API sem esses campos.

### Passos para Reproduzir
1. Enviar requisição `POST /api/user/create` omitindo Telefone e Data de Nascimento.
2. Verificar resposta da API.

### Resultado Esperado
A API deve rejeitar a requisição com erro `400 Bad Request`, informando ausência de campos obrigatórios.

### Resultado Atual
A API aceita a requisição e cria o usuário incompleto no banco de dados.

### Impacto
Grave falha de validação no servidor. Permite inconsistência de dados e possível inserção de registros inválidos na base.

---

## Observação – Falha de Usabilidade (UX)

Durante a execução do Cenário 02 (E2E), foi identificado que:

- Ao exibir alerta de validação no cadastro,
- O sistema redireciona o usuário para a página inicial,
- Causando perda dos dados já preenchidos.

Embora o teste funcional tenha passado (alerta exibido corretamente), o comportamento configura falha de usabilidade e impacto negativo na experiência do usuário.

**Recomendação:** Manter o formulário aberto após o fechamento do alerta, permitindo correção do campo obrigatório ausente.
