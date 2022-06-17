let { add, findAll, findOne, update, del } = require("../controller/companies")
const router = require("koa-router")()
router.prefix("/companies")

//发布租户
router.post("/add", add)

//查询所有租户（分页）
router.get("/findAll", findAll)

//查询单个租户
router.get("/findOne", findOne)

//修改租户
router.post("/update", update)

// //查询单个租户(通过Id)
// router.get('/findOneById', findOneById)

// //查询单个租户(通过租户名称)
// router.get('/findOneByName', findOneByName)

// //修改租户(通过Id)
// router.post('/updateById', updateById)

// //修改租户(通过租户名称)
// router.post('/updateByName', updateByName)

//删除租户
router.post("/del", del)

module.exports = router
