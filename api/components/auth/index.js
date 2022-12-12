const controller = require('./controller')

//Store who will be injected to the controlled
const store = require('../../../store/mysql')

module.exports = controller(store)