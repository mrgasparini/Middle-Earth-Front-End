# Middle-Earth-Front-End

Middle-Earth-Front-End é uma aplicação VueJs criada para complementar o Desafio Desenvolvedor Backend na PlayerUm.

Middle-Earth-API link: [Middle-Earth-API](https://github.com/mrgasparini/Middle-Earth-Api)

## Objetivo

O objetivo do desafio é construir uma aplicação WEB que permita que usuários após a autenticação possam cadastrar lugares existentes no Senhor dos Anéis, subindo uma imagem e nome, e que possam votar em qual é o melhor lugar para se viver em MiddleEarth.

## Funcionalidades

Essa aplicação tem como principal funcionalidade gerir de forma visual os acessos, controle de votos e CRUD dos lugares de Middle Earth.
Cada usuário só poderá votar apenas uma vez.
As funcionalidades de Votar, Cadastrar Lugar, Editar Lugar e Excluir lugar só poderam ser realizada quando o usuário estiver autenticado.

## Variáveis de Ambiente

Na raiz do projeto contém um arquivo com nome ".env-exemple", nele contém o exemplo de como dever ser criado o arquivo ".env", onde serão armazenadas todas as variáveis de ambiente.

## Instalação

Para instalar as dependências basta rodar o seguinte comando no terminal na pasta raiz do projeto.

```bash
npm i
```

## Start

Para iniciar o projeto basta rodar o seguinte comando no terminal na pasta raiz do projeto:

```bash
npm run serve
```
Por padrão o projeto irá rodar na url **http://localhost:8080/**
