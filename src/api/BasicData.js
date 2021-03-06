import request from '@/utils/request'
// 通用下拉选择框
export function GetDictionary(query) {
  return request({
    url: '/api/Common/GetDictionary',
    method: 'post',
    params: query
  })
}

// 通用物料数据
export function GetMaterialList(data) {
  return request({
    url: '/api/Common/GetMaterialList',
    method: 'post',
    data
  })
}

// 通用客户信息数据
export function GetCustomerList(data) {
  return request({
    url: '/api/Common/GetCustomerList',
    method: 'post',
    data
  })
}

// 通用工艺路线
export function GetByRouteList(data) {
  return request({
    url: '/api/Common/GetWorkingProcedureByRouteList',
    method: 'post',
    data
  })
}

// 通用产品缺陷
export function GetQuaDefectType(data) {
  return request({
    url: '/api/Common/GetQuaDefectTypeTextValuePair',
    method: 'post',
    data
  })
}

// 通用获取当前公司
export function GetAuthOrganizationRange(data) {
  return request({
    url: '/api/Common/GetAuthOrganizationRange',
    method: 'post',
    data
  })
}

// 通用获取人眼信息
export function GetSysUserTextValuePair(data) {
  return request({
    url: '/api/Common/GetSysUserTextValuePair',
    method: 'post',
    data
  })
}

// 通用产线接口
export function GetLine(data) {
  return request({
    url: '/api/Common/GetProductLineTextValuePair',
    method: 'post',
    data
  })
}

// 通用BOM版本接口
export function GetBomVersion(data) {
  return request({
    url: '/api/Common/GetBomVersion',
    method: 'post',
    data
  })
}

// 通用工艺路线接口
export function GetRouteTextValuePair(data) {
  return request({
    url: '/api/Common/GetRouteTextValuePair',
    method: 'post',
    data
  })
}

// 通用物料数据
export function GetMaterial(data) {
  return request({
    url: '/api/Common/GetMaterial',
    method: 'post',
    data
  })
}

// 通用物料类型
export function GetMaterialTypeTextValuePair(data) {
  return request({
    url: '/api/Common/GetMaterialTypeTextValuePair',
    method: 'post',
    data
  })
}

// 公司信息管理列表
export function OrganList(data) {
  return request({
    url: '/api/BaseOrganizationCorp/List',
    method: 'post',
    data
  })
}

// 增加公司信息
export function OrganAdd(data) {
  return request({
    url: '/api/BaseOrganizationCorp/Add',
    method: 'post',
    data
  })
}

// 删除公司信息
export function OrganDelete(data) {
  return request({
    url: '/api/BaseOrganizationCorp/Delete',
    method: 'post',
    data
  })
}

// 修改公司信息
export function OrganModify(data) {
  return request({
    url: '/api/BaseOrganizationCorp/Modify',
    method: 'post',
    data
  })
}
// 修改公司信息状态
export function OrganStatus(data) {
  return request({
    url: '/api/BaseOrganizationCorp/ModifyStatus',
    method: 'post',
    data
  })
}

// 查看工序分页列表
export function ProduceList(data) {
  return request({
    url: '/api/ProduceProcess/List',
    method: 'post',
    data
  })
}
// 查看工序增加
export function ProduceAdd(data) {
  return request({
    url: '/api/ProduceProcess/Add',
    method: 'post',
    data
  })
}
// 查看工序增加
export function ProduceDelete(data) {
  return request({
    url: '/api/ProduceProcess/Delete',
    method: 'post',
    data
  })
}

// 修改工序增加
export function ProduceModify(data) {
  return request({
    url: '/api/ProduceProcess/Modify',
    method: 'post',
    data
  })
}

// 其他主数据维护
// 客户信息维护列表
export function CustomerList(data) {
  return request({
    url: '/api/BaseMasterCustomer/List',
    method: 'post',
    data
  })
}

// 客户信息删除
export function CustomerDelete(data) {
  return request({
    url: '/api/BaseMasterCustomer/Delete',
    method: 'post',
    data
  })
}

