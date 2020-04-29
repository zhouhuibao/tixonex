

<template>
  <div class="operation">
      <div class="title">用户设置</div>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="720px"
      labelWidth="120px"
    />
  </div>
</template>

<script>

import {userSetting,userSettingDetails} from '@/api/user'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty,getUserInfo} from '@/utils/auth'

export default {
    name:'userSettings',
    data() {
        const {adTypeArr,showTypeArr,localeArr,statusArr} = this.$store.state.advertising
        return {
            dataList:[
            {
                title:'用户名',
                type:'text',
                id:'username',
                disabled:true
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
                id:'repassword',
                required:true,
            }
        ],
            id:getUserInfo().id,
            isOne:true
        }
    },
    
    mounted(){
        console.log(getUserInfo())
        console.log(this.$store.state.user.test)
        this.getUserDetail()
    },
    methods:{
        getUserDetail(){
            this.$store.dispatch({
                type:'user/getInfoById',
                payload:this.id
            }).then(res=>{
                
                if(res.statusCode === 0 && this.isOne){
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
                    arr[arr.length-1].value =content.password
                    this.dataList = arr
                }
            })
        },
        getChild(data){
            
            if(data.password !== data.repassword){
                this.$message({
                    message:'密码和重复密码不一致,请检查',
                    type:'error'
                })
            }else{
                data.id = this.id
                delete data.repassword
                delete data.username
                userSetting(data).then(res=>{
                    if(res.statusCode === 0){
                        this.$message({
                            message: `用户设置成功`,
                            type: 'success'    
                        })
                        this.isOne = false
                        this.getUserDetail()
                    }
                })
            }
            
            
        },
        
    },
    components: {
      CreateForm
    } 
}
</script>

<style scoped>
.title{
    font-size: 16px;
    font-weight: 700;
    margin:10px 0 20px 0;
    padding-left: 20px;
}
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