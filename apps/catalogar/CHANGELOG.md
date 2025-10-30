# catalogar

## 2.2.2

### Patch Changes

- a26b7d5: teste: outro teste de pipe
- 5b09c5a: Teste de ajuste na pipeline

## 2.2.1

### Patch Changes

- f44cd83: chore: instalação e configuração do ofetch
- d265c29: Teste de ajuste na pipeline

## 2.2.0

### Minor Changes

- 0d1e095: Atualização para Next 16 (Beta)

### Patch Changes

- c8c147f: melhoria nos actions e adaptação para Next16
- 045bbbd: Substituição de todos os form.watch por <Watch /> devido a bug pós migração para Next16
- 61dff36: tratativa de erro em update e delete de categorias e tipos de produto
- 6b9940a: fix: alteração de link do auth0 de <Link> para <a> (recomendado pela a doc)
- 0d1e095: Remoção do Sentry (será estudado e incluído posteriormente)

## 2.1.6

### Patch Changes

- 3054fda: Update pipeline release

## 2.1.5

### Patch Changes

- e37fe7c: Correção de bug de login em catálogo público, segmentação de dashboard

## 2.1.4

### Patch Changes

- be0db3a: Aplicação de abordagem de schemas separados por contexto

## 2.1.3

### Patch Changes

- b017a4f: Fluxo de loading do layout usando skeletons isolados
- f8a38cf: Melhoria nos services e actions do catalogItem para usar o serverFetch
- 62b44e8: Remoção do baseURL de services, criação de services de ação para categorias e tipos de produto ajustando os actions
- 4e4ecde: Modificação de services para uso da tupla priorizando tratativa de erros
- a6e41d0: Melhorias nos textos e navegação
- Updated dependencies [566ea51]
  - @catalogar/ui@1.0.1

## 2.1.2

### Patch Changes

- 94c1cfe: Configuração do Sentry Closes #13
- 5984c80: Correção de configuração de eslint
- 4c08e60: Correção de falha ao atualizar tema #37

## 2.1.1

### Patch Changes

- c9373dd: Auto selecionar tipo de produto quando só existir um Closes #30
- d64a01e: Correção na página de preview. Closes #28
- ffc0233: Melhoria no redirecionamento em páginas de uso único
- 7add2cd: Ajuste de missões do tutorial Closes #22. E ajuste nos redirecionamentos

## 2.1.0

### Minor Changes

- cb94fbd: Melhoria no salvamento de imagens
- cb94fbd: Configuração de Monorepo

### Patch Changes

- cb94fbd: Ajuste no middleware para solucionar token refresh
