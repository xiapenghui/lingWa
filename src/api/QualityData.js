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

//  过程检验任务 - 过程检验任务--过程成品检验新增
export function QuaDetaiList(data) {
  return request({
    url: '/api/QuaTaskInspectDetail/List',
    method: 'post',
    data
  })
}
