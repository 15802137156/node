const mysql = require('mysql')

// 连接MySQL
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'shuai306626',
  database: 'my-db-01'
})


// 查询
const sqlStr = 'select * from users'
db.query(sqlStr, (err, result) => {
  if (err) return console.log(err.message)
  // 注意：如何执行select查询语句，则执行结果是数组
  console.log('result', result)
})


// 插入（逐个）
// const user = { username: 'spider', password: 'pcc123' }
// const insertStr = 'insert into users (username, password) values (?, ?)'
// db.query(insertStr, [user.username, user.password], (err, result) => {
//   if (err) return console.log(err.message)
//   // 注意：如何执行insert语句，则执行结果是对象
//   if (result.affectedRows === 1) {
//     console.log('数据插入成功')
//   }
// })


// 插入（批量）
// const user = { username: 'mick', password: 'mick123' }
// const insertStr = 'insert into users set ?'
// db.query(insertStr, user, (err, result) => {
//   if (err) return console.log(err.message)
//   // 注意：如何执行insert语句，则执行结果是对象
//   if (result.affectedRows === 1) {
//     console.log('数据插入成功')
//   }
// })


// 更新（逐个）
// const user = { id: 6, username: 'update', password: 'upd123' }
// const updateStr = 'update users set username = ?, password = ? where id = ?'
// db.query(updateStr, [user.username, user.password, user.id], (err, result) => {
//   if (err) return console.log(err.message)
//   if (result.affectedRows === 1) {
//     console.log('更新数据')
//   }
// })


// 更新（批量）
// const user = { id: 7, username: 'batch', password: 'batch123' }
// const updateStr = 'update users set ? where id = ?'
// db.query(updateStr, [user, user.id], (err, result) => {
//   if (err) return console.log(err.message)
//   if (result.affectedRows === 1) {
//     console.log('更新数据')
//   }
// })


// 删除（整体）
// const deleteStr = 'delete from users where id = ?'
// db.query(deleteStr, 5, (err, result) => {
//   if (err) return console.log(err.message)
//   if (result.affectedRows === 1) {
//     console.log('删除数据成功')
//   }
// })


// 删除（标记）
// const deleteStr = 'update users set status = ? where id = ?'
// db.query(deleteStr, [1, 6], (err, result) => {
//   if (err) return console.log(err.message)
//   if (result.affectedRows === 1) {
//     console.log('标记删除')
//   }
// })
