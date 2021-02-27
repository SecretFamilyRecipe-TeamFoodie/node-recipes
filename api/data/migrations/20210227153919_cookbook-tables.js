
exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
        users.increments('user_id')
        users.string('username', 128).notNullable().unique()
        users.string('first_name', 128).notNullable()
        users.string('last_name', 128).notNullable()
        users.string('email', 256).notNullable().unique()
        users.string('password', 128).notNullable()
    })
    .createTable('recipes', tbl => {
        tbl.increments('recipe_id',);
        tbl.string('title', 128).notNullable()
        tbl.string('category', 128).notNullable()
        tbl.string('source', 128).notNullable()
        tbl.string('ingredients', 300).notNullable()
        tbl.string('instructions', 300).notNullable()
        tbl.integer('user_id')
            .notNullable()
            .unsigned()
            .refernces('user_id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('recipes')
    .dropTableIfExists('users')
};
