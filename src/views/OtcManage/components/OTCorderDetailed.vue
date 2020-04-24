<template>
  <el-drawer
    title="订单详情"
    :visible.sync="show"
    direction="rtl"
    size="600px"
    @close="close"
    @open="open"
  >
    <el-row :gutter="20" class="wrapper">
        <el-col :span="12"><span class="left">id</span>:<span class='right'>{{tableData.id || ''}}</span></el-col>
        <el-col :span="12"><span class="left">订单号</span>:<span class='right'>{{tableData.orderNo || ''}}</span></el-col>
        <el-col :span="12"><span class="left">申诉人角色</span>:<span class='right'>{{tableData.appeal || ''}}</span></el-col>
        <el-col :span="12"><span class="left">申诉说明</span>:<span class='right'>{{tableData.appealDesc || ''}}</span></el-col>
        <el-col :span="12"><span class="left">买家邮箱</span>:<span class='right'>{{tableData.buyMobile || ''}}</span></el-col>
        <el-col :span="12"><span class="left">买家身份证</span>:<span class='right'>{{tableData.buyIdCard || ''}}</span></el-col>
        <el-col :span="12"><span class="left">买家手机号</span>:<span class='right'>{{tableData.buyMobile || ''}}</span></el-col>
        <el-col :span="12"><span class="left">买家名字</span>:<span class='right'>{{tableData.buyName || ''}}</span></el-col>
        <el-col :span="12"><span class="left">买家真实姓名</span>:<span class='right'>{{tableData.buyRealName || ''}}</span></el-col>
        <el-col :span="12"><span class="left">卖家身份证</span>:<span class='right'>{{tableData.sellIdCard || ''}}</span></el-col>
        <el-col :span="12"><span class="left">卖家手机号</span>:<span class='right'>{{tableData.sellMobile || ''}}</span></el-col>
        <el-col :span="12"><span class="left">卖家用户名</span>:<span class='right'>{{tableData.sellName || ''}}</span></el-col>
        <el-col :span="12"><span class="left">卖家真实姓名</span>:<span class='right'>{{tableData.sellRealName || ''}}</span></el-col>
        <el-col :span="12"><span class="left">状态</span>:<span class='right'>{{getStatus(tableData.status)}}</span></el-col>
        <el-col :span="12"><span class="left pull-left">付款凭证:</span>
        <el-image
        class="pull-left"
        style="width: 200px; height: 200px"
        :src="tableData.credentialUrls"
        fit="contain"
        :preview-src-list="[tableData.credentialUrls]"
        ></el-image>
        </el-col>
    </el-row>
    
</el-drawer>
</template>

<script>
import {otcOrdersDetail} from '@/api/OTCManage'
    export default {
        name:'OTCorderDetailed',
        data(){
            return {
                tableData:{

                },
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
                this.tableData={}
            },
            open(){
                this.getArticleByLocaleList()
            },
            getStatus(value){
                const {OTCorderStatus} = this.$store.state.OTCManage;
                let str = ''
                OTCorderStatus.forEach(item=>{
                if(item.value === value){
                    str = item.key
                }
                })
                return str
            },
            getArticleByLocaleList(data){
                this.loading = true
                let parmas={
                    id:this.selectedId
                }
                
                otcOrdersDetail(parmas).then(res=>{
                    const {content,total} = res
                    this.tableData = {...content} || {}
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

<style scoped lang='scss'>
    .wrapper{
        font-size: 14px;
        .left{
            margin-left:10px;
            line-height: 30px;
            color: rgba(0,0,0,.85);
            font-weight: 400;
        }
        .right{
            margin-left: 10px;
            color: rgba(0,0,0,.65);
        }
    }
</style>