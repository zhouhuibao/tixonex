
import {articleType} from '@/api/articleManage'
const typeList = []

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
    statusArr,
    localeArr,
    searchData:[
        {
            title:'类型',
            type:'select',
            id:'type',
            option:typeList
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
    getArticleType({ commit, state }) {
        return new Promise((resolve, reject) => {
            articleType().then(response => {
                const {statusCode,content} = response
                const arr = [];
                content.forEach(item=>{
                    arr.push({key:item,value:item})
                })
                if(statusCode === 0 ){
                    state.typeList = arr
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