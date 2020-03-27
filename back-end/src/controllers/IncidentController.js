const connection = require('../database/connection');

//Cadastrar um incident

//ong_id representa qual a ong que está autenticada e cadastrando
module.exports ={

    //Paginação: para não retornar todos os incidents de uma vez
    async index (request, response){
        //Buscar de dentro do request.query (query params)
        //Busca o parâmetro chamado page
        //Se não exeistir, busca por padrão 1
        const{page = 1} = request.query;

        //Retorna apenas um resultado com []
        const [count] = await connection('incidents')
        .count();

        //Retorna no cabeçalho da resposta da requisição
        //Retorna no header da response
        //(nome do cabeçalho, variável acessando a propriedade count(*))
        response.header('X-Total-Count', count['count(*)']);

        const incidents = await connection('incidents')
        //Dados da ong relacionados com o incident
        .join('ongs','ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        //Começa a partir do zero e pega os 5 próximos registros
        .offset((page - 1) * 5)
        //Array: todos os dados do incidente, porém da ong com campos específicos
        .select(['incidents.*', 
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf']);
        return response.json(incidents);
    },
    
    async create(request, response){
        const {title, description, value} = request.body;

        //Headers:
        //Cabeçalho da requisição
        //Guarda informações do contexto da requisição
        //Dados da autenticação do usuário, dados da localização
        const ong_id = request.headers.authorization;    

        //O resultado será um array com um único id
        //A primeira chave do array vai ser armazenado numa variável chamada id
        const [id] = await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
        })
        
        //Retornando pro front-end
        return response.json({id});
    },

    async delete(request,response){
        //Pega o id que vem como parâmetro na rota
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        //First, retorna apenas um resultado
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        //Verifica se ong_id do incident é diferente do ong_id do ong logado
        if(incident.ong_id != ong_id){
            //401 - Não autorizado 
            return response.status(401).json({error: "Operation not permited"});
        }

        await connection('incidents').where('id', id).delete();

        //204 - Responsta sem conteúdo
        //Resposta de sucesso, mas sem conteúdo
        //.send() envia a resposta sem corpo nenhum, vazia
        return response.status(204).send();
    }
};