import request from '@/utils/request'
//  基础数据 ---来料检验规则--列表分页
export function QuaIqcList(data) {
  return request({
    url: '/api/QuaBaseIqcRule/List',
    method: 'post',
    data
  })
}
//  基础数据 ---来料检验规则--增加
export function QuaIqcAdd(data) {
  return request({
    url: '/api/QuaBaseIqcRule/Add',
    method: 'post',
    data
  })
}
//  基础数据 ---来料检验规则--删除
export function QuaIqcDelete(data) {
  return request({
    url: '/api/QuaBaseIqcRule/Delete',
    method: 'post',
    data
  })
}

//  基础数据 ---来料检验规则--编辑
export function QuaIqcModify(data) {
  return request({
    url: '/api/QuaBaseIqcRule/Modify',
    method: 'post',
    data
  })
}

//  基础数据 ---来料检验规则--状态
export function QuaIqcStatus(data) {
  return request({
    url: '/api/QuaBaseIqcRule/ModifyStatus',
    method: 'post',
    data
  })
}

//  基础数据 ---原材料质量检验项--列表分页
export function QuaIqcInList(data) {
  return request({
    url: '/api/QuaBaseIqcInspect/List',
    method: 'post',
    data
  })
}
//  基础数据 ---原材料质量检验项--增加
export function QuaIqcInAdd(data) {
  return request({
    url: '/api/QuaBaseIqcInspect/Add',
    method: 'post',
    data
  })
}
//  基础数据 ---原材料质量检验项--删除
export function QuaIqcInDelete(data) {
  return request({
    url: '/api/QuaBaseIqcInspect/Delete',
    method: 'post',
    data
  })
}

