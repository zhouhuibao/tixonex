<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.OTCManage.OTCauthSeatch"></search-list>
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
        width="180"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="id"
        label="用户ID"
        width="100"
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
        prop="publishEnable"
        label="是否允许挂买单"
        show-overflow-tooltip
        >
        <template slot-scope="scope"> {{scope.row.publishEnable === 0 ? '否' : '是'}} </template>
      </el-table-column>

      <el-table-column
        prop="status"
        label="申请状态"
        show-overflow-tooltip
        >
        <template slot-scope="scope"> {{getStatus(scope.row.status)}} </template>
      </el-table-column>

      <el-table-column
        prop="applyTime"
        label="申请时间"
        width="160"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="updateTime"
        label="修改时间"
        width="160"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="挂单时间"
        width="160"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
      align="right"
      label="操作"
      >
      <!-- <template slot-scope="scope">
        <el-button @click="getDetail(scope.row.id)" type="text" size="small">详情</el-button>
        <el-popconfirm
          title="确认完成订单吗"
          v-if="scope.row.status !== 1 && scope.row.status !== 100"
          @onConfirm="deleteData(scope.row.id,'deal')"
        >
          <el-button slot="reference"  type="text" size="small">确认完成</el-button>
        </el-popconfirm>
        
      </template> -->
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

import {otcPrivileges,otcOrdersCacelDeal} from '@/api/OTCManage'
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
          selectedId:''
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
        const {SHstatus} = this.$store.state.OTCManage;
        let str = ''
        SHstatus.forEach(item=>{
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
      deleteData(id,type){
        otcOrdersCacelDeal({id},type).then(res=>{
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
        otcPrivileges(parmas).then(res=>{
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

