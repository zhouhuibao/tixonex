// import { state:{coinList} } from './userManage'
import userManage from './userManage'

const {state:{coinList,groupArr}} = userManage

const typeArr=[
    {
        key:'所有',
        value:10
    },
    {
        key:'匹配中',
        value:2
    },
    {
        key:'已完成',
        value:1
    },
    {
        key:'取消',
        value:100
    }
]
const JYTagArr=[
    {
        key:'未标识',
        value:0
    },
    {
        key:'用户确认',
        value:1
    },
    {
        key:'后台确认',
        value:2
    }
]


const statusArr=[
    {
        key:'所有',
        value:100
    },
    {
        key:'买',
        value:1
    },
    {
        key:'卖',
        value:2
    }
]

const FBArr=[
    {
        key:'CNY',
        value:'CNY'
    },
    {
        key:'USD',
        value:'USD'
    },
    {
        key:'JPY',
        value:'JPY'
    },
    {
        key:'AUD',
        value:'AUD'
    },
    {
        key:'HKD',
        value:'HKD'
    }
]

const OTCorderStatus=[
    {
        key:'所有',
        value:10
    },
    {
        key:'交易成功',
        value:1
    },
    {
        key:'匹配中',
        value:2
    },
    {
        key:'匹配成功',
        value:3
    },
    {
        key:'已接单',
        value:4
    },
    {
        key:'已付款',
        value:5
    },
    {
        key:'申诉中',
        value:6
    },
    {
        key:'已冻结',
        value:7
    },
    {
        key:'已经取消',
        value:100
    },
]


const SHstatus=[
    {
        key:'无申请',
        value:0
    },
    {
        key:'申请挂单',
        value:1
    },
    {
        key:'申请退款',
        value:2
    },
]

const isYX=[
    {
        key:'不允许',
        value:0
    },
    {
        key:'允许',
        value:1
    }
]

const OTCauthSeatch=[
    {
        title:'用户名',
        type:'text',
        id:'userName'
    },
    {
        title:'申请状态',
        type:'select',
        option:SHstatus,
        id:'status'
    },
    {
        title:'当前是否允许挂卖单',
        type:'select',
        option:isYX,
        id:'publishEnable'
    },
]

const otcOrderJYSearch=[
    {
        title:'买家姓名',
        type:'text',
        id:'buyName'
    },
    {
        title:'卖家姓名',
        type:'text',
        id:'sellName'
    },
    {
        title:'状态',
        type:'select',
        option:OTCorderStatus,
        id:'status'
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
    }
]


const otcOrderListSearch=[
    {
        title:'币种名称',
        type:'select',
        option:coinList,
        id:'coinName'
    },
    {
        title:'订单号',
        type:'text',
        id:'orderNo'
    },
    {
        title:'用户',
        type:'text',
        id:'userName'
    },
    {
        title:'状态',
        type:'select',
        option:statusArr,
        id:'status'
    },
    {
        title:'挂单类型',
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
    otcOrderListSearch,
    rollOutAuditSearch,
    FBArr,
    OTCorderStatus,
    otcOrderJYSearch,
    SHstatus,
    isYX,
    OTCauthSeatch,
    JYTagArr,
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