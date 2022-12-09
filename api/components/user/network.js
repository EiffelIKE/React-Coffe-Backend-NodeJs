const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', function (req, res){
  const list = controller.list()
  response.success(req, res, list, 200)
})

module.exports = router