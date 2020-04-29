

<template>
  <div class="operation">
    <h1>拨币</h1>
    <!-- <el-page-header @back="$router.back(-1)" content="参数设置"></el-page-header> -->
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="80%"
      labelWidth="120px"
    />
  </div>
</template>

<script>
import {getDispatchConfig,bbDispatch} from '@/api/theCoinReward'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty,getUserInfo} from '@/utils/auth'

export default {
    name:'theCoin',
    data() {
        const {coinList} = this.$store.state.userManage
        return {
            dataList:[
            {
                title:'币种',
                type:'select',
                option:coinList,
                id:'coinName',
                required:true,
            },
            {
                title:'拨币数量',
                type:'text',
                id:'amount',
                required:true,
            },
            {
                title:'用户名',
                type:'text',
                id:'mobile',
                required:true,
                tips:'注：填写多个用户名请用逗号( , )分割开。'
            },
            {
                title:'备注',
                type:'textarea',
                id:'referrerReward',
            }
        ],
            dispatchId:''
        }
    },
    mounted(){
        const {pageType,id} = this
        this.getDetail()
    },
    methods:{
        getChild(data){
            data.dispatchId = this.dispatchId
            data.comment =  !isEmpty(data.comment) ? '' :data.comment
            bbDispatch(data).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `拨币成功`,
                        type: 'success'    
                    })
                }
            })
        },
        
        getDetail(){
            getDispatchConfig().then(res=>{
                if(res.statusCode === 0){
                    const {content} = res
                    content.forEach(item=>{
                        if(item.lockName === '不锁仓'){
                            this.dispatchId = item.id
                        }
                    })
                   
                    


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
h1{
  font-size: 22px;
    color: #303133;
    font-weight: 400;
}
</style>