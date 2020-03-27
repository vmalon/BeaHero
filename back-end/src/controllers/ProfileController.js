const connection = require('../database/connection')

//Perfil de uma ong
module.exports = {
    
    //Dados específicos de uma única ong
    async index(request,response){
        
        const ong_id = request.headers.authorization;
        
        //Buscando todos os incidents específicos de uma ong
        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(incidents);

    }
}