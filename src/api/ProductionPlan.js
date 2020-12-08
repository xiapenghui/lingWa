// const newUrl = 'http://192.168.1.151:20000' // 本地地址
const newUrl = 'http://121.196.123.158/WebAPI' // 服务器地址
import request from '@/utils/request'

// 生产计划
// 生产工单
export function productionList(data) {
  return request({
    url: newUrl + '/api/PlanSchedule/List',
    method: 'post',
    data
  })
}

// 冻结
export function productionFreeze(data) {
  return request({
    url: newUrl + '/api/PlanSchedule/Freeze',
    method: 'post',
    data
  })
}

// 解冻
export function productionUnFreeze(data) {
  return request({
    url: newUrl + '/api/PlanSchedule/UnFreeze',
    method: 'post',
    data
  })
}

// 强制完工
export function ForceComplete(data) {
  return request({
    url: newUrl + '/api/PlanSchedule/ForceComplete',
    method: 'post',
    data
  })
}

// 删除
export function productionDelete(data) {
  return request({
    url: newUrl + '/api/PlanSchedule/Delete',
    method: 'post',
    data
  })
}

// 生产计划 新增时画面的“生产计划单号”

export function productionPlanNum(data) {
  return request({
    url: newUrl + '/api/PlanSchedule/PlanNum',
    method: 'post',
    data
  })
}

// 生产计划新增
export function productionAdd(data) {
  return request({
    url: newUrl + '/api/PlanSchedule/Add',
    method: 'post',
    data
  })
}

// 生产计划编辑修改
export function productionUpdate(data) {
  return request({
    url: newUrl + '/api/PlanSchedule/Modify',
    method: 'post',
    data
  })
}

// 生产计划获取要拆分的数据
export function SplitQuery(data) {
  return request({
    url: newUrl + '/api/PlanSchedule/SplitQuery',
    method: 'post',
    data
  })
}

// 生产计划获取要拆分的数据
export function productionSplit(data) {
  return request({
    url: newUrl + '/api/PlanSchedule/Split',
    method: 'post',
    data
  })
}

// 生产工单列表
export function orderList(data) {
  return request({
    url: newUrl + '/api/PlanWorkOrder/List',
    method: 'post',
    data
  })
}

// 生产工单删除
export function orderDelete(data) {
  return request({
    url: newUrl + '/api/PlanWorkOrder/Delete',
    method: 'post',
    data
  })
}
//
// 生产工单冻结
// 修改生产工单状态
// 功能范围：工单发布、取消发布、工单冻结、强制完工
export function orderStatus(data) {
  return request({
    url: newUrl + '/api/PlanWorkOrder/ModifyStatus',
    method: 'post',
    data
  })
}
