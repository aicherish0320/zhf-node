const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()

const secret = 'aicherish0320_secret'
app.keys = [secret] // 提供 cookie 用于签名的秘钥

const router = new Router()

router.get('/write', async (ctx) => {
  ctx.cookies.set('bar', 'bar', {
    signed: true,
    maxAge: 60000
  })

  ctx.body = 'ok'
})

router.get('/read', async (ctx) => {
  ctx.body = ctx.cookies.get('bar', { signed: true }) || 'empty'
})

// allowedMethods 如果当前请求不支持的话，会报一个信息 Method Not Allowed
app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => console.log('server start 3001'))
