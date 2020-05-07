<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.userManage.BillSearchData"></search-list>
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
        width="70"
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
        label="用户真实姓名"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="groupName"
        label="分组名称"
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
        prop="subType"
        label="账户特性"
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ getTx(scope.row.subType) }}</template>
      </el-table-column>

      <el-table-column
        prop="reason"
        label="变动类型"
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ getBd(scope.row.reason) }}</template>
      </el-table-column>

      <el-table-column
        prop="changeAmount"
        label="变化数量"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="lastTime"
        label="交易时间"
        width="160"
        show-overflow-tooltip
        >
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

import {financeBillList} from '@/api/user'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'waterInformation',
    data() {
        return {
          loading:false,
          tableData:[],
          multipleSelection: [],
          pageNo:1,
          pageSize:10,
          total:0,
          exportLoading:false
          // typeList:this.$store.article.typeList
        }
    },
    created(){
      this.getArticleByLocaleList()
    },
    mounted(){

    },
    methods:{
      getTx(value){
        const {accountList} = this.$store.state.userManage;
        let str = ''
        accountList.forEach(item=>{
          if(item.value === value){
            str =item.key
          }
        })
        return str
      },
      getBd(value){
        const {changeList} = this.$store.state.userManage;
        let str = ''
        changeList.forEach(item=>{
          if(item.value === value){
            str =item.key
          }
        })
        return str
      },
      getChild(data){
        this.pageNo = 1;
        this.getArticleByLocaleList(data)
      },
      refresh(){
        this.pageNo = 1;
        this.getArticleByLocaleList()
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

        financeBillList(parmas).then(res=>{
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

