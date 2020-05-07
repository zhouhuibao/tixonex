<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        <el-dropdown split-button type="primary" @command="handleCommand">
        操作
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="HIDE">启用</el-dropdown-item>
            <el-dropdown-item command="SHOW">禁用</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="typeList"></search-list>
          <el-button type="primary" @click="add" icon="el-icon-circle-plus-outline">新增</el-button>
        </el-button-group>
        <el-button-group>
        </el-button-group>
      </div>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="55"
        >
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
      >
        <!-- <template slot-scope="scope">{{ switchType(scope.row.type)  }}</template> -->
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 'SHOW'" type="success">启用</el-tag>
          <el-tag v-else type="info">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间"
        >
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="编辑时间"
        >
      </el-table-column>
      <el-table-column
      fixed="right"
      align='center'
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button @click="disabledData(scope.row.id,scope.row.status)" type="text" size="small">{{scope.row.status !== 'SHOW' ? '启用' : '禁用'  }} </el-button>
        <el-button @click="editData(scope.row.id)" type="text" size="small">修改</el-button>
        <el-popconfirm
          title="确定删除该数据吗"
          @onConfirm="deleteData(scope.row.id)"
        >
          <el-button slot="reference" type="text" size="small">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,prev, pager, next"
      :total="total"
      :current-page='pageNo'
      @current-change="handleCurrentChange"  
    >
    </el-pagination>

  </div>
</template>

<script>

import {getArticleByLocale,disableArticles,deleteArticles} from '@/api/articleManage'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'articleManage',
    data() {
      const {searchData} = this.$store.state.article
        return {
          loading:false,
          tableData:[],
          multipleSelection: [],
          pageNo:1,
          pageSize:10,
          total:0,
          typeList:searchData
        }
    },
    mounted(){
      this.getArticleByLocaleList()
      this.$store.dispatch({
          type:'article/getArticleType'
      })
    },
   
    watch:{
        '$store.state.article.typeList':{
            handler(newVal){
                this.typeList[0].option = newVal
            },
            deep:true
        }
    },
    methods:{
      editData(id){
        this.$router.push({
          path:'/article-manage/article-manage-addOrEditArticle',
          query: {
            id
          }
        })
      },
      getChild(data){
        this.pageNo = 1;
        this.getArticleByLocaleList(data)
        console.log(data)
      },
      refresh(){
        this.pageNo = 1;
        this.getArticleByLocaleList()
      },
      add(){
        this.$router.push('/article-manage/article-manage-addOrEditArticle')
      },
      deleteData(id){
        deleteArticles({articleIds:id}).then(res=>{
          if(res.statusCode === 0){
            this.getArticleByLocaleList()
            this.$message({
              message:"删除成功",
              type:'success'
            })
          }
        })
      },
      disabledData(data,status){
        disableArticles({articleIds:data},status).then(res=>{
          if(res.statusCode === 0){
            this.getArticleByLocaleList()
          }
        })
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getArticleByLocaleList()
      },
      getArticleByLocaleList(data){
        this.loading = true
        const {pageNo,pageSize} = this;
        let parmas={
          pageNo,
          pageSize,
        }
        if(dataType(data) === 'Object'){
          parmas={
            pageNo,
            pageSize,
            ...data
          }
        }

        

        getArticleByLocale(parmas).then(res=>{
          const {content,total} = res
          this.tableData = content || []
          this.total = total
          this.loading = false
        }).catch(()=>{
          this.loading=false
        })

      },
      switchType(type){

        let typeName = ''
        switch (type) {
          case 'NOTICE':
            typeName= '公告'
            break;
          case 'NEWS':
            typeName= '资讯'
            break;
          case 'HELP':
            typeName= '帮助'
            break;
          case 'AGREEMENT':
            typeName= '注册协议'
            break;
          case 'FEE':
            typeName= '费用说明'
            break;
          case 'SERVICE':
            typeName= '服务条款'
            break;
          case 'PRIVACY':
            typeName= '隐私声明'
            break;
          case 'JOIN_US':
            typeName= '加入我们'
            break;
          case 'PLATFORM':
            typeName= '平台说明'
            break;
          case 'MERCHANT':
            typeName= '商家认证公告'
            break;
          case 'ALL':
            typeName= '所有类型'
            break;
          default:
            break;
        }
        return typeName
      },
      handleCommand(command) {
        
        const {multipleSelection} = this;
        const arr = []

        if(multipleSelection.length>0){

          this.$confirm(`确定要${command === 'HIDE' ? '启用' : '禁用'}当前选中的数据吗？`, `${command === 'HIDE' ? '启用' : '禁用'}`, {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
              multipleSelection.forEach(item=>{
                arr.push(item.id)
              })
              const idStr = arr.join(',')

              this.disabledData( idStr,command)
            })
            .catch(action => {
              
          });

        }else{
          this.$message({
            message:`请选择你要${command === 'HIDE' ? '启用' : '禁用'}的文章`,
            type:'warning'
          })
        }

        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    components: {
      SearchList
    }
}
</script>

<style scoped lang='scss'>
  .operation{
    width: 100%;
    margin-bottom: 10px;
    .operationLeft{
      float: left;
    }
    .operationRight{
      float: right;
    }
  }

</style>

