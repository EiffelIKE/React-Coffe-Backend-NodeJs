const db = {
  'user': [
    {id: 1, name: 'JC'}
  ]
}

function list(table){
  return db[table]
}

function get(table, id){
  let filterData = list(table)
  return filterData.filter(item => item.id === id)[0] || null
}

function upsert(table, data){
  db[table].push(data)
}

function remove(table, id){
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}