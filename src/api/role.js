// const newUrl = 'http://192.168.1.151:20000' // 本地地址
const newUrl = 'http://121.196.123.158/WebAPI' // 服务器地址
import request from '@/utils/request'

// 获取管理角色列表
export function ListRole(data) {
  return request({
    url: newUrl + '/api/Role/ListRole',
    method: 'post',
    data
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: newUrl + '/api/Role/Add',
    method: 'post',
    data
  })
}

// 编辑角色
export function updateRole(data) {
  return request({
    url: newUrl + '/api/Role/Update',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: newUrl + '/api/Role/Delete',
    method: 'post',
    data
  })
}

// 获取系统管理菜单
export function ListMenuFunAll(data) {
  return request({
    url: newUrl + '/api/Role/ListMenuFunAll',
    method: 'post',
    data
  })
}

// 查看用户列表
export function ListUser(query, data) {
  return request({
    url: newUrl + '/api/Role/ListUser',
    method: 'post',
    params: query,
    data
  })
}

// 启用，禁用状态
export function UpdateStatus(data) {
  return request({
    url: newUrl + '/api/Role/UpdateStatus',
    method: 'post',
    data
  })
}

// 启用，禁用状态
export function ListRoleMenuFun(data) {
  return request({
    url: newUrl + '/api/Role/ListRoleMenuFun',
    method: 'post',
    data
  })
}
