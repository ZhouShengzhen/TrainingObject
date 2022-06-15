let { findAll } = require('../controller/lines')
const router = require('koa-router')()
router.prefix('/lines')

//查询所有文章（分页）
router.get('/findAll', findAll)

module.exports = router
