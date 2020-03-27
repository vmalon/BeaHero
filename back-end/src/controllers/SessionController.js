const connection = require('../database/connection')


module.exports =
{
    async create(request, response){
        //Busca o id da requisição que vem do body
        const{id} = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name')
        .first();

        //Se a ong não existir
        if(!ong){
            return response.status(400).json({error: 'No ONG found with this ID'});
        }

        return response.json(ong);
    }
}