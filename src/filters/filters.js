import Vue from 'vue'
import moment from 'moment'
//准备一个过滤器
//参数1：过滤器的名字
//参数2：过滤器的具体实现
Vue.filter('formatTime',function(value){

    // value是一个日期，我要处理成年-月-日的形式
    // YYYY-MM-DD的格式
    // 一般要处理日期这种类型的字符串，还会用到一个库，moment.js
    return moment(value).format('YYYY-MM-DD')
})