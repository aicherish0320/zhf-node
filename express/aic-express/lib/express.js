const http = require('http')
const url = require('url')

const routes = [
  {
    method: 'all',
    path: '*',
    handler(req, res) {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
  }
]

function createApplication() {
  return {
    get(path, handler) {
      routes.push({
        method: 'get',
        path,
        handler
      })
    },
    listen(...args) {
      const server = http.createServer((req, res) => {
        const { pathname, query } = url.parse(req.url, true)
        const requestMethod = req.method.toLowerCase()

        for (let i = 0; i < routes.length; i++) {
          const { method, path, handler } = routes[i]
          if (path === pathname && method === requestMethod) {
            return handler(req, res)
          }
        }
        return routes[0].handler(req, res)
      })
      server.listen(...args)
    }
  }
}

module.exports = createApplication
