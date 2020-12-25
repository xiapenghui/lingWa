// const newUrl = 'http://localhost:37120' // 测试地址
// const newUrl = 'http://192.168.1.151:20000' // 本地地址
const newUrl = 'http://121.196.123.158/WebAPI' // 服务器地址
import request from '@/utils/request'
// 仓储物流--基础数据--仓库信息列表
export function StoWareList(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseInfo/List',
    method: 'post',
    data
  })
}
// 仓储物流--基础数据--仓库信息新增
export function StoWareAdd(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseInfo/Add',
    method: 'post',
    data
  })
}
// 仓储物流--基础数据--仓库信息删除
export function StoWareDelete(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseInfo/Delete',
    method: 'post',
    data
  })
}

// 仓储物流--基础数据--仓库信息编辑
export function StoWareModify(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseInfo/Modify',
    method: 'post',
    data
  })
}

// 仓储物流--基础数据--库区信息列表
export function WareHouseList(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseRegion/List',
    method: 'post',
    data
  })
}

// 仓储物流--基础数据--库区信息新增
export function WareHouseAdd(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseRegion/Add',
    method: 'post',
    data
  })
}

// 仓储物流--基础数据--库区信息删除
export function WareHouseDelete(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseRegion/Delete',
    method: 'post',
    data
  })
}

// 仓储物流--基础数据--库区信息编辑
export function WareHouseModify(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseRegion/Modify',
    method: 'post',
    data
  })
}

// 仓储物流--基础数据--库位信息列表
export function WareHouseBaseList(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseLocation/List',
    method: 'post',
    data
  })
}

// 仓储物流--基础数据--库位信息新增
export function WareHouseBaseAdd(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseLocation/Add',
    method: 'post',
    data
  })
}

// 仓储物流--基础数据--库位信息删除
export function WareHouseBaseDelete(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseLocation/Delete',
    method: 'post',
    data
  })
}

// 仓储物流--基础数据--库位信息编辑
export function WareHouseBaseModify(data) {
  return request({
    url: newUrl + '/api/WareHouseBaseLocation/Modify',
    method: 'post',
    data
  })
}