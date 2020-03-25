
exports.up = function(knex) { /*up - cria a tabela */
    return knex.schema.createTable('incidents', function (table){
        table.increments() /*auto incremento */

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();
       
        table.foreign('ong_id').references('id').inTable('ongs')
     });
   };
exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
