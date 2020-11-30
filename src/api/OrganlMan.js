// const newUrl = 'http://192.168.1.151:20000' // 本地地址
const newUrl = 'http://121.196.123.158/WebAPI' // 服务器地址
import request from '@/utils/request'

// 通用下拉选择框
export function GetDictionary(query) {
  return request({
    url: newUrl + '/api/Common/GetDictionary',
    method: 'post',
    params: query
  })
}

// 通用物料数据
export function GetMaterialList(data) {
  return request({
    url: newUrl + '/api/Common/GetMaterialList',
    method: 'post',
    data
  })
}

// 通用客户信息数据
export function GetCustomerList(data) {
  return request({
    url: newUrl + '/api/Common/GetCustomerList',
    method: 'post',
    data
  })
}

// 产线接口
export function GetLine(data) {
  return request({
    url: newUrl + '/api/Common/GetProductLineTextValuePair',
    method: 'post',
    data
  })
}

// 公司信息管理列表
export function OrganList(data) {
  return request({
    url: newUrl + '/api/BaseOrganizationCorp/List',
    method: 'post',
    data
  })
}

// 增加公司信息
export function OrganAdd(data) {
  return request({
    url: newUrl + '/api/BaseOrganizationCorp/Add',
    method: 'post',
    data
  })
}

// 删除公司信息
export function OrganDelete(data) {
  return request({
    url: newUrl + '/api/BaseOrganizationCorp/Delete',
    method: 'post',
    data
  })
}

// 修改公司信息
export function OrganModify(data) {
  return request({
    url: newUrl + '/api/BaseOrganizationCorp/Modify',
    method: 'post',
    data
  })
}
// 修改公司信息状态
export function OrganStatus(data) {
  return request({
    url: newUrl + '/api/BaseOrganizationCorp',
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

// 其他主数据维护
// 客户信息维护列表
export function CustomerList(data) {
  return request({
    url: newUrl + '/api/BaseMasterCustomer/List',
    method: 'post',
    data
  })
}

// 客户信息删除
export function CustomerDelete(data) {
  return request({
    url: newUrl + '/api/BaseMasterCustomer/Delete',
    method: 'post',
    data
  })
}

// 客户信息禁用启用
export function CustomerStatus(data) {
  return request({
    url: newUrl + '/api/BaseMasterCustomer/ModifyStatus',
    method: 'post',
    data
  })
}

// 客户信息新增
export function CustomerAdd(data) {
  return request({
    url: newUrl + '/api/BaseMasterCustomer/Add',
    method: 'post',
    data
  })
}

// 客户信息编辑
export function CustomerModify(data) {
  return request({
    url: newUrl + '/api/BaseMasterCustomer/Modify',
    method: 'post',
    data
  })
}

// 物料信息管理
// 原料信息维护列表
export function MaterialList(query, data) {
  return request({
    url: newUrl + '/api/BaseMaterial/List',
    method: 'post',
    params: query,
    data
  })
}

// 原料信息维护删除
export function MaterialDelete(data) {
  return request({
    url: newUrl + '/api/BaseMaterial/Delete',
    method: 'post',
    data
  })
}

// 原料信息维护心新增
export function MaterialAdd(data) {
  return request({
    url: newUrl + '/api/BaseMaterial/Add',
    method: 'post',
    data
  })
}

// 原料信息维护心编辑
export function MaterialModify(data) {
  return request({
    url: newUrl + '/api/BaseMaterial/Modify',
    method: 'post',
    data
  })
}

export function MaterialStatus(data) {
  return request({
    url: newUrl + '/api/BaseMaterial/ModifyStatus',
    method: 'post',
    data
  })
}

// 生产工单冻结取消
// 修改生产工单状态
// 功能范围：取消冻结
export function orderFreeze(data) {
  return request({
    url: newUrl + '/api/PlanWorkOrder/ModifyUnfreeze',
    method: 'post',
    data
  })
}

// 生产工单新增
export function orderAdd(data) {
  return request({
    url: newUrl + '/api/PlanWorkOrder/Add',
    method: 'post',
    data
  })
}

// 生产工单编辑
export function orderModify(data) {
  return request({
    url: newUrl + '/api/PlanWorkOrder/Modify',
    method: 'post',
    data
  })
}

// BOM信息维护列表分页
export function bomList(data) {
  return request({
    url: newUrl + '/api/BaseProductBOM/List',
    method: 'post',
    data
  })
}

// BOM信息维护列表--增加
export function bomAdd(data) {
  return request({
    url: newUrl + '/api/BaseProductBOM/Add',
    method: 'post',
    data
  })
}

// BOM信息维护列表--编辑
export function bomModify(data) {
  return request({
    url: newUrl + '/api/BaseProductBOM/Modify',
    method: 'post',
    data
  })
}

// BOM信息维护列表 --状态
export function bomModifyStatus(data) {
  return request({
    url: newUrl + '/api/BaseProductBOM/ModifyStatus',
    method: 'post',
    data
  })
}

// BOM信息维护列表 --删除
export function bomDelete(data) {
  return request({
    url: newUrl + '/api/BaseProductBOM/Delete',
    method: 'post',
    data
  })
}

// BOM信息维护列表 --删除
export function bomCopy(data) {
  return request({
    url: newUrl + '/api/BaseProductBOM/Copy',
    method: 'post',
    data
  })
}
