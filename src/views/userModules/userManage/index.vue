<template>
  <div>
    <div class="operation clearfix">
      <div class="operationLeft">
        <el-dropdown split-button type="primary" @command="handleCommand">
        操作
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="0">启用</el-dropdown-item>
            <el-dropdown-item :command="1">禁用</el-dropdown-item>
            <el-dropdown-item command="yes">实名认证审核通过</el-dropdown-item>
            <el-dropdown-item command="no">实名认证审核不通过</el-dropdown-item>
            <el-dropdown-item command="group">分组</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="operationRight">
        <el-button-group>
          <search-list @getValue="getChild" :dataList="this.$store.state.userManage.searchData" labelWidth="120px"></search-list>
          <el-button type="primary" icon="el-icon-refresh-left" @click="refresh()">刷新</el-button>
        </el-button-group>
       
        <el-button-group>
          <!-- <search-list @getValue="exportDate" :dataList="this.$store.state.userManage.searchData" labelWidth="120px"></search-list> -->
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
        width="55"
        >
      </el-table-column>
      <el-table-column
        prop="email"
        width="150"
        label="用户邮箱"
        show-overflow-tooltip
        >
      </el-table-column>
      <el-table-column
        prop="userName"
        width="110"
        label="用户名"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="userType"
        label="用户类型"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="mobile"
        width="110"
        label="手机号"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="inviteCode"
        label="分享码"
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
        prop="groupName"
        label="分组"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="idCardTime"
        label="上传认证时间"
        width="170"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        prop="referrerMobile"
        label="推荐人手机号"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        label="身份认证状态"
        show-overflow-tooltip
        >
        <template slot-scope="scope">{{ setRealNameStatus(scope.row.idCardStatus) }}</template>
      </el-table-column>

      <el-table-column
        prop="registerTime"
        width="170"
        label="注册时间"
        show-overflow-tooltip
        >
      </el-table-column>

      <el-table-column
        label="状态"
        show-overflow-tooltip
        >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="success">正常</el-tag>
          <el-tag v-else-if="scope.row.status === 1" type="info">禁用</el-tag>
          <el-tag v-else type="info">失败</el-tag>
          
        </template>
      </el-table-column>


      <el-table-column
        align='center'
        fixed="right"
        label="操作"
        width="300"
      >
      <template slot-scope="scope">
        <el-button @click="editData(scope.row.id)" type="text" size="small">修改</el-button>
        <el-button slot="reference" @click="detailedVisible = true" type="text" size="small">明细</el-button>
        <el-button  v-if="scope.row.status === 0" @click="disabledData(scope.row.id,scope.row.status)" type="text" size="small">禁用</el-button>
        <el-button  v-else-if="scope.row.status === 1" @click="disabledData(scope.row.id,scope.row.status)" type="text" size="small">启用</el-button>
        <el-popconfirm
          title="确定重置支付密码吗"
          @onConfirm="resetPassword(scope.row.id,'pay')"
        >
          <el-button slot="reference" type="text" size="small">重置支付密码</el-button>
        </el-popconfirm>
        <el-popconfirm
          title="确定重置登录密码吗"
          @onConfirm="resetPassword(scope.row.id,'login')"
        >
          <el-button slot="reference" type="text" size="small">重置登录密码</el-button>
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

    <Detailed
        :visible="detailedVisible"
        :tableData="detailedTableData"
        @changeDrawer="changeDrawer"
    />

    <el-dialog
      title="修改分组"
      :visible.sync="groupVisible"
      width="30%"
    >
    <el-select 
        v-model="selectGroupValue" 
        placeholder="请选择分组"
        style="width: 100%;"
    >
      <el-option
          v-for="(item,index) in groupArr"
          :key="index"
          :label="item.key"
          :value="item.value"
      >
      </el-option>
    </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="groupVisible = false">取 消</el-button>
        <el-button type="primary" @click="groupYes">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>

import {
  userList,
  userIsAble,
  exportUserList,
  resetPayPassword,
  idCardPass,
  updateGroupType
} from '@/api/user'

import {
  dataType,
  download
} from '@/utils/auth'

