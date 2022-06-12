const express = require('./aic-express')

const app = express()

// 路由中间件功能
// 例如：当我访问 / 的时候，需要判断用户权限，如果是某个权限做某件事，最终相应的结果

// const auth = (req, res, next) => {
//   if (req.query.auth === '1') {
//     next()
//   } else {
//     res.end('no auth')
//   }
// }

// app.get('/', auth, (req, res, next) => {
//   res.end('home ok')
// })

// app.get('/login', auth, (req, res, next) => {
//   res.end('login ok')
// })

app.get(
  '/profile',
  (req, res, next) => {
    console.log(1)
    next()
    console.log(2)
  },
  (req, res, next) => {
    console.log(3)
    res.end('ok-get')
  }
)

app.post('/register', (req, res, next) => {
  console.log(5)
  res.end('ok-post')
})

// ! 老的方式 已废弃
// app
//   .route('/')
//   .post((req, res) => {
//     res.end('post')
//   })
//   .get((req, res) => {
//     res.end('get')
//   })

app.listen(3001, () => console.log('3001 server'))
