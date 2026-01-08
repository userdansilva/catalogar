# Catalogar API

## Requisitos Funcionais

### Autenticação
- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter dados do usuário logado;
- [ ] Deve ser possível editar dados do usuário;

### Catálogo
- [ ] Deve ser possível criar catálogo;
- [ ] Deve ser possível editar catálogo;
- [ ] Deve ser possível remover catálogo;
- [ ] Deve ser possível trocar de catálogo atual;
- [ ] Deve ser possível buscar catálogo por nome;
- [ ] Deve ser possível ordenar catálogo por mais recente;

### Tipo de produto
- [ ] Deve ser possível criar tipo de produto;
- [ ] Deve ser possível editar tipo de produto;
- [ ] Deve ser possível remover tipo de produto;
- [ ] Deve ser possível buscar tipo de produto por nome;
- [ ] Deve ser possível ordenar tipo de produto por mais recente;
- [ ] Deve ser possível obter quantidade de items de catálogo vinculados;

### Categoria
- [ ] Deve ser possível criar categoria;
- [ ] Deve ser possível editar categoria;
- [ ] Deve ser possível remover categoria;
- [ ] Deve ser possível buscar categoria por nome;
- [ ] Deve ser possível ordenar categoria por mais recente;
- [ ] Deve ser possível obter quantidade de items de catálogo vinculados;

### Item de catálogo
- [ ] Deve ser possível criar item de catálogo;
- [ ] Deve ser possível editar item de catálogo;
- [ ] Deve ser possível remover item de catálogo;
- [ ] Deve ser possível buscar item de catálogo por nome;
- [ ] Deve ser possível ordenar item de catálogo por mais recente;
- [ ] Deve ser possível buscar item de catálogo por categoria;
- [ ] Deve ser possível buscar item de catálogo por produto;

## Regras de Negócio

- [ ] O usuário não pode ter email duplicado;
- [ ] O mesmo usuário não pode ter nome de catálogo duplicado;
- [ ] O usuário não pode ter nome/slug de categoria duplicada no mesmo catálogo;
- [ ] O usuário não pode ter nome/slug de tipo de produto duplicado no mesmo catálogo;
- [ ] O item de catálogo deve ter um tipo de produto vinculado;
- [ ] Ao remover um tipo de produto, os itens de catálogo vinculados devem ser removidos;
- [ ] Ao remover uma categoria, os itens de catálogo vinculados devem remover a categoria;

## Requisitos Não Funcionais

- [ ] Os dados da aplicação devem estar persistidos em um banco PostgreSQL;
