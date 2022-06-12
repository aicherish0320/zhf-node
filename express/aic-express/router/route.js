const Layer = require('./Layer')

function Route() {
  this.stack = []
}

Route.prototype.dispatch = function () {}
Route.prototype.get = function (handlers) {
  handlers.forEach((handler) => {
    const layer = new Layer('', handler)
    // 给每一层都添加一个方法
    layer.method = 'get'
    this.stack.push(layer)
  })
}

module.exports = Route
