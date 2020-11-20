// const newUrl = 'http://192.168.1.151:20000' // 本地地址
const newUrl = 'http://121.196.123.158/WebAPI' // 服务器地址
import request from '@/utils/request'

export function login(query) {
  return request({
    url: newUrl + '/api/User/Login',
    method: 'get',
    params: query
  })
}

// 获取左侧菜单列表
export function ListMenu() {
  return request({
    url: newUrl + '/api/User/ListMenu',
    method: 'post'
  })
}

