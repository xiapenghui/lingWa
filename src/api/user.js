import request from '@/utils/request'
export function login(query) {
  return request({
    url: '/api/User/Login',
    method: 'get',
    params: query
  })
}

// 获取左侧菜单列表
export function ListMenu() {
  return request({
    url: '/api/User/ListMenu',
    method: 'post'
  })
}

// 退出登录
export function Logout() {
  return request({
    url: '/api/User/Logout',
    method: 'post'
  })
}

// 获取全部公司信息
export function GetOrganizational() {
  return request({
    url: '/api/Common/GetOrganizational',
    method: 'post'
  })
}

// 获取全部公司信息
export function GetAuthOrganizationRange() {
  return request({
    url: '/api/Common/GetAuthOrganizationRange',
    method: 'post'
  })
}

// 获取全部公司信息
export function ChangeOrganization(data) {
  return request({
    url: '/api/User/ChangeOrganization',
    method: 'post',
    data
  })
}
