import request from '@/utils/request.js';

// 暴露一个登录的方法出去
export function logout(params) {
    //发请求
    return request({
        url:  '/logout',
        params,
        // 携带cookie
    })
}
export function info(params) {
    //发请求
    return request({
        url:  '/info',
        params,
        // 携带cookie
    })
}
