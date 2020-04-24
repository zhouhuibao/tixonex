

<template>
  <div class="operation">
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改OTC配置' : '新增OTC配置'"></el-page-header>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="80%"
      labelWidth="120px"
    />
  </div>
</template>

<script>





import {otcConfigDetail,coinModifyCoin} from '@/api/OTCManage'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty} from '@/utils/auth'

export default {
    name:'OTCConfigOperation',
    data() {
        const {FBArr} = this.$store.state.OTCManage
        return {
            dataList:[
            {
                title:'币种名称',
                type:'text',
                id:'coinName',
                required:true,
            },
            {
                title:'法币名称',
                type:'select',
                option:FBArr,
                id:'legalName',
                required:true,
            },
            {
                title:'付款时间(分钟)',
                type:'text',
                id:'expiredTimeCancel',
                required:true,
            },
            {
                title:'放行时间(分钟)',
                type:'text',
                id:'expiredTimeFreeze',
                required:true,
            },
            {
                title:'卖家挂单手续费(0.1为10%)',
                type:'text',
                id:'feeRate',
                required:true,
            },
            {
                title:'最大挂单数(买单)',
                type:'text',
                id:'maxApplBuyCount',
                required:true,
            },
            {
                title:'最大挂单数(卖单)',
                type:'text',
                id:'maxApplSellCount',
                required:true,
            },
            {
                title:'最低挂单单价',
                type:'text',
                id:'minPrice',
                required:true,
            },
            {
                title:'最高挂单单价',
                type:'text',
                id:'maxPrice',
                required:true,
            },
            {
                title:'最小挂单数量',
                type:'text',
                id:'minExchangeNum',
                required:true,
            },
            {
                title:'最大挂单数量',
                type:'text',
                id:'maxExchangeNum',
                required:true,
            }
        ],
            pageType:this.$route.query.id ? 'edit' : 'add',
            id:this.$route.query.id
        }
    },
    mounted(){
        const {pageType,id} = this

        if(pageType === 'edit'){  // 如果是修改,那就获取详情
            const {dataList} = this;
            dataList.forEach(item=>{
                if(item.id === 'coinName' || item.id === 'legalName'){
                    item.disabled = true
                }
            })
            this.dataList= dataList
            this.getDetail(id)

        }
    },
    methods:{
        getChild(data){
            const {pageType} = this;
            // if(pageType === 'edit'){
            //     data.id = this.id
            // }
            coinModifyCoin(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `OTC配置${pageType === 'add' ? '创建' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$router.go(-1);
                }
            })
        },
        
        getDetail(id){
            otcConfigDetail({id}).then(res=>{
                if(res.statusCode === 0){
                    const {content} = res
                    const list = this.dataList;
                    const arr = [];
                    list.forEach(item=>{
                        item.value=content[item.id]
                        const obj = {...item}
                        obj.value=content[item.id]
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