const response = require('./response')

function errors(err, req, res, next){
  console.error('[error]', err)

  const message = err.message || err
  const status = err.statusCode || err.message ? 500 : 400
  response.error(req, res, message, status, err)
}

module.exports = errors