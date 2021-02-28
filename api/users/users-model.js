const db = require('../data/db-config')

module.exports = {
    add,
    findById,
    find,
    findRecipesByUserId
}

function add(user) {
    return db('users').insert(user)
        .then(user_id => {
            return findById(user_id)
        })
}

function findById(id) {
    return db('users')
        .where('user_id', id)
        .select('user_id', 'username')
        .first()
}

function find(filter) {
    return db('users')
        .where('username', filter)
        .first()
}

function findRecipesByUserId(id) {
    return db('recipes').where('user_id', id)
}