

<template>
  <div class="operation">
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改文章' : '新增文章'"></el-page-header>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="720px"
    />
  </div>
</template>

<script>





import {detailArticles,addArticles} from '@/api/articleManage'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty} from '@/utils/auth'
import { getUserInfo } from "@/utils/auth";

export default {
    name:'addOrEditArticle',
    data() {
        const {typeList,statusArr,localeArr} = this.$store.state.article
        return {
            dataList:[
            {
                title:'中文标题',
                type:'text',
                id:'title',
                required:true,
            },
            {
                title:'前台显示时间',
                type:'dateTime',
                id:'displayTime',
                format:'yyyy-MM-dd HH:mm:ss',
            },
            {
                title:'类型',
                type:'select',
                option:typeList,
                id:'type',
                required:true,
            },
            {
                title:'语言',
                type:'radio',
                option:localeArr,
                id:'locale',
                required:true,
                value:'zh_CN'
            },
            {
                title:'状态',
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
        this.$store.dispatch({
            type:'article/getArticleType'
        })

        if(pageType === 'edit'){  // 如果是修改,那就获取详情
            this.getDetail(id)
        }
    },
    watch:{
        '$store.state.article.typeList':{
            handler(newVal){
                this.dataList[2].option = newVal
            },
            deep:true
        }
    },
    methods:{
        getChild(data){
            const {pageType} = this;
            data.creator=getUserInfo().id
            data.creatorName=getUserInfo().userName
            if(pageType === 'edit'){
                data.id = this.id
            }
            addArticles(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `文章${pageType === 'add' ? '创建' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$router.go(-1);
                }
            })
        },
        
        getDetail(id){
            detailArticles({articleId:id}).then(res=>{
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