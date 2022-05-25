`Em desenvolvimento`

Esse projeto utiliza uma [api de tradução](https://github.com/diasjoaovitor/pedidos-graphql-api) com `GraphQL Yoga` e `Firebase Functions`, para retornar os dados obtidos do `Firestore` em `GraphQL`.

[Deploy com GraphQL](https://628d7cff9e1d340946b7ecba--gleaming-faloodeh-3ad184.netlify.app/)

# Pedidos

Sistema para controle de pedidos em pequenas empresas

## Tecnologias

- [ReactJS](https://pt-br.reactjs.org/)
- [Firebase](https://firebase.google.com/?hl=pt)
- [MUI](https://mui.com/)

## Como rodar o projeto

Voce pode testar o [projeto em produção](https://gleaming-faloodeh-3ad184.netlify.app//) acessando com:

Email:

```
teste@teste.com
```

Senha:

```
123456
```

Para testar localmente, é necessário possuir uma conta do [Firebase](https://firebase.google.com/?hl=pt) e criar um novo app. Depois basta seguir os seguintes passos:

Faça o clone do repositório e baixe as dependências do projeto

```
git clone https://github.com/diasjoaovitor/pedidos.git
cd pedidos
yarn
```

Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente com os dados no seu app criado no firebase

Por fim, execute o comando a seguir para rodar a aplicação

```
yarn dev
```
