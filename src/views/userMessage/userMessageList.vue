<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        <el-dropdown split-button type="primary" @command="handleCommand">
        操作
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="HIDE">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        
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
        prop="userId"
        label="用户ID"
        show-overflow-tooltip
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="留言时间"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="message"
        label="留言内容"
        show-overflow-tooltip
      >
      </el-table-column>
      
      <el-table-column
      fixed="right"
      align='center'
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button @click="getDetail(scope.row.id)" type="text" size="small">详情</el-button>
        <el-popconfirm
          title="确定删除该留言吗"
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

    <Detailed @changeDrawer='changeDrawer' :visible='detailVisible' :selectedId="selectedId" />
  </div>
</template>

<script>

import {feedbackList,disableArticles,feedbackDetlete} from '@/api/userMessage'
import SearchList from '@/components/SearchList'
import Detailed from './components/messageDetailed'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'userMessageList',
    data() {
        return {
          loading:false,
          tableData:[],
          multipleSelection: [],
          pageNo:1,
          pageSize:10,
          total:0,
          detailVisible:false,
          selectedId:''
          // typeList:this.$store.article.typeList
        }
    },
    created(){
      this.getArticleByLocaleList()
    },
    
    mounted(){

    },
    methods:{
      getDetail(id){
        this.detailVisible = true
        this.selectedId = id
      },
      changeDrawer(visible){
        this.detailVisible = false
      },
      getChild(data){
        this.pageNo = 1;
        this.getArticleByLocaleList(data)
      },
      refresh(){
        this.pageNo = 1;
        this.getArticleByLocaleList()
      },
      add(){
        this.$router.push('/article-manage/article-manage-addOrEditArticle')
      },
      deleteData(id){
        feedbackDetlete({ids:id}).then(res=>{
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

        feedbackList(parmas).then(res=>{
          const {content,total} = res
          this.tableData = content || []
          this.total = total
          this.loading = false
        }).catch(()=>{
          this.loading=false
        })

      },
      handleCommand(command) {
        
        const {multipleSelection} = this;
        const arr = []

        if(multipleSelection.length>0){

          this.$confirm(`确定要删除当前选中的留言吗？`, `删除`, {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
              multipleSelection.forEach(item=>{
                arr.push(item.id)
              })
              const idStr = arr.join(',')

              this.deleteData( idStr,command)
            })
            .catch(action => {
              
          });

        }else{
          this.$message({
            message:`请选择你要删除的留言`,
            type:'warning'
          })
        }

        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    components: {
      SearchList,
      Detailed
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

