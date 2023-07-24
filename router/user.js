const express = require('express')

const router = express.Router()

const userHandle = require('../router_handle/user')

// 注册新用户
router.post('/reguser', userHandle.reguser)

// 登录
router.post('/login', userHandle.login)

module.exports = router
