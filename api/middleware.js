const Users = require('./users/users-model')
const Recipes = require('./recipes/recipes-model')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets')

function validate(user) {
    return Boolean(user.username && user.password && typeof user.password === 'string')
};
  
function verifyReq(req, res, next) {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({
          message: 'Username and password are required.'
       })
    } else {
      next()
    }
}

function validateUserId(req, res, next) {
    Users.findRecipesByUserId(req.params.id)
      .then(recipe => {
          if(recipe) {
              res.user = recipe;
              next();
            } else {
                res.status(404).json({
                    message: 'Invalid id, user not found'
                })
            }
      })
      .catch(err => {
          res.status(500).json({
              message: `Sever error: ${err}`
          })
      });
}

async function isUserInDb(req, res, next) {
    try{
      const rows = await Users.find({username: req.body.username})
      if(!rows.length) {
        next();
      } else {
        res.status(400).json({
            message: 'Username is taken.'
        })
      }
    } catch(err) {
      res.status(500).json({
          message: `Server error: ${err}`
      })
    }
}

function restricted(req, res, next) {
    const token = req.headers.authorization
    if(!token) {
        res.status(401).json({
            message: 'Token not found. Please provide token.'
        })
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err) {
                res.status(401).json({
                    message: 'Token is not valid.'
                })
            } else {
                req.decodedToken = decoded
                next()
            }
        })
    }
};

function validateRecipeId(req, res, next) {
    Recipes.getById(req.params.id)
      .then(recipe => {
          if(recipe) {
              res.recipe = recipe;
              next();
          } else {
              res.status(404).json({
                  message: 'Invalid id, recipe not found.'
              })
          }
      })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err}`
          })
      })
}

function validateRecipeReq(req, res, next) {
    const {title, category, source, ingredients, instructions} = req.body;
    if(!title) {
        res.status(400).json({
            message: 'Title required'
        })
    } else if(!category) {
        res.status(400).json({
            message: 'Category required'
        })
    } else if(!source) {
        res.status(400).json({
            message: 'Source required'
        })
    } else if(!ingredients) {
        res.status(400).json({
            message: 'Ingredients required'
        })
    } else if(!instructions) {
        res.status(400).json({
            message: 'Instructions required'
        })
    } else {
        req.params.id = req.body.user_id
        next()
    }
}

function validateEditReq(req, res, next) {
    const {title, category, source, ingredients, instructions} = req.body;
    if(!title) {
        res.status(400).json({
            message: 'Title required'
        })
    } else if(!category) {
        res.status(400).json({
            message: 'Category required'
        })
    } else if(!source) {
        res.status(400).json({
            message: 'Source required'
        })
    } else if(!ingredients) {
        res.status(400).json({
            message: 'Ingredients required'
        })
    } else if(!instructions) {
        res.status(400).json({
            message: 'Instructions required'
        })
    } else {
        next()
    }
}

module.exports = {
    validate,
    verifyReq,
    validateUserId,
    isUserInDb,
    restricted,
    validateRecipeId,
    validateRecipeReq,
    validateEditReq
}