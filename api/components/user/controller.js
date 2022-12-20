const { nanoid }= require('nanoid');
const auth = require('../auth');
const TABLA = 'user'

module.exports = function (injectStore) {
  let store = injectStore ? injectStore : require('../../../store/fake')
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
    if(body.password || body.name) {
      await auth.upsert({
        id: user.id,
        name: user.name,
        username: body.username,
        password: body.password
      })
    }

    await store.upsert(TABLA, user)
    return []    
  }
  async function update(body) {
    await store.upsert(TABLA, body, 'update')
    await store.upsert('auth', body, 'update')
    return []
  }

  async function favorite(user, product) {
    await store.upsert( TABLA + '_favorites', {
      products_to: product,
      user_from: user
    })
    return []
  }
  
  async function getFavorites(id) {
    const join = {}
    join['products'] = 'products_to'
    const query = { user_from: id }

    return await store.query(TABLA + '_favorites', query, join)
  }

  return {
    list,
    get,
    upsert,
    update,
    favorite,
    getFavorites
  }
}
