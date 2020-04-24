<template>
  <el-drawer
    title="撮合明细"
    :visible.sync="show"
    direction="rtl"
    size="80%"
    @close="close"
    @open="open"
  >
   <el-table :data="tableData" v-loading="loading">
        <el-table-column
            prop="id"
            label="ID"
            width="55"
        >
        </el-table-column>
        <el-table-column
            prop="realName"
            label="真实姓名"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="mobile"
            label="手机号"
            width="120"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="coinName"
            label="币种名称"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="type"
            label="交易类型"
            show-overflow-tooltip
        >
        <template slot-scope="scope">{{ getJYType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column
            prop="amount"
            label="委托数量"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="feeCoin"
            label="手续费"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="price"
            label="单价"
            show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
            prop="createdAt"
            label="委托时间"
            show-overflow-tooltip
        >
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
</el-drawer>
</template>

<script>
import {tradeDeal} from '@/api/trading'
    export default {
        name:'detailed',
        data(){
            return {
                pageNo:1,
                pageSize:10,
                total:0,
                tableData:[],
                loading:false,
            }
        },
        props:{
            visible:{
                type: Boolean,
                required: true
            },
            selectedId:{
                default: ''
            }
        },
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
        methods:{
            close(){
                this.tableData=[]
            },
            open(){
                this.getArticleByLocaleList()
            },
            getJYType(value){
                const {JYTypeArr} = this.$store.state.denomination;
                let str = ''
                JYTypeArr.forEach(item=>{
                if(item.value === value){
                    str = item.key
                }
                })
                return str
            },
            getArticleByLocaleList(data){
                this.loading = true
                const {pageNo,pageSize,selectedId} = this;
                let parmas={
                    pageNo,
                    pageSize,
                    tradeId:selectedId
                }
                
                tradeDeal(parmas).then(res=>{
                    const {content,total} = res
                    this.tableData = content || []
                    this.total = total
                    this.loading = false
                }).catch(()=>{
                    this.loading=false
                })

            },
            handleCurrentChange(val) {
                this.pageNo = val
                this.getArticleByLocaleList()
            },
        }
        
    }
</script>

<style>

</style>