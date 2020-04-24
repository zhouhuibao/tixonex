<template>
<div>
    <el-page-header @back="$router.back(-1)" :content="this.$route.query.id ? '修改文章' : '创建文章'"></el-page-header>
        <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="中文标题" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
            </el-radio-group>
        </el-form-item>
        
        <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="所有类型" value="ALL"></el-option>
            <el-option label="通知" value="NOTICE"></el-option>
            <el-option label="资讯" value="NEWS"></el-option>
            <el-option label="帮助" value="HELP"></el-option>
            <el-option label="注册协议" value="AGREEMENT"></el-option>
            <el-option label="费用说明" value="FEE"></el-option>
            <el-option label="服务条款" value="SERVICE"></el-option>
            <el-option label="隐私声明" value="PRIVACY"></el-option>
            <el-option label="加入我们" value="JOIN_US"></el-option>
            <el-option label="平台说明" value="PLATFORM"></el-option>
            <el-option label="商家认证公告" value="MERCHANT"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="前台显示时间" prop="displayTime">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.displayTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="语言" prop="locale">
            <el-radio-group v-model="form.locale">
            <el-radio label="中文"></el-radio>
            <el-radio label="英文"></el-radio>
            </el-radio-group>
        </el-form-item>
        
        <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
  
        
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')">{{ pageType === 'add' ? '立即创建' :'修改文章' }}</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
    </el-form>
</div>

</template>



<script>
import {detailArticles,addArticles} from '@/api/articleManage'
import {getUserInfo} from '@/utils/auth'
  export default {
    name:'addOrEditArticle',
    data() {
      return {
        form: {
          title: '',
          status: '启用',
          type: '',
          displayTime: '',
          locale: '中文',
          content: '',
        },
        rules:{
            title: [
                { required: true, message: '请输入中文标题', trigger: 'blur' },
            ],
            status: [
                { required: true, message: '请选择状态', trigger: 'change' }
            ],
            type: [
                { required: true, message: '请选择类型', trigger: 'change' }
            ],
            locale: [
                { required: true, message: '请选择语言', trigger: 'change' }
            ],
            displayTime:[
                { required: true, message: '请选择前台显示时间', trigger: 'change' }
            ],
        },
        pageType:this.$route.query.id ? 'edit' : 'add',
        id:this.$route.query.id
        }
    },
    created(){
        const {pageType,id} = this
        if(pageType === 'edit'){  // 如果是修改,那就获取详情
            this.getDetail(id)
        }
    },
    methods: {
        addEdit(data){
            
            addArticles(data,this.pageType).then(res=>{
                console.log(res)
                if(res.statusCode === 0){
                    this.$message({
                        message: `文章${this.pageType === 'add' ? '创建' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$router.go(-1);
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const {pageType,id,form} = this
                const parmas ={
                    ...form,
                    status:form.status === '启用' ? 'SHOW' : 'HIDE',
                    locale:form.locale === '中文' ? 'zh_CN' : 'en_US',
                    creator:getUserInfo().id
                }
                if(pageType === 'edit'){
                    parmas.id = this.id
                }

               this.addEdit(parmas)

            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getDetail(id){
            detailArticles({articleId:id}).then(res=>{
                console.log(res)
                if(res.statusCode === 0){
                    const {content} = res
                    const {form} = this;
                    Object.keys(form).forEach(item=>{
                        this.form[item] = content[item]
                        this.form.locale = content.locale === 'zh_CN' ? '中文' : '英文'
                        this.form.status = content.status === 'SHOW' ? '启用' : '禁用'
                    })
                    
                }
            })
        }
    }
  }
</script>


<style scoped>
.el-page-header{
    margin-bottom: 20px;
    padding-left: 10px;
}
.el-form{
    width: 500px;
}
.el-select>.el-input{
    width: 380px;
}
</style>