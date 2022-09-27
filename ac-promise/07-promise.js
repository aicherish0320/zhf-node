const Promise = require('./08-ac-promise/02-promise')

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
    // reject('error')
  }, 1000)
  // console.log('promise')
  // resolve('success')
  // reject('error')
  // throw new Error('throw error')
})

p.then(
  (value) => {
    console.log('value1 >>> ', value)
  },
  (reason) => {
    console.log('reason >>> ', reason)
  }
)

p.then(
  (value) => {
    console.log('value2 >>> ', value)
  },
  (reason) => {
    console.log('reason >>> ', reason)
  }
)
