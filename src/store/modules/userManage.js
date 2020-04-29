import {nationalCode} from '@/api/user'
const statusArr=[
    {
        key:'正常',
        value:1
    },
    {
        key:'禁用',
        value:0
    }
]

const examineArr=[
    {
        key:'审核通过',
        value:1
    },
    {
        key:'审核失败',
        value:3
    }
]

const coinList =[
    {
        key:'BTC',
        value:'BTC'
    },
    {
        key:'USDT',
        value:'USDT'
    },
    {
        key:'ETH',
        value:'ETH'
    },
    {
        key:'ETC',
        value:'ETC'
    },
    {
        key:'LTC',
        value:'LTC'
    },
    {
        key:'OMG',
        value:'OMG'
    },
    {
        key:'TSH',
        value:'TSH'
    },
]

const authStatusArr=[
    {
        key:'待上传',
        value:0
    },
    {
        key:'审核通过',
        value:1
    },
    {
        key:'等待身份验证',
        value:2
    },
    {
        key:'审核失败',
        value:3
    }
]

const groupArr = [
    {
        key:'默认分组',
        value:'GROUP_TYPE_BASE'
    }
]

const accountList = [
    {
        key:'可用余额',
        value:0
    },
    {
        key:'冻结资产',
        value:1
    },
    {
        key:'锁定资产',
        value:2
    }
]

const changeList = [
    {
        key:'交易撮合',
        value:'TxMatch'
    },
    {
        key:'交易市场下单',
        value:'TxTrade'
    },
    {
        key:'交易撮合费用',
        value:'TxMatFee'
    },
    {
        key:'交易撮合完成后返回的冻结金',
        value:'TxMatRet'
    },
    {
        key:'后台取消交易，因为交易超时',
        value:'TxBgCanc'
    },
    {
        key:'用户取消交易',
        value:'TxUsrCc'
    },
    {
        key:'管理员取消交易',
        value:'TxMgrCc'
    },
    {
        key:'超级节点分红',
        value:'ShareOut'
    },
    {
        key:'从区块链中收到转账（外部进入）',
        value:'BcRev'
    },
    {
        key:'注册赠送',
        value:'Register'
    },
    {
        key:'推荐奖励',
        value:'Referrer'
    },
    {
        key:'冻结',
        value:'Freeze'
    },
    {
        key:'解冻',
        value:'UnFreeze'
    },
    {
        key:'内部转账',
        value:'Transfer'
    },
    {
        key:'外部提现',
        value:'Withdraw'
    },
    {
        key:'普通用户卖出数字货币冻结',
        value:'SellCoin'
    },
    {
        key:'普通用户取消卖出数字货币',
        value:'CcSell'
    },
    {
        key:'普通用户买入数字货币',
        value:'BuyCoin'
    },
    {
        key:'交易释放',
        value:'TxRel'
    },
    {
        key:'转入挖矿宝',
        value:'AddSav'
    },
    {
        key:'转出挖矿宝',
        value:'SubSav'
    },
    {
        key:'用户锁仓',
        value:'ToRecFee'
    }
]




const state={
    searchData:[
       
        {
            title:'用户真实姓名',
            type:'text',
            id:'realName'
        },
        {
            title:'身份认证状态',
            type:'select',
            option:authStatusArr,
            id:'authStatus'
        },
        {
            title:'手机号',
            type:'text',
            id:'mobile'
        },
        {
            title:'邮箱',
            type:'text',
            id:'email'
        },
        {
            title:'推荐人手机号',
            type:'text',
            id:'referrerMobile'
        },
        {
            title:'用户状态',
            type:'select',
            option:statusArr,
            id:'status'
        },
        {
            title:'用户分组',
            type:'select',
            option:groupArr,
            id:'groupType'
        }
    ],
    finaceSearchData:[
       
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
        {
            title:'用户分组',
            type:'select',
            option:groupArr,
            id:'groupType'
        }
    ],
    BillSearchData:[
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
            title:'账户特性',
            type:'select',
            option:accountList,
            id:'subType'
        },
        {
            title:'变动类型',
            type:'select',
            option:changeList,
            id:'reason'
        },
        {
            title:'币种名称',
            type:'select',
            option:coinList,
            id:'coinName'
        },
        {
            title:'用户分组',
            type:'select',
            option:authStatusArr,
            id:'groupType'
        },
        {
            title:'开始时间',
            type:'date',
            id:'startTime'
        },
        {
            title:'结束时间',
            type:'date',
            id:'endTime'
        },

    ],
    balanceList:[
        {
            title:'币种名称',
            type:'select',
            option:coinList,
            id:'coinName'
        },
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
    authStatusArr,
    groupArr,
    changeList,
    accountList,
    coinList,
    examineArr,
    nationalCodeList:[]
}



const mutations={
    setNationalCode: (state, list) => {
        state.nationalCodeList = list
    }
}

const actions={
    getNationalCode({ commit,state },payload){
        return new Promise((resolve,reject)=>{
            nationalCode().then(res=>{
                if(res.statusCode === 0){
                    commit('setNationalCode',res.content)
                    resolve(res.content)
                }
            })
        }).catch(error => {
            reject(error)
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}