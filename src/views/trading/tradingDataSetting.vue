

<template>
  <div class="operation">
    <h1>参数设置</h1>
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





import {configUpdateSystem,configSystem} from '@/api/trading'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty} from '@/utils/auth'

export default {
    name:'tradingDataSetting',
    data() {
        const {edu} = this.$store.state.denomination
        return {
            dataList:[
            {
                title:'是否系统维护模式',
                type:'radio',
                option:edu,
                id:'maintainMode',
                required:true,
                value:0
            },
            {
                title:'注册奖励',
                type:'text',
                id:'registerReward',
                required:true,
                tips:'注：用户成功注册，即可获得注册奖励'
            },
            {
                title:'推荐奖励',
                type:'text',
                id:'referrerReward',
                required:true,
                tips:'注：用户推荐用户成功注册，被推荐人实名认证审核通过。'
            }
        ],
            pageType:this.$route.query.id ? 'edit' : 'add',
            id:this.$route.query.id
        }
    },
    mounted(){
        const {pageType,id} = this
        this.getDetail(id)
    },
    methods:{
        getChild(data){
            const {pageType} = this;

            configUpdateSystem(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `参数设置成功`,
                        type: 'success'    
                    })
                }
            })
        },
        
        getDetail(id){
            configSystem({name:id}).then(res=>{
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
h1{
  font-size: 22px;
    color: #303133;
    font-weight: 400;
}
</style>