import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatTime',function(value){
    return moment(value).format('YYYY-MM-DD')
})
