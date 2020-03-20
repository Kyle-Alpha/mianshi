import request from '@/utils/request.js';

// 暴露一个登录的方法出去
export function login(data) {
    //发请求
    return request({
        url:  '/login',
        method: 'post',
        data,
        // 携带cookie
    })
}
