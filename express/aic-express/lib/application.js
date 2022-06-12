const { Router } = require('express')
const http = require('http')

// 应用的功能 就是提供监听方法 收集路由 应用中耦合了路由系统
function Application() {
  this.router = new Router()
}

Application.prototype.get = function (path, handler) {
  this.router.get(path, handler)
}
Application.prototype.listen = function (...args) {
  const server = http.createServer((req, res) => {
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`)
    }

    this.router.handle(req, res, done)
  })
  server.listen(...args)
}

module.exports = Application
