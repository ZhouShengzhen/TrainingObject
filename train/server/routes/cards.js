let { add, update, del } = require("../controller/cards")
const router = require("koa-router")()
router.prefix("/cards")

//发布文章
router.post("/add", add)

//修改文章
router.post("/update", update)

//删除文章
router.post("/del", del)

module.exports = router
