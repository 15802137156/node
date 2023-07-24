const express = require('express')
const app = express()

// 中间件
app.use((req, res, next) => {
  next()
})

app.get('/', (req, res) => {
  res.send('Home page')
})

app.get('/user/home', (req, res) => {
  res.send('user page')
})

const port = 80

app.listen(port, () => {
  console.log(`Serve running on port ${port}`)
})
