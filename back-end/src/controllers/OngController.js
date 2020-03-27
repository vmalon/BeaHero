const connection = require('../database/connection');

const crypto = require('crypto');



//Listagem de todos os dados de uma tabela
module.exports = {
async index (request, response) {
    //Variavei ongs recebe o resultado do select 
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
},

//Exporta um objeto com os métodos

    async create(request, response){
        const {name, email, whatsapp, city, uf} = request.body;

        //Cria um Id aleatório, a partir de um pacote próprio do Node: Crypto 
        //Gera 4 bytes de caracteres Hexadecimais 
        const id = crypto.randomBytes(4).toString('HEX');
     
        //Insere na tabela / colunas
        await connection('ongs').insert({
           id,
           name,
           email,
           city,
           whatsapp,
           uf
        })
        
        //Retorna o id da ong
        return response.json({id});
    }
};