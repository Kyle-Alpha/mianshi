import axios from 'axios'

window.console.log('login.js被执行了')

// 暴露一个登录的方法出去
export function login(data) {

    //发请求
    return axios({
        url: process.env.VUE_APP_URL + '/login',
        method: 'post',
        data,
        // 携带cookie
        withCredentials: true,
    })
}