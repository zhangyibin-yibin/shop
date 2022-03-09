import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from './routes'

import store from '@/store'


// 重写push|replace方法
// 参数  跳转的位置 成功的回调  失败的回调
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的x y为页面的位置
        return { x: 0, y: 0 }
    }
})

// 全局守卫：前置守卫（在路由跳转之前进行检查）
router.beforeEach(async(to, from, next) => {
    // to 要跳到哪里的路由信息 
    // from 从哪里而来的路由信息
    // next  放行函数
    let token = store.state.user.token
    let name = store.state.user.useInfo !== 'undefined' ? '' : store.state.user.useInfo.name
    if (token) { //用户已登录
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    } else {
        if (to.path == '/trade' || to.path == '/pay' || to.path == '/center/myOrder') {
            next('/login?redirect=' + to.Path)
        } else {
            next()
        }
    }
})

export default router