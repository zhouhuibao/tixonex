<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.userManage.balanceList"></search-list>
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
        label="统计时间"
        show-overflow-tooltip
        width="160"
        >
        <template slot-scope="scope">{{ (scope.row.statTime*1000) | formatDate}}</template>
      </el-table-column>

      <el-table-column
        prop="coinName"
        label="币种名称"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="chainBalance"
        label="区块链余额总额"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="availableBalance"
        label="数据库可用金总额"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="freezeBalance"
        label="数据库冻结金总额"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="totalTradeFee"
        label="币币交易总费用"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="totalSendFee"
        label="提币总手续费"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="totalOtcFee"
        label="OTC市场总手续费"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="totalSend"
        label="转出外部统计"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="totalReceived"
        label="从外部转入统计"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="otcTotalFreeze"
        label="OTC挂单权限冻结总数"
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

import {balanceStatList} from '@/api/user'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'assetStatistics',
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

        balanceStatList(parmas).then(res=>{
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

