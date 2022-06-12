const express = require('express')

// express 创建应用时通过 express() 来创建的
const app = express()
// express 解决了 原生 http 需要针对不同的条件做处理
app.get('/', (req, res) => {
  res.end('home api')
})

app.get('/hello', (req, res) => {
  res.end('hello api')
})

app.all('*', (req, res) => {
  res.statusCode = 404
  res.end('Not Found')
})

app.listen(3001, () => console.log('3001 port'))
