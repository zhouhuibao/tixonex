<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.theCoinReward.lockSearch"></search-list>
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
        prop="userName"
        label="用户名称"
        width="120"
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
        prop="cronName"
        label="释放策略名称"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="lockNo"
        label="锁仓批次"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="lockAmount"
        label="锁仓币种个数"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="lockRate"
        label="锁仓比例"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="releaseAmount"
        label="每次释放个数"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="releaseRate"
        label="每次释放比例"
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

import {lockCoin} from '@/api/theCoinReward'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'userLockList',
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

        lockCoin(parmas).then(res=>{
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

