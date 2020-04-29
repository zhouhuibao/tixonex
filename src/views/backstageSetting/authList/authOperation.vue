<template>
  <div class="operation">
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改权限' : '新增权限'"></el-page-header>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="80%"
      labelWidth="120px"
    />
  </div>
</template>

<script>

import {permissionDetails,authAddOrEdit} from '@/api/backstageSetting'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty} from '@/utils/auth'

export default {
    name:'authOperation',
    data() {
        const {HTTPtype} = this.$store.state.backstageSetting
        return {
            dataList:[
            {
                title:'标识',
                type:'text',
                id:'slug',
                required:true,
            },
            {
                title:'名称',
                type:'text',
                id:'name',
                required:true,
            },
            {
                title:'HTTP方法',
                type:'select',
                id:'httpMethod',
                option:HTTPtype,
                tips:'为空默认为所有方法'
            },
            {
                title:'HTTP路径',
                type:'textarea',
                id:'httpPath',
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
            if(pageType === 'edit'){
                data.id = this.id
            }
            
            authAddOrEdit(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `权限${pageType === 'add' ? '创建' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$router.go(-1);
                }
            })
        },
        
        getDetail(id){
            permissionDetails({id}).then(res=>{
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