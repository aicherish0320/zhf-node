const Promise = require('./08-ac-promise/04-promise')

const p1 = new Promise((resolve, reject) => {
  // resolve(1)
  reject('01')
})

const p2 = p1.then(
  (data) => {
    console.log('data1 >>> ', data)
    return new Promise((resolve, reject) => {
      // resolve('success')
      reject('failure')
    })
  },
  (error) => {
    console.log('error1 >>> ', error)
    return new Promise((resolve, reject) => {
      // resolve('success')
      reject('failure')
    })
  }
)

p2.then(
  (data) => {
    console.log('data2 >>> ', data)
  },
  (error) => {
    console.log('error2 >>> ', error)
  }
)
