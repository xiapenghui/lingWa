// const newUrl = 'http://192.168.1.151:20000'  //本地地址
const newUrl = 'http://121.196.123.158' // 服务器地址
import request from '@/utils/request'

export function login(query) {
  return request({
    url: newUrl + '/WebAPI/api/User/Login',
    method: 'get',
    params: query
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
