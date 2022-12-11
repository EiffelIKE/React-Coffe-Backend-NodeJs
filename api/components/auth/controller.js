const auth = require('../../../auth')
const bcrypt = require('bcrypt')
const TABLA = 'auth'
const error = require('../../../utils/error')

module.exports = function (injectStore) {
  let store = injectStore ? injectStore : require('../../../store/fake')

  async function login(name, password){
    const data = await store.query(TABLA, {name: name})
    if (!data){
      throw error('Invalid user', 400)
    }
    return bcrypt.compare(password, data.password)
      .then(match => {
        if(match){
          return auth.sign(data)
        } else {
          throw error('Invalid info', 400)
        }
      }) 
   
  }

  async function upsert (data) {
   const authData = {
    id: data.id,
   }
   if (data.name) {
    authData.name = data.name
   }
   if(data.password) {
    authData.password = await bcrypt.hash(data.password, 5)
   }
   return store.upsert(TABLA, authData)  
  }

  return {
    upsert,
    login
  }
}