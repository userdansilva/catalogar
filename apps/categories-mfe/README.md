# Categories Microfrontend

Esse é um projeto para validar a abordagem de microfrontend (+ autenticação) usando o MultiZones do Nextjs. Ao ativar essa abordagem você tem duas aplicação rodando simultaneamente, o Catalogar e Categories MFE.

Categories MFE é um microfrontend reponsável por lidar com a funciondadlide de categorias, que é conectado a uma aplicação principal (Catalogar) simulando um cenário em que um time — equipe, setor, tribo, etc — diferente é responsável por lidar com categorias.

Em uma abordagem mais completa a aplicação principal, apelidada de _Router_, não possui funcionalidades, lidando apenas com a autenticação (login, logout, token-refresh), e definindo qual microfrontend fica resposnável por cada rota.

Uma possível melhoria no Router também é o desenvolvimento de uma área de gestão, que através do middleware você consegue adicionar, editar ou remover aplicações microfrontend sem precisar buildar o Router.

É importante notar que essa é uma aplicação monorepo, isso pois em caso dessa aboragem ser usada com polyrepo há um aumento significativo de complexidade, principalmente no compartilhamento de componentes.
