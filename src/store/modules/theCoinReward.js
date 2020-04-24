// import { state:{coinList} } from './userManage'
import userManage from './userManage'
import { getCronConfig,getDispatch } from '@/api/theCoinReward'

const {state:{coinList}} = userManage
const bbSearch=[
    {
        title:'用户名',
        type:'text',
        id:'userName'
    },
    {
        title:'用户真实姓名',
        type:'text',
        id:'realName'
    },
    {
        title:'币种名称',
        type:'select',
        option:coinList,
        id:'coinName'
    },
]

const lockSearch=[
    {
        title:'用户名',
        type:'text',
        id:'userName'
    },
    
    {
        title:'币种名称',
        type:'select',
        option:coinList,
        id:'coinName'
    },
    {
        title:'开始时间',
        type:'dateTime',
        id:'startTime'
    },
    {
        title:'结束时间',
        type:'dateTime',
        id:'endTime'
    },
]

const rewardSearch=[
    {
        title:'手机号',
        type:'text',
        id:'mobile'
    },
    {
        title:'推荐人手机号',
        type:'text',
        id:'referrerMobile'
    },
    {
        title:'开始时间',
        type:'dateTime',
        id:'startTime'
    },
    {
        title:'结束时间',
        type:'dateTime',
        id:'endTime'
    },
]

const lockStatus=[
    {
        key:'打开',
        value:'SHOW'
    },
    {
        key:'关闭',
        value:'HIDE'
    }
]

const taskNameArr = []

const state={
    bbSearch,
    lockStatus,
    taskNameArr,
    lockSearch,
    rewardSearch
}

const mutations={
    
}

const actions={
    getCronConfigList({ commit, state }) {
        return new Promise((resolve, reject) => {
            getCronConfig().then(response => {
                const {statusCode,content} = response
                if(statusCode === 0 ){
                    console.log(state)
                    state.taskNameArr = content
                    resolve()
                }
            }).catch(error => {
              reject(error)
            })
        })
        
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}