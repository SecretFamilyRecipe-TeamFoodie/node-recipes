const express = require('express')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

const Users = require('./users-model')
const { jwtSecret } = require('../../config/secrets')
const {
    validate,
    verifyReq,
    validateUserId,
    isUserInDb,
    restricted
} = require('../middleware')

router.get('/users', (req, res) => {
    Users.findAll()
      .then(users => {
          res.status(200).json(users)
      })
      .catch(err => {
          res.status(500).json({
              message: `Server error: ${err}`
          })
      })
})

router.post('/register', isUserInDb, (req, res) => {
    const credentials = req.body;
    if(validate(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 9;
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        credentials.password = hash;
        Users.add(credentials)
          .then(user => {
              res.status(201).json(user);
          })
          .catch(err => {
              res.status(500).json({
                  message: `Server error: ${err}`
              })
          })
    } else {
        res.status(400).json({
            message: 'Unique username and password are required.'
        })
    }
})



module.exports = router;