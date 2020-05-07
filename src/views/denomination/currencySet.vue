
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
        prop="id"
        label="ID"
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="币种名称"
        show-overflow-tooltip
        >
      </el-table-column>


      <el-table-column
        prop="category"
        label="币种种类"
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ getlang(scope.row.category) }}</template>
      </el-table-column>


      <el-table-column
        prop="serverAddress"
        label="钱包服务器"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="serverPort"
        label="钱包服务器端口"
        show-overflow-tooltip
        >
      </el-table-column>




      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="success">正常</el-tag>
          <el-tag v-else type="info">禁用</el-tag>
        </template>
      </el-table-column>

      
      <el-table-column
      fixed="right"
      align='center'
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button @click="disabledData(scope.row)" type="text" size="small">{{scope.row.status !== 0 ? '启用' : '禁用'  }} </el-button>
        <el-button @click="editData(scope.row.name)" type="text" size="small">修改</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- <el-pagination
      background
      layout="total,prev, pager, next"
      :total="total"
      :current-page='pageNo'
      @current-change="handleCurrentChange"  
    >
    </el-pagination> -->

  </div>
</template>

<script>

import {coinList,coinEnableOrDisable} from '@/api/denomination'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'currencySet',
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
        const {coinType} = this.$store.state.denomination

        let str = ''
        coinType.forEach(item=>{
          if(value === item.value){
            str = item.key
          }
        })
        return str
      },
      editData(id){
        this.$router.push({
          path:'/denomination/operation',
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
        this.$router.push('/denomination/operation')
      },
      disabledData(data){
        const {name,status} = data
        coinEnableOrDisable({name,status:status === 1 ? 0 : 1}).then(res=>{
          if(res.statusCode === 0){
            this.getArticleByLocaleList()
            this.$message({
              message:'操作成功',
              type:'success'
            })
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
        coinList(parmas).then(res=>{
          const {content,total} = res
          this.tableData = content || []
          this.total = total
          this.loading = false
        }).catch(()=>{
          this.loading=false

        })

      }
      
     
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


=

