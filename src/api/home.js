import request from '@/utils/request.js'
// 退出登录
export function logout() {
  return request({
    url: '/logout'
  })
}
// 获取用户信息
export function info() {
  return request({
    url: '/info'
  })
}
