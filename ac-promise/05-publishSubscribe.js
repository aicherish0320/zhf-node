const fs = require('fs')
const path = require('path')

// ! 发布订阅模式
// 事件中心，发布订阅模式，核心就是把多个方法先暂存起来，最后一次执行
// 可以解耦合
const events = {
  _events: [],
  on(fn) {
    this._events.push(fn)
  },
  emit(data) {
    this._events.forEach((fn) => {
      fn(data)
    })
  }
}

events.on(() => {
  console.log('每次读取，就触发一次')
})

const arr = []
events.on((data) => {
  arr.push(data)
})
events.on(() => {
  if (arr.length === 2) {
    console.log(arr)
  }
})

fs.readFile(
  path.resolve(__dirname, './a.txt'),
  'utf-8',
  function (error, data) {
    if (!error) {
      events.emit(data)
    }
  }
)

fs.readFile(
  path.resolve(__dirname, './b.txt'),
  'utf-8',
  function (error, data) {
    if (!error) {
      events.emit(data)
    }
  }
)

// ! 观察者模式，基于发布订阅的
// 发布订阅之间是没有依赖关系的，对于观察者模式是有观察者和被观察者
