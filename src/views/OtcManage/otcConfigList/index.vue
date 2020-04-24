
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
          <!-- <el-button type="primary" @click="add" icon="el-icon-circle-plus-outline">新增</el-button> -->
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
        prop="coinName"
        label="币种名称"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="legalName"
        label="法币名称"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="lastPrice"
        label="最新成交价"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="expiredTimeCancel"
        label="付款时间(分钟)"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="expiredTimeFreeze"
        label="放行时间(分钟)"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="feeRate"
        label="卖家挂单手续费(0.1代表10%)"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="maxApplBuyCount"
        label="最大挂单数(买单)"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="maxApplSellCount"
        label="最大挂单数(卖单)"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="minExchangeNum"
        label="最小挂单数量"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="maxExchangeNum"
        label="最大挂单数量"
        show-overflow-tooltip
      >
      </el-table-column>

      
      <el-table-column
      fixed="right"
      align='center'
      label="操作"
      width="80">
      <template slot-scope="scope">
        <el-button @click="editData(scope.row.id)" type="text" size="small">修改</el-button>
      </template>
    </el-table-column>
    </el-table>
    

  </div>
</template>

<script>

import {otcConfigList,disableArticles} from '@/api/OTCManage'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'tradingMarketSetting',
    data() {
        return {
          loading:false,
          tableData:[],
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
          path:'/OTC-manage/OTC-config-operation',
          query: {
            id
          }
        })
      },
      
      refresh(){
        this.getArticleByLocaleList()
      },
      add(){
        this.$router.push('/OTC-manage/OTC-config-operation')
      },
      getArticleByLocaleList(){
        this.loading = true
        otcConfigList().then(res=>{
          const {content} = res
          this.tableData = content || []
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

