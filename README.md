<h1 align='center'>Mackarel Backend</h1>

## Descrição

<p align='justify'>A ideia deste CMS é poder consultar os produtos cadastrados, desenvolvido para ser usado onde trabalho atualmente.
Hoje ela roda em docker na AWS EC2, com traefik como reverse-proxy.</p>

## Dependências e Libs :book:

- [Express](http://expressjs.com/pt-br/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
- [Argon2](https://www.npmjs.com/package/argon2)

## Rotas

- POST - /user/login - Retorna um token JWT, contendo além de seu atributos, o ID do user.
- POST - /user/register - Deve receber um JSON com name, email e password e devolve um token.

- GET - /item/:itemId - Recebe apenas o id do item e retorna o mesmo.

<p>Todas rotas abaixo devem receber o token de login via headers.authorization.</p>
<p>Todas elas terão um middleware para conferir se o user existe e devolver o token decodificado.</p>

- GET - /item/:itemId - Recebe apenas o id do item e retorna o mesmo.
- POST - /item - Cria um novo item.
- PUT - /item/itemId - Update do item.
- DELETE - /item/itemId - Deleção do item.

### Como rodar o projeto :arrow_forward:

No terminal, clone o projeto:

```
  gh repo fork --clone BrunoDevCode/Mackarel-backend
  ou
  git clone https://github.com/BrunoDevCode/Mackarel-backend
```

Entre na pasta do projeto:

```
  cd Mackarel-backend
```

Instale as dependências e execute como desenvolvedor:

```
  yarn install & yarn dev
```

Exposto na http://localhost:3001
