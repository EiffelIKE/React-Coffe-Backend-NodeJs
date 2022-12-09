const { nanoid }= require('nanoid')

const TABLA = 'user'

module.exports = function (injectStore) {
  let store = injectStore ? injectStore : require('../../../store/fake');

  function list() {
    return store.list(TABLA)
  }

  function get(id){
    return store.get(TABLA, id)
  }

  function upsert(body){
    const user = {
      name: body.name,
      id: body.id ? body.id : nanoid()
    }
    return store.upsert(TABLA, user)    
  }

  return {
    list,
    get,
    upsert
  }
}
