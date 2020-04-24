

<template>
  <div class="operation">
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改广告' : '新增广告'"></el-page-header>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="720px"
      labelWidth="120px"
    />
  </div>
</template>

<script>





import {detailAdvertise,addAdvertise} from '@/api/advertiseManage'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty} from '@/utils/auth'

export default {
    name:'operation',
    data() {
        const {adTypeArr,showTypeArr,localeArr,statusArr} = this.$store.state.advertising
        return {
            dataList:[
            {
                title:'广告名称',
                type:'text',
                id:'name',
                required:true,
            },
            {
                title:'广告类型',
                type:'radio',
                option:adTypeArr,
                id:'type',
                required:true,
                value:'TEXT'
            },
            {
                title:'显示类型',
                type:'radio',
                option:showTypeArr,
                id:'clientType',
                required:true,
                value:1,
            },
            {
                title:'语言',
                type:'select',
                option:localeArr,
                id:'locale',
                required:true,
            },
            {
                title:'广告开始时间',
                type:'dateTime',
                id:'startTime',
                format:'yyyy-mm-dd hh:mm:ss',
                required:true,
            },
            {
                title:'广告结束时间',
                type:'dateTime',
                id:'endTime',
                format:'yyyy-mm-dd hh:mm:ss',
                required:true,
            },
            {
                title:'图片链接',
                type:'upload',
                id:'url',
                required:true,
                value:'',
                fileList:[],
            },
            {
                title:'广告链接',
                type:'text',
                id:'link',
                required:true,
            },
            {
                title:'是否启用',
                type:'radio',
                option:statusArr,
                id:'status',
                required:true,
                value:'SHOW'
            },
            {
                title:'广告内容',
                type:'tinymce',
                id:'content',
                required:true,
            },
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
            console.log(data)

            if(pageType === 'edit'){
                data.id = this.id
            }
            addAdvertise(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `广告${pageType === 'add' ? '创建' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$router.go(-1);
                }
            })
        },
        
        getDetail(id){
            detailAdvertise({adId:id}).then(res=>{
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