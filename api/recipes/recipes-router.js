const express = require('express')

const router = express.Router()

const Recipes = require('./recipes-model')
const { restricted, validateRecipeId, validateRecipeReq, validateUserId, validateEditReq } = require('../middleware')

router.get('/recipes', (req, res) => {
    Recipes.getAll()
      .then(recipes => {
          res.status(200).json(recipes)
      })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err}`
          })
      })
})

router.get('/:id', restricted, validateRecipeId, (req, res) => {
    Recipes.getById(req.params.id)
      .then(recipe => {
          res.status(200).json(recipe)
      })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err}`
          })
      })
})

router.post('', restricted, validateRecipeReq, validateUserId, (req, res) => {
    Recipes.add(req.body)
      .then(recipe => {
          res.status(201).json(recipe)
      })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err}`
          })
      })
})

router.put('/:id', restricted, validateRecipeId, validateEditReq, (req, res) => {
    Recipes.edit(req.params.id, req.body)
      .then(recipe => {
          res.status(200).json(recipe)
      })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err}`
          })
      })
})

router.delete('/:id', restricted, validateRecipeId, (req, res) => {
    Recipes.remove(req.params.id)
      .then(recipe => {
          res.status(200).json(recipe)
      })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err}`
          })
      })
})

router.get('/', restricted, (req, res) => {
    let filter = req.query.search
    if(!filter) {
        res.status(400).json({
            message: 'Nothing was provided to search.'
        })
    } else {
    filter = '%'+filter+'%'
    Recipes.getBySearch(filter)
      .then(recipe => {
            res.status(200).json(recipe)
        })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err}`
          })
      })}
})

module.exports = router;
