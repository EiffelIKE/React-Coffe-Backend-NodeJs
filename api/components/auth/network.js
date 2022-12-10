const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

// CRUD Routes
// router.get('/', list)
// router.get('/:id', get)
router.post('/login', upsert)
// router.put('/', upsert)

function upsert(req, res){
  controller.login(req.body.name, req.body.password)
    .then(token => {
      response.success(req, res, token, 200)
    })
    .catch(err => {
      response.error(req, res, 'Invalid info', 400, err)
    })
}

module.exports = router