const auth = require('../../../auth')
const TABLA = 'auth'

module.exports = function (injectStore) {
  let store = injectStore ? injectStore : require('../../../store/fake')

  async function login(name, password){
    const data = await store.query(TABLA, {name: name})
    if(data.password === password){
      //generar token
      return auth.sign(data)
    } else {
      throw new Error('Invalid info')
    }
  }

  function upsert (data) {
   const authData = {
     id: data.id,
   }
   if (data.name) {
     authData.name = data.name
   }
   if(data.password) {
     authData.password = data.password
   }
   return store.upsert(TABLA, authData)  
  }

  return {
    upsert,
    login
  }
}