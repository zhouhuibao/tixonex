

<template>
  <div class="operation">
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改币种' : '新增币种'"></el-page-header>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="80%"
      labelWidth="120px"
    />
  </div>
</template>

<script>





import {coinInfo,coinModifyCoin} from '@/api/denomination'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty} from '@/utils/auth'

export default {
    name:'coinOperation',
    data() {
        const {edu,sxfType,coinType,statusArr} = this.$store.state.denomination
        return {
            dataList:[
            {
                title:'币种名称',
                type:'text',
                id:'name',
                required:true
            },
            {
                title:'币种符号',
                type:'text',
                id:'symbol',
                required:true
            },
            {
                title:'币种类型',
                type:'select',
                option:coinType,
                id:'category',
                required:true
            },
            {
                title:'默认显示币种名称',
                type:'text',
                id:'displayName',
                required:true
            },
            {
                title:'英文币种名称',
                type:'text',
                id:'displayNameAll',
                required:true
            },
            {
                title:'图标',
                type:'upload',
                id:'image',
                required:true,
                value:'',
                fileList:[]
            },
            {
                title:'币种小图标',
                type:'upload',
                id:'icon',
                required:true,
                value:'',
                fileList:[]
            },
            {
                title:'钱包服务器地址',
                type:'text',
                id:'serverAddress',
                required:true
            },
            {
                title:'币种服务器端口',
                type:'text',
                id:'serverPort',
                required:true
            },
            {
                title:'连接服务器用户名',
                type:'text',
                id:'serverUser',
                required:true
            },
            {
                title:'连接服务器名密码',
                type:'text',
                id:'serverPassword',
                required:true
            },
            {
                title:'以太坊合约地址',
                type:'text',
                id:'contractAddress',
                required:true
            },
            {
                title:'币种本身参数',
                type:'text',
                id:'coinSelfParameter',
                required:true
            },
            {
                title:'提现最大金额',
                type:'text',
                id:'transferMaxAmount',
                required:true
            },
            {
                title:'提现最小金额',
                type:'text',
                id:'transferMinAmount',
                required:true
            },
            {
                title:'手续费方式',
                type:'radio',
                option:sxfType,
                id:'transferFeeSelect',
                required:true,
                value:0
            },
            {
                title:'转出手续费，0.1代表10%',
                type:'text',
                id:'transferFeeRate',
                required:true
            },
            {
                title:'固定手续费数量(个)',
                type:'text',
                id:'transferFeeStatic',
                required:true
            },
            {
                title:'内部转账手续费，0.1代表10%',
                type:'text',
                id:'transferFeeRateInner',
                required:true
            },
            {
                title:'内部转账固定手续费数量(个)',
                type:'text',
                id:'transferFeeStaticInner',
                required:true
            },
            {
                title:'主账户地址设置(区块链地址/本平台地址)',
                type:'text',
                id:'coinBase',
                required:true
            },
            {
                title:'转入币种时自动变成挖矿额度',
                type:'radio',
                option:edu,
                id:'receivedFreeze',
                required:true,
                value:0
            },
            {
                title:'状态',
                type:'radio',
                option:statusArr,
                id:'status',
                required:true,
                value:0
            },
            {
                title:'排序',
                type:'text',
                id:'sort',
                required:true,
                value:0
            },
            {
                title:'变成挖矿额度的倍数',
                type:'text',
                id:'revFreezeRate',
                required:true
            },
            {
                title:'一个币兑换成平台币的挖矿额度数量',
                type:'text',
                id:'miningMultiple',
                required:true
            }
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

            // if(pageType === 'edit'){
            //     data.id = this.id
            // }
            coinModifyCoin(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `币种${pageType === 'add' ? '创建' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$router.go(-1);
                }
            })
        },
        
        getDetail(id){
            coinInfo({name:id}).then(res=>{
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