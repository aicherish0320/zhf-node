const Koa = require('koa')
const Router = require('@koa/router')
const uuid = require('uuid')
const session = require('koa-session')

const app = new Koa()

const secret = 'aicherish0320_secret'
app.keys = [secret] // 提供 cookie 用于签名的秘钥

const config = {
  key: 'koa.sess',
  signed: true
}
app.use(session(config, app))

const router = new Router()

// ! 自己实现
// 店铺名称
// const cardName = 'aicherish'
// const session = {} // session 就是一个服务器记账的本子，为了稍后能通过这个本找到具体信息
// router.get('/wash', async (ctx) => {
//   const hasVisit = ctx.cookies.get(cardName)
//   // 必须保证 之前来过
//   if (hasVisit && session[hasVisit]) {
//     session[hasVisit].money -= 100
//     ctx.body = 'handle'
//   } else {
//     const id = uuid.v4()
//     session[id] = { money: 500 }
//     ctx.cookies.set(cardName, id, { signed: true })
//     ctx.body = 'ok'
//   }
// })
// ! koa 自带
router.get('/wash', async (ctx) => {
  let n = ctx.session.views || 0
  ctx.session.views = ++n
  ctx.body = n + ' views'
})

// allowedMethods 如果当前请求不支持的话，会报一个信息 Method Not Allowed
app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => console.log('server start 3001'))

/**
 ssr 前后端同构的时候，用 session 来实现用户鉴别是最方便的
 */
