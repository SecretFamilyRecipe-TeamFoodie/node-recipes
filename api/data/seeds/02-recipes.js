exports.seed = function(knex) {
  return knex('table_name').insert([
    {title: 'Chocolate Cake', category: 'cake, dessert, chocolate', source: 'online', ingedients: 'chocolate, flour, eggs, sugar, milk', instructions: 'mix flour, eggs, sugar, and milk, melt chocolate and mix in, then bake.', user_id: 1},
    {title: 'Pepperoni Pizza', category: 'dinner, lunch', source: 'me', ingedients: 'dough, sauce, cheese, pepperoni', instructions: 'spread dough, add sauce, cheese and pepperoni, bake', user_id: 2},
    {title: 'Turkey Dinner', category: 'turkey, feast, dinner', source: 'Grandma', ingedients: 'turkey, veggies, ground turkey', instructions: 'thaw turkey, and then go get grandma so she can do it.', user_id: 3}
  ]);
};
