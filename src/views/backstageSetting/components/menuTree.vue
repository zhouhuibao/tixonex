<template>
    <SlickList lockAxis="y" v-model="items" >
        <SlickItem v-for="(item, index) in items" :index="index" :key="index">
          <div class="item clearfix">
            <div class="itemName pull-left">
              {{ item.title }}
            </div>
            <div class=" pull-right">
                <i class="el-icon-edit-outline"></i>
                <i class="el-icon-delete"></i>
            </div>

          </div>
          
              <div v-if="getType(item.children)" class="children" style="margin-left:20px">
                  <tree-menus :items="item.children"></tree-menus>
                   <!-- <SlickList lockAxis="y" v-model="item.children">
                    <SlickItem v-for="(nodeItem, x) in item.children" :index="x" :key="x">
                      <div class="item clearfix">
                        <div class="itemName pull-left">
                          {{ nodeItem.title }}
                        </div>
                        <div class="itemName pull-right">
                            <i class="el-icon-edit-outline"></i>
                            <i class="el-icon-delete"></i>
                        </div>

                      </div>
                      
                    </SlickItem>
                  </SlickList>  -->
              </div>
              
        </SlickItem>
    </SlickList>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort'
import {dataType} from '@/utils/auth'
export default {
    name:'treeMenus',
    data() {
        return {
            scopesDefault: [],
            scopes: []
        }
    },
    props: {
        items: Array,
        id:String,
    },
    
    watch:{
        'items':{
            handler(newVal,oldVal){
                this.$emit('setTree',newVal)
                console.log(this.items)
                console.log(newVal)
            },
            deep:true
        }
    },
    methods:{
        getType(data){
            if(dataType(data) === 'Array'){
                return true
            }
            return false
        },
        getChangeLists(val){
            console.log(val)
        },
        sortEnd(event, newIndex, oldIndex, collection){
            console.log(event, newIndex, oldIndex, collection)
        }
    },
    components: {
        SlickList,
        SlickItem,
    },

}
</script>

<style scoped lang='scss'>

  .item{
    border:1px solid #ccc;
    line-height: 40px;
    margin-bottom: 10px;
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