import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import article from './modules/article'
import advertising from './modules/advertising'
import userManage from './modules/userManage'
import denomination from './modules/denomination'
import theCoinReward from './modules/theCoinReward'
import rollInOrOut from './modules/rollInOrOut'
import OTCManage from './modules/OTCManage'
import backstageSetting from './modules/backstageSetting'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    article,
    advertising,
    userManage,
    denomination,
    theCoinReward,
    rollInOrOut,
    OTCManage,
    backstageSetting
  },
  getters
})

export default store
