

<template>
  <div class="operation">
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改锁仓配置' : '添加锁仓配置'"></el-page-header>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="80%"
      labelWidth="120px"
    />
  </div>
</template>

<script>





import {getDispatchByID,addOrEditDispatchConfig} from '@/api/theCoinReward'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty} from '@/utils/auth'

export default {
    name:'lockOperation',
    data() {
        const {lockStatus,taskNameArr} = this.$store.state.theCoinReward
        return {
            dataList:[
            {
                title:'锁仓名称',
                type:'text',
                id:'lockName',
            },
            {
                title:'状态',
                type:'radio',
                option:lockStatus,
                id:'status',
                required:true,
                value:'SHOW'
            },
            {
                title:'任务名称',
                type:'select',
                option:taskNameArr,
                id:'cronId',
                required:true,
                optionObj:{
                    key:'cronName',
                    value:'id'
                }
            },
            {
                title:'锁仓比例(0.1为10%)',
                type:'text',
                id:'lockRate',
                required:true,
            },
            {
                title:'释放比例(0.1为10%)',
                type:'text',
                id:'freeRate',
                required:true,
            }
        ],
            pageType:this.$route.query.id ? 'edit' : 'add',
            id:this.$route.query.id
        }
    },
    mounted(){
        const {pageType,id} = this
        this.getCronConfig()

        if(pageType === 'edit'){  // 如果是修改,那就获取详情
            this.getDetail(id)
        }
    },
    watch:{
        '$store.state.theCoinReward.taskNameArr':{
            handler(newValue) {
                this.dataList[2].option = newValue
    　　　　},
    　　　　deep: true
        }
    },
    methods:{
        getChild(data){
            const {pageType} = this;
            const {taskNameArr} = this.$store.state.theCoinReward;
            let coinName = ''
            taskNameArr.forEach(item=>{
                if(item.id === data.cronId){
                    coinName = item.cronName
                }
            })
            data.cronName = coinName

            if(pageType === 'edit'){
                data.id = this.id
            }
            addOrEditDispatchConfig(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `锁仓配置${pageType === 'add' ? '添加' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$router.go(-1);
                }
            })
        },
        getCronConfig(data){
            this.$store.dispatch({
                type:'theCoinReward/getCronConfigList'
            })
        },
        getDetail(id){
            getDispatchByID({id}).then(res=>{
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