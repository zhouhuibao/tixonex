<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.rollInOrOut.rollOutAuditSearch"></search-list>
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
        width="70"
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
        width="90"
        >
      </el-table-column>

      <el-table-column
        prop="address"
        label="目标地址"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="sendTime"
        label="转账时间"
        width="160"
        >
      </el-table-column>

      <el-table-column
        prop="lastTime"
        label="操作时间"
        width="160"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="secondStatus"
        label="交易状态"
        width="100"
        >
      <template slot-scope="{row}">
        {{setStatusName(row.status)}}
      </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="150"
        >
      <template slot-scope="scope">
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
          searchObj:{}
        }
    },
    created(){
      this.getArticleByLocaleList()
    },
    mounted(){

    },
    methods:{
      setStatusName(type) {
        const {
          rollStatus
        } =  this.$store.state.rollInOrOut
        console.log(rollStatus)
        let str = ''
        rollStatus.forEach(item => {
          if (item.valueString === type) {
            str = item.key
          }
        })
        return str
      },
      getChild(data){
        this.pageNo = 1;
        this.searchObj = data
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
        this.getArticleByLocaleList(this.searchObj)
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

