<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.rollInOrOut.transferHistory"></search-list>
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
        prop="mobile"
        label="手机号"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名称"
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
        prop="groupName"
        label="用户分组名"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="type"
        label="类型"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="amount"
        label="数量"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="fee"
        label="手续费"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="tradeType"
        label="转账类型"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="status"
        label="转入/转出状态"
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
        prop="txid"
        label="交易hash"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="targetAddress"
        label="目标地址"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="transferTime"
        label="转账时间"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        label="操作"
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

import {transferHistory} from '@/api/rollInOrOut'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'rollInOrOutList',
    data() {
        return {
          loading:false,
          tableData:[],
          multipleSelection: [],
          pageNo:1,
          pageSize:10,
          total:0,
          searchObj:{}
        }
    },
    created(){
      this.getArticleByLocaleList()
    },
    mounted(){

    },
    methods:{
      getChild(data){
        this.pageNo = 1;
        this.searchObj = data
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
          type:'ALL'
        }
        if(dataType(data) === 'Object'){
          parmas={
            ...data,
            pageNo,
            pageSize,
            type:!isEmpty(data.type) ? 'ALL' : data.type
          }
        }

        transferHistory(parmas).then(res=>{
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

