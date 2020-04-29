<template>
  <el-drawer
    title="明细"
    :visible.sync="show"
    direction="rtl"
    size="50%"
  >
   <el-table :data="tableData">
      <el-table-column property="ID" label="ID"></el-table-column>
      <el-table-column property="name" label="交易数量"></el-table-column>
      <el-table-column property="address" label="币种名称"></el-table-column>
      <el-table-column property="address1" label="账户特性"></el-table-column>
      <el-table-column property="address2" label="变动类型"></el-table-column>
      <el-table-column property="address3" label="交易时间"></el-table-column>
    </el-table>
</el-drawer>
</template>

<script>
    export default {
        name:'detailed',
        computed:{
            show:{
                get(){
                    return this.visible
                },
                set(v){
                    this.$emit('changeDrawer',v)
                }

            }
        },
        props:{
            visible:{
                type: Boolean,
                required: true
            },
            tableData:{
                type:Array,
                default: []
            }
        }
    }
</script>

<style>

</style>