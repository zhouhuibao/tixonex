<template>
  <div>
    <div class="btnWrapper">
      <el-button-group>
        <el-button type="primary" icon="el-icon-bottom" @click="openAll">展开</el-button>
        <el-button type="primary" @click="closeAll">收起<i class="el-icon-top"></i></el-button>
        <el-button type="primary" @click="closeAll">收起<i class="el-icon-top"></i></el-button>
      </el-button-group>
      <el-button-group>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="openModal('add','添加顶级菜单',0)">添加顶级菜单</el-button>
        <el-button type="primary" icon="el-icon-s-claim">保存</el-button>
        <el-button type="primary" icon="el-icon-refresh">刷新</el-button>
      </el-button-group>
    </div>
    <div class='listWrapper'>
      <SlickList lockAxis="y" v-model="items">
        <SlickItem v-for="(item, index) in items" :index="index" :key="index">
          <div class="item clearfix">
            <div class="itemName pull-left">
              <span v-if="getType(item.children) ">
                <el-button v-if="item.children.length>0" type="text" :class="item.open && item.children.length > 0 ? 'el-icon-minus' : 'el-icon-plus'" @click="silggle(item.title)"></el-button>
              </span>
              {{ item.title }}
            </div>
            <div class=" pull-right">
                <el-button type="text" class="el-icon-circle-plus-outline" @click="openModal('add','添加子菜单',item.title)" title="添加子菜单"></el-button>
                <el-button type="text" class="el-icon-edit-outline" @click="openModal('edit','修改菜单',item.title)"></el-button>
                <el-button type="text" class="el-icon-delete" @click="clickDel(item)"></el-button>
            </div>

          </div>
              <div v-if="getType(item.children)" class="children" :style="`margin-left:20px;height:${!item.open ? 0 : 'auto'};overflow:hidden;transition:.2s`">
                   <SlickList lockAxis="y" v-model="item.children">
                    <SlickItem v-for="(nodeItem, x) in item.children" :index="x" :key="x">
                      <div class="item clearfix">
                        <div class="itemName pull-left">
                          <i :class="nodeItem.icon"></i>
                          {{ nodeItem.title }}
                          <el-button type="text" @click="routePush(nodeItem.uri)">{{nodeItem.uri}}</el-button>
                        </div>
                        <div class="itemName pull-right">
                          <el-button type="text" class="el-icon-edit-outline" @click="openModal('edit','修改子菜单',nodeItem.id)"></el-button>
                          <el-button type="text" class="el-icon-delete" @click="openModal('edit','删除节点',0)"></el-button>
                        </div>

                      </div>
                      
                    </SlickItem>
                  </SlickList> 
              </div>
              
        </SlickItem>
      </SlickList>
    </div>
    
    
    <addOrEditMenu :visible="visible" @close="closeModal" :title="pageInit.title" :pageType="pageInit.pageType" :id="pageInit.id"  ></addOrEditMenu>
    
  </div>
</template>

<script>
//  引入组件
import { SlickList, SlickItem } from 'vue-slicksort'
import {dataType} from '@/utils/auth'

import addOrEditMenu from './components/addOrEditMenu'
import {menuList} from '@/api/backstageSetting'
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
          }
        }
    },
    mounted(){
      menuList().then(res=>{

          const {content} = res;
          
          const list = []
          for(let key  in content){
            const obj ={
              title:key,
              children:content[key],
              open:true
            }

            list.push(obj)

          }
          
          this.items = list
          console.log(this.items)
          // this.loading = false
        }).catch(()=>{
          // this.loading=false
        })
    },
    components: {
        SlickList,
        SlickItem,
        addOrEditMenu
    },
    methods:{
      routePush(path){
        this.$router.push(path)
      },
      closeModal(visible){
        this.visible = visible
      },
      openModal(type,title,id){
        console.log(type,title,id)
        this.pageInit={
            title,
            pageType:type,
            id
        }
        this.visible=true
      },
      clickDel(id){
        console.log(id)
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
      toTree(data){
        // 删除 所有 children,以防止多次调用
        data.forEach(function (item) {
            delete item.children;
        });
 
        // 将数据存储为 以 id 为 KEY 的 map 索引数据列
        var map = {};
        data.forEach(function (item) {
            map[item.id] = item;
        });
//        console.log(map);
        var val = [];
        data.forEach(function (item) {
          item.open =true
            // 以当前遍历项，的pid,去map对象中找到索引的id
            var parent = map[item.parentId];
            // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
            if (parent) {
                (parent.children || ( parent.children = [] )).push(item);
            } else {
                //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
                val.push(item);
            }
        });
        return val;

      },
      getChangeList (e) {
          window.console.log(e, 'val')
      },
      getChangeLists (e) {
          window.console.log(e, 'vals')
      },
      handClick (e) {
          this.open = !this.open
          this.form = {}
          window.console.log(e, 'vals')
      }
    }
}
</script>

<style scoped lang='scss'>
.btnWrapper{
  margin-bottom: 20px;
}
.listWrapper{
  max-width: 600px;
}
  .item{
    border:1px solid #ccc;
    line-height: 40px;
    margin-bottom: 5px;
    padding:0 10px;
    cursor: pointer;
    &:hover{
      .itemName{
        color: #409eff;
      }
    }
    i{
      &:hover{
        color: #409eff;
      }
    }
  }
</style>
