// const newUrl = 'http://192.168.1.151:20000' // 本地地址
const newUrl = 'http://121.196.123.158/WebAPI' // 服务器地址
import request from '@/utils/request'

// 公司信息管理列表
export function OrganList(data) {
  return request({
    url: newUrl + '/api/User/List',
    method: 'get',
    data
  })
}

// 增加公司信息
export function OrganAdd(data) {
  return request({
    url: newUrl + '/api/OrganizationCorp/Add',
    method: 'get',
    data
  })
}

// 删除公司信息
export function OrganDelete(data) {
  return request({
    url: newUrl + '/api/User/Delete',
    method: 'get',
    data
  })
}

// 修改公司信息
export function OrganModify(data) {
  return request({
    url: newUrl + '/api/User/Modify',
    method: 'get',
    data
  })
}
