const url = require('url')
const Layer = require('./Layer')
const Route = require('./Route')
const methods = require('methods')

function Router() {
  this.stack = []
}
Router.prototype.route = function (path) {
  const route = new Route()
  const layer = new Layer(path, route.dispatch.bind(route))
  layer.route = route
  this.stack.push(layer)
  return route
}

methods.forEach((m) => {
  // 向路由的 stack 中添加
  Router.prototype[m] = function (path, handlers) {
    // 要创建一个 layer 还有创建一个 route 要将 layer.route = route
    // 创建 route 并返回 route
    const route = this.route(path)
    route[m](handlers)

    // this.stack.push({
    //   method: 'get',
    //   path,
    //   handler
    // })
  }
})

// 请求到来时，会匹配对应的路由
Router.prototype.handle = function (req, res, done) {
  // 要在路由的栈中查找，找不到就找下一个，找到了将下一个的执行权限传递进去
  const { pathname } = url.parse(req.url)
  const method = req.method.toLowerCase()
  let i = 0
  const next = () => {
    // 整个栈都筛了一遍没有找到，交给应用来处理
    if (i === this.stack.length) return done
    const layer = this.stack[i++]
    if (layer.match(pathname)) {
      if (layer.route.methods[method]) {
        // route.dispatch
        layer.handleRequest(req, res, next)
      } else {
        next()
      }
    } else {
      next()
    }
  }
  next()
}

module.exports = Router
