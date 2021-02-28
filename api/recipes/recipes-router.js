const express = require('express')

const router = express.Router()

const Recipes = require('./recipes-model')
const { restricted } = require('../middleware')

module.exports = router;
