const http = require('http')
// 引入路由系统
const Router = require('../router')

// 应用的功能 就是提供监听方法 收集路由 应用中耦合了路由系统
// 每个应用默认创建一个路由系统
function Application() {
  this.router = new Router()
}
// app.get()
Application.prototype.get = function (path, handler) {
  // 向路由系统中添加
  this.router.get(path, handler)
}
// app.listener
Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    // 交给路由系统处理，路由系统处理不了 会调用 done 方法
    this.router.handle(req, res, done)
  })
  server.listen(...args)
}

module.exports = Application
