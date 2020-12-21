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

// 通用工艺路线
export function GetByRouteList(data) {
  return request({
    url: newUrl + '/api/Common/GetWorkingProcedureByRouteList',
    method: 'post',
    data
  })
}


// 通用产品缺陷
export function GetQuaDefectType(data) {
  return request({
    url: newUrl + '/api/Common/GetQuaDefectTypeTextValuePair',
    method: 'post',
    data
  })
}


// 通用获取当前公司
export function GetAuthOrganizationRange(data) {
  return request({
    url: newUrl + '/api/Common/GetAuthOrganizationRange',
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
    url: newUrl + '/api/BaseOrganizationCorp/ModifyStatus',
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
export function MaterialList(data) {
  return request({
    url: newUrl + '/api/BaseMaterial/List',
    method: 'post',
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

// BOM信息维护列表 --复制
export function bomCopy(data) {
  return request({
    url: newUrl + '/api/BaseProductBOM/Copy',
    method: 'post',
    data
  })
}

// BOM信息维护明细列表 --分页
export function bomDetailList(data) {
  return request({
    url: newUrl + '/api/BaseProductBOMDetail/List',
    method: 'post',
    data
  })
}

// BOM信息维护明细列表 --新增
export function bomDetailAdd(data) {
  return request({
    url: newUrl + '/api/BaseProductBOMDetail/Add',
    method: 'post',
    data
  })
}

// BOM信息维护明细列表 --修改
export function bomDetailModify(data) {
  return request({
    url: newUrl + '/api/BaseProductBOMDetail/Modify',
    method: 'post',
    data
  })
}

// BOM信息维护明细列表 --删除
export function bomDetailDelete(data) {
  return request({
    url: newUrl + '/api/BaseProductBOMDetail/Delete',
    method: 'post',
    data
  })
}

// 工艺路线列表 --分页
export function baseRouteList(data) {
  return request({
    url: newUrl + '/api/BaseRoute/List',
    method: 'post',
    data
  })
}

// 工艺路线列表 --新增
export function baseRouteAdd(data) {
  return request({
    url: newUrl + '/api/BaseRoute/Add',
    method: 'post',
    data
  })
}

// 工艺路线列表 --修改
export function baseRouteModify(data) {
  return request({
    url: newUrl + '/api/BaseRoute/Modify',
    method: 'post',
    data
  })
}

// 工艺路线列表 --删除
export function baseRouteDelete(data) {
  return request({
    url: newUrl + '/api/BaseRoute/Delete',
    method: 'post',
    data
  })
}

// 工艺路线列表 --复制
export function baseRouteCopy(data) {
  return request({
    url: newUrl + '/api/BaseRoute/Copy',
    method: 'post',
    data
  })
}

// 工艺路线列表 --状态
export function baseRouteStatus(data) {
  return request({
    url: newUrl + '/api/BaseRoute/ModifyStatus',
    method: 'post',
    data
  })
}

// 工艺路线明细列表 --分页
export function baseDetailList(data) {
  return request({
    url: newUrl + '/api/BaseRouteDetail/List',
    method: 'post',
    data
  })
}

// 工艺路线明细 --新增
export function baseDetailAdd(data) {
  return request({
    url: newUrl + '/api/BaseRouteDetail/Add',
    method: 'post',
    data
  })
}
// 工艺路线明细 --修改
export function baseDetailModify(data) {
  return request({
    url: newUrl + '/api/BaseRouteDetail/Modify',
    method: 'post',
    data
  })
}
// 工艺路线明细 --删除
export function baseDetailDelete(data) {
  return request({
    url: newUrl + '/api/BaseRouteDetail/Delete',
    method: 'post',
    data
  })
}

// 工序列表--分页
export function lineList(data) {
  return request({
    url: newUrl + '/api/Route/List',
    method: 'post',
    data
  })
}

// 工序列表--分页
export function BaseProList(data) {
  return request({
    url: newUrl + '/api/BaseProcess/List',
    method: 'post',
    data
  })
}

// 工序列表--分页
export function BaseProAdd(data) {
  return request({
    url: newUrl + '/api/BaseProcess/Add',
    method: 'post',
    data
  })
}

// 工序列表--删除
export function BaseProDelete(data) {
  return request({
    url: newUrl + '/api/BaseProcess/Delete',
    method: 'post',
    data
  })
}
// 工序列表--修改
export function BaseProModify(data) {
  return request({
    url: newUrl + '/api/BaseProcess/Modify',
    method: 'post',
    data
  })
}

// 工序列表--状态
export function BaseProStatus(data) {
  return request({
    url: newUrl + '/api/BaseProcess/ModifyStatus',
    method: 'post',
    data
  })
}

// 生产组织管理树状图
export function treeList(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/ListProductionOrganization',
    method: 'post',
    data
  })
}

// 生产组织管理--工厂分页
export function factoryList(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/FactoryList',
    method: 'post',
    data
  })
}

// 生产组织管理--车间分页
export function workShopList(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/WorkShopList',
    method: 'post',
    data
  })
}

