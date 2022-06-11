const Koa = require('koa')
const Router = require('@koa/router')
const querystring = require('querystring')
const crypto = require('crypto') // hs256

const app = new Koa()

const secret = 'aic_sign'

const toBase64URL = (str) => {
  return str.replace(/\=/g, '').replace(/\+/g, '-').replace(/\//, '_')
}

// 中间件
app.use(async (ctx, next) => {
  const cookies = []
  ctx.my = {
    set(key, value, options = {}) {
      const optsArr = []

      if (options.httpOnly) {
        optsArr.push(`httpOnly=${options.httpOnly}`)
      }
      if (options.maxAge) {
        optsArr.push(`max-age=${options.maxAge}`)
      }

      if (options.signed) {
        // 说明为了安全 需要给数据签名
        // base64 在传输的时候，会把 + / = 做特殊处理
        const sign = toBase64URL(
          crypto
            .createHmac('sha1', secret)
            .update([key, value].join('='))
            .digest('base64')
        )
        cookies.push(`foo.sign=${sign}`)
      }

      cookies.push(`${key}=${value}; ${optsArr.join('; ')}`)
      ctx.res.setHeader('Set-Cookie', cookies)
    },
    get(key, options) {
      const cookieObj = querystring.parse(ctx.req.headers['cookie'], '; ') // a=1;b=2
      if (options.signed) {
        // 上一次的签名
        if (
          cookieObj[`${key}.sign`] ===
          toBase64URL(
            crypto
              .createHmac('sha1', secret)
              .update(`${key}=${cookieObj[key]}`)
              .digest('base64')
          )
        ) {
          return cookieObj[key]
        } else {
          return ''
        }
      }
      return ''
    }
  }
  return next()
})

const router = new Router()

// 浏览器获取 cookie ，document.cookie
// domain 域名 path 路径
// 存活时间 expires（过期时间）  max-age（有效期） httpOnly
router.get('/write', async (ctx) => {
  // ctx.res.setHeader('Set-Cookie', ['foo=foo1;httpOnly=true'])
  // ctx.res.setHeader('Set-Cookie', ['foo=foo2;httpOnly=true'])

  // 自己封装设置 cookie
  ctx.my.set('foo', 'foo', {
    httpOnly: true,
    maxAge: 1000,
    signed: true
  })
  // ctx.my.set('foo', 'baz', {
  //   httpOnly: true
  // })

  ctx.body = 'ok'
})

router.get('/read', async (ctx) => {
  // ctx.body = ctx.req.headers['cookie'] || 'No Cookie'
  ctx.body = ctx.my.get('foo', { signed: true })
})

// allowedMethods 如果当前请求不支持的话，会报一个信息 Method Not Allowed
app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => console.log('server start 3001'))

/**
 为什么使用 cdn，cdn是一个特殊的域名，不会发送 cookie

 xsrf 诱导用户点击一个图片，发送请求通过 url 把你本地的 cookie 传递给他自己的服务器
 通过 document.cookie 获取你的 cookie

 我们需要给 cookie 加盐，防止用户更改 cookie 中的数据
 */
