// const newUrl = 'http://192.168.1.151:20000' // 本地地址
const newUrl = 'http://121.196.123.158/WebAPI' // 服务器地址
import request from '@/utils/request'

// 通用下拉选择框
export function GetDictionary(query) {
  return request({
    url: newUrl + '/GetDictionary',
    method: 'post',
    params: query
  })
}

// 通用物料数据
export function GetMaterialList(data) {
  return request({
    url: newUrl + '/GetMaterialList',
    method: 'post',
    data
  })
}

// 通用客户信息数据
export function GetCustomerList(data) {
  return request({
    url: newUrl + '/GetCustomerList',
    method: 'post',
    data
  })
}

// 产线接口
export function GetLine(data) {
  return request({
    url: newUrl + '/GetProductLineTextValuePair',
    method: 'post',
    data
  })
}

// 公司信息管理列表
export function OrganList(data) {
  return request({
    url: newUrl + '/api/OrganizationCorp/List',
    method: 'post',
    data
  })
}

// 增加公司信息
export function OrganAdd(data) {
  return request({
    url: newUrl + '/api/OrganizationCorp/Add',
    method: 'post',
    data
  })
}

// 删除公司信息
export function OrganDelete(data) {
  return request({
    url: newUrl + '/api/OrganizationCorp/Delete',
    method: 'post',
    data
  })
}

// 修改公司信息
export function OrganModify(data) {
  return request({
    url: newUrl + '/api/OrganizationCorp/Modify',
    method: 'post',
    data
  })
}

// 查看工序分页列表
export function ProduceList(data) {
  return request({
    url: newUrl + '/api/ProduceProcess/List',
    method: 'post',
    data
  })
}
// 查看工序增加
export function ProduceAdd(data) {
  return request({
    url: newUrl + '/api/ProduceProcess/Add',
    method: 'post',
    data
  })
}
// 查看工序增加
export function ProduceDelete(data) {
  return request({
    url: newUrl + '/api/ProduceProcess/Delete',
    method: 'post',
    data
  })
}

// 修改工序增加
export function ProduceModify(data) {
  return request({
    url: newUrl + '/api/ProduceProcess/Modify',
    method: 'post',
    data
  })
}

// 生产计划
// 生产工单
export function productionList(data) {
  return request({
    url: newUrl + '/api/ProdPlanning/List',
    method: 'post',
    data
  })
}

// 冻结
export function productionFreeze(data) {
  return request({
    url: newUrl + '/api/ProdPlanning/Freeze',
    method: 'post',
    data
  })
}

// 解冻
export function productionUnFreeze(data) {
  return request({
    url: newUrl + '/api/ProdPlanning/UnFreeze',
    method: 'post',
    data
  })
}

// 强制完工
export function ForceComplete(data) {
  return request({
    url: newUrl + '/api/ProdPlanning/ForceComplete',
    method: 'post',
    data
  })
}

// 删除
export function productionDelete(data) {
  return request({
    url: newUrl + '/api/ProdPlanning/Delete',
    method: 'post',
    data
  })
}

// 生产计划 新增时画面的“生产计划单号”

export function productionPlanNum(data) {
  return request({
    url: newUrl + '/api/ProdPlanning/PlanNum',
    method: 'post',
    data
  })
}

// 生产计划新增
export function productionAdd(data) {
  return request({
    url: newUrl + '/api/ProdPlanning/Add',
    method: 'post',
    data
  })
}

// 生产计划编辑修改
export function productionUpdate(data) {
  return request({
    url: newUrl + '/api/ProdPlanning/Update',
    method: 'post',
    data
  })
}

// 生产计划获取要拆分的数据
export function SplitQuery(data) {
  return request({
    url: newUrl + '/api/ProdPlanning/SplitQuery',
    method: 'post',
    data
  })
}

// 生产计划获取要拆分的数据
export function productionSplit(data) {
  return request({
    url: newUrl + '/api/ProdPlanning/Split',
    method: 'post',
    data
  })
}

// 生产工单列表
export function orderList(data) {
  return request({
    url: newUrl + '/api/ProdWorkOrder/List',
    method: 'post',
    data
  })
}

