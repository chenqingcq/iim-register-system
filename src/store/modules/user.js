import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    username: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, username) => {
      state.username = username
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        var params = new URLSearchParams()
        params.append('userAccount', username)
        params.append('passWord', userInfo.password)
        login(params).then(response => {
          const data = response.data
          var usertoken = data.token+'&'+username
          setToken(usertoken)
          commit('SET_TOKEN', usertoken)
          commit('SET_NAME', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        var params = new URLSearchParams()
        var usertoken = state.token.split('&')
        params.append('token', usertoken[0])
        params.append('userAccount', usertoken[1])
        getInfo(params).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        var params = new URLSearchParams()
        params.append('token', state.token)
        params.append('userAccount', state.username)
        logout(params).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    
    // 获取分页数据
    GetVersionList({commit},pagination) {
      return new Promise((resolve, reject) => {
        var params = new URLSearchParams()
        params.append('currentPage', pagination.currentPage)
        params.append('count', pagination.count)
        getVersionList(params).then(() => {
          /*commit('SET_TOKEN', '')
          commit('SET_ROLES', [])*/
          /*removeToken()
          resolve()*/
         resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
