import Vue from 'vue'
import App from './App.vue'
import store from './store'
// 注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

// 引入mock
import '@/mock/mockServe'

import "swiper/css/swiper.css"
import { MessageBox } from 'element-ui';

// 引入懒加载
import VueLazyload from 'vue-lazyload'
import loadImg from '@/assets/1.gif'
Vue.use(VueLazyload, {
    loading: loadImg
})

// 引入校验插件
import VeeLalidate from 'vee-validate'
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeLalidate)
VeeLalidate.Validator.localize("zh_CN", {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: {
        phone: "手机号",
        code: "验证码",
        password: "密码",
        password1: "确认密码",
        agree: '协议'
    },
});
//自定义校验规则
VeeLalidate.Validator.extend("tongyi", {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "必须同意",
});

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

import router from '@/router'

// 统一引入接口
import * as API from '@/api'

new Vue({
    //全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    store,
    render: h => h(App),
    router
}).$mount('#app')