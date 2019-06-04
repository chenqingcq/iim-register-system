import request from '@/utils/axios'

export function getList(params) {
  return request({
    url: '/rosWeb/user/table',
    method: 'get',
    params
  })
}

export function getMonth(params) {
  return request({
    url: '/schedule/month',
    method: 'post',
    params
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
