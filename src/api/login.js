import axios from '@/utils/axios'

export function login(params) {
  return axios({
    url: '/web/2.0.0/login/sign',
    method: 'post',
    params: params
  })
}

export function getInfo(params) {
  return axios({
    url: '/web/2.0.0/login/info',
    method: 'post',
    params: params
  })
}

export function logout(params) {
  return axios({
    url: '/web/2.0.0/login/logout',
    method: 'post',
    params: params
  })
}
