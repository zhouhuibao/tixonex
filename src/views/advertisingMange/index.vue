
<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        <el-dropdown split-button type="primary" @command="handleCommand">
        操作
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="HIDE">启用</el-dropdown-item>
            <el-dropdown-item command="SHOW">禁用</el-dropdown-item> -->
            <el-dropdown-item command="delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="55"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告名称"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="link"
        label="广告链接"
      >
      </el-table-column>

      <el-table-column
        label="广告类型"
      >
        <template slot-scope="scope">{{ scope.row.type === 'TEXT' ? '图文' : '链接' }}</template>
      </el-table-column>
      
      
      <el-table-column label="显示类型">
        <template slot-scope="scope">{{ scope.row.clientType === 1 ? '网页' : '手机' }}</template>
      </el-table-column>

      <el-table-column label="语言">
        <template slot-scope="scope">{{ getlang(scope.row.locale)  }}</template>
      </el-table-column>

      <el-table-column
        prop="startTime"
        label="广告开始时间"
        >
      </el-table-column>

      <el-table-column
        prop="endTime"
        label="广告结束时间"
        >
      </el-table-column>

      <el-table-column
        prop="lastTime"
        label="更新时间"
        >
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.status === 'SHOW' ? '启用' : '禁用' }}</template>
      </el-table-column>

      
      <el-table-column
      fixed="right"
      align='center'
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button @click="disabledData(scope.row.id,scope.row.status)" type="text" size="small">{{scope.row.status !== 'SHOW' ? '启用' : '禁用'  }} </el-button>
        <el-button @click="editData(scope.row.id)" type="text" size="small">修改</el-button>
        <el-popconfirm
          title="确定删除该数据吗"
          @onConfirm="deleteData(scope.row.id)"
        >
          <el-button slot="reference" type="text" size="small">删除</el-button>
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

import {getadvertiseList,disableArticles,delAdvertiseBatch} from '@/api/advertiseManage'
import SearchList from '@/components/SearchList'
import { isEmpty, dataType } from '@/utils/auth'

export default {
    name:'advertisingMange',
    data() {
        return {
          loading:false,
          tableData:[],
          multipleSelection: [],
          pageNo:1,
          pageSize:10,
          total:0,
          // typeList:this.$store.article.typeList
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
          path:'/advertising-mange/operation',
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
        this.$router.push('/advertising-mange/operation')
      },
      deleteData(id){
        delAdvertiseBatch({ids:id}).then(res=>{
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
        }
        if(dataType(data) === 'Object'){
          parmas={
            pageNo,
            pageSize,
            ...data
          }
        }

        

        getadvertiseList(parmas).then(res=>{
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

          this.$confirm('确定要删除当前选中的数据吗？', '删除', {
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
            message:"请选择你要删除的文章",
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


=

