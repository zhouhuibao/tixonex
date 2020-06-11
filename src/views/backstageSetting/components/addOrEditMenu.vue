<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    width="600px"
    :before-close="handleClose"
    @open="open"
>
    <create-form 
      :dataList="dataList"
      @getValue="getChild"
      width="100%"
      labelWidth="120px"
    />
    
    </el-dialog>
</template>

<script>
import {menuAddOrEdit,selectAdminMenuById} from '@/api/backstageSetting'
import CreateForm from '@/components/CreateForm'
import {MathRandom,isEmpty,dataType} from '@/utils/auth'
export default {
    name:'detailed',
    data(){
        return {
            dataList:[],
            menuInfo:{}
        }
    },
    props:{
        visible:{
            type: Boolean,
            required: true
        },
        id:{
            default: ''
        },
        id:{
            default: ''
        },
        pageType:{
            type:String,
            default:'add'
        },
        title:String,
        roleList:{
            type:Array,
            default:[]
        }
        
    },
    computed:{
        show:{
            get(){
                return this.visible
            },
            set(v){
                this.$emit('close',v)
            }
        }
    },
    methods:{
        close(){
            this.tableData=[]
        },
        open(){
            const list=[
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
                    title:'排序',
                    type:'number',
                    id:'order',
                    required:true,
                },
                {
                    title:'角色',
                    type:'select',
                    id:'roleId',
                    multiple:true,
                    required:true,
                    option:this.roleList,
                    optionObj:{
                        key:'name',
                        value:'id'
                    },
                    value:[]
                },
            ]
            this.dataList =list
            const {id,pageType,title} = this
            this.getDetail()
            
        },
        getChild(data){
            const {pageType,menuInfo:{parentId,id}} = this;
            data.icon = !isEmpty(data.icon) ? '' : data.icon
            if(pageType === 'edit'){
                data.id = id;
                data.parentId =parentId
            }else{
                data.parentId = id;
            }
            data.roleId = data.roleId.join(',')
            menuAddOrEdit(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `菜单${pageType === 'add' ? '创建' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$store.dispatch('user/getMenuList', {payload:this.$store.state.user.userInfo.id})
                    this.$emit('close',false,true)
                }
            })
        },
        getDetail(){
            const parmas={}
            // if(this.title === '修改子菜单'){
            //     parmas.id=this.id
            // }else{
            //     parmas.title = this.id
            // }
            parmas.id=this.id

            selectAdminMenuById(parmas,this.title).then(res=>{
                if(res.statusCode === 0){
                    const {content} = res
                    
                    this.menuInfo = content

                    if(this.pageType === 'edit'){
                        const list = this.dataList;
                        const arr = [];
                        list.forEach(item=>{

                            item.value=content[item.id]
                            const obj = {...item}
                            obj.value=content[item.id]
                            if(item.id === 'roleId'){
                                obj.value=dataType(content[item.id]) === 'String' ? content[item.id].split(',').map(Number) : []
                            }

                            arr.push(obj)
                        })
                        this.dataList = arr
                    }
                   
                }
            })
        },
        handleClose(){
            this.dataList.forEach(item=>{
                item.value =''
            })
            this.$emit('close',false)
        }
        
    },
    components: {
      CreateForm
    } 
    
}
</script>

<style>

</style>