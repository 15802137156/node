const express = require('express')
const app = express()

// 三部分组成，Header(头部)，Payload(有效荷载)，Signature(签名)
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


const secretKey = 'ruigu No1 ^_^'
// unless用来指定哪些接口不需要访问权限
// 注意：只要配置express-jwt，就可以把解析出来的用户信息挂载到req.user属性上
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))


app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  if (username !== 'admin' || password !== '000000') {
    return res.send({ status: 400, msg: '登录失败' })
  }

  const tokenStr = jwt.sign({ username: username }, secretKey, { expiresIn: '30h' })

  res.send({ status: 200, message: '登录成功', token: tokenStr })
})


// 获取加密后的用户信息
app.get('/admin/getInfo', (req, res) => {
  res.send({ status: 0, message: '获取用户信息', data: req.user })
})


app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({ status: 401, message: '无效token' })
  }

  res.send({ status: 500, message: '未知错误' })
})


const port = 80
app.listen(port, () => {
  console.log(`Serve running on port ${port}`)
})
