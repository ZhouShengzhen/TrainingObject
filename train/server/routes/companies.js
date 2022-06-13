let { add, findAll, findOne, update, del } = require('../controller/companies')
const router = require('koa-router')()
router.prefix('/companies')

//发布文章
router.post('/add', add)

//查询所有文章（分页）
router.get('/findAll', findAll)

//查询单个文章
router.get('/findOne', findOne)

//修改文章
router.post('/update', update)

// //查询单个文章(通过Id)
// router.get('/findOneById', findOneById)

// //查询单个文章(通过租户名称)
// router.get('/findOneByName', findOneByName)

// //修改文章(通过Id)
// router.post('/updateById', updateById)

// //修改文章(通过租户名称)
// router.post('/updateByName', updateByName)

//删除文章
router.post('/del', del)

module.exports = router
