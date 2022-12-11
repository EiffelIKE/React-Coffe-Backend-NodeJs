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
    let dataValues = Object.values(data)  //Data isnt a plain object
    let fixData = {
      id: dataValues[0],
      name: dataValues[1],
      username: dataValues[2],
      password: dataValues[3]
    }
    return bcrypt.compare(password, dataValues[3])
      .then(match => {
        if(match){
          return auth.sign(fixData)
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
   if(data.username) {
    authData.username = data.username
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