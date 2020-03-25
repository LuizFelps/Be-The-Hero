const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query; /*Esquema de paginação */
        /*http://localhost:3333/sessions?page=2 ele vai mostrar a proxima pagina no insomnia */

        const [count] = await connection('incidents').count();
        console.log(count);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']); /*Retorna o count no cabeçalho da requisição */

        return response.json(incidents);
    },

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,    
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params; /*Pega o id do caso que vai estar no parametro da url */
        const ong_id = request.headers.authorization; /*Pega o id da ong logada */

        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'operated not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(240).send();
    }

};