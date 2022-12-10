const { nanoid }= require('nanoid');
const auth = require('../auth');

const TABLA = 'user'

module.exports = function (injectStore) {
  let store = injectStore ? injectStore : require('../../../store/fake');

  function list() {
    return store.list(TABLA)
  }

  function get(id){
    return store.get(TABLA, id)
  }

 async function upsert(body){
    const user = {
      name: body.name,
      username: body.username,
      id: body.id ? body.id : nanoid()
    }
    if(body.password || body.username) {
      await auth.upsert({
        id: user.id,
        name: user.name,
        password: body.password
      })
    }

    return store.upsert(TABLA, user)    
  }

  return {
    list,
    get,
    upsert
  }
}
