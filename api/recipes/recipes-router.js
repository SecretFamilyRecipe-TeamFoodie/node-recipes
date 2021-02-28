const express = require('express')

const router = express.Router()

const Recipes = require('./recipes-model')
const { restricted, validateRecipeId, validateRecipeReq, validateUserId } = require('../middleware')

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

module.exports = router;
