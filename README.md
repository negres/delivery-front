# Delivery Front

Este projeto é uma aplicação Next.js. Abaixo estão as instruções para configurar, executar e testar o projeto.

## Pré-requisitos

Certifique-se de ter o Node.js (versão 20 ou superior recomendada) e npm ou Yarn instalados.

## Instalação

1.  Clone o repositório:

    ```bash
    git clone git@github.com:negres/delivery-front.git
    cd delivery-front
    ```

2.  Instale as dependências:

    ```bash
    npm install
    # ou
    yarn install
    ```

## Executando o Servidor de Desenvolvimento

Para executar a aplicação em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:3001`.

## Construindo para Produção

Para construir a aplicação para produção:

```bash
npm run build
# ou
yarn build
```

Isso criará uma pasta `.next` com a build de produção.

## Executando o Servidor de Produção

Para iniciar a aplicação em modo de produção (após a construção):

```bash
npm run start
# ou
yarn start
```

## Linting

Para executar o linter e verificar problemas de estilo de código:

```bash
npm run lint
# ou
yarn lint
```

## Executando Testes

Para executar os testes unitários usando Jest:

```bash
npm test
# ou
yarn test
```
