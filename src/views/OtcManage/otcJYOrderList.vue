<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.OTCManage.otcOrderJYSearch"></search-list>
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
        >
      </el-table-column>

      <el-table-column
        prop="buyUser"
        label="买家账号"
        >
      </el-table-column>

      <el-table-column
        prop="sellUser"
        label="卖家账号"
        >
      </el-table-column>

      <el-table-column
        prop="amount"
        label="金额"
        >
      </el-table-column>

      <el-table-column
        prop="number"
        label="数量"
        >
      </el-table-column>

      <el-table-column
        prop="price"
        label="单价"
        >
      </el-table-column>

      <el-table-column
        prop="fee"
        label="手续费"
        >
      </el-table-column>


      <el-table-column
        label="币种"
        >
        <template slot-scope="scope">{{`${scope.row.coinName}/${scope.row.legalName}` }} </template>
      </el-table-column>

      <!-- <el-table-column
        prop="finishTime"
        label="成交时间"
        >
      </el-table-column>
      <el-table-column
        prop="uploadCredentialTime"
        label="上传凭证时间"
        >
      </el-table-column> -->
      <el-table-column
        prop="status"
        label="状态"
        >
        <template slot-scope="scope">{{ getStatus(scope.row.status) }}</template>
      </el-table-column>

      <el-table-column
      label="操作"
      width="80"
      align="center"
      >
      <template slot-scope="scope">
        <el-button @click="getDetail(scope.row.id)" type="text" size="small">详情</el-button>
        <!-- <el-popconfirm
          title="确认完成订单吗"
          v-if="scope.row.status !== 1 && scope.row.status !== 100"
          @onConfirm="deleteData(scope.row.id,'deal')"
        >
          <el-button slot="reference"  type="text" size="small">确认完成</el-button>
        </el-popconfirm>
        <el-popconfirm
          title="确认取消订单吗"
          v-if="scope.row.status !== 1 && scope.row.status !== 100"
          @onConfirm="deleteData(scope.row.id,'cancel')"
        >
          <el-button slot="reference"  type="text" size="small">取消订单</el-button>
        </el-popconfirm> -->
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

import {otcOrders} from '@/api/OTCManage'
import SearchList from '@/components/SearchList'
import Detailed from './components/OTCorderDetailed'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'otcJYOrderList',
    data() {
        return {
          loading:false,
          tableData:[],
          multipleSelection: [],
          pageNo:1,
          pageSize:10,
          total:0,
          detailVisible:false,
          selectedId:'',
          searchObj:{}
        }
    },
    created(){
      this.getArticleByLocaleList()
    },
    methods:{
      getDetail(id){
        this.detailVisible = true
        this.selectedId = id
      },
      changeDrawer(visible,v,type){
        this.detailVisible = false
        if(type === 'done'){
          this.getArticleByLocaleList()
        }
      },
      getJYStatus(value){
        const {JYTagArr} = this.$store.state.OTCManage;
        let str = ''
        JYTagArr.forEach(item=>{
          if(item.value === value){
            str = item.key
          }
        })
        return str
      },
      getStatus(value){
        const {OTCorderStatus} = this.$store.state.OTCManage;
        let str = ''
        OTCorderStatus.forEach(item=>{
          if(item.value === value){
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
          status:10
        }
        if(dataType(data) === 'Object'){
          parmas={
            ...data,
            pageNo,
            pageSize,
            status:!isEmpty(data.status) ? 10 : data.status,
          }
        }
        otcOrders(parmas).then(res=>{
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

