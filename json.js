const express = require('express')
const app = express()

const parser = require('body-parser')

// 解析表单中的JSON格式
app.use(express.json())

// 解析表单中的urlencoded格式数据
app.use(express.urlencoded({ extended: true }))

// 第三方中间件（解析表单中的urlencoded格式数据）
app.use(parser.urlencoded({ extended: true }))

app.post('/user', (req, res) => {
  console.log('body', req.body)
  res.send('ok')
})

const port = 80

app.listen(port, () => {
  console.log(`Serve running on port ${port}`)
})
