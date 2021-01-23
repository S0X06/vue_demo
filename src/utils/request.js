// import axios from 'axios'
// import { Message } from 'element-ui'
 
import router from '@/router/index'
import i18n from '@/i18n/i18n.js'
import store from '@/store/index'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
const service = axios.create({
  baseURL: '',
  // 超时
  timeout: 30000
})
// request拦截器
service.interceptors.request.use(
  config => {
    const autelToken = localStorage.getItem('token')
    if (autelToken) {
      config.headers['autel-token'] = autelToken
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
 
// 响应拦截器
service.interceptors.response.use(
  res => {
    if (res.data.code !== 200) {
      if (res.data.code === 10005002) {
        ELEMENT.Message.info('您的账号在别处登录了, 请重新登陆')
        localStorage.removeItem('token')
        router.replace('/login')
      } else if (res.data.code === 10005001) {
        ELEMENT.Message.info('登陆已失效, 请重新登陆')
        localStorage.removeItem('token')
        router.replace('/login')
      } else {
        // 利用 i18 插件，获得当前语言环境，去对应字段里取得业务码对应的报错
        const lang = i18n.locale
        const errorMessage = i18n.messages[lang].errorCode.succeedCode[
          res.data.code.toString()
        ]
          ? i18n.messages[lang].errorCode.succeedCode[res.data.code.toString()]
          : res.data.message
        ELEMENT.Message({
          message: errorMessage,
          type: 'error'
        })
        // 如果本次请求的code 不是200，证明请求数据失败，本次不缓存页面，以便下次进入页面再次请求数据
        store.dispatch('tagsView/deletaCachedView', router.currentRoute.name)
      }
    }
    return res.data
  },
  error => {
    if (!error.response) {
      ELEMENT.Message({
        message: '服务器连接超时',
        type: 'error'
      })
      store.dispatch('tagsView/deletaCachedView', router.currentRoute.name)
      return
    }
    if (error.response.status === 401) {
      ELEMENT.Message.info('身份验证失败，请重新登陆')
      localStorage.removeItem('token')
      router.replace('/login')
      return error.response
    }
    // 利用 i18 插件，获得当前语言环境，去对应字段里取得业务码对应的报错
    const lang = i18n.locale
    const errorMessage = i18n.messages[lang].errorCode.statusCode[
      error.response.status.toString()
    ]
      ? i18n.messages[lang].errorCode.statusCode[
          error.response.status.toString()
        ]
      : '未知错误'
    ELEMENT.Message({
      message: errorMessage,
      type: 'error'
    })
    // 如果本次请求的状态码 不是200，证明请求数据失败，本次不缓存页面，以便下次进入页面再次请求数据
    store.dispatch('tagsView/deletaCachedView', router.currentRoute.name)
    return error
  }
)
 
export default service