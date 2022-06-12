# Express

## Express vs Koa

- express 处理请求的时候全部采用回调函数的方式，koa 采用的是 promise + async/await
- express 采用的是 ES5 的语法，koa 采用的是 ES6 编写的
- express 比 koa 功能多（多了一些内置的中间件，路由、静态服务、模板渲染），代码体积比 Koa 多
- koa 中为了扩展采用的是 ctx 上下文，扩展了 request/response 对象，express 直接在原生的 req 和 res 基础上进行了扩展
- express 中的特点内部采用的是回调（组合，内部不支持串联 promise 串联），koa 支持 promise 串联
