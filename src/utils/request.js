import axios from 'axios'
import store from '@/store'
import {Toast} from 'vant'
// 根据环境不同引入不同api地址
import {baseApi} from '@/config'
import qs from 'qs'
import {getSignature} from '@/utils/auth'
import myconfig from '@/config'

// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 8000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      // Toast.loading({
      //   forbidClick: false
      // })
    }
    config.headers['x-access-appid'] = 'ty9fd2848a039ab554'
    if (store.getters.token) {
      config.headers['X-Token'] = ''
    }
    if (config.method === 'post') {
      config.data = getSignature(config.data)
      config.data = qs.stringify(config.data)
    } else if (config.method === 'get') {
      config.params = getSignature(config.params)
    }
    console.log(config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 5000) {
      // 登录超时,重新登录
      return Promise.reject(response)
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    Toast.clear()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
