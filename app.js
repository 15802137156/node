const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const expressJWT = require('express-jwt')
const config = require('./config/index')

// 一定要在路由之前
// status默认1：表示失败
// err可能是错误对象，也可能是字符串
app.use((req, res, next) => {
  res.message = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 一定要在路由之前
// unless用来指定哪些接口不需要访问权限
// 注意：只要配置express-jwt，就可以把解析出来的用户信息挂载到req.user属性上
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') res.message('身份认证失败！')
  res.message(err)
})


// 注意: 这个中间件只能解析 application/x-www-formurlencoded 格式
app.use(express.urlencoded({ extended: false }))

// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: false }))

const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
const artCateRouter = require('./router/artcate')
const articleRouter = require('./router/article')
app.use('/api', userRouter)
app.use('/my', userinfoRouter)
app.use('/my/article', artCateRouter)
app.use('/my/article', articleRouter)

const port = 3007
app.listen(port, () => {
  console.log(`api serve running at http://127.0.0.1:${port}`)
})
