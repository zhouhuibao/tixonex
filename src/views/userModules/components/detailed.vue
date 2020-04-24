<template>
  <el-drawer
    title="明细"
    :visible.sync="visible"
    direction="rtl"
    size="50%"
  >
   <el-table :data="tableData">
      <el-table-column property="date" label="日期" width="150"></el-table-column>
      <el-table-column property="name" label="姓名" width="200"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
    </el-table>
</el-drawer>
</template>

<script>
    export default {
        name:'detailed',
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