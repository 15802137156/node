const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config/index')


exports.reguser = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    // return res.send({ status: 1, message: '用户名或密码不合法！' })
    return res.message('用户名或密码不合法！')
  }

  // 查询
  const sqlStr = 'select * from ev_users where username = ?'
  db.query(sqlStr, [username], (err, results) => {

    if (err) {
      // return res.send({ status: 1, message: err.message })
      res.message(err.message)
    }

    if (results.length) {
      // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
      return res.message('用户名被占用，请更换其他用户名！')
    }


    // 调用bcryptjs对密码进行加密
    const psw = bcrypt.hashSync(password, 10)
    // 插入
    const insertStr = 'insert into ev_users set ?'
    const userInfo = {
      password: psw,
      username
    }

    db.query(insertStr, userInfo, (err, results) => {

      if (err) {
        // return res.send({ status: 1, message: err.message })
        return res.message(err)
      }

      if (results.affectedRows !== 1) {
        // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
        return res.message('注册用户失败，请稍后再试！')
      }

      // res.send({ status: 0, message: '注册成功！' })
      res.message('注册成功！', 0)
    })
  })
}

exports.login = (req, res) => {
  const sqlStr = 'select * from ev_users where username = ?'
  const { username, password } = req.body
  db.query(sqlStr, username, (err, results) => {

    if (err) return res.message(err)

    if (results.length !== 1) return res.message('登录失败！')

    // 验证密码
    const compareResult = bcrypt.compareSync(password, results[0].password)
    if (!compareResult) return res.message('登录密码失败！')

    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    res.send({
      status: 0,
      message: '登录成功！',
      token: `Bearer ${tokenStr}`
    })
  })
}
