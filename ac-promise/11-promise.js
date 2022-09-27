// Promise.resolve(100).then((data) => {
//   console.log('data >>> ', data)
// })

// Promise.reject(1).then(
//   (data) => {
//     console.log('data >>> ', data)
//   },
//   (error) => {
//     console.log('error >>> ', error)
//   }
// )

const Promise = require('./08-ac-promise/05-promise')

// Promise.resolve(
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(1)
//     }, 1000)
//   })
// ).then(
//   (data) => {
//     console.log('data >>> ', data)
//   },
//   (error) => {
//     console.log('error >>> ', error)
//   }
// )

// new Promise((resolve, reject) => {
//   resolve(
//     new Promise((resolve) => {
//       resolve(123)
//     })
//   )
// }).then(
//   (data) => {
//     console.log('data >>> ', data)
//   },
//   (error) => {
//     console.log('error >>> ', error)
//   }
// )

new Promise((resolve, reject) => {
  reject('error')
})
  .then(
    (data) => {
      console.log('data >>> ', data)
    }
    // (error) => {
    //   console.log('error >>> ', error)
    // }
  )
  .catch((error) => {
    console.log('error2 >>> ', error)
  })
