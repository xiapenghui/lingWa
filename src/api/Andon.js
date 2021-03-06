import request from '@/utils/request'
// Adn异常管理 - 异常信息管理 - 异常明细管理列表
export function AnList(data) {
  return request({
    url: '/api/AdnExcept/List',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常明细管理增加
export function AnAdd(data) {
  return request({
    url: '/api/AdnExcept/Add',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常明细管理删除
export function AnDelete(data) {
  return request({
    url: '/api/AdnExcept/Delete',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常明细管理编辑
export function AnModify(data) {
  return request({
    url: '/api/AdnExcept/Modify',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常明细管理状态
export function AnModifyStatus(data) {
  return request({
    url: '/api/AdnExcept/ModifyStatus',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常信息记录报表
export function AdnExceptList(data) {
  return request({
    url: '/api/AdnExceptRecord/List',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常发送组管理列表
export function AdnGroupList(data) {
  return request({
    url: '/api/AdnGroup/List',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常发送组管理新增
export function AdnGroupAdd(data) {
  return request({
    url: '/api/AdnGroup/Add',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常发送组管理删除
export function AdnGroupDelete(data) {
  return request({
    url: '/api/AdnGroup/Delete',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常发送组管理编辑
export function AdnGroupModify(data) {
  return request({
    url: '/api/AdnGroup/Modify',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常发送组管理状态
export function AdnGroupModifyStatus(data) {
  return request({
    url: '/api/AdnGroup/ModifyStatus',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常发送组员工管理列表
export function AdnGroupUserList(data) {
  return request({
    url: '/api/AdnGroupUser/List',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常发送组员工管理增加
export function AdnGroupUserAdd(data) {
  return request({
    url: '/api/AdnGroupUser/Add',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常发送组员工管理删除
export function AdnGroupUserDelete(data) {
  return request({
    url: '/api/AdnGroupUser/Delete',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常发送组员工管理编辑
export function AdnGroupUserModify(data) {
  return request({
    url: '/api/AdnGroupUser/Modify',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常与发送组关系管理列表
export function AdnSendList(data) {
  return request({
    url: '/api/AdnExceptRelationGroup/List',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常与发送组关系管理增加
export function AdnSendAdd(data) {
  return request({
    url: '/api/AdnExceptRelationGroup/Add',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常与发送组关系管理删除
export function AdnSendDelete(data) {
  return request({
    url: '/api/AdnExceptRelationGroup/Delete',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常与发送组关系管理修改
export function AdnSendModify(data) {
  return request({
    url: '/api/AdnExceptRelationGroup/Modify',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常与发送组关系管理修改
export function AdnSendModifyStatus(data) {
  return request({
    url: '/api/AdnExceptRelationGroup/ModifyStatus',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常与工位关系管理列表
export function AdnTerList(data) {
  return request({
    url: '/api/AdnExceptRelationTerminal/List',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常与工位关系管理增加
export function AdnTerAdd(data) {
  return request({
    url: '/api/AdnExceptRelationTerminal/Add',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常与工位关系管理删除
export function AdnTerDelete(data) {
  return request({
    url: '/api/AdnExceptRelationTerminal/Delete',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常与工位关系管理编辑
export function AdnTerModify(data) {
  return request({
    url: '/api/AdnExceptRelationTerminal/Modify',
    method: 'post',
    data
  })
}

// Adn异常管理 - 异常信息管理 - 异常与工位关系管理状态
export function AdnTerModifyStatus(data) {
  return request({
    url: '/api/AdnExceptRelationTerminal/ModifyStatus',
    method: 'post',
    data
  })
}
