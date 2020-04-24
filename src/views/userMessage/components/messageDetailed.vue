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
        <el-col :span="24">
            <div class="wrapperflex">
                <div class="left">id:</div>
                <div class='right'>{{tableData.id || ''}}</div>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="wrapperflex">
                <div class="left">用户id:</div>
                <div class='right'>{{tableData.userId || ''}}</div>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="wrapperflex">
                <div class="left">用户名:</div>
                <div class='right'>{{tableData.userName || ''}}</div>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="wrapperflex">
                <div class="left">留言时间:</div>
                <div class='right'>{{tableData.createTime || ''}}</div>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="wrapperflex">
                <div class="left">留言内容:</div>
                <div class='right'>{{tableData.message || ''}}</div>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="wrapperflex">
                <div class="left">图片:</div>
                <div class='right'>
                    <el-image
                    style="width: 200px; height: 200px"
                    :src="tableData.image"
                    fit="contain"
                    :preview-src-list="[tableData.image]"
                    ></el-image>
                </div>
            </div>
        </el-col>
        <!-- <el-col :div="12">
            <div class="left">id</div>:<div class='right'>{{tableData.id || ''}}</div>
        </el-col>
        <el-col :div="12"><div class="left">用户id</div>:<div class='right'>{{tableData.userId || ''}}</div></el-col>
        <el-col :div="12"><div class="left">用户名</div>:<div class='right'>{{tableData.userName || ''}}</div></el-col>
        <el-col :div="12"><div class="left">留言时间</div>:<div class='right'>{{tableData.createTime || ''}}</div></el-col>
        <el-col :div="24"><div class="left">留言内容</div>:<div class='right'>{{tableData.message || ''}}</div></el-col>
        <el-col :div="24"><div class="left pull-left">图片:</div>
        <el-image
        class="pull-left"
        style="width: 200px; height: 200px"
        :src="tableData.image"
        fit="contain"
        :preview-src-list="[tableData.image]"
        ></el-image>
        </el-col> -->
    </el-row>
    
</el-drawer>
</template>

<script>
import {feedbackDetail} from '@/api/userMessage'
    export default {
        name:'messageDetailed',
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
                
                feedbackDetail(parmas).then(res=>{
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
        .wrapperflex{
            display: flex;
            margin-bottom: 20px;
            padding: 0 20px;
            .left{
                width: auto;
                margin-left:10px;
                color: rgba(0,0,0,.85);
                font-weight: 400;
            }
            .right{
                flex: 1;
                margin-left: 10px;
                color: rgba(0,0,0,.65);
            }
        }
        
    }
</style>