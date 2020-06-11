

<template>
  <div class="operation">
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改用户' : '添加用户'"></el-page-header>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="80%"
      labelWidth="120px"
      :resetBtn="false"
    />
  </div>
</template>

<script>


import {userDetail,updateUser} from '@/api/user'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty} from '@/utils/auth'

export default {
    name:'userOperation',
    data() {
        const {examineArr,groupArr} = this.$store.state.userManage
        return {
            dataList:[
            {
                title:'用户名',
                type:'text',
                id:'userName',
                disabled:true,
            },
            {
                title:'选择地区',
                type:'select',
                option:groupArr,
                id:'areaCode',
                disabled:true,
                optionObj:{
                    key:'chineseName',
                    value:'code'
                }
            },
            {
                title:'手机号',
                type:'text',
                id:'mobile',
                disabled:true,
            },
            {
                title:'真实姓名',
                type:'text',
                id:'realName',
                disabled:true,
            },
            {
                title:'证件号码',
                type:'text',
                id:'idCard',
                disabled:true,
            },
            {
                title:'银行账户',
                type:'text',
                id:'bankCard',
                disabled:true,
            },
            {
                title:'微信账号',
                type:'text',
                id:'alipay',
                disabled:true,
            },
            {
                title:'支付宝账号',
                type:'text',
                id:'weChat',
                disabled:true,
            },
            {
                title:'上传认证时间',
                type:'text',
                id:'idCardTime',
                disabled:true,
            },
            {
                title:'注册时间',
                type:'text',
                id:'registerTime',
                disabled:true,
            },
            {
                title:'身份证正面',
                type:'upload',
                id:'idCardImg1',
                disabled:true,
            },
            {
                title:'身份证反面',
                type:'upload',
                id:'idCardImg2',
                disabled:true,
            },
            {
                title:'手持身份证',
                type:'upload',
                id:'idCardImg3',
                disabled:true,
            },
            {
                title:'身份证审核状态',
                type:'radio',
                option:examineArr,
                id:'idCardStatus',
                value:1,
                required:true
            },
            {
                title:'用户分组',
                type:'select',
                option:groupArr,
                id:'groupType',
                disabled:true,
            }
        ],
            pageType:this.$route.query.id ? 'edit' : 'add',
            id:this.$route.query.id,
            userInfo:{}
        }
    },
    mounted(){
        if(!isEmpty(this.id)){
            this.$router.push('/')
        }else{
            const {pageType,id} = this
            this.$store.dispatch('userManage/getNationalCode')
            this.getDetail(id)
        }
        
    },
    watch:{
        '$store.state.userManage.nationalCodeList':{
            handler(newValue) {
                this.dataList[1].option = newValue
    　　　　},
    　　　　deep: true
        }
    },
    methods:{
        getChild(data){
            const {pageType} = this;
            const parmas={
                userId:this.id,
                status:data.idCardStatus,
            }
            
            updateUser(parmas).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `用户信息修改成功`,
                        type: 'success'    
                    })
                    this.$router.go(-1);
                }
            })
        },
        
        getDetail(id){
            userDetail({userId:id}).then(res=>{
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
                    this.userInfo = content
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