const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usersRouter = require('./users/users-router')
const recipesRouter = require('./recipes/recipes-router')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/user', usersRouter)
server.use('/recipe', recipesRouter)

module.exports = server;