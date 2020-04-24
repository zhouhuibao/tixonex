
<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        <el-button-group>
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
        </el-button-group>
      </div>

      <div class="operationRight">
        <el-button-group>
          <el-button type="primary" @click="add" icon="el-icon-circle-plus-outline">新增</el-button>
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
        prop="coinName"
        label="交易币种"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="settlementCurrency"
        label="结算货币"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="dayExchangeBegin"
        label="交易开始时间"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="dayExchangeEnd"
        label="交易结束时间"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="feeCoin"
        label="买入手续费,0.1代表10%"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="feeCurrency"
        label="卖出手续费0.1代表10%"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="maxExchangeNum"
        label="单笔下单最大数量"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="minExchangeNum"
        label="单笔下单最小数量"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="maxIncrease"
        label="最大涨幅"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="minDecrease"
        label="最大跌幅"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="maxCurrency"
        label="最高挂单单价"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="closed"
        label="是否开放市场"
        show-overflow-tooltip
      >
      </el-table-column>

      
      <el-table-column
      fixed="right"
      align='center'
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button @click="disabledData(scope.row.id,scope.row.status)" type="text" size="small">{{scope.row.closed !== 'SHOW' ? '启用' : '禁用'  }} </el-button>
        <el-button @click="editData(scope.row.id)" type="text" size="small">修改</el-button>
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

import {marketList,disableArticles,delAdvertiseBatch} from '@/api/trading'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'tradingMarketSetting',
    data() {
        return {
          loading:false,
          tableData:[],
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
      getlang(value) {
        const {localeArr} = this.$store.state.advertising
        let str = ''
        localeArr.forEach(item=>{
          if(value === item.value){
            str = item.key
          }
        })
        return str
      },
      editData(id){
        this.$router.push({
          path:'/trading/tMSOperation',
          query: {
            id
          }
        })
      },
      
      refresh(){
        this.pageNo = 1;
        this.getArticleByLocaleList()
      },
      add(){
        this.$router.push('/trading/tMSOperation')
      },
      deleteData(id){
        delAdvertiseBatch({ids:id}).then(res=>{
          if(res.statusCode === 0){
            this.getArticleByLocaleList()
          }
        })
      },
      disabledData(data,status){
        disableArticles({articleIds:data},status).then(res=>{
          console.log(res)
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

        

        marketList(parmas).then(res=>{
          const {content,total} = res
          this.tableData = content || []
          this.total = total
          this.loading = false
        }).catch(()=>{
          this.loading=false

        })

      },
      
      
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


=

