const axios = require('axios')
const fs = require('fs')
const log = console.log.bind(console)

// GET 请求
// 1. 在 url 里面携带参数
// axios.get('http://localhost:3000/user?ID=12345')
//   .then(res => {
//     log('res1', res.data)
//   })
//   .catch(error => {
//     log('error1', error)
//   })

// 2. 将参数放到一个对象里面, axios会在内部将其拼接成上面的 url
// 和上面的请求是一样的
// axios.get('http://localhost:3000/user', {
//   params: {
//     ID: 12345
//   }
// }).then(res => {
//   log('res2', res.data)
// }).catch(error => {
//   log('error2', error)
// })

// 3. 类似 jQuery 的写法, 传一个对象进去
// 注意, 这必须在服务端运行, 因为浏览器端没有 fs
// 这个请求会在当前目录创建一个图像文件
// axios({
//   method: 'get',
//   url: 'http://bit.ly/2mTM3nY',
//   responseType: 'stream'
// })
//   .then(response => {
//     response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
//   })

// POST 请求
// 1. 第二个参数放数据
// axios.post('http://localhost:3000/user', {
//   firstName: 'hh',
//   lastName: 'xx'
// })
//   .then(res => {
//     log('res3', res.data)
//   })
//   .catch(error => {
//     log('error3', error)
//   })
// 2. 类似 jQuery 的方式
// axios({
//   method: 'post',
//   url: 'http://localhost:3000/user',
//   data: {
//     firstName: 'mmmmmmmmm',
//     lastName: 'nnnnnnnnnn'
//   }
// })
//   .then(res => {
//     log('res4', res.data)
//   })
//   .catch(error => {
//     log('error4', error)
//   })

// 并行请求
// then 里面回调函数内的第 n 个参数分别是第 n 个请求返回的数据
// const request1 = function() {
//   return axios.get('http://localhost:3000/random1')
// }
// const request2 = function() {
//   return axios.get('http://localhost:3000/random2')
// }
// axios.all([request1(), request2()])
//   .then(axios.spread((res1, res2) => {
//     log('res1', res1.data)
//     log('res2', res2.data)
//   }))

// 创建实例
// const instance = axios.create({
//   baseURL: 'http://127.0.0.1:3000/',
//   timeout: 3000,
// })
// 实例的使用方法
// instance.get('/user')
//   .then(response => {
//     log(response.data)
//     log(response.status)
//     log(response.statusText)
//     log(response.headers)
//     log(response.config)
//   }).catch(error => {
//     log('error', error.message)
//   })

// Config
// 全局 axios 配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 在创建实例时配置实例的选项
// const instance = axios.create({
//   baseURL: 'http://127.0.0.1:3000/'
// })

// 在创建实例后也可以指定默认选项
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN

// 配置先后顺序

// 在创建实例时, 如果不传入参数, axios 也会使用它的默认项
// const instance = axios.create()
// 下面的配置会去覆盖 axios 默认的配置
// 请求的等待事件将会是 2.5s
// instance.defaults.timeout = 2500

// 当次请求的 timeout 事件也可以设置
// instance.get('/longRequest', {
//   timeout: 5000
// })

// 拦截器
// 拦截请求/响应
// 添加请求的拦截
// axios.interceptors.request.use(config => {
//   // config 包含发送出的数据, 可以在这里修改
//   // 下面随机将请求方法改成 POST
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// axios.interceptors.response.use(res => {
//   // 这里随机修改返回的数据
//   if (Math.random() > 0.5) {
//     res.data.message = 'hhhhhhhh'
//   }
//   return res
// }, error => {
//   // 可以对返回的 error 进行处理
//   return Promise.reject(error)
// })

// 移除拦截器
// const myInterceptor = axios.interceptors.request.use(res => {
//   //
// })
// axios.interceptors.request.eject(myInterceptor)

// 实例的拦截器
// const instance = axios.create() 
// instance.interceptors.request.use(res => {
//   // 
// })

// 错误处理
// axios.post('/user', {
// })
//   .catch(error => {
//     if (error.response) {
//       // 由服务端触发的错误, 例如 404 502 一类
//       // 状态码不在 [200, 300) 这一区间就会触发
//       log('error.response', error.response)
//     } else if (error.request) {
//       // 已经发出了请求但是没有收到请求会触发此错误
//       // error.request 在浏览器端是 XMLHttpRequest 的实例
//       // 在 node.js 端是 http.clientRequest 的实例
//       log('error.request', error.request)
//     } else {
//       // 在准备请求时(尚未发出)触发的错误
//       log('error', error.message)
//     }
//   })

// 指定触发错误的 HTTP 状态码
// axios.get('/user', {
//   validateStatus: status => {
//     // 这样就只会在状态码大于等于500时抛出错误
//     return status < 500
//   }
// })
//   .then(res => {
//     log('res', res.data )
//   })
  
// 取消请求
// 使用 cancel token 取消请求
const CancelToken = axios.CancelToken
const source = CancelToken.source()
// 准备发送可以取消的请求
axios.get('/user', {
  cancelToken: source.token 
}).then(res => {
  log('res', res.data)
}).catch(error => {
  if (axios.isCancel(error)) {
    // 请求被取消
    log('cancel message ', error.message)
  } else {
    log('error', error)
  }
})
// 取消这个请求
source.cancel('user canceled this request')

// 以 POST 方法发送
axios.post('/user', {
  name: 'new name'
}, {
  cancelToken: source.token
})
// 取消这次的请求
source.cancel('Operation canceled by the user.')

// 创建 cancel token
const cancelToken = axios.CancelToken
let cancel 
axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    cacel = c
  })
})
cancel()
