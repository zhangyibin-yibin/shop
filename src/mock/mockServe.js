import Mock from "mockjs";
import banner from './banner.json'
import floor from './floor.json'

// 参数：请求地址   请求数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })