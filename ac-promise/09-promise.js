const fs = require('fs')
const Promise = require('./08-ac-promise/04-promise')

new Promise((resolve, reject) => {
  // resolve(1)
  reject(0)
})
  .then(
    (data) => {
      console.log('data1 >>> ', data)
      return '2'
    },
    (error) => {
      console.log('error1 >>> ', error)
      return '3'
    }
  )
  .then(
    (data) => {
      console.log('data2 >>> ', data)
    },
    (error) => {
      console.log('error2 >>> ', error)
    }
  )
