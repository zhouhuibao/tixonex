<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.denomination.searchPoundage"></search-list>
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
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="coinName"
        label="交易币种"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="settlementCurrency"
        label="结算币种"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="buyUserName"
        label="买方用户名"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="sellUserName"
        label="卖方用户名"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="price"
        label="单价"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="buyFeeCoin"
        label="本次交易产生买入费用"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="sellFeeCurrency"
        label="本次交易产生卖出费用"
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
        prop="startLastTradeTime"
        label="成交开始时间"
        show-overflow-tooltip
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="endLastTradeTime"
        label="成交结束时间"
        show-overflow-tooltip
        width="160"
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

import {tradeRewardLs} from '@/api/trading'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'tradingPoundage',
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

        tradeRewardLs(parmas).then(res=>{
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

