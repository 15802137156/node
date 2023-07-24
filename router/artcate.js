const express = require('express')

const router = express.Router()

const artcateHandle = require('../router_handle/artcate')

// 文章分类列表
router.get('/cates', artcateHandle.getArticleCates)

router.post('/addcates', artcateHandle.addArticleCates)

router.get('/deletecate/:id', artcateHandle.deleteArticleCates)

router.get('/cates/:id', artcateHandle.getArtCateById)

module.exports = router