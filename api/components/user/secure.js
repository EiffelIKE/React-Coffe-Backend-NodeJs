const auth = require('../../../auth')

//Auth permissions middleware
module.exports = function checkAuth(action) {

  function middeware(req, res, next) {
    switch(action){
      case 'update':
        const owner = req.body.id
        auth.check.own(req,owner)
        next()
        break
      default:
        next()  
    }
  }

  return middeware
}