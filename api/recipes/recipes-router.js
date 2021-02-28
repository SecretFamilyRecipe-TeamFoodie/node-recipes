const express = require('express')

const router = express.Router()

const Recipes = require('./recipes-model')
const { restricted, validateRecipeId } = require('../middleware')

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

module.exports = router;
