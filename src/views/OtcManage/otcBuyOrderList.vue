<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.OTCManage.otcOrderListSearch"></search-list>
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
        prop="orderNo"
        label="订单号"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="coinName"
        label="币种"
        >
        <template slot-scope="scope">{{`${scope.row.coinName}/${scope.row.legalName}` }} </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        >
      </el-table-column>

      <el-table-column
        prop="createUser"
        label="用户"
        >
      </el-table-column>

      <el-table-column
        prop="amount"
        label="总数量"
        >
      </el-table-column>

      <el-table-column
        prop="ramount"
        label="剩余数量"
        >
      </el-table-column>


      <el-table-column
        prop="samount"
        label="交易成功数量"
      >
      </el-table-column>

      <el-table-column
        prop="price"
        label="价格"
        >
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
        >
        <template slot-scope="scope">{{getStaus(scope.row.status) }} </template>
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="挂单时间"
        >
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        >
        <template slot-scope="scope">
          <el-popconfirm
            title="确定撤销该数据吗？"
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

  </div>
</template>

<script>

import {otcApplications,applicationCancel} from '@/api/OTCManage'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'otcOrderList',
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
    methods:{
      getStaus(value) {
        const {typeArr} = this.$store.state.OTCManage
        let str = ''
        typeArr.forEach(item=>{
          if(value === item.value){
            str = item.key
          }
        })
        return str
      },
      getType(value) {
        const {statusArr} = this.$store.state.OTCManage
        let str = ''
        statusArr.forEach(item=>{
          if(value === item.value){
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
      deleteData(id){
        applicationCancel({id}).then(res=>{
          if(res.statusCode === 0){
            this.getArticleByLocaleList()
            this.$message({
              message:'撤销成功',
              type:'success'
            })
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
          type:100,
          status:1
        }
        if(dataType(data) === 'Object'){
          parmas={
            ...data,
            pageNo,
            pageSize,
            type:!isEmpty(data.type) ? 100 : data.type,
            status:1
          }
        }
        otcApplications(parmas).then(res=>{
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

