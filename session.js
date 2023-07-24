const session = require('express-session')
const express = require('express')
const app = express()

app.use(session({
  secret: 'keyboard',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: false }))


app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  if (username !== 'admin' || password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }
  // 只有配置express-session后，才能使用
  req.session.user = req.body
  req.session.isLogin = true

  res.send({ status: 0, msg: '登录成功' })
})


app.get('/api/username', (req, res) => {
  const { isLogin, user } = req.session
  if (!isLogin) {
    return res.send({ status: 1, msg: 'fail' })
  }

  res.send({ status: 0, msg: 'success', username: user.username })
})


app.post('/api/logout', (req, res) => {
  req.session.destroy()

  res.send({ status: 0, msg: '退出登录成功' })
})


app.listen(80, () => {
  console.log('Express server running at http://127.0.0.1')
})
