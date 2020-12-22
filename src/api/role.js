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
    url: newUrl + '/api/Role/Modify',
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
    url: newUrl + '/api/Role/ModifyStatus',
    method: 'post',
    data
  })
}

// 编辑，复制
export function ListRoleMenuFun(data) {
  return request({
    url: newUrl + '/api/Role/ListRoleMenuFun',
    method: 'post',
    data
  })
}

// 系统管理用户管理--用户管理
// 公司部门下拉列表
export function companyList(data) {
  return request({
    url: newUrl + '/api/User/ListConditionOrgDeptRole',
    method: 'post',
    data
  })
}

// 分页查询
export function UserList(data) {
  return request({
    url: newUrl + '/api/User/List',
    method: 'post',
    data
  })
}

// 新增用户
export function UserAdd(data) {
  return request({
    url: newUrl + '/api/User/Add',
    method: 'post',
    data
  })
}

// 编辑用户
export function UserUpdate(data) {
  return request({
    url: newUrl + '/api/User/Modify',
    method: 'post',
    data
  })
}

// 设置用户可用或者禁用状态
export function RelerStatus(data) {
  return request({
    url: newUrl + '/api/User/ModifyStatus',
    method: 'post',
    data
  })
}

// 删除用户
export function RelerDelete(data) {
  return request({
    url: newUrl + '/api/User/Delete',
    method: 'post',
    data
  })
}
