<template>
  <el-drawer
    title="订单详情"
    :visible.sync="show"
    direction="rtl"
    size="80%"
    @close="close"
    @open="open"
  >
    <div style="padding:0 20px">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>订单信息</span>
                <el-button style="float: right; padding: 3px 0" type="text">
                    <!-- 状态: -->
                    {{getStatus(tableData.status)}}
                </el-button>
                
            </div>
            <el-row :gutter="20" class="wrapper">
                <el-col :span="8"><span class="left">id</span>:<span class='right'>{{tableData.id || ''}}</span></el-col>
                <el-col :span="8"><span class="left">订单号</span>:<span class='right'>{{tableData.orderNo || ''}}</span></el-col>
                <el-col :span="8"><span class="left">交易币量</span>:<span class='right'>{{tableData.number || ''}}</span></el-col>
                <el-col :span="8"><span class="left">交易金额</span>:<span class='right'>{{tableData.amount || ''}}</span></el-col>
                <el-col :span="8"><span class="left">买家邮箱</span>:<span class='right'>{{tableData.buyMobile || ''}}</span></el-col>
                <el-col :span="8"><span class="left">买家身份证</span>:<span class='right'>{{tableData.buyIdCard || ''}}</span></el-col>
                <el-col :span="8"><span class="left">买家手机号</span>:<span class='right'>{{tableData.buyMobile || ''}}</span></el-col>
                <el-col :span="8"><span class="left">买家用户名</span>:<span class='right'>{{tableData.buyName || ''}}</span></el-col>
                <el-col :span="8"><span class="left">卖家邮箱</span>:<span class='right'>{{tableData.sellEmail || ''}}</span></el-col>
                <el-col :span="8"><span class="left">卖家身份证</span>:<span class='right'>{{tableData.sellIdCard || ''}}</span></el-col>
                <el-col :span="8"><span class="left">卖家手机号</span>:<span class='right'>{{tableData.sellMobile || ''}}</span></el-col>
                <el-col :span="8"><span class="left">卖家用户名</span>:<span class='right'>{{tableData.sellName || ''}}</span></el-col>
            </el-row>
        </el-card>
        <el-card v-if="tableData.isAppeal === 0" class="isAppeal">
            <div slot="header" class="clearfix">
                <span>申诉状态:</span><span>双方未申诉</span>
            </div>
        </el-card>
        <el-row v-else :gutter="20" class="card-wrapper">
            <el-col :span="12" v-if="tableData.isAppeal === 1 || tableData.isAppeal === 3">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>买家申诉</span>
                    </div>
                    <el-row :gutter="20" class="wrapper">
                        <el-col :span="24"><span class="left">申诉人</span>:<span class='right'>{{tableData.buyRealName || ''}}</span></el-col>
                        <el-col :span="24"><span class="left">申诉说明</span>:<span class='right'>{{tableData.appealDesc || ''}}</span></el-col>
                        <el-col :span="24" v-if="tableData.buyerUrls === '' || tableData.buyerUrls === undefined"><span class="left pull-left">付款凭证:暂无图片</span></el-col>
                        <el-col :span="24" v-else >
                            <span class="left pull-left" style="width:100%">付款凭证:</span>
                            <el-row :gutter="20">
                                <el-col 
                                    :span="6" 
                                    v-for="(item,index) in tableData.buyerUrls.split(',') || []"
                                    :key="index"
                                >
                                    <el-image
                                        class="imgItem"
                                        style="width: 100%"
                                        :src="item"
                                        fit="contain"
                                        :preview-src-list="tableData.buyerUrls.split(',') || []"
                                    ></el-image>

                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="12" v-if="tableData.isAppeal === 2 || tableData.isAppeal === 3">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卖家申诉</span>
                    </div>
                    <el-row :gutter="20" class="wrapper">
                        <el-col :span="24"><span class="left">申诉人</span>:<span class='right'>{{tableData.sellRealName || ''}}</span></el-col>
                        <el-col :span="24"><span class="left">申诉说明</span>:<span class='right'>{{tableData.appealDesc || ''}}</span></el-col>
                        <el-col :span="24" v-if="tableData.sellerUrls === '' || tableData.sellerUrls === undefined"><span class="left pull-left">付款凭证:暂无图片</span></el-col>
                        <el-col :span="24" v-else >
                            <span class="left pull-left" style="width:100%">付款凭证:</span>
                            <el-row :gutter="10">
                                <el-col 
                                    :span="6" 
                                    v-for="(item,index) in tableData.sellerUrls.split(',') || []"
                                    :key="index"
                                >
                                    <el-image
                                        class="imgItem"
                                        style="width: 100%"
                                        :src="item"
                                        fit="contain"
                                        :preview-src-list="tableData.sellerUrls.split(',') || []"
                                    ></el-image>

                                </el-col>
                            </el-row>
                        </el-col>

                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        
        
        <div v-if="tableData.status !== 1 && tableData.status !== 100">
            <el-popconfirm
                title="确认完成订单吗"
                @onConfirm="deleteData('deal')"
            >
                <el-button slot="reference" type="primary">确认完成</el-button>
            </el-popconfirm>
            <el-popconfirm
                title="确认取消订单吗"
                @onConfirm="deleteData('cancel')"
            >
                <el-button slot="reference" type="danger">取消订单</el-button>
            </el-popconfirm>
        </div>
        
    </div>
    
</el-drawer>
</template>

<script>
import {otcOrdersDetail,otcOrdersCacelDeal} from '@/api/OTCManage'
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
        mounted(){
            console.log(this.tableData.sellerUrls)
        },
        methods:{
            close(){
                this.tableData={}
            },
            open(){
                this.getArticleByLocaleList()
            },
            deleteData(type){
                otcOrdersCacelDeal({id:this.tableData.id},type).then(res=>{
                    if(res.statusCode === 0){
                        this.$message({
                            type:'success',
                            message:'操作成功'
                        })
                        this.$emit('changeDrawer',false,'done')
                    }
                })
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
.card-wrapper{
    margin: 20px 0;
}
    .wrapper{
        font-size: 14px;
        .left{
            margin-left:0;
            line-height: 30px;
            color: rgba(0,0,0,.85);
            font-weight: 400;
            
        }
        .right{
            margin-left: 10px;
            color: rgba(0,0,0,.65);
        }
        .imgItem{
            margin-bottom:10px ;
        }
    }
</style>

<style scoped>
.isAppeal{
        margin: 20px 0;

}
    .isAppeal /deep/ .el-card__body{
        padding: 0 20px;
    }
</style>