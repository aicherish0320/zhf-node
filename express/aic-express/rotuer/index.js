const url = require('url')

function Router() {
  this.stack = []
}

Router.prototype.get = function (path, handler) {
  this.stack.push({
    method: 'get',
    path,
    handler
  })
}
Router.prototype.handle = function (req, res, done) {
  const { pathname, query } = url.parse(req.url, true)
  const requestMethod = req.method.toLowerCase()

  console.log(this.stack)
  for (let i = 0; i < this.stack.length; i++) {
    const { method, path, handler } = this.stack[i]
    if (path === pathname && method === requestMethod) {
      return handler(req, res)
    }
  }

  done()
}

module.exports = Router