// 生产组织管理--产线分页
export function ProductLineList(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/ProductLineList',
    method: 'post',
    data
  })
}

// 生产组织管理--工作中心分页
export function WorkCenterList(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/WorkCenterList',
    method: 'post',
    data
  })
}

// 生产组织管理--工位分页
export function stationList(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/TerminalList',
    method: 'post',
    data
  })
}

// 生产组织管理--工厂增加
export function factoryAdd(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/FactoryAdd',
    method: 'post',
    data
  })
}

// 生产组织管理--车间增加
export function workShopAdd(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/WorkShopAdd',
    method: 'post',
    data
  })
}

// 生产组织管理--产线增加
export function ProductLineAdd(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/ProductLineAdd',
    method: 'post',
    data
  })
}

// 生产组织管理--工作中心增加
export function WorkCenterAdd(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/WorkCenterAdd',
    method: 'post',
    data
  })
}

// 生产组织管理--工位增加
export function stationAdd(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/TerminalAdd',
    method: 'post',
    data
  })
}

// 生产组织管理--工厂删除
export function factoryDelete(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/FactoryDelete',
    method: 'post',
    data
  })
}

// 生产组织管理--车间删除
export function workShopDelete(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/WorkShopDelete',
    method: 'post',
    data
  })
}

// 生产组织管理--产线删除
export function ProductLineDelete(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/ProductLineDelete',
    method: 'post',
    data
  })
}

// 生产组织管理--工作中心删除
export function WorkCenterDelete(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/WorkCenterDelete',
    method: 'post',
    data
  })
}

// 生产组织管理--工位删除
export function stationDelete(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/TerminalDelete',
    method: 'post',
    data
  })
}

// 生产组织管理--工厂编辑
export function factoryModify(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/FactoryModify',
    method: 'post',
    data
  })
}

// 生产组织管理--车间编辑
export function workShopModify(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/WorkShopModify',
    method: 'post',
    data
  })
}

// 生产组织管理--产线编辑
export function ProductLineModify(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/ProductLineModify',
    method: 'post',
    data
  })
}

// 生产组织管理--工作中心编辑
export function WorkCenterModify(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/WorkCenterModify',
    method: 'post',
    data
  })
}

// 生产组织管理--工位编辑
export function stationModify(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/TerminalModify',
    method: 'post',
    data
  })
}

// 生产组织管理--车间状态
export function workShopStatus(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/WorkShopModifyStatus',
    method: 'post',
    data
  })
}

// 生产组织管理--产线状态
export function ProductLineStatus(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/ProductLineModifyStatus',
    method: 'post',
    data
  })
}

// 生产组织管理--工作中心状态
export function WorkCenterStatus(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/WorkCenterModifyStatus',
    method: 'post',
    data
  })
}

// 生产组织管理--工位状态
export function stationStatus(data) {
  return request({
    url: newUrl + '/api/BaseProduceOrganization/TerminalModifyStatus',
    method: 'post',
    data
  })
}
