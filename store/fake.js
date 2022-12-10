const db = {
  'user': [
    {id: '1', name: 'JC'},
    {id: '2', name: 'JuanK'}
  ]
}

async function list(table){
  return db[table] || []
}

async function get(table, id){
  let filterData = await list(table)
  return filterData.filter(item => item.id === id)[0] || null
}

async function upsert(table, data){
  db[table] = db[table] ? db[table] : []
  db[table].push(data)
  console.log(db[table])
}

async function remove(table, id){
  return true
}

async function query( table, qry){
  let filterData = await list(table)
  
  let key = Object.keys(qry)[0]
  return filterData.filter(item => item[key] === qry[key])[0] || null
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query
}