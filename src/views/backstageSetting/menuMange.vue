<template>
  <div>
    <div class="btnWrapper">
      <el-button-group>
        <el-button type="primary" icon="el-icon-bottom" @click="openAll">展开</el-button>
        <el-button type="primary" @click="closeAll">收起<i class="el-icon-top"></i></el-button>
      </el-button-group>
      <el-button-group>
        <el-button type="primary" icon="el-icon-s-claim" @click="save">保存</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
      </el-button-group>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :md="12" style="margin-bottom:20px;">
        <menuLists :tasks="items" />
      </el-col>
      <el-col :xs="24" :md="12" >
        <div class="h1Title">添加顶级菜单</div>
        <create-form 
          :dataList="dataList"
          @getValue="getChild"
          width="100%"
          labelWidth="120px"
        />
      </el-col>
    </el-row>

    <addOrEditMenu :roleList="roleList" :visible="visible" @close="closeModal" :title="pageInit.title" :pageType="pageInit.pageType" :id="pageInit.id"  ></addOrEditMenu>
    
  </div>
</template>

<script>
//  引入组件
import menuLists from './components/menuList'
import {isEmpty} from '@/utils/auth'
import CreateForm from '@/components/CreateForm'
import addOrEditMenu from './components/addOrEditMenu'
import {menuList,delMenu,menuAddOrEdit,selectAdminMenuById} from '@/api/backstageSetting'
import Bus from './components/bus.js'
export default {
    name:'menuMange',
    data() {
        return {
          items:[],
          form: {},
          open: false,
          flag: true,
          visible:false,
          pageInit:{
            title:'',
            pageType:'',
            id:''
          },
          dataList:[
              {
                  title:'菜单名称',
                  type:'text',
                  id:'title',
                  required:true,
              },
              {
                  title:'图标',
                  type:'icon',
                  id:'icon',
              },
              {
                  title:'路径',
                  type:'text',
                  id:'uri',
                  required:true,
              },
              {
                  title:'角色',
                  type:'select',
                  id:'roleId',
                  multiple:true,
                  required:true,
                  option:[],
                  optionObj:{
                      key:'name',
                      value:'id'
                  },
                  value:[]
              },
          ],
          roleList:[]
        }
    },
    computed: {
      dragOptions() {
        return {
          animation: 0,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      },
      
    },
    watch:{
        '$store.state.backstageSetting.roleList':{
            handler(newValue) {
                this.dataList[3].option = newValue
                this.roleList = newValue
    　　　　},
    　　　　deep: true
        },
        'items':{
          handler(newValue) {
              this.items = newValue
    　　　　},
    　　　　deep: true
        }
    },
    created(){
      Bus.$on('open',(obj)=>{
        const {type,title,id} = obj
        this.pageInit={
            title,
            pageType:type,
            id
        }
        this.visible=true
      });
      Bus.$on('deleteMenu',(id)=>{
        delMenu({id}).then(res=>{
          if(res.statusCode === 0){
            this.getMenuList()
            this.$message({
              message:'删除成功',
              type:'success'
            })
          }
        })
      });
      
    },
    mounted(){
      this.getMenuList()
      this.$store.dispatch({
        type:'backstageSetting/getRoleList'
      })

    },
    
    components: {
        addOrEditMenu,
        CreateForm,
        menuLists
    },
    methods:{
      
      save(){
        this.$message({
            message: `保存成功`,
            type: 'success'    
        })
      },
      refresh(){
          this.$router.go(0)
      },
      getChild(data){
            data.parentId =0
            data.roleId = data.roleId.join(',')
            data.icon = !isEmpty(data.icon) ? '' : data.icon

            menuAddOrEdit(data,'add').then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `菜单创建成功`,
                        type: 'success'    
                    })
                    this.getMenuList()
                    this.$store.dispatch('user/getMenuList', {payload:this.$store.state.user.userInfo.id})
                }
            })
        },
      getMenuList(){
        menuList().then(res=>{
          const {content} = res;
          const list = []
         
          content.forEach(item=>{
            item.open=true
          })

          this.items = content
        }).catch(()=>{
          // this.loading=false
      })
      },
     
      routePush(path){
        this.$router.push(path)
      },
      closeModal(visible,refresh){
        this.visible = visible
        if(refresh){
          this.getMenuList()
        }
      },
      openAll(){
        const {items} = this;
        items.forEach(item=>{
            item.open = true
        })
      },
      closeAll(){
        const {items} = this;
        items.forEach(item=>{
            item.open = false
        })
      },
      
    }
}
</script>

<style scoped lang='scss'>
.h1Title{
  font-size: 16px;
  margin: 0 0 20px 0;
  font-weight: 700;
  text-align: center;
}
.btnWrapper{
  margin-bottom: 20px;
}

  .item{
    border:1px solid #ccc;
    line-height: 40px;
    margin-bottom: 5px;
    padding:0 10px;
    &:hover{
      .itemName{
        color: #409eff;
      }
    }
    i{
      &:hover{
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
