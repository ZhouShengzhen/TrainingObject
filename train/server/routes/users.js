const { login, reg, verify } = require("../controller/users")
const router = require("koa-router")()

router.prefix("/users")

// 管理员登陆
router.post("/login", login)

// 管理员注册
router.post("/reg", reg)

//验证用户登录
router.get("/verify", verify)

module.exports = router
