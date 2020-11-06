// const newUrl = 'http://192.168.1.151:20000'  //本地地址
const newUrl = 'http://121.196.123.158' // 服务器地址
import request from '@/utils/request'

export function ListMenu() {
  return request({
    url: newUrl + '/WebAPI/api/User/ListMenu',
    method: 'post'
  })
}
