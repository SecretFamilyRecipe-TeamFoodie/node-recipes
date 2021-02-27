exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'test', first_name: 'testing', last_name: 'tests', email: 'test@testing.com', password: 'test123'},
    {username: 'Steph', first_name: 'Steph', last_name: 'Anie', email: 'me@me.com', password: 'test123'},
    {username: 'granny', first_name: 'Grandma', last_name: 'Nana', email: 'nana@granny.com', password: 'test123'}
  ]);
};
