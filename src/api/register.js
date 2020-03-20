import request from '@/utils/request.js';

export function register(data){
  return request({
    method: 'post',
    url: '/register',
    data
  })
}
export function sendsms(data){
  return request({
    method: 'post',
    url: '/sendsms',
    data
  })
}
