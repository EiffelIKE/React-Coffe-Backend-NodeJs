const controller = require('./controller')

//Store who will be injected to the controlled
const store = require('../../../store/fake')

module.exports = controller(store)