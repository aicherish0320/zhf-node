/*
  主流的方案都是 token，JSON WEN TOKEN（通过令牌来识别身份），session共享不方便
  非常像 cookie 的签名，服务器只存一个秘钥（我们只是为了鉴别用户的身份，获取用户登录状态）

  最终开发会使用 jsonwebtoken 功能强大，默认支持一些令牌的过期处理
  先使用 jwt 掌握令牌如何生成
*/

const Koa = require('koa')
const Router = require('@koa/router')
const crypto = require('crypto')
// const jwt = require('jwt-simple')

const app = new Koa()

const router = new Router()

const secret = 'aicherish'

const jwt = {
  sign(content, secret) {
    return this.toBase64URL(
      crypto.createHmac('sha256', secret).update(content).digest('base64')
    )
  },
  toBase64(content) {
    return this.toBase64URL(
      // 转成 base64
      Buffer.from(JSON.stringify(content)).toString('base64')
    )
  },
  base64UrlUnescape(str) {
    str += new Array(5 - (str.length % 4)).join('=')
    return str.replace(/-/g, '+').replace(/_/g, '/')
  },
  toBase64URL(str) {
    return str.replace(/\=/g, '').replace(/\+/g, '-').replace(/\//, '_')
  },
  encode(info, secret) {
    const head = this.toBase64({ typ: 'jwt', alg: 'HS256' })
    const content = this.toBase64(info)
    const sign = this.sign([head, content].join('.'), secret)
    return head + '.' + content + '.' + sign
  },
  decode(token, secret) {
    const [head, content, sign] = token.split('.')
    const newSign = this.sign([head, content].join('.'), secret)
    if (newSign === sign) {
      return JSON.parse(
        Buffer.from(this.base64UrlUnescape(content), 'base64').toString()
      )
    } else {
      throw new Error('token 有误')
    }
  }
}

router.post('/login', async (ctx) => {
  let user = { id: 100, username: 'jack' }

  // 生成令牌的数据不要太多，一般情况下用用户的 id 就可以了
  const token = jwt.encode(user, secret)
  ctx.body = {
    status: 0,
    data: {
      token
    }
  }
})

router.get('/validate', async (ctx) => {
  try {
    const user = jwt.decode(ctx.get('Authorization').split(' ')[1], secret)
    ctx.body = {
      status: 0,
      data: {
        user
      }
    }
  } catch (error) {
    ctx.body = {
      status: -1,
      message: 'token 验证失败',
      data: {}
    }
  }
})

// allowedMethods 如果当前请求不支持的话，会报一个信息 Method Not Allowed
app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => console.log('server start 3001'))