// 客户信息禁用启用
export function CustomerStatus(data) {
  return request({
    url: '/api/BaseMasterCustomer/ModifyStatus',
    method: 'post',
    data
  })
}

// 客户信息新增
export function CustomerAdd(data) {
  return request({
    url: '/api/BaseMasterCustomer/Add',
    method: 'post',
    data
  })
}

// 客户信息编辑
export function CustomerModify(data) {
  return request({
    url: '/api/BaseMasterCustomer/Modify',
    method: 'post',
    data
  })
}

// 物料信息管理
// 原料信息维护列表
export function MaterialList(data) {
  return request({
    url: '/api/BaseMaterial/List',
    method: 'post',
    data
  })
}

// 原料信息维护删除
export function MaterialDelete(data) {
  return request({
    url: '/api/BaseMaterial/Delete',
    method: 'post',
    data
  })
}

// 原料信息维护心新增
export function MaterialAdd(data) {
  return request({
    url: '/api/BaseMaterial/Add',
    method: 'post',
    data
  })
}

// 原料信息维护心编辑
export function MaterialModify(data) {
  return request({
    url: '/api/BaseMaterial/Modify',
    method: 'post',
    data
  })
}

export function MaterialStatus(data) {
  return request({
    url: '/api/BaseMaterial/ModifyStatus',
    method: 'post',
    data
  })
}

// BOM信息维护列表分页
export function bomList(data) {
  return request({
    url: '/api/BaseProductBOM/List',
    method: 'post',
    data
  })
}

// BOM信息维护列表--增加
export function bomAdd(data) {
  return request({
    url: '/api/BaseProductBOM/Add',
    method: 'post',
    data
  })
}

// BOM信息维护列表--编辑
export function bomModify(data) {
  return request({
    url: '/api/BaseProductBOM/Modify',
    method: 'post',
    data
  })
}

// BOM信息维护列表 --状态
export function bomModifyStatus(data) {
  return request({
    url: '/api/BaseProductBOM/ModifyStatus',
    method: 'post',
    data
  })
}

// BOM信息维护列表 --删除
export function bomDelete(data) {
  return request({
    url: '/api/BaseProductBOM/Delete',
    method: 'post',
    data
  })
}

// BOM信息维护列表 --复制
export function bomCopy(data) {
  return request({
    url: '/api/BaseProductBOM/Copy',
    method: 'post',
    data
  })
}

// BOM信息维护明细列表 --分页
export function bomDetailList(data) {
  return request({
    url: '/api/BaseProductBOMDetail/List',
    method: 'post',
    data
  })
}

// BOM信息维护明细列表 --新增
export function bomDetailAdd(data) {
  return request({
    url: '/api/BaseProductBOMDetail/Add',
    method: 'post',
    data
  })
}

// BOM信息维护明细列表 --修改
export function bomDetailModify(data) {
  return request({
    url: '/api/BaseProductBOMDetail/Modify',
    method: 'post',
    data
  })
}

// BOM信息维护明细列表 --删除
export function bomDetailDelete(data) {
  return request({
    url: '/api/BaseProductBOMDetail/Delete',
    method: 'post',
    data
  })
}

// 工艺路线列表 --分页
export function baseRouteList(data) {
  return request({
    url: '/api/BaseRoute/List',
    method: 'post',
    data
  })
}

// 工艺路线列表 --新增
export function baseRouteAdd(data) {
  return request({
    url: '/api/BaseRoute/Add',
    method: 'post',
    data
  })
}

// 工艺路线列表 --修改
export function baseRouteModify(data) {
  return request({
    url: '/api/BaseRoute/Modify',
    method: 'post',
    data
  })
}

// 工艺路线列表 --删除
export function baseRouteDelete(data) {
  return request({
    url: '/api/BaseRoute/Delete',
    method: 'post',
    data
  })
}

// 工艺路线列表 --复制
export function baseRouteCopy(data) {
  return request({
    url: '/api/BaseRoute/Copy',
    method: 'post',
    data
  })
}

// 工艺路线列表 --状态
export function baseRouteStatus(data) {
  return request({
    url: '/api/BaseRoute/ModifyStatus',
    method: 'post',
    data
  })
}

