<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.rollInOrOut.rollOutAuditSearch"></search-list>
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
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
        prop="amount"
        label="数量"
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
        prop="coinName"
        label="币种名称"
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
        prop="sendTime"
        label="操作时间"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="secondStatus"
        label="交易状态"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        label="操作"
        show-overflow-tooltip
        >
        <el-popconfirm
          title="确定审核通过吗"
          @onConfirm="deleteData(scope.row.id)"
        >
          <el-button slot="reference"  type="text" size="small">审核通过</el-button>
        </el-popconfirm>
        <el-popconfirm
          title="确定审核不通过吗"
          @onConfirm="deleteData(scope.row.id,'fail')"
        >
          <el-button slot="reference"  type="text" size="small">审核不通过</el-button>
        </el-popconfirm>
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

import {transferList,oneTransferCheck} from '@/api/rollInOrOut'
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
        this.getArticleByLocaleList(data)
      },
      deleteData(id,type){
        oneTransferCheck({id},type).then(res=>{
          if(res.statusCode === 0){
            this.getArticleByLocaleList()
          }
        })
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
          status:'ALL'
        }
        if(dataType(data) === 'Object'){
          parmas={
            ...data,
            pageNo,
            pageSize,
            status:!isEmpty(data.status) ? 'ALL' : data.status
          }
        }
        transferList(parmas).then(res=>{
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

