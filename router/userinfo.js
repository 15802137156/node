const express = require('express')

const router = express.Router()

const userinfoHandle = require('../router_handle/userinfo')

// 获取用户信息
router.get('/userinfo', userinfoHandle.userinfo)

// 更新用户信息
router.post('/userinfo', userinfoHandle.updateUserinfo)

// 更新密码
router.post('/updatepwd', userinfoHandle.updatePassword)

// 更新头像
router.post('/update/avatar', userinfoHandle.updateAvatar)

module.exports = router