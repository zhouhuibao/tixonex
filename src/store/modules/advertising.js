
const statusArr=[
    {
        key:'启用',
        value:'SHOW'
    },
    {
        key:'禁用',
        value:'HIDE'
    }
]

const adTypeArr=[
    {
        key:'图文',
        value:'TEXT'
    },
    {
        key:'链接',
        value:'LINK'
    }
]

const showTypeArr=[
    {
        key:'网页',
        value:1
    },
    {
        key:'手机',
        value:2
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
    },
    {
        key:'繁体',
        value:'zh_TW'
    }
]


const state={
    localeArr,
    showTypeArr,
    adTypeArr,
    statusArr
}

const mutations={
    setFormData:(state,data)=>{
        console.log(state)
    }
}

const actions={
    
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}