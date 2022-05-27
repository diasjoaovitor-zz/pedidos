`Em desenvolvimento`

# Pedidos

Sistema para controle de pedidos em pequenas empresas

## Tecnologias

- [ReactJS](https://pt-br.reactjs.org/)
- [Firebase](https://firebase.google.com/?hl=pt)
- [Apollo Client](https://www.apollographql.com)
- [MUI](https://mui.com/)

Esse projeto utiliza uma [api de tradução](https://github.com/diasjoaovitor/pedidos-graphql-api) com [GraphQL Yoga](https://www.graphql-yoga.com/) e `Firebase Functions`, para retornar os dados obtidos do `Firestore` em `GraphQL`.

Testes de unidade com [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) e [Jest](https://jestjs.io/pt-BR/)

## Como rodar o projeto

Voce pode testar o [projeto em produção](https://pedidosapp.netlify.app/) acessando com:

Email: 

```
teste@teste.com
```

Senha:

```
123456
```

Para testar localmente, é necessário realizar algumas configurações:

- Crie um App no [Firebase](https://firebase.google.com/docs/web/setup)

- Faça o clone do projeto:

```
git clone https://github.com/diasjoaovitor/pedidos.git
```

- Instale as dependências:

```
cd pedidos && yarn
```

- Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente com os dados no seu app criado no firebase, sendo que a variável `REACT_APP_CLOUD_fUNCTIONS_URL` será configurada mais adiante

Com isso o frontend está praticamente pronto, basta configurar o backend:

- Faça o clone da API GraphQL:

```
git clone https://github.com/diasjoaovitor/pedidos-graphql-api.git
```

- Configure as [Funções do Firebase](https://firebase.google.com/docs/functions)] e o ambiente local

- Instale as dependências e execute a aplicação:

```
cd functions 
yarn && yarn serve
```

- Copie a url mostrada no terminal,  volte a pasta do frontend e insira em `REACT_APP_CLOUD_fUNCTIONS_URL`

- Inicie o cliente:

```
yarn start
```