// 工艺路线明细列表 --分页
export function baseDetailList(data) {
  return request({
    url: '/api/BaseRouteDetail/List',
    method: 'post',
    data
  })
}

// 工艺路线明细 --新增
export function baseDetailAdd(data) {
  return request({
    url: '/api/BaseRouteDetail/Add',
    method: 'post',
    data
  })
}
// 工艺路线明细 --修改
export function baseDetailModify(data) {
  return request({
    url: '/api/BaseRouteDetail/Modify',
    method: 'post',
    data
  })
}
// 工艺路线明细 --删除
export function baseDetailDelete(data) {
  return request({
    url: '/api/BaseRouteDetail/Delete',
    method: 'post',
    data
  })
}

// 工序列表--分页
export function lineList(data) {
  return request({
    url: '/api/Route/List',
    method: 'post',
    data
  })
}

// 工序列表--分页
export function BaseProList(data) {
  return request({
    url: '/api/BaseProcess/List',
    method: 'post',
    data
  })
}

// 工序列表--分页
export function BaseProAdd(data) {
  return request({
    url: '/api/BaseProcess/Add',
    method: 'post',
    data
  })
}

// 工序列表--删除
export function BaseProDelete(data) {
  return request({
    url: '/api/BaseProcess/Delete',
    method: 'post',
    data
  })
}
// 工序列表--修改
export function BaseProModify(data) {
  return request({
    url: '/api/BaseProcess/Modify',
    method: 'post',
    data
  })
}

// 工序列表--状态
export function BaseProStatus(data) {
  return request({
    url: '/api/BaseProcess/ModifyStatus',
    method: 'post',
    data
  })
}

// 生产组织管理树状图
export function treeList(data) {
  return request({
    url: '/api/BaseProduceOrganization/ListProductionOrganization',
    method: 'post',
    data
  })
}

// 生产组织管理--工厂分页
export function factoryList(data) {
  return request({
    url: '/api/BaseProduceOrganization/FactoryList',
    method: 'post',
    data
  })
}

// 生产组织管理--车间分页
export function workShopList(data) {
  return request({
    url: '/api/BaseProduceOrganization/WorkShopList',
    method: 'post',
    data
  })
}

// 生产组织管理--产线分页
export function ProductLineList(data) {
  return request({
    url: '/api/BaseProduceOrganization/ProductLineList',
    method: 'post',
    data
  })
}

// 生产组织管理--工作中心分页
export function WorkCenterList(data) {
  return request({
    url: '/api/BaseProduceOrganization/WorkCenterList',
    method: 'post',
    data
  })
}

// 生产组织管理--工位分页
export function stationList(data) {
  return request({
    url: '/api/BaseProduceOrganization/TerminalList',
    method: 'post',
    data
  })
}

// 生产组织管理--工厂增加
export function factoryAdd(data) {
  return request({
    url: '/api/BaseProduceOrganization/FactoryAdd',
    method: 'post',
    data
  })
}

// 生产组织管理--车间增加
export function workShopAdd(data) {
  return request({
    url: '/api/BaseProduceOrganization/WorkShopAdd',
    method: 'post',
    data
  })
}

// 生产组织管理--产线增加
export function ProductLineAdd(data) {
  return request({
    url: '/api/BaseProduceOrganization/ProductLineAdd',
    method: 'post',
    data
  })
}

// 生产组织管理--工作中心增加
export function WorkCenterAdd(data) {
  return request({
    url: '/api/BaseProduceOrganization/WorkCenterAdd',
    method: 'post',
    data
  })
}

// 生产组织管理--工位增加
export function stationAdd(data) {
  return request({
    url: '/api/BaseProduceOrganization/TerminalAdd',
    method: 'post',
    data
  })
}

// 生产组织管理--工厂删除
export function factoryDelete(data) {
  return request({
    url: '/api/BaseProduceOrganization/FactoryDelete',
    method: 'post',
    data
  })
}

