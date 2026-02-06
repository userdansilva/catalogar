# Catalogar API

## Requisitos Funcionais

### Autenticação
- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter dados do usuário logado;

### Perfil
- [ ] Deve ser possível editar nome do usuário;

### Catálogo
- [ ] Deve ser possível editar link;
- [ ] Deve ser possível editar whatsapp;
- [ ] Deve ser possível editar instagram;
- [ ] Deve ser possível editar site oficial (ex.: linktree, site oficial);

### Item de catálogo
- [ ] Deve ser possível criar item de catálogo;
- [ ] Deve ser possível editar item de catálogo;
- [ ] Deve ser possível remover item de catálogo;
- [ ] Deve ser possível buscar item de catálogo por nome;
- [ ] Deve ser possível ordenar item de catálogo por mais recente;
- [ ] Deve ser possível buscar item de catálogo por categoria;
- [ ] Deve ter preço padrão;
- [ ] Deve ter preço reduzido (com desconto ex.: de/para);

### Categoria
- [ ] Deve ser possível criar categoria;
- [ ] Deve ser possível editar categoria;
- [ ] Deve ser possível remover categoria;
- [ ] Deve ser possível buscar categoria por nome;
- [ ] Deve ser possível ordenar categoria por mais recente;
- [ ] Deve ser possível obter quantidade de items de catálogo vinculados;

## Regras de Negócio

- [x] O usuário não pode ter email duplicado;
- [x] Ao criar um usuário, deve ser criado o Profile e Catalog;
- [ ] O item de catálogo deve ter uma categoria;
- [ ] O catálogo não pode ter nome/slug de categoria duplicada;
- [ ] Ao remover uma categoria, os itens de catálogo vinculados devem ser removidos;

## Requisitos Não Funcionais

- [ ] Os dados da aplicação devem estar persistidos em um banco PostgreSQL;
- [ ] Deve ser implementado Better-Auth com login Email/Senha e Google;
- [ ] Deve ser implementato Token Refresh, e a sessão do usuário deve durar 14 dias;

## Comandos Úteis do Docker

```shell
docker ps
docker compose up -d
docker compose stop
docker compose down
docker rm container-name
docker stop contaioner-name
```

## Comandos Úteis do Prisma
```shell
npx prisma migrate dev
npx prisma studio
npx prisma generate
```
