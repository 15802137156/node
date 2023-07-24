const mysql = require('mysql')

// 连接MySQL
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'shuai306626',
  database: 'my-db-01'
})

module.exports = db
