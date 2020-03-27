//Quem vai poder acessar a aplicação
const cors = require('cors');
//Importando dependência
const express = require('express');
//Instanciando e criando aplicação
const app = express();
//Referênciando a mesma pasta do arquivo index.js
const routes = require('./routes');
const connection = require('./database/connection')
//Converte o corpo das requisições de JSON para objeto do JavaSctipt
app.use(express.json());
app.use(routes);
app.use(cors());
/* Métodos HTTP
GET: sempre que for buscar uma informação da aplicação.
POST: criar uma informação no back-end. 
PUT: alterar uma informação no back-end.
DELETE: deletar uma informação no back-end.
Tipos de parâmetros:
Query: Parâmetros nomeados enviados na rota após ?
Rota ? nome do parâmetro = valor
url: users?name=Diego
Request Body: Corpo da requisição, utilizao para alterar recursos
//Através do JavaScript, realiza as consultas no banco, 
//com qualquer banconpm install knex --save
//Query builder: table(usuarios).select('*').where()
//Rota raiz, recebe uma função no segundo parâmetro
//Rota:  /recurso. Por ex /usuario
*/


