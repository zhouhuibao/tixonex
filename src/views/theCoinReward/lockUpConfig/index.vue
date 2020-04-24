
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
        width="55"
        >
      </el-table-column>
      <el-table-column
        prop="cronName"
        label="定时任务名称"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="lockName"
        label="锁仓名称"
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
        prop="freeRate"
        label="释放比例"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
        {{scope.row.status === 'SHOW' ? '开启' : '关闭'  }}
      </template>
      </el-table-column>

      
      <el-table-column
      fixed="right"
      align='center'
      label="操作">
      <template slot-scope="scope">
        <el-button @click="editData(scope.row.id)" type="text" size="small">修改</el-button>
      </template>
    </el-table-column>
    </el-table>
   

  </div>
</template>

<script>

import {getDispatchConfig,getCronConfig} from '@/api/theCoinReward'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'lockUpConfig',
    data() {
        return {
          loading:false,
          tableData:[],
        }
    },
    
    created(){
      this.getArticleByLocaleList()
      this.getCronConfig()
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
          path:'/theCoin-reward/lockOperation',
          query: {
            id
          }
        })
      },
      
      refresh(){
        this.getArticleByLocaleList()
      },
      add(){
        this.$router.push('/theCoin-reward/lockOperation')
      },
      getCronConfig(data){
        this.$store.dispatch({
          type:'theCoinReward/getCronConfigList',
          payload:'1'
        })
      },
      getArticleByLocaleList(data){
        this.loading = true

        getDispatchConfig().then(res=>{
          const {content,total} = res
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