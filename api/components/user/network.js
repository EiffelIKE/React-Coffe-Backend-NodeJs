const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

// CRUD Routes
router.get('/', list)
router.get('/:id/getfavorites', getFavorites)
router.get('/:id', get)
router.post('/', upsert)
router.post('/favorite/:id', secure('favorite'), favorite)
router.put('/', secure('update'), update)


//Internal fx()
function list (req, res, next){
  controller.list()
    .then((list) => {
      response.success(req, res, list, 200)
    })
    .catch(next)
  
}

function get (req, res, next){
  controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)  
}

function upsert (req, res, next){
  controller.upsert(req.body)
    .then( user => {
      response.success(req, res, user, 201)
    })
    .catch(next)
}

function update (req, res, next) {
  controller.update(req.body)
  .then( user => {
    response.success(req, res, user, 201)
  })
  .catch(next)
}

function favorite (req, res, next) {
  controller.favorite(req.user.id, req.params.id)
    .then( data => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function getFavorites (req, res, next) {

return controller.getFavorites(req.params.id)
  .then( data => {
    return response.success(req, res, data, 200)
  })
  .catch(next)
}

module.exports = router