<template>
  <div>
    <div class="btnWrapper">
      <el-button-group>
        <el-button type="primary" icon="el-icon-bottom" @click="openAll">展开</el-button>
        <el-button type="primary" @click="closeAll">收起<i class="el-icon-top"></i></el-button>
      </el-button-group>
      <el-button-group>
        <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openModal('add','添加顶级菜单',0)">添加顶级菜单</el-button> -->
        <el-button type="primary" icon="el-icon-s-claim" @click="save">保存</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
      </el-button-group>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :md="12" style="margin-bottom:20px;">
        <vuedraggable class="wrapper" v-model="items">
          <transition-group name="fade">
            <div v-for="(item,index) in items" :key="index">
              <div class="item clearfix">
                <div class="itemName pull-left">
                  <span v-if="getType(item.list) ">
                    <el-button v-if="item.list.length>0" type="text" :class="item.open && item.list.length > 0 ? 'el-icon-minus' : 'el-icon-plus'" @click="silggle(item.title)"></el-button>
                  </span>
                  <i :class="item.icon"></i>

                  {{ item.title }}
                </div>
                <div class=" pull-right">
                    <el-button type="text" class="el-icon-circle-plus-outline" @click="openModal('add','添加子菜单',item.id)" title="添加子菜单"></el-button>
                    <el-button type="text" class="el-icon-edit-outline" @click="openModal('edit','修改菜单',item.id)"></el-button>
                    <el-popconfirm
                      title="确定删除该菜单吗"
                      @onConfirm="clickDel(item.title)"
                    >
                      <el-button  slot="reference" type="text" class="el-icon-delete"></el-button>
                    </el-popconfirm>
                </div>

              </div>

              <el-collapse-transition>
                <div v-show="item.open">
                  <div v-if="getType(item.list)" class="list" :style="`margin-left:20px;`">
                    <vuedraggable v-model="items.item">
                      <div v-for="(nodeItem,x) in item.list" :key="x" >
                        <div class="item clearfix">
                          <div class="itemName pull-left">
                            <i :class="nodeItem.icon"></i>
                            {{ nodeItem.title }}
                            <el-button type="text" @click="routePush(`${item.uri}/${nodeItem.uri}`)">{{`${item.uri}/${nodeItem.uri}`}}</el-button>
                          </div>
                          <div class="itemName pull-right">
                            <el-button type="text" class="el-icon-edit-outline" @click="openModal('edit','修改子菜单',nodeItem.id)"></el-button>
                            <el-popconfirm
                              title="确定删除该菜单吗"
                              @onConfirm="clickDel(nodeItem.id)"
                            >
                              <el-button type="text"  slot="reference" class="el-icon-delete"></el-button>
                            </el-popconfirm>
                          </div>

                        </div>
                      </div>
                    </vuedraggable>
                  </div>

                </div>
                  
              </el-collapse-transition>
              

            </div>
          </transition-group>
        </vuedraggable>
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
import vuedraggable from 'vuedraggable';
import {dataType,isEmpty} from '@/utils/auth'
import CreateForm from '@/components/CreateForm'
import addOrEditMenu from './components/addOrEditMenu'
import {menuList,delMenu,menuAddOrEdit,selectAdminMenuById} from '@/api/backstageSetting'
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
    mounted(){
      this.getMenuList()
      this.$store.dispatch({
        type:'backstageSetting/getRoleList'
      })
    },
    
    components: {
        addOrEditMenu,
        vuedraggable,
        CreateForm
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
          // this.loading = false
        }).catch(()=>{
          // this.loading=false
      })
      },
      spanClick(){
        
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
      openModal(type,title,id){
        this.pageInit={
            title,
            pageType:type,
            id
        }
        this.visible=true
      },
      clickDel(id){
        if(dataType(id) === 'String'){
          selectAdminMenuById({title:id}).then(res=>{
            if(res.statusCode === 0){
                const {content} = res
                this.delateMenu(content.id)
            }
          })
        }else{
          this.delateMenu(id)
        }
      },
      delateMenu(id){
        delMenu({id}).then(res=>{
          if(res.statusCode === 0){
            this.getMenuList()
            this.$message({
              message:'删除成功',
              type:'success'
            })
          }
        })
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
      silggle(id){
        const {items} = this;
        items.forEach(item=>{
          if(item.title === id){
            item.open = !item.open
          }
        })
      },
      getType(data){
        if(dataType(data) === 'Array'){
          return true
        }
        return false
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
