const fs = require('fs')
const path = require('path')

// ! 一
// const arr = []
// function out() {
//   if (arr.length === 2) {
//     console.log(arr)
//   }
// }

// ! 二
function after(times, callback) {
  const arr = []
  return function (data) {
    arr.push(data)
    if (--times === 0) {
      callback(arr)
    }
  }
}
const out = after(2, (data) => {
  console.log('data >>> ', data)
})

fs.readFile(
  path.resolve(__dirname, './a.txt'),
  'utf-8',
  function (error, data) {
    if (!error) {
      out(data)
    }
  }
)

fs.readFile(
  path.resolve(__dirname, './b.txt'),
  'utf-8',
  function (error, data) {
    if (!error) {
      out(data)
    }
  }
)
