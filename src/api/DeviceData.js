// 通用产品缺陷
import request from '@/utils/request'

// 设备管理 - 基础数据 - 通用设备类型下拉
export function GetValuePair(data) {
  return request({
    url: '/api/Common/GetEquTypeTextValuePair',
    method: 'post',
    data
  })
}

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

// 设备管理 - 基础数据 - 设备保养项目列表
export function EquMtItemsList(data) {
  return request({
    url: '/api/EquMtItems/List',
    method: 'post',
    data
  })
}
// 设备管理 - 基础数据 - 设备保养项目增加
export function EquMtItemsAdd(data) {
  return request({
    url: '/api/EquMtItems/Add',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 设备保养项目删除
export function EquMtItemsDelete(data) {
  return request({
    url: '/api/EquMtItems/Delete',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 设备保养项目编辑
export function EquMtItemsModify(data) {
  return request({
    url: '/api/EquMtItems/Modify',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 设备保养项目编辑
export function EquModifyStatus(data) {
  return request({
    url: '/api/EquMtItems/ModifyStatus',
    method: 'post',
    data
  })
}

