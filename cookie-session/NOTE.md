# cookie session sessionStorage localStorage indexDB

都不能跨域共享

## cookie

- http 协议是无状态，可以通过浏览器添加 cookie，服务端也可以设置 cookie，每次请求都会携带 cookie（每次请求都携带，浪费流量）
- cookie 存在 http header 中，存储在 cookie 中的数据不宜过大，如果过大可能会造成页面白屏（4k）
- cookie 默认不能跨域（两个不同的域名，父子域名可以设置拿到父域中的数据），cookie 存在前端（安全问题）

## session

- session 中（服务器里，默认浏览器是拿不到的，session 可以存放数据原则上没有上线，而且安全）
- 基于 cookie 的
- session 默认都是存在内存中的（如果服务器宕掉了，session 就丢失了 -> 存储到数据库中，数据库也有数据丢失）

## jwt

- 服务器根据用户提供的信息生成一个令牌，每次来，带上令牌和你的信息，用你的信息再次生成令牌做对比（里面不能存放隐私信息）token

## sessionStorage

浏览器关闭就丢失了

## localStorage

浏览器关掉了也不会丢

## indexDB

浏览器数据库
可视化
绘制点、线、面的时候用得到

## 静态资源如何优化？

- gzip 压缩
- 缓存，强制缓存、协商缓存，预加载
- localStorage 来存储 js 文件
