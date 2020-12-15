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

//  基础数据 ---原材料质量检验项--状态
// export function QuaIqcInStatus(data) {
//   return request({
//     url: newUrl + '/api/QuaIqcInspect/ModifyStatus',
//     method: 'post',
//     data
//   })
// }