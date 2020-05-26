import axios from 'axios'
import Vue from 'vue'

// 进行一些全局配置
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.timeout = 10000

// 封装自己的get/post方法
export default {
  get: (path = "", data = {}) => {
    return new Promise((resolve, reject) => {
      axios.get(path, {
        params: data
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  post: (path = "", data = {}) => {
    return new Promise((resolve, reject) => {
      axios.post(path, data).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    })
  },
  all: (list) => {
    return new Promise((resolve, reject) => {
      axios.all(list)
        .then(axios.spread((...result) => {
          // 两个请求现在都执行完成
          resolve(result)
        }))
        .catch(err => {
          reject(err)
        })
    })
  }
}

// 记录请求次数
let count = 0
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++
  Vue.showLoading()
  return config
}, function (error) {
  // 对请求错误做些什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})