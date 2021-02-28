const db = require('../data/db-config')

module.exports = {
    add,
    findById,
    find,
    findRecipesByUserId,
    findAll
}

async function add(user) {
    const [id] = await db('users').insert(user, 'user_id')
    return findById(id)
}

function findById(id) {
    return db('users')
        .where('user_id', id)
        .select('user_id', 'username')
        .first()
}

function find(filter) {
    return db('users')
        .where(filter)
}

function findRecipesByUserId(id) {
    return db('recipes').where('user_id', id)
}

function findAll(){
    return db('users')
}