const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: true }))

// 一定要在cors之前配置jsonp
app.get('/api/jsonp', (req, res) => {
  // 1，获取客户端发送过来的回调函数的名字
  const funcName = req.query.callback
  // 2，得到要通过 JSONP 形式发送给客户端的数据
  const data = { name: 'zs', age: 22 }
  // 3，根据前两步得到的数据，拼接出一个函数调用的字符串
  const scriptStr = `${funcName}(${JSON.stringify(data)})`
  // 4，把上一步拼接得到的字符串，响应给客户端的 <script> 标签进行解析执行
  res .send(scriptStr)
})

// 一定要在router之前配置cors
const cors = require('cors')
app.use(cors())

const router = require('./router')
app.use('/api', router)

app.get('/user', (req, res) => {
  // query 查询参数
  // params 动态匹配到的URL参数
  const { query, params } = req

  console.log(query, params)

  res.send({ name: '张三', age: 20, sex: '男' })
})

app.post('/user', (req, res) => {
  res.send('请求成功')
})

const port = 80

app.listen(port, () => {
  console.log(`Serve running on port ${port}`)
})
