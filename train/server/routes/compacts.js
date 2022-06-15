const { add, findOne } = require('../controller/compacts')
const router = require('koa-router')()

router.prefix('/compacts')

// 添加合同
router.post('/add', add)

// 查询单个合同(根据合同id)
router.get('/findOne', findOne)

module.exports = router
