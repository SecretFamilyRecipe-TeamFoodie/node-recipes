const db = require('../data/db-config')

module.exports = {
    getById,
    edit,
    remove,
    add,
    getBySearch
}

async function add(recipe) {
    const [id] = await db('recipes').insert(recipe, 'recipe_id')
    return getById(id)
}

function getById(id) {
    return db('recipes').where('recipe_id', id).first()
}

function getBySearch(filter) {
    return db('recipes').where(filter)
}

async function edit(recipe_id, body) {
    const [id] = await db('recipes').where('recipe_id', recipe_id).update(body)
    return getById(id)
}

function remove(id) {
    return db('recipes').where('recipe_id', id).del()
}