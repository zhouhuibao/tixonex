<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
        
      </div>

      <div class="operationRight">
        <el-button-group>
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
        prop="coinName"
        label="币种名称"
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
        prop="createTime"
        label="创建时间"
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

import {dispatchLog} from '@/api/theCoinReward'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'releaseReport',
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

        dispatchLog(parmas).then(res=>{
          const {content,total} = res
          this.tableData = content || []
          this.total = total
          this.loading = false
        }).catch(()=>{
          this.loading=false
        })

      },
    },
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

