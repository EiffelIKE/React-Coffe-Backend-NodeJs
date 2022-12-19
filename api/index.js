const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config')
const user = require('./components/user/network')
const auth = require('./components/auth/network')
const products = require('./components/products/network')
const errors = require('../network/errors')

const app = express()

app.use(bodyParser.json())
//Router
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/products', products)

app.use(errors)

app.listen(config.api.port, () => {
  console.log('[API] Running on port ',config.api.port)
})
