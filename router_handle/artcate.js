const db = require('../db/index')

exports.getArticleCates = (req, res) => {
  const sqlStr = 'select * from ev_article_cate where is_delete = 0 order by id asc'

  db.query(sqlStr, (err, results) => {
    if (err) return res.message(err)

    res.send({
      status: 0,
      message: 'success',
      data: results
    })
  })
}

exports.addArticleCates = (req, res) => {
  const { name, alias } = req.body
  if (!name) return res.message('请输入名称')
  if (!alias) return res.message('请输入别名')

  const sqlStr = 'select * from ev_article_cate where name = ? or alias = ?'
  db.query(sqlStr, [name, alias], (err, results) => {
    if (err) return res.message(err)
    if (results.length === 2) return res.message('分类名称与别名被占用，请更换后再重试！')
    if (results.length === 1 && results[0].name === name && results[0].alias === alias) return res.message('分类名称与别名被占用，请更换后再重试！')
    if (results.length === 1 && results[0].name === name) return res.message('分类名称被占用，请更换后再重试！')
    if (results.length === 1 && results[0].alias === alias) return res.message('别名被占用，请更换后再重试！')

    const insertStr = 'insert into ev_article_cate set ?'
    db.query(insertStr, req.body, (err, results) => {
      if (err) return res.message(err)
      if (results.affectedRows !== 1) return res.message('新增失败！')
      res.message('新增成功！', 0)
    })
  })
}

exports.deleteArticleCates = (req, res) => {
  const { id } = req.params
  if (!id) return res.message('请输入ID')

  const deleteStr = 'update ev_article_cate set is_delete = 1 where id = ?'
  db.query(deleteStr, id, (err, result) => {
    if (err) return res.message(err)
    if (result.affectedRows !== 1) return res.message('删除失败！')
    res.message('删除成功！', 0)
  })
}

exports.getArtCateById = (req, res) => {
  const { id } = req.params
  if (!id) return res.message('请输入ID')

  const sqlStr = 'select * from ev_article_cate where id = ?'
  db.query(sqlStr, [id], (err, results) => {
    if (err) return res.message(err.message)
    res.send({
      status: 0,
      message: '查询成功！',
      data: results
    })
  })
}
