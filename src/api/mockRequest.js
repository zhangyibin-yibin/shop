import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
    // 基础路径，发请求时路径当中会出现
    baseURL: '/mock',
    // 请求超时的时间
    timeout: 5000
})

// 请求拦截器：在发送请求前，请求拦截器可以检测到
requests.interceptors.request.use((config) => {
    // 进度条开始
    nprogress.start()
        // config配置对象，对象里面有一个属性很重要，headers请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 进度条结束
    nprogress.done()
        // 成功的回调函数：服务器响应数据回来后，响应拦截器可以检测到
    return res.data
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

export default requests