//  基础数据 ---原材料质量检验项--编辑
export function QuaIqcInModify(data) {
  return request({
    url: '/api/QuaBaseIqcInspect/Modify',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项--状态
export function QuaIqcInStatus(data) {
  return request({
    url: '/api/QuaBaseIqcInspect/ModifyStatus',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项--复制
export function QuaIqcInCopy(data) {
  return request({
    url: '/api/QuaBaseIqcInspect/Copy',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项明细--列表分页
export function QuaIqDetList(data) {
  return request({
    url: '/api/QuaBaseIqcInspectDetail/List',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项明细--列表增加
export function QuaIqDetAdd(data) {
  return request({
    url: '/api/QuaBaseIqcInspectDetail/Add',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项明细--列表删除
export function QuaIqDetDelete(data) {
  return request({
    url: '/api/QuaBaseIqcInspectDetail/Delete',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项明细--列表修改
export function QuaIqDetModify(data) {
  return request({
    url: '/api/QuaBaseIqcInspectDetail/Modify',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷类型--列表分页
export function QuaDefList(data) {
  return request({
    url: '/api/QuaBaseDefectType/List',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷类型--列表增加
export function QuaDefAdd(data) {
  return request({
    url: '/api/QuaBaseDefectType/Add',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷类型--列表删除
export function QuaDefDelete(data) {
  return request({
    url: '/api/QuaBaseDefectType/Delete',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷类型--列表修改
export function QuaDefModify(data) {
  return request({
    url: '/api/QuaBaseDefectType/Modify',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷类型--列表状态
export function QuaDefStatus(data) {
  return request({
    url: '/api/QuaBaseDefectType/ModifyStatus',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷--列表分页
export function QuaProduList(data) {
  return request({
    url: '/api/QuaBaseProductDefect/List',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷--列表增加
export function QuaProduAdd(data) {
  return request({
    url: '/api/QuaBaseProductDefect/Add',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷--列表删除
export function QuaProduDelete(data) {
  return request({
    url: '/api/QuaBaseProductDefect/Delete',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷--列表修改
export function QuaProduModify(data) {
  return request({
    url: '/api/QuaBaseProductDefect/Modify',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷--列表状态
export function QuaProduStatus(data) {
  return request({
    url: '/api/QuaBaseProductDefect/ModifyStatus',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表分页
export function QuaIpqcList(data) {
  return request({
    url: '/api/QuaBaseIpqcI/List',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表新增
export function QuaIpqcAdd(data) {
  return request({
    url: '/api/QuaBaseIpqcI/Add',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表修改
export function QuaIpqcModify(data) {
  return request({
    url: '/api/QuaBaseIpqcI/Modify',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表状态
export function QuaIpqcModifyStatus(data) {
  return request({
    url: '/api/QuaBaseIpqcI/ModifyStatus',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表删除
export function QuaIpqcDelete(data) {
  return request({
    url: '/api/QuaBaseIpqcI/Delete',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表复制
export function QuaIpqcCopy(data) {
  return request({
    url: '/api/QuaBaseIpqcI/Copy',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项明细--列表分页
export function QuaIpqcIDeList(data) {
  return request({
    url: '/api/QuaBaseIpqcIDetail/List',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项明细--列表新增
export function QuaIpqcIDeAdd(data) {
  return request({
    url: '/api/QuaBaseIpqcIDetail/Add',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项明细--列表修改
export function QuaIpqcIDeModify(data) {
  return request({
    url: '/api/QuaBaseIpqcIDetail/Modify',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项明细--列表删除
export function QuaIpqcIDeDelete(data) {
  return request({
    url: '/api/QuaBaseIpqcIDetail/Delete',
    method: 'post',
    data
  })
}

//  过程检验任务 - 过程检验任务--获取任务单号
export function CreateTaskNum(data) {
  return request({
    url: '/api/QuaTaskInspectWoSn/CreateTaskNum',
    method: 'post',
    data
  })
}

//  过程检验任务 - 过程检验任务--获取SN查询
export function QuerySN(data) {
  return request({
    url: '/api/QuaTaskInspectWoSn/Query',
    method: 'post',
    data
  })
}

//  过程检验任务 - 过程检验任务--过程成品检验列表
export function QuaTaskList(data) {
  return request({
    url: '/api/QuaTaskInspect/List',
    method: 'post',
    data
  })
}

//  过程检验任务 - 过程检验任务--过程成品检验新增
export function QuaTaskAdd(data) {
  return request({
    url: '/api/QuaTaskInspect/Add',
    method: 'post',
    data
  })
}

//  过程检验任务 - 过程检验任务--过程成品检验删除
export function QuaTaskDelete(data) {
  return request({
    url: '/api/QuaTaskInspect/Delete',
    method: 'post',
    data
  })
}

//  过程检验任务 - 过程检验任务--过程成品检验编辑
export function QuaTaskModify(data) {
  return request({
    url: '/api/QuaTaskInspect/Modify',
    method: 'post',
    data
  })
}

//  过程检验任务 - 过程检验任务--过程成品检验明细列表
export function QuaDetaiList(data) {
  return request({
    url: '/api/QuaTaskInspectDetail/List',
    method: 'post',
    data
  })
}

//  过程检验任务 - 过程检验任务--过程成品检验明细保存
export function QuaDetaiSave(data) {
  return request({
    url: '/api/QuaTaskInspectDetail/Save',
    method: 'post',
    data
  })
}

//  过程检验任务 - 过程检验任务--过程成品检验明细提交
export function QuaDetaiSubmit(data) {
  return request({
    url: '/api/QuaTaskInspectDetail/Submit',
    method: 'post',
    data
  })
}

// QuaBaseIqcRule质量管理 - 原材料检验参数 - 抽检比例参数列表
export function QuaBaseList(data) {
  return request({
    url: '/api/QuaBaseIqcRule/List',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 抽检比例参数列表
export function QuaList(data) {
  return request({
    url: '/api/QuaBaseIqcRule/List',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 抽检比例参数列表新增
export function QuaAdd(data) {
  return request({
    url: '/api/QuaBaseIqcRule/Add',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 抽检比例参数列表修改
export function QuaModify(data) {
  return request({
    url: '/api/QuaBaseIqcRule/Modify',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 抽检比例参数列表删除
export function QuaDelete(data) {
  return request({
    url: '/api/QuaBaseIqcRule/Delete',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 抽检比例参数列表状态
export function QuaModifyStatus(data) {
  return request({
    url: '/api/QuaBaseIqcRule/ModifyStatus',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 抽检比例参数列表状态
export function QuaQuery(data) {
  return request({
    url: '/api/QuaBaseIqcRuleDetail/List',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 抽检比例参数明细列表
export function QuaDetailAdd(data) {
  return request({
    url: '/api/QuaBaseIqcRuleDetail/Add',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 抽检比例参数明细删除
export function QuaDetailDelete(data) {
  return request({
    url: '/api/QuaBaseIqcRuleDetail/Delete',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 抽检比例参数明修改
export function QuaDetailModify(data) {
  return request({
    url: '/api/QuaBaseIqcRuleDetail/Modify',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 抽检比例参数明细状态
export function QuaDetailModifyStatus(data) {
  return request({
    url: '/api/QuaBaseIqcRuleDetail/ModifyStatus',
    method: 'post',
    data
  })
}

// 质量管理 - 基础数据 - 产品缺陷类型列表
export function productList(data) {
  return request({
    url: '/api/QuaBaseIqcDefect/List',
    method: 'post',
    data
  })
}

// 质量管理 - 基础数据 - 产品缺陷类型列表删除
export function productDelete(data) {
  return request({
    url: '/api/QuaBaseIqcDefect/Delete',
    method: 'post',
    data
  })
}

// 质量管理 - 基础数据 - 产品缺陷类型列表修改
export function productModify(data) {
  return request({
    url: '/api/QuaBaseIqcDefect/Modify',
    method: 'post',
    data
  })
}

// 质量管理 - 基础数据 - 产品缺陷类型列表增加
export function productAdd(data) {
  return request({
    url: '/api/QuaBaseIqcDefect/Add',
    method: 'post',
    data
  })
}

// 质量管理 - 基础数据 - 产品缺陷类型列表增加
export function productModifyStatus(data) {
  return request({
    url: '/api/QuaBaseIqcDefect/ModifyStatus',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 来料检验项列表
export function IncomingList(data) {
  return request({
    url: '/api/QuaBaseIqcItem/List',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 来料检验项增加
export function IncomingAdd(data) {
  return request({
    url: '/api/QuaBaseIqcItem/Add',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 来料检验项删除
export function IncomingDelete(data) {
  return request({
    url: '/api/QuaBaseIqcItem/Delete',
    method: 'post',
    data
  })
}

// 质量管理 - 原材料检验参数 - 来料检验项修改
export function IncomingModify(data) {
  return request({
    url: '/api/QuaBaseIqcItem/Modify',
    method: 'post',
    data
  })
}

// 质量管理 - 制程检验参数 - 制程检验项列表
export function QuaMakeList(data) {
  return request({
    url: '/api/QuaMakeInspect/List',
    method: 'post',
    data
  })
}

// 质量管理 - 制程检验参数 - 制程检验项增加
export function QuaMakeAdd(data) {
  return request({
    url: '/api/QuaMakeInspect/Add',
    method: 'post',
    data
  })
}

// 质量管理 - 制程检验参数 - 制程检验项删除
export function QuaMakeDelete(data) {
  return request({
    url: '/api/QuaMakeInspect/Delete',
    method: 'post',
    data
  })
}

// 质量管理 - 制程检验参数 - 制程检验项编辑
export function QuaMakeModify(data) {
  return request({
    url: '/api/QuaMakeInspect/Modify',
    method: 'post',
    data
  })
}

// 质量管理 - 制程检验参数 - 制程检验项状态
export function QuaMakeModifyStatus(data) {
  return request({
    url: '/api/QuaMakeInspect/ModifyStatus',
    method: 'post',
    data
  })
}

// 质量管理 - 制程检验参数 - 制程检缺陷项列表
export function QuaDefectList(data) {
  return request({
    url: '/api/QuaMakeInspectDefect/List',
    method: 'post',
    data
  })
}

// 质量管理 - 制程检验参数 - 制程检缺陷项增加
export function QuaDefectAdd(data) {
  return request({
    url: '/api/QuaMakeInspectDefect/Add',
    method: 'post',
    data
  })
}

// 质量管理 - 制程检验参数 - 制程检缺陷项删除
export function QuaDefectDetele(data) {
  return request({
    url: '/api/QuaMakeInspectDefect/Delete',
    method: 'post',
    data
  })
}

// 质量管理 - 制程检验参数 - 制程检缺陷项修改
export function QuaDefectModify(data) {
  return request({
    url: '/api/QuaMakeInspectDefect/Modify',
    method: 'post',
    data
  })
}

// 质量管理 - 制程检验参数 - 制程检缺陷项修改
export function QuaDefectModifyStatus(data) {
  return request({
    url: '/api/QuaMakeInspectDefect/ModifyStatus',
    method: 'post',
    data
  })
}
