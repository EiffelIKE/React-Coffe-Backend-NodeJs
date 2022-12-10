const jwt = require('jsonwebtoken')
const {secret} = require('../config').jwt

function sign(data) {
 return jwt.sign(data, secret)
}

const check = {
  own: function (req, owner){
    const decodedToken = decodeHeader(req)
    console.log(decodedToken)

    //TEst
    if(decodedToken.id !== owner) {
      throw new Error('Invalid operation')
    }
  }
}

function verify(token) {
  return jwt.verify(token, secret)
}

function getToken(auth) {
  if(!auth) {
    throw new Error('No token')
  }
  if(auth.indexOf('Bearer ') === -1){
    throw new Error('Invalid format') 
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