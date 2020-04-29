import Cookies from 'js-cookie'
import { login, logout, getInfo,userSettingDetails,userPermissionMenuList } from '@/api/user'
import { getToken, setToken, removeToken,
  setUserInfo,
  toTree,
  removeUserInfo,
  dataType } from '@/utils/auth'
import { resetRouter } from '@/router'
import route from '@/router'
import Layout from '@/layout'
import { Message } from 'element-ui'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userId:'',
    userInfo:{},
    menuList:[]
  }
}

const getComponent=(path)=>{
  let component = null
  const {routes} = route.options
  // this.$router.options.routes
  routes.forEach(item=>{
    if(dataType(item.children) === 'Array' && item.children.length>0){
      item.children.forEach(childrenItem=>{
        if(path === childrenItem.path){
          component = childrenItem.component
        }
      })
    }
  })
  return component
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
  },
  set_user_info:(state, avatar) => {
    state.userInfo = {...avatar}
  },
  setMenuList:(state, list) => {
    state.menuList = list
  },
  
}

const actions = {
  // user login
  login({ commit,state,dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {

        const { statusCode,content:{token,userId} } = response

        if(statusCode === 0 ){
          commit('SET_TOKEN', token)
          dispatch('getInfoById',{payload:userId})
          dispatch('getMenuList',{payload:userId})
          
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
  getInfoById({ commit,state },payload) {
    return new Promise((resolve, reject) => {
      userSettingDetails({userId:payload.payload}).then(response => {
        const { statusCode,content } = response

        if (statusCode === 0) {
          commit('set_user_info', content)
          setUserInfo(content)
        }

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMenuList({ commit,state },payload) {
    return new Promise((resolve, reject) => {
      userPermissionMenuList({userId:payload.payload}).then(response => {
        const { statusCode,content } = response
        if (statusCode === 0) {
          const list = toTree(content)
          list.forEach(item=>{
            item.component = Layout
            item.name = item.title
            item.meta={
              title:item.title,
              icon:item.icon
            }
            item.path = item.uri
            if(dataType(item.children) === 'Array' && item.children.length>0){
              item.redirect = `${item.uri}/${item.children[0].uri}`
              // item.path = item.children.length === 1 ? `${item.uri}/${item.children[0].uri}` : item.uri

              item.children.forEach(childrenItem=>{
                childrenItem.component = getComponent(childrenItem.uri)
                childrenItem.path = childrenItem.uri
                childrenItem.name = childrenItem.title
                childrenItem.meta={
                  title:childrenItem.title,
                  icon:childrenItem.icon
                }
              })
            }
          
          })      
          commit('setMenuList', list)
          
        }

        resolve(response)
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

