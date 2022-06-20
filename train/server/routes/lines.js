let { findAllCom, findAllStaff } = require("../controller/lines")
const router = require("koa-router")()
router.prefix("/lines")

//查询所有记录（分页）
router.get("/findAllCom", findAllCom)

//查询所有记录（分页）
router.get("/findAllStaff", findAllStaff)

module.exports = router
