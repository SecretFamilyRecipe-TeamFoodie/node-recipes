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

router.post('/login', verifyReq, (req, res) => {
    const { username, password } = req.body;
    if(validate(req.body)) {
        Users.find({ username: username})
          .then(([user]) => {
              if(user && bcryptjs.compareSync(password, user.password)) {
                  const token = makeToken(user);
                  const userObj = {
                      user_id: user.user_id,
                      username: user.username
                    }
                  res.status(200).json({ user: userObj, token: token })
              } else {
                  res.status(401).json({
                      message: 'Incorrect username or password'
                  })
              }
          })
          .catch(err => {
              res.status(500).json({
                  message: err.message
              })
          })
    } else {
        res.status(400).json({
            message: 'Username and password required'
        })
    }
})

function makeToken(user) {
    const payload = {
        subject: user.user_id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, jwtSecret, options)
}



module.exports = router;