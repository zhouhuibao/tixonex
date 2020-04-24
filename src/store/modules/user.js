import Cookies from 'js-cookie'
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken,
  setUserInfo,
  removeUserInfo } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Message } from 'element-ui'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {

        const { statusCode,content:{token} } = response

        if(statusCode === 0 ){
          commit('SET_TOKEN', token)
          setUserInfo(response.content)
          setToken(token)
          Message({
            message: '登录成功',
            type: 'success'
          });
          setTimeout(()=>{
            resolve()
          },500)

          
        }else{
          Message({
            message: res.errorMessage,
            type: 'error'
          });
        }

        
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({token:state.token}).then(response => {
        const { statusCode } = response

        if (statusCode !== 0) {
          reject('token已过期')
        }

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    removeToken() // must remove  token  first
    removeUserInfo()
    resetRouter()
    commit('RESET_STATE')
    // return new Promise((resolve, reject) => {
    //   logout().then(() => {
    //     removeToken() // must remove  token  first
    //     removeUserInfo()
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