import SearchList from '@/components/SearchList'
import Detailed from './../components/detailed'
export default {
  name: 'UserManage',
  data() {
    return {
      loading: false,
      tableData: [],
      detailedTableData: [],
      multipleSelection: [],
      searchObj:{},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      exportLoading: false,
      detailedVisible: false,
      groupVisible: false,
      selectGroupValue: '',
      groupArr: this.$store.state.userManage.groupArr
      // typeList:this.$store.article.typeList
    }
  },
  created() {
    this.getArticleByLocaleList()
  },
  mounted() {
    console.log(this.$store.state.userManage.searchData)
  },
  methods: {
    setRealNameStatus(type) {
      const {
        authStatusArr
      } =  this.$store.state.userManage
      let str = ''
      authStatusArr.forEach(item => {
        if (item.value === type) {
          str = item.key
        }
      })
      return str
    },
    editData(id) {
      this.$router.push({
        path: '/user-modules/operation',
        query: {
          id
        }
      })
    },
    changeDrawer(v) {
      this.detailedVisible = v
    },

    getChild(data) {
      console.log(data)
      this.pageNo = 1;
      this.searchObj = data
      this.getArticleByLocaleList(data)
    },
    refresh() {
      this.pageNo = 1
      this.getArticleByLocaleList()
    },
    exportDate(data) {
      this.exportLoading = true
      exportUserList().then(res => {
        download(res, '用户列表')
        this.exportLoading = false
      }).catch(() => {
        this.exportLoading = false
      })
    },
    resetPassword(id, type) {
      resetPayPassword({ userId: id }, type).then(res => {
        if (res.statusCode === 0) {
          this.$message({
            message: `${type === 'pay' ? '支付密码重置成功' : '登录密码重置成功'}`,
            type: 'success'
          })
        }
      })
    },
    disabledData(data, status) {
      userIsAble({ userIds: data }, status).then(res => {
        console.log(res)
        if (res.statusCode === 0) {
          this.$message({
              message:'操作成功',
              type:'success'
            })
          this.getArticleByLocaleList()
        }
      })
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.getArticleByLocaleList(this.searchObj)
    },
    getArticleByLocaleList(data) {
      this.loading = true
      const {
        pageNo,
        pageSize
      } = this;
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

      

      userList(parmas).then(res=>{
        const {content,total} = res
        this.tableData = content || []
        this.total = total
        this.loading = false
      }).catch(()=>{
        this.loading=false
      })

    },
    getTitle(command){
      let titleStr = ''

      switch (command) {
        case 0:
          titleStr = '启用'
        break;
        case 1:
          titleStr = '禁用'
        break;
        case 'yes':
          titleStr = '审核通过'
        break;
        case 'no':
          titleStr = '审核不通过'
        break;
        case 'group':
          titleStr = '分组'
        break;
      
        default:
          break;
      }
      return titleStr
    },
    handleCommand(command) {
      
      const {multipleSelection} = this;
      const arr = []

      if(multipleSelection.length>0){
        
        this.$confirm(`确定要${this.getTitle(command)}当前选中的数据吗？`, this.getTitle(command), {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => {

            multipleSelection.forEach(item=>{
              arr.push(item.id)
            })
            const idStr = arr.join(',')

            if(command === 0 || command === 1){
                this.disabledData( idStr,command)
            }

            if(command === 'yes' || command === 'no'){
              let cardStatus = command === 'yes' ? 1 : 3
              const idCardParmas={
                userIds:idStr,
                cardStatus
              }

              idCardPass(idCardParmas).then(res=>{
                console.log(res)
                if(res.statusCode === 0){
                    this.$message({
                      message:`操作成功`,
                      type:'success'
                    })
                    this.getArticleByLocaleList()

                }
              })
            }

            if(command === 'group'){
              this.groupVisible = true
            }

            
          })
          .catch(action => {
            
        });

      }else{
        this.$message({
          message:`请选择你要${this.getTitle(command)}的数据`,
          type:'warning'
        })
      }

      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    groupYes(){
      const arr = []
      const {multipleSelection,selectGroupValue} = this;
      multipleSelection.forEach(item=>{
        arr.push(item.id)
      })
      const idStr = arr.join(',')
      updateGroupType({userIds:idStr,groupType:selectGroupValue}).then(res=>{
        console.log(res)
        if(res.statusCode === 0){
            this.$message({
              message:`操作成功`,
              type:'success'
            })
            this.groupVisible = false

            this.getArticleByLocaleList()
        }
      })

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