// 生产组织管理--车间删除
export function workShopDelete(data) {
  return request({
    url: '/api/BaseProduceOrganization/WorkShopDelete',
    method: 'post',
    data
  })
}

// 生产组织管理--产线删除
export function ProductLineDelete(data) {
  return request({
    url: '/api/BaseProduceOrganization/ProductLineDelete',
    method: 'post',
    data
  })
}

// 生产组织管理--工作中心删除
export function WorkCenterDelete(data) {
  return request({
    url: '/api/BaseProduceOrganization/WorkCenterDelete',
    method: 'post',
    data
  })
}

// 生产组织管理--工位删除
export function stationDelete(data) {
  return request({
    url: '/api/BaseProduceOrganization/TerminalDelete',
    method: 'post',
    data
  })
}

// 生产组织管理--工厂编辑
export function factoryModify(data) {
  return request({
    url: '/api/BaseProduceOrganization/FactoryModify',
    method: 'post',
    data
  })
}

// 生产组织管理--车间编辑
export function workShopModify(data) {
  return request({
    url: '/api/BaseProduceOrganization/WorkShopModify',
    method: 'post',
    data
  })
}

// 生产组织管理--产线编辑
export function ProductLineModify(data) {
  return request({
    url: '/api/BaseProduceOrganization/ProductLineModify',
    method: 'post',
    data
  })
}

// 生产组织管理--工作中心编辑
export function WorkCenterModify(data) {
  return request({
    url: '/api/BaseProduceOrganization/WorkCenterModify',
    method: 'post',
    data
  })
}

// 生产组织管理--工位编辑
export function stationModify(data) {
  return request({
    url: '/api/BaseProduceOrganization/TerminalModify',
    method: 'post',
    data
  })
}

// 生产组织管理--车间状态
export function workShopStatus(data) {
  return request({
    url: '/api/BaseProduceOrganization/WorkShopModifyStatus',
    method: 'post',
    data
  })
}

// 生产组织管理--产线状态
export function ProductLineStatus(data) {
  return request({
    url: '/api/BaseProduceOrganization/ProductLineModifyStatus',
    method: 'post',
    data
  })
}

// 生产组织管理--工作中心状态
export function WorkCenterStatus(data) {
  return request({
    url: '/api/BaseProduceOrganization/WorkCenterModifyStatus',
    method: 'post',
    data
  })
}

// 生产组织管理--工位状态
export function stationStatus(data) {
  return request({
    url: '/api/BaseProduceOrganization/TerminalModifyStatus',
    method: 'post',
    data
  })
}

// 基础数据 - 物料信息管理 - 物料类型列表
export function MaterialTypeList(data) {
  return request({
    url: '/api/BaseMaterialType/List',
    method: 'post',
    data
  })
}

// 基础数据 - 物料信息管理 - 物料类型新增
export function MaterialTypeAdd(data) {
  return request({
    url: '/api/BaseMaterialType/Add',
    method: 'post',
    data
  })
}

// 基础数据 - 物料信息管理 - 物料类型删除
export function MaterialTypeDelete(data) {
  return request({
    url: '/api/BaseMaterialType/Delete',
    method: 'post',
    data
  })
}

// 基础数据 - 物料信息管理 - 物料类型编辑
export function MaterialTypeModify(data) {
  return request({
    url: '/api/BaseMaterialType/Modify',
    method: 'post',
    data
  })
}

// 基础数据 - 物料信息管理 - 物料类型状态
export function MaterialTypeModifyStatus(data) {
  return request({
    url: '/api/BaseMaterialType/ModifyStatus',
    method: 'post',
    data
  })
}

// 基础数据 - 组织架构维护 - 部门信息列表
export function DepartmentList(data) {
  return request({
    url: '/api/BaseOrganizationDept/List',
    method: 'post',
    data
  })
}

// 基础数据 - 组织架构维护 - 部门信息列表增加
export function DepartmentAdd(data) {
  return request({
    url: '/api/BaseOrganizationDept/Add',
    method: 'post',
    data
  })
}

// 基础数据 - 组织架构维护 - 部门信息列表删除
export function DepartmentDelete(data) {
  return request({
    url: '/api/BaseOrganizationDept/Delete',
    method: 'post',
    data
  })
}

