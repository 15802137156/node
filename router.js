const express = require('express')

const router = express.Router()

router.get('/user/list', (req, res) => {
  const { query } = req

  res.send({
    status: 0,
    message: '请求成功',
    data: query
  })
})

router.post('/user/add', (req, res) => {
  const { body } = req
  res.send({
    status: 0,
    message: '请求成功',
    data:  body
  })
})

module.exports = router
