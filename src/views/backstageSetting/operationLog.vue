<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        <el-dropdown split-button type="primary" @command="handleCommand">
        操作
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="HIDE">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="typeList"></search-list>
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary" @click="exportDate"  :loading="exportLoading" icon="el-icon-s-promotion">导出</el-button>
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
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="60"
        >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="User"
        width="80"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="method"
        label="Method"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="Path"
      >
      </el-table-column>
      
      
      <el-table-column
        prop="ip"
        label="Ip"
      >
      </el-table-column>
      <el-table-column
        prop="input"
        label="Input"
      >
      </el-table-column>
      
      <el-table-column
        prop="createdAt"
        label="添加时间"
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

import {getOperationLog,exportOperationLog,delOperationLog} from '@/api/backstageSetting'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType,download } from '@/utils/auth'

export default {
    name:'operationLog',
    data() {
      const {operationLogSearch} = this.$store.state.backstageSetting
        return {
          loading:false,
          tableData:[],
          multipleSelection: [],
          pageNo:1,
          pageSize:10,
          total:0,
          exportLoading:false,
          typeList:operationLogSearch
        }
    },
    created(){
      this.getArticleByLocaleList()
    },
    mounted(){
      this.$store.dispatch({
          type:'backstageSetting/getUsersList'
      })
    },
    watch:{
      '$store.state.backstageSetting.userList':{
            handler(newValue) {
              const {operationLogSearch} = this.$store.state.backstageSetting
                operationLogSearch[1].option = newValue
                console.log(operationLogSearch)
                this.typeList = operationLogSearch
                console.log(this.typeList )
    　　　　},
    　　　　deep: true
      } 
    },
    methods:{
      exportDate(data){
        this.exportLoading = true
        const parmas={
          id:0,
          userName:'',
          method:'',
          ip:'',
          path:''
        }
        exportOperationLog(parmas).then(res=>{
          const {statusCode,errorMessage}  =res
            download(res,'后台用户操作日志')
           this.exportLoading = false
        }).catch(()=>{
           this.exportLoading = false
        })
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
        delOperationLog({id}).then(res=>{
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
          id:0,
          userName:'',
          method:'',
          ip:'',
          path:''
        }
        if(dataType(data) === 'Object'){
          parmas={
            pageNo,
            pageSize,
            ...data,
            id:!isEmpty(data.id) ? 0 : data.id,
            userName:!isEmpty(data.userName) ? 0 : data.userName,
            method:!isEmpty(data.method) ? 0 : data.method,
            path:!isEmpty(data.path) ? 0 : data.path,
            ip:!isEmpty(data.ip) ? 0 : data.ip,
          }
        } 
        getOperationLog(parmas).then(res=>{
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

          this.$confirm(`确定要删除当前选中的数据吗？`, `删除`, {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
            .then(() => {
              multipleSelection.forEach(item=>{
                arr.push(item.id)
              })
              const idStr = arr.join(',')

              this.deleteData( idStr)
            })
            .catch(action => {
              
          });

        }else{
          this.$message({
            message:`请选择你要删除的数据`,
            type:'warning'
          })
        }

        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
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

