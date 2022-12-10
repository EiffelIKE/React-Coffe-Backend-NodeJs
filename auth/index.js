const jwt = require('jsonwebtoken')

function sign(data) {
 return jwt.sign(data, process.env.AUTH_SECRET)
}

module.exports = {
  sign
}