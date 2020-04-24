
const typeList=[
    {
        name:'公告',
        value:'NOTICE'
    },
    {
        name:'资讯',
        value:'NEWS'
    },
    {
        name:'帮助',
        value:'HELP'
    },
    {
        name:'注册协议',
        value:'AGREEMENT'
    },
    {
        name:'费用说明',
        value:'FEE'
    },
    {
        name:'服务条款',
        value:'SERVICE'
    },
    {
        name:'隐私声明',
        value:'PRIVACY'
    },
    {
        name:'加入我们',
        value:'JOIN_US'
    },
    {
        name:'平台说明',
        value:'PLATFORM'
    },
    {
        name:'商家认证公告',
        value:'MERCHANT' 
    },
    {
        name:'所有类型',
        value:'ALL'
    },
]

const statusArr=[
    {
        key:'启用',
        value:'1'
    },
    {
        key:'禁用',
        value:'2'
    }
]

const localeArr=[
    {
        key:'中文',
        value:'zh_CN'
    },
    {
        key:'英文',
        value:'en_US'
    }
]


const state={
    typeList,
    searchData:[
        {
            title:'类型',
            type:'select',
            id:'type',
            option:typeList,
            optionObj:{
                key:'name',
                value:'value'
            }
        },
        {
            title:'文章状态',
            type:'select',
            option:statusArr,
            id:'status'
        },
        {
            title:'语言',
            type:'select',
            option:localeArr,
            id:'locale'
        }
    ]
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