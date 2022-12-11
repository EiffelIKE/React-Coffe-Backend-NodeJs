const jwt = require('jsonwebtoken')
const {secret} = require('../config').jwt
const error = require('../utils/error')

function sign(data) {
 return jwt.sign(data, secret)
}

const check = {
  own: function (req, owner){
    const decodedToken = decodeHeader(req)
    console.log(decodedToken)
    //TEst id owner vs id token 
    if(decodedToken.id !== owner) {
      throw error('Invalid operation', 401)
    }
  }
}

function verify(token) {
  return jwt.verify(token, secret)
}

function getToken(auth) {
  if(!auth) {
    throw error('No token', 400)
  }
  if(auth.indexOf('Bearer ') === -1){
    throw error('Invalid format', 400) 
  }
  console.log(auth)
  let token = auth.replace('Bearer ','')
  return token
}

function decodeHeader(req) {
  const {authorization} = req.headers || ''
  const token = getToken(authorization)
  const decoded = verify(token)

  req.user = decoded

  return decoded
}

module.exports = {
  sign,
  check
}