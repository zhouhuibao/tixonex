<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
        
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.userManage.finaceSearchData"></search-list>
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
        prop="userName"
        label="用户名"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="realName"
        label="真实姓名"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="coinName"
        label="币种名称"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="bindAddress"
        label="钱包地址"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="availableBalance"
        label="可用资产"
        sortable
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ scope.row.availableBalance | changeDecimalBuZero}}</template>
      </el-table-column>

      <el-table-column
        prop="freezeBalance"
        label="冻结资产"
        sortable
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ scope.row.freezeBalance | changeDecimalBuZero}}</template>
      </el-table-column>

      <el-table-column
        label="锁定资产"
        sortable
        prop="receiveFreezeBalance"
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ scope.row.receiveFreezeBalance | changeDecimalBuZero}}</template>
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

import {financeList,exportFinanceList} from '@/api/user'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType,download } from '@/utils/auth'

export default {
    name:'articleManage',
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
      exportDate(data){
        this.exportLoading = true
        exportFinanceList().then(res=>{
          download(res,'用户资产')
           this.exportLoading = false
        }).catch(()=>{
           this.exportLoading = false
        })
      },
      getChild(data){
        this.pageNo = 1;
        this.searchObj =data
        this.getArticleByLocaleList(data)
      },
      refresh(){
        this.pageNo = 1;
        this.getArticleByLocaleList()
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
        }
        if(dataType(data) === 'Object'){
          parmas={
            pageNo,
            pageSize,
            ...data
          }
        }

        financeList(parmas).then(res=>{
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

