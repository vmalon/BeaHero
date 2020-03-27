const knex = require('knex');

//Configuração, passando caminho do arquivo
const configuration = require('../../knexfile');

//Criando conexão e passando como parâmetro configuration (Development)
//Qual conexão será utilizada
const connection = knex(configuration.development);

//Exporta a conexão de dentro deste arquivo, para outros arquivos
//Exporta a conexão
module.exports = connection;