const url = require('url')
const Layer = require('./Layer')
const Route = require('./Route')

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
// 向路由的 stack 中添加
Router.prototype.get = function (path, handlers) {
  // 要创建一个 layer 还有创建一个 route 要将 layer.route = route
  // 创建 route 并返回 route
  const route = this.route(path)
  route.get(handlers)

  // this.stack.push({
  //   method: 'get',
  //   path,
  //   handler
  // })
}
// 请求到来时，会匹配对应的路由
Router.prototype.handle = function (req, res, done) {
  // const { pathname, query } = url.parse(req.url, true)
  // const requestMethod = req.method.toLowerCase()
  // console.log(this.stack)
  // for (let i = 0; i < this.stack.length; i++) {
  //   const { method, path, handler } = this.stack[i]
  //   if (path === pathname && method === requestMethod) {
  //     return handler(req, res)
  //   }
  // }
  // // 如果匹配不到则调用应用提供的 done 方法
  // done()
}

module.exports = Router
