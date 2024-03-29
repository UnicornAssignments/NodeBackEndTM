const sql = require('mssql')
const config = {
    user: 'jayashan',
    password:"123",
    server: 'localhost', 
    database: 'TimeTableDB' 
}

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}