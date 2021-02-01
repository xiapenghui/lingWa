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

// 设备管理 - 设备台账管理列表
export function EquDataList(data) {
  return request({
    url: '/api/EquData/List',
    method: 'post',
    data
  })
}

// 设备管理 - 设备台账管理增加
export function EquDataAdd(data) {
  return request({
    url: '/api/EquData/Add',
    method: 'post',
    data
  })
}

// 设备管理 - 设备台账管理编辑
export function EquDataModify(data) {
  return request({
    url: '/api/EquData/Modify',
    method: 'post',
    data
  })
}

// 设备管理 - 设备台账管理删除
export function EquDataDelete(data) {
  return request({
    url: '/api/EquData/Delete',
    method: 'post',
    data
  })
}

// 设备管理 - 设备台账管理状态
export function EquDataModifyStatus(data) {
  return request({
    url: '/api/EquData/ModifyStatus',
    method: 'post',
    data
  })
}

// 设备管理 - 设备维修管理---设备维修新增
export function EquRpAdd(data) {
  return request({
    url: '/api/EquRp/Add',
    method: 'post',
    data
  })
}

// 设备管理 - 设备维修管理---设备维修新增
export function EquRpAdd2(data) {
  return request({
    url: '/api/EquRp/Add_EquRpRepList',
    method: 'post',
    data
  })
}

// 设备管理 - 设备维修管理---设备维修结果3
export function Add_Union(data) {
  return request({
    url: '/api/EquRp/Add_Union',
    method: 'post',
    data
  })
}

// 设备管理 - 设备维修管理---设备维修结果
export function EquRpList(data) {
  return request({
    url: '/api/EquRpResults/List',
    method: 'post',
    data
  })
}

// 设备管理 - 设备维修管理---设备维修结果2
export function EquRpList2(data) {
  return request({
    url: '/api/EquRpResults/List2',
    method: 'post',
    data
  })
}

// 设备管理 - 设备维修管理---设备保养预警列表
export function EquMainList(data) {
  return request({
    url: '/api/EquMaintenance/List',
    method: 'post',
    data
  })
}

// 设备管理 - 设备维修管理---设备保养计划列表
export function EquPlanList(data) {
  return request({
    url: '/api/EquFormulateMaintenance/List',
    method: 'post',
    data
  })
}

// 设备管理 - 设备维修管理---设备生产保养计划保存
export function FormulatePlan(data) {
  return request({
    url: '/api/EquFormulateMaintenance/FormulatePlan',
    method: 'post',
    data
  })
}

// 设备管理 - 设备维修管理 - 设备维修结果
export function ResultList(data) {
  return request({
    url: '/api/EquMaintenanceResults/List',
    method: 'post',
    data
  })
}

// 设备管理 - 设备维修管理 - 设备维修结果
export function ResultListDetail(data) {
  return request({
    url: '/api/EquMaintenanceResults/list_EquMtItems',
    method: 'post',
    data
  })
}

// 设备管理 - 设备保养管理 - 执行设备保养主列表
export function StartPlanList(data) {
  return request({
    url: '/api/EquExecuteMaintenance/List',
    method: 'post',
    data
  })
}

// 设备管理 - 设备保养管理 - 执行设备保养明细列表
export function StartPlanDetailList(data) {
  return request({
    url: '/api/EquExecuteMaintenance/list_EquMtItems',
    method: 'post',
    data
  })
}

// 设备管理 - 设备保养管理 - 执行设备保养明细列表
export function ExeMaintenance(data) {
  return request({
    url: '/api/EquExecuteMaintenance/ExeMaintenance',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 预警类型管理列表
export function warningList(data) {
  return request({
    url: '/api/EquPreWarnType/List',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 预警类型管理增加
export function warningAdd(data) {
  return request({
    url: '/api/EquPreWarnType/Add',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 预警类型管理删除
export function warningDetele(data) {
  return request({
    url: '/api/EquPreWarnType/Detele',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 预警类型管理修改
export function warningModify(data) {
  return request({
    url: '/api/EquPreWarnType/Modify',
    method: 'post',
    data
  })
}

// 设备管理 - 基础数据 - 预警类型管理状态
export function warningModifyStatus(data) {
  return request({
    url: '/api/EquPreWarnType/ModifyStatus',
    method: 'post',
    data
  })
}
