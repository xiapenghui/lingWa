// 通用产品缺陷
import request from '@/utils/request'
// 设备管理 - 基础数据 - 设备类型列表
export function EquBaseList(data) {
  return request({
    url: '/api/EquType/List',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 设备类型新增
export function EquBaseAdd(data) {
  return request({
    url: '/api/EquType/Add',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 设备类型删除
export function EquBaseDelete(data) {
  return request({
    url: '/api/EquType/Delete',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 设备类型编辑
export function EquBaseModify(data) {
  return request({
    url: '/api/EquType/Modify',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 设备类型状态
export function EquBaseModifyStatus(data) {
  return request({
    url: '/api/EquType/ModifyStatus',
    method: 'post',
    data
  })
}
