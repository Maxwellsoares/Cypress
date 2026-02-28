# Relatório de Bugs

## BUG 01 - Status Code divergente da documentação

Endpoint: POST /api/user/create  
Documentação: Retorna 201  
Comportamento Atual: Retorna 200  
Impacto: Inconsistência com contrato da API  

---

## BUG 02 - Campos obrigatórios não validados no backend

Regra de Negócio:
Nome, Email, Telefone, Data de Nascimento e Empresa devem ser obrigatórios.

Problema:
API aceita criação sem telefone e data de nascimento.

Impacto:
Quebra de regra de negócio.