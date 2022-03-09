import { v4 as uuidv4 } from 'uuid'
export const getUUID = () => {
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token) { //没有
        // 生成游客临时身份
        uuid_token = uuidv4()
            // 本地储存一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}