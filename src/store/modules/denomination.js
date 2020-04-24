

const coinType=[
    {
        key:'真实货币',
        value:'real'
    },
    {
        key:'比特币',
        value:'btc'
    },
    {
        key:'usdt数字货币',
        value:'usdt'
    },
    {
        key:'以太币',
        value:'eth'
    },
    {
        key:'以太坊代币',
        value:'token'
    },
    {
        key:'以太坊经典',
        value:'etc'
    }
]

const sxfType=[
    {
        key:'百分比',
        value:0
    },
    {
        key:'固定值',
        value:1
    }
]

const edu=[
    {
        key:'否',
        value:0
    },
    {
        key:'是',
        value:1
    }
]

const statusArr=[
    {
        key:'启用',
        value:0
    },
    {
        key:'禁用',
        value:1
    }
]

const nameArr=[
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
    }
]

const closeArr=[
    {
        key:'开放',
        value:'SHOW'
    },
    {
        key:'关闭',
        value:'HIDE'
    },
]

const deleteArr=[
    {
        key:'不删除',
        value:0
    },
    {
        key:'删除',
        value:1
    },
]

const JYTypeArr=[
    {
        key:'所有',
        value:'ALL'
    },
    {
        key:'买入',
        value:'BUY'
    },
    {
        key:'卖出',
        value:'SELL'
    }
]

const JYSCArr=[
    {
        key:'TSH/USDT',
        value:'TSH/USDT'
    },
    {
        key:'OMG/USDT',
        value:'OMG/USDT'
    },
    {
        key:'LTC/USDT',
        value:'LTC/USDT'
    },
    {
        key:'ETC/USDT',
        value:'ETC/USDT'
    },
    {
        key:'ETH/USDT',
        value:'ETH/USDT'
    },
    {
        key:'BTC/USDT',
        value:'BTC/USDT'
    }
]



const WTstatusArr = [
    {
        key:'所有',
        value:'ALL'
    },
    {
        key:'未完全成交',
        value:'OPEN',
    },
    {
        key:'完全成交',
        value:'DEAL',
    },
    {
        key:'已经撤单',
        value:'CANCELED',
    },
    {
        key:'订单异常,无法完成交易',
        value:'EXCEPTION',
    }
]

const searchWT=[
    {
        title:'成交开始时间',
        type:'dateTime',
        id:'startLastTradeTime'
    },
    {
        title:'成交结束时间',
        type:'dateTime',
        id:'endLastTradeTime'
    },
    {
        title:'委托开始时间',
        type:'dateTime',
        id:'addStartTime'
    },
    {
        title:'委托结束时间',
        type:'dateTime',
        id:'addEndTime'
    },
    {
        title:'用户名',
        type:'text',
        id:'userName'
    },
    {
        title:'手机号',
        type:'text',
        id:'mobile'
    },
    {
        title:'交易市场',
        type:'select',
        option:JYSCArr,
        id:'status'
    },
    {
        title:'数量',
        type:'text',
        id:'amount'
    },
    {
        title:'单价',
        type:'text',
        id:'price'
    },
    {
        title:'成交状态',
        type:'select',
        option:WTstatusArr,
        id:'status',
    },
    {
        title:'交易类型',
        type:'select',
        option:JYTypeArr,
        id:'type'
    }
]


const state={
    edu,
    nameArr,
    sxfType,
    deleteArr,
    closeArr,
    coinType,
    JYTypeArr,
    statusArr,
    JYSCArr,
    WTstatusArr,
    searchWT
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