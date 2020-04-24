import {getUserAuthList,getUserRoleList,getUserList} from '@/api/backstageSetting'

const HTTPtype=[
    {
        key:'GET',
        value:'GET'
    },
    {
        key:'POST',
        value:'POST'
    },
    {
        key:'PUT',
        value:'PUT'
    },
    {
        key:'DELETE',
        value:'DELETE'
    },
    {
        key:'PATCH',
        value:'PATCH'
    },
    {
        key:'OPTIONS',
        value:'OPTIONS'
    },
    {
        key:'HEAD',
        value:'HEAD'
    }
]

const operationLogSearch=[
    {
        title:'ID',
        type:'text',
        id:'id'
    },
    {
        title:'User',
        type:'select',
        id:'userName',
        option:[],
        optionObj:{
            key:'username',
            value:'id'
        },
    },
    {
        title:'Method',
        type:'select',
        id:'method',
        option:HTTPtype
    },
    {
        title:'Path',
        type:'text',
        id:'path'
    },
    {
        title:'Ip',
        type:'text',
        id:'ip'
    }
]



const state={
    backstageUserSearch:[
        {
            title:'ID',
            type:'text',
            id:'id'
        },
    ],
    balanceList:[
        {
            title:'开始时间',
            type:'date',
            id:'timeBegin'
        },
        {
            title:'结束时间',
            type:'date',
            id:'timeEnd'
        },
    ],
    roleList:[],
    authList:[],
    HTTPtype,
    userList:[],
    operationLogSearch
}

const mutations={
    
}

const authOrRoleParmas={
    id:0,
    pageNo:1,
    pageSize:1000
}

const actions={
    getAuthList({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserAuthList(authOrRoleParmas).then(response => {
                const {statusCode,content} = response
                if(statusCode === 0 ){
                    state.authList = content
                    resolve()
                }
            }).catch(error => {
              reject(error)
            })
        })
    },
    getRoleList({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserRoleList(authOrRoleParmas).then(response => {
                const {statusCode,content} = response
                if(statusCode === 0 ){
                    state.roleList = content
                    resolve()
                }
            }).catch(error => {
              reject(error)
            })
        })
    },
    getUsersList({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserList(authOrRoleParmas).then(response => {
                const {statusCode,content} = response
                if(statusCode === 0 ){
                    state.userList = content
                    resolve()
                }
            }).catch(error => {
              reject(error)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}