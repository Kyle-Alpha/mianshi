import request from '@/utils/request'
// 企业题目数据统计
export function dataTitle(data) {
  return request({
    url: '/data/title',
    method: 'post',
    data
  })
}
// 企业题目数据统计
export function dataStatistics(data) {
  return request({
    url: '/data/statistics',
    method: 'post',
    data
  })
}
// 热门城市题目统计
export function dataHotCities(data) {
  return request({
    url: '/data/hot_cities',
    method: 'post',
    data
  })
}
