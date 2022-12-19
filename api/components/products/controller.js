const TABLA = 'products'

module.exports = function (injectStore) {
  let store = injectStore ? injectStore : require('../../../store/fake')
  function list() {
    return store.list(TABLA)
  }

  function get(id){
    return store.get(TABLA, id)
  }

  return {
    list,
    get,
  }
}
