<template>
  <div class="operation">
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改角色' : '新增角色'"></el-page-header>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="80%"
      labelWidth="120px"
    />
  </div>
</template>

<script>

import {roleDetails,roleAddOrEdit} from '@/api/backstageSetting'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty,dataType } from '@/utils/auth'

export default {
    name:'roleOperation',
    data() {
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
                title:'权限',
                type:'transfer',
                id:'permissionsId',
                option:[],
                optionObj:{
                    key: 'id',
                    label: 'name'
                },
                titles:['未选择权限', '已选择权限'],
                value:[]
            }
        ],
        pageType:this.$route.query.id ? 'edit' : 'add',
        id:this.$route.query.id
        }
    },
    watch:{
        '$store.state.backstageSetting.authList':{
            handler(newValue) {
                this.dataList[2].option = newValue
    　　　　},
    　　　　deep: true
        }
    },
    mounted(){
        const {pageType,id} = this

        this.$store.dispatch({
            type:'backstageSetting/getAuthList'
        })
        
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
                data.roleId = this.id
            }
            data.permissionsId = data.permissionsId.join(',')
            roleAddOrEdit(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `角色${pageType === 'add' ? '创建' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$router.go(-1);
                }
            })
        },
        
        getDetail(id){
            roleDetails({id}).then(res=>{
                if(res.statusCode === 0){
                    const {content} = res
                    const list = this.dataList;
                    const arr = [];
                    list.forEach(item=>{
                        item.value=content[item.id]
                        const obj = {...item}
                        obj.value=content[item.id]
                        if(item.id === 'permissionsId'){
                            console.log(content[item.id])
                            obj.value=dataType(content[item.id]) === 'String' ? content[item.id].split(',').map(Number) : []
                        }
                        arr.push(obj)
                    })
                    this.dataList = arr
                    console.log(arr)
                    


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