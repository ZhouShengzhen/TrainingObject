const { login, reg, verify, updatePwd } = require('../controller/admins')
const router = require('koa-router')()

router.prefix('/admins')

// 管理员登陆
router.post('/login', login)

// 管理员注册
router.post('/reg', reg)

//验证用户登录
router.get('/verify', verify)

//修改密码
router.post('/update', updatePwd)

module.exports = router
