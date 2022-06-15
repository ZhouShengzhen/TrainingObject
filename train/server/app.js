const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const MongoConnect = require('./db')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')

const index = require('./routes/index')
const companies = require('./routes/companies')
const admins = require('./routes/admins')
const upload = require('./routes/upload')
const compacts = require('./routes/compacts')
const lines = require('./routes/lines')

// error handler
onerror(app)
MongoConnect()

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(cors())
app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)
app.use(
  koajwt({
    secret: 'train-server-jwt'
  }).unless({
    path: [/^\/admins\/login/, /^\/admins\/reg/]
  })
)
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(companies.routes(), companies.allowedMethods())
app.use(admins.routes(), admins.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(compacts.routes(), compacts.allowedMethods())
app.use(lines.routes(), lines.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