// 基础数据 - 组织架构维护 - 部门信息列表修改
export function DepartmentModify(data) {
  return request({
    url: '/api/BaseOrganizationDept/Modify',
    method: 'post',
    data
  })
}

// 基础数据 - 组织架构维护 - 部门信息列表修改
export function DepartmentModifyStatus(data) {
  return request({
    url: '/api/BaseOrganizationDept/ModifyStatus',
    method: 'post',
    data
  })
}

// 基础数据 - 组织架构管理 - 人员信息列表
export function PerList(data) {
  return request({
    url: '/api/BaseOrganizationStaff/List',
    method: 'post',
    data
  })
}

// 基础数据 - 组织架构管理 - 人员信息增加
export function PerAdd(data) {
  return request({
    url: '/api/BaseOrganizationStaff/Add',
    method: 'post',
    data
  })
}

// 基础数据 - 组织架构管理 - 人员信息删除
export function PerDelete(data) {
  return request({
    url: '/api/BaseOrganizationStaff/Delete',
    method: 'post',
    data
  })
}

// 基础数据 - 组织架构管理 - 人员信息修改
export function PerModify(data) {
  return request({
    url: '/api/BaseOrganizationStaff/Modify',
    method: 'post',
    data
  })
}

// 基础信息 - 打印模板管理 - 打印模板维护列表
export function BarList(data) {
  return request({
    url: '/api/BarTemp/List',
    method: 'post',
    data
  })
}

// 基础信息 - 打印模板管理 - 打印模板维护增加
export function BarAdd(data) {
  return request({
    url: '/api/BarTemp/Add',
    method: 'post',
    data
  })
}

// 基础信息 - 打印模板管理 - 打印模板维护删除
export function BarDelete(data) {
  return request({
    url: '/api/BarTemp/Delete',
    method: 'post',
    data
  })
}

// 基础信息 - 打印模板管理 - 打印模板维护修改
export function BarModify(data) {
  return request({
    url: '/api/BarTemp/Modify',
    method: 'post',
    data
  })
}

// 基础信息 - 打印模板管理 - 工序与模板关系维护列表
export function BarTempList(data) {
  return request({
    url: '/api/BarTempProcess/List',
    method: 'post',
    data
  })
}

// 基础信息 - 打印模板管理 - 工序与模板关系维护增加
export function BarTempAdd(data) {
  return request({
    url: '/api/BarTempProcess/Add',
    method: 'post',
    data
  })
}

// 基础信息 - 打印模板管理 - 工序与模板关系维护删除
export function BarTempDelete(data) {
  return request({
    url: '/api/BarTempProcess/Delete',
    method: 'post',
    data
  })
}

// 基础信息 - 打印模板管理 - 工序与模板关系维护修改
export function BarTempModify(data) {
  return request({
    url: '/api/BarTempProcess/Modify',
    method: 'post',
    data
  })
}

//  基础数据 - 组织架构维护 - 供应商信息列表
export function BaseOrgList(data) {
  return request({
    url: '/api/BaseOrganizationSupplier/List',
    method: 'post',
    data
  })
}

//  基础数据 - 组织架构维护 - 供应商信息增加
export function BaseOrgAdd(data) {
  return request({
    url: '/api/BaseOrganizationSupplier/Add',
    method: 'post',
    data
  })
}

//  基础数据 - 组织架构维护 - 供应商信息删除
export function BaseOrgDelete(data) {
  return request({
    url: '/api/BaseOrganizationSupplier/Delete',
    method: 'post',
    data
  })
}

//  基础数据 - 组织架构维护 - 供应商信息编辑
export function BaseOrgModify(data) {
  return request({
    url: '/api/BaseOrganizationSupplier/Modify',
    method: 'post',
    data
  })
}

//  基础数据 - 组织架构维护 - 供应商信息状态
export function BaseOrgModifyStatus(data) {
  return request({
    url: '/api/BaseOrganizationSupplier/ModifyStatus',
    method: 'post',
    data
  })
}

