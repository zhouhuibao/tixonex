

<template>
  <div class="operation">
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改交易市场' : '创建交易市场'"></el-page-header>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="80%"
      labelWidth="120px"
    />
  </div>
</template>

<script>





import {marketDetail,marketAddUpdate} from '@/api/trading'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty} from '@/utils/auth'

export default {
    name:'tMSOperation',
    data() {
        const {closeArr,nameArr,edu,deleteArr} = this.$store.state.denomination
        return {
            dataList:[
            {
                title:'名称',
                type:'select',
                option:nameArr,
                id:'coinName',
                required:true,
            },
            {
                title:'结算货币',
                type:'select',
                option:nameArr,
                id:'settlementCurrency',
                required:true,
            },
            {
                title:'是否开放市场',
                type:'radio',
                option:closeArr,
                id:'closed',
                required:true,
                value:'SHOW'
            },
            {
                title:'交易开始时间',
                type:'time',
                id:'dayExchangeBegin',
                required:true,
            },
            {
                title:'交易结束时间',
                type:'time',
                id:'dayExchangeEnd',
                required:true,
            },
            {
                title:'交易市场图片',
                type:'upload',
                id:'coinUrl',
                required:true,
                value:'',
                fileList:[],
            },
            {
                title:'买入手续费,0.1代表10%',
                type:'text',
                id:'feeCoin',
                required:true,
            },
            {
                title:'卖出手续费,0.1代表10%',
                type:'text',
                id:'feeCurrency',
                required:true,
            },
            {
                title:'单笔下单最大数量',
                type:'number',
                id:'maxExchangeNum',
                required:true,
            },
            {
                title:'单笔下单最小数量',
                type:'number',
                id:'minExchangeNum',
                required:true,
            },
            {
                title:'最小涨幅',
                type:'text',
                id:'minDecrease',
                required:true,
            },
            {
                title:'最大跌幅',
                type:'text',
                id:'maxIncrease',
                required:true,
            },
            {
                title:'最高挂单单价（0表示不限制）',
                type:'text',
                id:'maxCurrency',
                required:true,
            },
            {
                title:'最低卖单单价（0表示不限制）',
                type:'text',
                id:'minSellPrice',
                required:true,
            },
            {
                title:'最低买单单价（0表示不限制）',
                type:'text',
                id:'minBuyPrice',
                required:true,
            },
            {
                title:'是否属于USDT区',
                type:'radio',
                option:edu,
                id:'mineArea',
                required:true,
                value:0
            },
            {
                title:'是否属于预上线区',
                type:'radio',
                option:edu,
                id:'preArea',
                required:true,
                value:0
            },
            {
                title:'是否属于主交易区',
                type:'radio',
                option:edu,
                id:'mainArea',
                required:true,
                value:0
            },
            {
                title:'是否属于UKZ交易区',
                type:'radio',
                option:edu,
                id:'ukzArea',
                required:true,
                value:0
            },
            {
                title:'是否删除',
                type:'radio',
                option:deleteArr,
                id:'del',
                required:true,
                value:0
            },
        ],
            pageType:this.$route.query.id ? 'edit' : 'add',
            id:this.$route.query.id
        }
    },
    mounted(){
        const {pageType,id} = this

        if(pageType === 'edit'){  // 如果是修改,那就获取详情
            this.getDetail(id)
        }
    },
    methods:{
        getChild(data){
            const {pageType} = this;
            if(pageType === 'edit'){
                data.id = this.id
            }
            marketAddUpdate(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `交易市场${pageType === 'add' ? '创建' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$router.go(-1);
                }
            })
        },
        
        getDetail(id){
            marketDetail({marketId:id}).then(res=>{
                if(res.statusCode === 0){
                    const {content} = res
                    const list = this.dataList;
                    const arr = [];
                    list.forEach(item=>{
                        item.value=content[item.id]
                        const obj = {...item}
                        obj.value=content[item.id]
                        if(obj.type === 'upload' && isEmpty(obj.value)){
                            obj.fileList = [{status:'success',name:obj.value,uid:MathRandom(),url:obj.value}]
                        }
                        arr.push(obj)
                    })
                    this.dataList = arr
                   
                    


                }
            })
        }
    },
    components: {
      CreateForm
    } 
}
</script>

<style scoped>
.el-page-header{
    margin-bottom: 20px;
    padding-left: 10px;
}
.operation .el-form{
    width: 500px;
}
.el-select>.el-input{
    width: 380px;
}
</style>