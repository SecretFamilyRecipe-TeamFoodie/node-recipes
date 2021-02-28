exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'test', firstname: 'testing', lastname: 'tests', email: 'test@testing.com', password: 'test123'},
    {username: 'Steph', firstname: 'Steph', lastname: 'Anie', email: 'me@me.com', password: 'test123'},
    {username: 'granny', firstname: 'Grandma', lastname: 'Nana', email: 'nana@granny.com', password: 'test123'}
  ]);
};
