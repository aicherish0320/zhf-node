const Layer = require('./Layer')
const methods = require('methods')

function Route() {
  this.stack = []
  // 用来标识 route 上包含哪些方法
  this.methods = {}
}

Route.prototype.dispatch = function (req, res, out) {
  let i = 0
  const next = () => {
    if (i === this.stack.length) return out()
    let layer = this.stack[i++]
    if (layer.method === req.method.toLowerCase()) {
      // 用户注册的回调
      layer.handler(req, res, next)
    } else {
      next()
    }
  }

  next()
}

methods.forEach((m) => {
  Route.prototype[m] = function (handlers) {
    handlers.forEach((handler) => {
      const layer = new Layer('', handler)
      // 给每一层都添加一个方法
      layer.method = m
      this.methods[m] = true
      this.stack.push(layer)
    })
  }
})

module.exports = Route
