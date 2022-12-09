const db = {
  'user': [
    {id: '1', name: 'JC'},
    {id: '2', name: 'JuanK'}
  ]
}

async function list(table){
  return db[table]
}

async function get(table, id){
  let filterData = await list(table)
  return filterData.filter(item => item.id === id)[0] || null
}

async function upsert(table, data){
  db[table].push(data)
}

async function remove(table, id){
  return true
}

module.exports = {
  list,
  get,
  upsert,
  remove
}