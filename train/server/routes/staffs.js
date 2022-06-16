const { add, findAll, findOne } = require("../controller/staffs")
const router = require("koa-router")()

router.prefix("/staffs")

//添加
router.post("/add", add)

//查询所有员工（分页）
router.get("/findAll", findAll)

//查询所有员工（分页）
router.get("/findOne", findOne)

module.exports = router
