const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.userinfo = (req, res) => {
  const sqlStr = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
  db.query(sqlStr, req.user.id, (err, results) => {
    if (err) return res.message(err)
    if (results.length !== 1) return res.message('获取用户信息失败！')

    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results[0]
    })
  })
}

exports.updateUserinfo = (req, res) => {
  const { id, nickname, email } = req.body

  if (!id) return res.message('请输入ID')
  if (!nickname) return res.message('请输入用户名称')

  const updateStr = 'update ev_users set ? where id = ?'
  db.query(updateStr, [req.body, id], (err, results) => {
    if (err) return res.message(err)
    if (results.affectedRows !== 1) return res.message('修改用户信息失败！')
    res.message('更新用户信息成功！', 0)
  })
}

exports.updatePassword = (req, res) => {
  const { oldPwd, newPwd } = req.body

  if (!oldPwd) return res.message('请输入旧密码！')
  if (!newPwd) return res.message('请输入新密码！')

  const sqlStr = 'select * from ev_users where id = ?'
  db.query(sqlStr, req.user.id, (err, results) => {
    if (err) return res.message(err)
    if (results.length !== 1) return res.message('用户不存在！')

    const compareResult = bcrypt.compareSync(oldPwd, results[0].password)
    if (!compareResult) return res.message('原密码错误！')

    const psw = bcrypt.hashSync(newPwd, 10)

    const updateStr = 'update ev_users set password = ? where id = ?'
    db.query(updateStr, [psw, req.user.id], (err, results) => {
      if (err) return res.message(err)
      if (results.affectedRows !== 1) return res.message('更新密码错误！')
      res.message('更新密码成功！', 0)
    })
  })
}

exports.updateAvatar = (req, res) => {
  const { avatar } = req.body
  if (!avatar) return res.message('请上传头像！')
  
  const updateStr = 'update ev_users set user_pic = ? where id = ?'
  db.query(updateStr, [avatar, req.user.id], (err, results) => {
    if (err) return res.message(err)
    if (results.affectedRows !== 1) return res.message('更新头像失败！')
    res.message('更新头像成功！', 0)
  })
}
