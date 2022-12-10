const store = require('../../../store/fake')

const TABLA = 'user'

function list () {
  return store.list(TABLA)
}

module.exports = {
  list
}