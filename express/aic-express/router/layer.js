function Layer(path, handler) {
  this.path = path
  this.handler = handler
}

Layer.prototype.match = function (pathname) {
  return this.path === pathname
}

Layer.prototype.handleRequest = function (req, res, next) {
  return this.handler(req, res, next)
}

module.exports = Layer
