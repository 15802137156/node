const express = require('express')

const router = express.Router()

const articleHandle = require('../router_handle/article')

router.post('/add', articleHandle.addArtCates)

module.exports = router