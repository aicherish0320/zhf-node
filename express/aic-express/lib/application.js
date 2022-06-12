const http = require('http')
// 第三方模块 express 中自带这个模块
const methods = require('methods')
// 引入路由系统
const Router = require('../router')

// 应用的功能 就是提供监听方法 收集路由 应用中耦合了路由系统
// 每个应用默认创建一个路由系统
function Application() {}
// 应用的路由懒加载
Application.prototype.lazyRoute = function () {
  if (!this.router) {
    this.router = new Router()
  }
}
methods.forEach((m) => {
  Application.prototype[m] = function (path, ...handlers) {
    this.lazyRoute()
    // 向路由系统中添加
    this.router[m](path, handlers)
  }
})

// app.listener
Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
    this.lazyRoute()
    // 交给路由系统处理，路由系统处理不了 会调用 done 方法
    this.router.handle(req, res, done)
  })
  server.listen(...args)
}

module.exports = Application
