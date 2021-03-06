// import { state:{coinList} } from './userManage'
import userManage from './userManage'

const {state:{coinList,groupArr}} = userManage

const typeArr=[
    {
        key:'所有',
        value:'ALL'
    },
    {
        key:'转出',
        value:'SEND'
    },
    {
        key:'转入',
        value:'RECEIVED'
    }
]

const statusArr=[
    {
        key:'所有',
        value:'ALL',
        valueNumber:10
    },
    {
        key:'正在申请',
        value:'APPLYING',
        valueNumber:0
    },
    {
        key:'审核通过',
        value:'PASSED',
        valueNumber:1
    },
    {
        key:'审核失败',
        value:'FAILED',
        valueNumber:2
    },
    {
        key:'节点确认',
        value:'CONFIRM',
        valueNumber:3
    }
]


const rollStatus=[
    {
        key:'待审核',
        value:0,
        valueString:'APPLYING'
    },
    {
        key:'审核成功',
        value:1,
        valueString:'PASSED'
    },
    {
        key:'审核失败',
        value:2,
        valueString:'FAILED'
    }
]


const transferHistory=[
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
        title:'目标地址',
        type:'text',
        id:'targetAddress'
    },
    {
        title:'币种名称',
        type:'select',
        option:coinList,
        id:'coinName'
    },
    {
        title:'类型',
        type:'select',
        option:typeArr,
        id:'type'
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

const rollOutAuditSearch=[
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
        title:'审核状态',
        type:'select',
        option:statusArr,
        id:'status'
    },
    {
        title:'用户分组',
        type:'select',
        option:groupArr,
        id:'groupType'
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




const state={
    typeArr,
    statusArr,
    rollStatus,
    transferHistory,
    rollOutAuditSearch
}

const mutations={
    
}

const actions={
    
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}