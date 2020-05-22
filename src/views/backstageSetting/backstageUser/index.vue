<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.backstageSetting.backstageUserSearch" labelWidth="120px"></search-list>
          <el-button type="primary" @click="add"  icon="el-icon-circle-plus-outline">新增</el-button>
        </el-button-group>
       
        <el-button-group>
          <el-button type="primary" @click="exportDate"  :loading="exportLoading" icon="el-icon-s-promotion">导出</el-button>
        </el-button-group>

        
      </div>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      tooltip-effect="dark"
      style="width: 100%"
    >
     
      <el-table-column
        prop="id"
        label="ID"
        width="55"
        >
      </el-table-column>
      
      <el-table-column
        prop="username"
        label="用户名"
      >
      </el-table-column>

      <el-table-column
        prop="name"
        label="名称"
      >
      </el-table-column>
      
      <el-table-column
        prop="roleName"
        label="角色"
      >
      
      <template slot-scope="scope"><el-tag>{{scope.row.roleName}}</el-tag></template>

      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
      >
      </el-table-column>
      
      <el-table-column
      fixed="right"
      align='center'
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button @click="getDetail(scope.row.id)" type="text" size="small">修改</el-button>
        <el-popconfirm
          title="确定删除该用户吗"
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

import {getUserList,exportUserList,delUsers} from '@/api/backstageSetting'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType,download } from '@/utils/auth'

export default {
    name:'backstageUser',
    data() {
        return {
          loading:false,
          tableData:[],
          multipleSelection: [],
          pageNo:1,
          pageSize:10,
          total:0,
          exportLoading:false,
          searchObj:{}
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
        this.$router.push({
          path:'/backstage-setting/backstage-user-operation',
          query: {
            id
          }
        })
      },
      exportDate(data){
        this.exportLoading = true
        exportUserList({id:0}).then(res=>{
          download(res,'后台用户')
           this.exportLoading = false
        }).catch(()=>{
           this.exportLoading = false
        })
      },
      getChild(data){
        this.pageNo = 1;
        this.searchObj = data
        this.getArticleByLocaleList(data)
      },
      refresh(){
        this.pageNo = 1;
        this.getArticleByLocaleList()
      },
      add(){
        this.$router.push('/backstage-setting/backstage-user-operation')
      },
      deleteData(id){
        delUsers({userId:id}).then(res=>{
          if(res.statusCode === 0){
            this.getArticleByLocaleList()
            this.$message({
              message:"删除成功",
              type:'success'
            })
          }
        })
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getArticleByLocaleList(this.searchObj)
      },
      getArticleByLocaleList(data){
        this.loading = true
        const {pageNo,pageSize} = this;
        let parmas={
          pageNo,
          pageSize,
          id:0
        }
        if(dataType(data) === 'Object'){
          parmas={
            pageNo,
            pageSize,
            ...data,
            id:!isEmpty(data.id) ? 0 : data.id,
          }
        }

        getUserList(parmas).then(res=>{
          const {content,total} = res
          this.tableData = content || []
          this.total = total
          this.loading = false
        }).catch(()=>{
          this.loading=false
        })

      },
      
      
    },
    components: {
      SearchList,
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

