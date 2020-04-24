<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.denomination.searchWT"></search-list>
        </el-button-group>
        
      </div>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
     
      <el-table-column
        prop="id"
        label="ID"
        width="55"
        >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="120"
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
        prop="coinName"
        label="币种名称"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="type"
        label="交易类型"
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ getJYType(scope.row.type) }}</template>
      </el-table-column>

      <el-table-column
        prop="price"
        label="单价"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="amount"
        label="委托数量"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="dealAmount"
        label="成交数量"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="dealCurrency"
        label="成交价格"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        label="交易状态"
        show-overflow-tooltip
        prop="status"
        width="100"
        >
        <template slot-scope="scope">{{ getStatus(scope.row.status) }}</template>
      </el-table-column>

      <el-table-column
        prop="finishTradeTme"
        label="交易完全成交时间"
        show-overflow-tooltip
        width="160"
        >
      </el-table-column>

      <el-table-column
        prop="createdAt"
        label="委托时间"
        show-overflow-tooltip
        width="160"
        >
      </el-table-column>

      <el-table-column
      fixed="right"
      label="操作"
      width="110">
      <template slot-scope="scope">
        <el-button @click="getDetail(scope.row.id)" type="text" size="small">撮合明细</el-button>
        <el-popconfirm
          title="确定撤销该数据吗"
          v-if="scope.row.status === 'OPEN'"
          @onConfirm="deleteData(scope.row.id)"
        >
          <el-button slot="reference"  type="text" size="small">撤销</el-button>
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

    <Detailed @changeDrawer='changeDrawer' :visible='detailVisible' :selectedId="selectedId" />

  </div>
</template>

<script>

import {getTradeListAll,cancelTrade} from '@/api/trading'
import SearchList from '@/components/SearchList'
import Detailed from './components/detailed'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'tradingList',
    data() {
        return {
          loading:false,
          tableData:[],
          multipleSelection: [],
          pageNo:1,
          pageSize:10,
          total:0,
          detailVisible:false,
          selectedId:''
          // typeList:this.$store.article.typeList
        }
    },
    created(){
      this.getArticleByLocaleList()
    },
    mounted(){

    },
    methods:{
      getDetail(id){
        this.detailVisible = true
        this.selectedId = id
      },
      changeDrawer(visible){
        this.detailVisible = false
      },
      getStatus(value){
        const {WTstatusArr} = this.$store.state.denomination;
        let str = ''
        WTstatusArr.forEach(item=>{
          if(item.value === value){
            str = item.key
          }
        })
       
        return str
      },
      getJYType(value){
        const {JYTypeArr} = this.$store.state.denomination;
        let str = ''
        JYTypeArr.forEach(item=>{
          if(item.value === value){
            str = item.key
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
      deleteData(id){
        cancelTrade({tradeId:id}).then(res=>{
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
          type:'ALL'
        }
        if(dataType(data) === 'Object'){
          parmas={
            ...data,
            pageNo,
            pageSize,
            type:!isEmpty(data.type) ? 'ALL' : data.type,
          }
        }
        getTradeListAll(parmas).then(res=>{
          const {content,total} = res
          this.tableData = content || []
          this.total = total
          this.loading = false
        }).catch(()=>{
          this.loading=false
        })

      },
      handleCommand(command) {
        
        const {multipleSelection} = this;
        const arr = []

        if(multipleSelection.length>0){

          this.$confirm(`确定要${command === 'HIDE' ? '启用' : '禁用'}当前选中的数据吗？`, `${command === 'HIDE' ? '启用' : '禁用'}`, {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
              multipleSelection.forEach(item=>{
                arr.push(item.id)
              })
              const idStr = arr.join(',')

              this.disabledData( idStr,command)
            })
            .catch(action => {
              
          });

        }else{
          this.$message({
            message:`请选择你要${command === 'HIDE' ? '启用' : '禁用'}的文章`,
            type:'warning'
          })
        }

        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    components: {
      SearchList,
      Detailed
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

