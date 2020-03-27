import request from '@/utils/request'
// 封装一个获取学科列表的接口
export function subjectList(params) {
  return request({
    url: '/subject/list',
    method: 'get',
    params
  })
}

// 封装一个修改学科状态的接口
export function subjectStatus(data) {
  return request({
    url: '/subject/status',
    method: 'post',
    data
  })
}

// 封装一个添加学科的接口
export function subjectAdd(data) {
  return request({
    url: '/subject/add',
    method: 'post',
    data
  })
}

// 封装一个修改学科的接口
export function subjectEdit(data) {
  return request({
    url: '/subject/edit',
    method: 'post',
    data
  })
}

// 封装一个删除学科的接口
export function subjectDel(data) {
  return request({
    url: '/subject/remove',
    method: 'post',
    data
  })
}
