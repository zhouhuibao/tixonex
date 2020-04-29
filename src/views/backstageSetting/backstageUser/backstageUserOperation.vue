<template>
  <div class="operation">
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改后台用户' : '新增后台用户'"></el-page-header>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="80%"
      labelWidth="120px"
    />
  </div>
</template>

<script>

import {userDetails,userAddOrEdit} from '@/api/backstageSetting'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty, dataType} from '@/utils/auth'

export default {
    name:'backstageUserOperation',
    data() {
        const {authList,roleList} = this.$store.state.backstageSetting
        return {
            dataList:[
            {
                title:'用户名',
                type:'text',
                id:'username',
                required:true,
            },
            {
                title:'名称',
                type:'text',
                id:'name',
                required:true,
            },
            {
                title:'头像',
                type:'upload',
                id:'avatar',
                required:true,
                value:'',
                fileList:[],
            },
            {
                title:'密码',
                type:'password',
                id:'password',
                required:true,
            },
            {
                title:'确认密码',
                type:'password',
                id:'feeRate',
                required:true,
            },
            {
                title:'角色',
                type:'select',
                id:'roleId',
                multiple:true,
                required:true,
                option:[],
                optionObj:{
                    key:'name',
                    value:'id'
                },
                value:[]
            },
            {
                title:'权限',
                type:'select',
                multiple:true,
                id:'permissionsId',
                required:true,
                option:[],
                optionObj:{
                    key:'name',
                    value:'id'
                },
                value:[]
            }
        ],
            pageType:this.$route.query.id ? 'edit' : 'add',
            id:this.$route.query.id
        }
    },
    watch:{
        '$store.state.backstageSetting.roleList':{
            handler(newValue) {
                this.dataList[5].option = newValue
    　　　　},
    　　　　deep: true
        },
        '$store.state.backstageSetting.authList':{
            handler(newValue) {
                this.dataList[6].option = newValue
    　　　　},
    　　　　deep: true
        }
    },
    mounted(){
        const {pageType,id} = this
        this.$store.dispatch({
            type:'backstageSetting/getAuthList'
        })
        this.$store.dispatch({
            type:'backstageSetting/getRoleList'
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
                data.id = this.id
            }
            const {password,feeRate} = data
            if(password !== feeRate){
                this.$message({
                    message:'密码和重复密码不一样，请确认',
                    type:'error'
                })
            }else{
                delete data.feeRate
                data.permissionsId = data.permissionsId.join(',')
                data.roleId = data.roleId.join(',')
                userAddOrEdit(data,pageType).then(res=>{
                    if(res.statusCode === 0){
                        this.$message({
                            message: `后台用户${pageType === 'add' ? '创建' : '修改'}成功`,
                            type: 'success'    
                        })
                        this.$router.go(-1);
                    }
                })
            }
            
            
        },
        
        getDetail(id){
            userDetails({id}).then(res=>{
                if(res.statusCode === 0){
                    const {content} = res
                    const list = this.dataList;
                    const arr = [];
                    list.forEach(item=>{
                        item.value=content[item.id]
                        const obj = {...item}
                        obj.value=content[item.id]
                        if(item.id === 'roleId' || item.id === 'permissionsId'){
                            obj.value=dataType(content[item.id]) === 'String' ? content[item.id].split(',').map(Number) : []
                        }else if(item.id === 'feeRate'){
                            obj.value=content.password

                        }else if(obj.type === 'upload' && isEmpty(obj.value)){
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