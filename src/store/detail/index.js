import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from '@/utils/uuid_token.js'
const state = {
    goodInfo: {},
    // 游客的临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) { //加入购物车成功
            return 'ok'
        } else { //加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    // 路径导航简化
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    // 产品信息简化
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}