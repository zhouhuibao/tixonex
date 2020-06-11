<template>
  <draggable class="wrapper" :list="tasks">
        <transition-group type="transition" name="flip-list">
            <div v-for="(item) in tasks" :key="item.id">
              <div class="item clearfix">
                <div class="itemName pull-left">
                  <span v-if="getType(item.list) ">
                    <el-button v-if="item.list.length>0" type="text" :class="item.open && item.list.length > 0 ? 'el-icon-minus' : 'el-icon-plus'" @click="silggle(item.title)"></el-button>
                  </span>
                  <i :class="item.icon"></i>

                  {{ item.title }}
                </div>
                <div class=" pull-right">
                    <el-button type="text" v-if="item.parentId === 0" class="el-icon-circle-plus-outline" @click="handleOpenModal('add','添加子菜单',item.id)" title="添加子菜单"></el-button>
                    <el-button type="text" class="el-icon-edit-outline" @click="handleOpenModal('edit','修改菜单',item.id)"></el-button>
                    <el-popconfirm
                      title="确定删除该菜单吗"
                      @onConfirm="clickDel(item.id)"
                    >
                      <el-button  slot="reference" type="text" class="el-icon-delete"></el-button>
                    </el-popconfirm>
                </div>

              </div>
              <el-collapse-transition>
                <div v-show="item.open">
                    <nested-draggable :tasks="item.list"  :style="`margin-left:20px;`"/>
                </div>
              </el-collapse-transition>
            </div>
        </transition-group>
  </draggable>
</template>
<script>
import {dataType,isEmpty} from '@/utils/auth'
import draggable from "vuedraggable";
import Bus from './bus.js'
export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  methods:{
      getType(data){
        if(dataType(data) === 'Array'){
          return true
        }
        return false
      },
      silggle(id){
        const {tasks} = this;
        tasks.forEach(item=>{
          if(item.title === id){
            item.open = !item.open
          }
        })
      },
      handleOpenModal(type,title,id){
          const obj={
              type,title,id
          }
          Bus.$emit('open',obj)
      },
      clickDel(id){
          Bus.$emit('deleteMenu',id)
      }
  },
  name: "nested-draggable"
};
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