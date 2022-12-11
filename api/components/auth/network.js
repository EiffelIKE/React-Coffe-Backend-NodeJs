const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

// CRUD Routes
// router.get('/', list)
// router.get('/:id', get)
router.post('/login', upsert)
// router.put('/', upsert)

function upsert(req, res, next){
  controller.login(req.body.name, req.body.password)
    .then(token => {
      response.success(req, res, token, 200)
    })
    .catch(next)
}

module.exports = router