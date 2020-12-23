// const newUrl = 'http://localhost:37120' // 测试地址
// const newUrl = 'http://192.168.1.151:20000' // 本地地址
const newUrl = 'http://121.196.123.158/WebAPI' // 服务器地址
import request from '@/utils/request'

//  基础数据 ---来料检验规则--列表分页
export function QuaIqcList(data) {
  return request({
    url: newUrl + '/api/QuaIqcRule/List',
    method: 'post',
    data
  })
}
//  基础数据 ---来料检验规则--增加
export function QuaIqcAdd(data) {
  return request({
    url: newUrl + '/api/QuaIqcRule/Add',
    method: 'post',
    data
  })
}
//  基础数据 ---来料检验规则--删除
export function QuaIqcDelete(data) {
  return request({
    url: newUrl + '/api/QuaIqcRule/Delete',
    method: 'post',
    data
  })
}

//  基础数据 ---来料检验规则--编辑
export function QuaIqcModify(data) {
  return request({
    url: newUrl + '/api/QuaIqcRule/Modify',
    method: 'post',
    data
  })
}

//  基础数据 ---来料检验规则--状态
export function QuaIqcStatus(data) {
  return request({
    url: newUrl + '/api/QuaIqcRule/ModifyStatus',
    method: 'post',
    data
  })
}

//  基础数据 ---原材料质量检验项--列表分页
export function QuaIqcInList(data) {
  return request({
    url: newUrl + '/api/QuaIqcInspect/List',
    method: 'post',
    data
  })
}
//  基础数据 ---原材料质量检验项--增加
export function QuaIqcInAdd(data) {
  return request({
    url: newUrl + '/api/QuaIqcInspect/Add',
    method: 'post',
    data
  })
}
//  基础数据 ---原材料质量检验项--删除
export function QuaIqcInDelete(data) {
  return request({
    url: newUrl + '/api/QuaIqcInspect/Delete',
    method: 'post',
    data
  })
}

//  基础数据 ---原材料质量检验项--编辑
export function QuaIqcInModify(data) {
  return request({
    url: newUrl + '/api/QuaIqcInspect/Modify',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项--状态
export function QuaIqcInStatus(data) {
  return request({
    url: newUrl + '/api/QuaIqcInspect/ModifyStatus',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项--复制
export function QuaIqcInCopy(data) {
  return request({
    url: newUrl + '/api/QuaIqcInspect/Copy',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项明细--列表分页
export function QuaIqDetList(data) {
  return request({
    url: newUrl + '/api/QuaIqcInspectDetail/List',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项明细--列表增加
export function QuaIqDetAdd(data) {
  return request({
    url: newUrl + '/api/QuaIqcInspectDetail/Add',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项明细--列表删除
export function QuaIqDetDelete(data) {
  return request({
    url: newUrl + '/api/QuaIqcInspectDetail/Delete',
    method: 'post',
    data
  })
}

// 基础数据-- - 原材料质量检验项明细--列表修改
export function QuaIqDetModify(data) {
  return request({
    url: newUrl + '/api/QuaIqcInspectDetail/Modify',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷类型--列表分页
export function QuaDefList(data) {
  return request({
    url: newUrl + '/api/QuaDefectType/List',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷类型--列表增加
export function QuaDefAdd(data) {
  return request({
    url: newUrl + '/api/QuaDefectType/Add',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷类型--列表删除
export function QuaDefDelete(data) {
  return request({
    url: newUrl + '/api/QuaDefectType/Delete',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷类型--列表修改
export function QuaDefModify(data) {
  return request({
    url: newUrl + '/api/QuaDefectType/Modify',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷类型--列表状态
export function QuaDefStatus(data) {
  return request({
    url: newUrl + '/api/QuaDefectType/ModifyStatus',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷--列表分页
export function QuaProduList(data) {
  return request({
    url: newUrl + '/api/QuaProductDefect/List',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷--列表增加
export function QuaProduAdd(data) {
  return request({
    url: newUrl + '/api/QuaProductDefect/Add',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷--列表删除
export function QuaProduDelete(data) {
  return request({
    url: newUrl + '/api/QuaProductDefect/Delete',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷--列表修改
export function QuaProduModify(data) {
  return request({
    url: newUrl + '/api/QuaProductDefect/Modify',
    method: 'post',
    data
  })
}

// 基础数据-- - 产品缺陷--列表状态
export function QuaProduStatus(data) {
  return request({
    url: newUrl + '/api/QuaProductDefect/ModifyStatus',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表分页
export function QuaIpqcList(data) {
  return request({
    url: newUrl + '/api/QuaIpqcI/List',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表新增
export function QuaIpqcAdd(data) {
  return request({
    url: newUrl + '/api/QuaIpqcI/Add',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表修改
export function QuaIpqcModify(data) {
  return request({
    url: newUrl + '/api/QuaIpqcI/Modify',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表状态
export function QuaIpqcModifyStatus(data) {
  return request({
    url: newUrl + '/api/QuaIpqcI/ModifyStatus',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表删除
export function QuaIpqcDelete(data) {
  return request({
    url: newUrl + '/api/QuaIpqcI/Delete',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项--列表复制
export function QuaIpqcCopy(data) {
  return request({
    url: newUrl + '/api/QuaIpqcI/Copy',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项明细--列表分页
export function QuaIpqcIDeList(data) {
  return request({
    url: newUrl + '/api/QuaIpqcIDetail/List',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项明细--列表新增
export function QuaIpqcIDeAdd(data) {
  return request({
    url: newUrl + '/api/QuaIpqcIDetail/Add',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项明细--列表修改
export function QuaIpqcIDeModify(data) {
  return request({
    url: newUrl + '/api/QuaIpqcIDetail/Modify',
    method: 'post',
    data
  })
}

//  质量管理 - 基础数据 - 产品质量检验项明细--列表删除
export function QuaIpqcIDeDelete(data) {
  return request({
    url: newUrl + '/api/QuaIpqcIDetail/Delete',
    method: 'post',
    data
  })
}
