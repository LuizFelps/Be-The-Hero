const express = require('express'); /*Aqui está importando todas as coisas que estão em express*/
const cors = require('cors');
const routes = require('./routes')

const app = express();

app.use(cors());
app.use(express.json());/*Converte o json em um objeto de javascript */
app.use(routes);

/*Rota / Recurso*/
/**
 * Métodos HTTP:
 * 
 * GET: buscar/listar uma informação do backend
 * POST: criar uma informação no backend
 * PUT: alterar uma informação no backend
 * DELETE: deletar uma informação no backend
 */

 /**
  * Tipos de Parametros:
  * 
  * Query Params: Parâmetros nomeados enviados na rota (insomnia) após "?" (filtros, paginação)
  * Route Params: Parâmetros utilizados para identificar recursos
  * Request Body: Corpo da Requisição, utilizado para criar ou alterar recursos
  */

  /** Bancos de Dados
   * SQL: MySQL, SQLite, PostgreSQL
   * NoSQL: MongoDB
   */

   /**Configuração do Banco de Dados 
    * Driver: SELECT * FROM users
    * Query Builder: table('users').select('*').where() -- essa notação pode aceitar qualquer abordagem SQL
   */

app.listen(3333); /*Aqui coloca no navegador "localhost:3333" */
/* No powershel node index.js*/
