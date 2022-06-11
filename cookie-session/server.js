const Koa = require('koa')
const Router = require('@koa/router')

const app = new Koa()

const router = new Router()

// 浏览器获取 cookie ，document.cookie
// domain 域名 path 路径
// 存活时间 expires（过期时间）  max-age（有效期） httpOnly
router.get('/write', async (ctx) => {
  // ctx.res.setHeader('Set-Cookie', ['foo=foo;httpOnly=true', 'bar=bar;'])

  ctx.body = 'ok'
})

router.get('/read', async (ctx) => {
  ctx.body = ctx.req.headers['cookie'] || 'No Cookie'
})

// allowedMethods 如果当前请求不支持的话，会报一个信息 Method Not Allowed
app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => console.log('server start 3001'))

/**
 为什么使用 cdn，cdn是一个特殊的域名，不会发送 cookie

 xsrf 诱导用户点击一个图片，发送请求通过 url 把你本地的 cookie 传递给他自己的服务器
 通过 document.cookie 获取你的 cookie
 */
