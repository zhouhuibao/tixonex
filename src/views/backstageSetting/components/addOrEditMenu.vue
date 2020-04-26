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
            dataList:[
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
                    required:true,
                },
                {
                    title:'路径',
                    type:'text',
                    id:'uri',
                    required:true,
                },
                {
                    title:'角色',
                    type:'select',
                    id:'roleId',
                    multiple:true,
                    required:true,
                    option:[],
                    optionObj:{
                        key:'name',
                        value:'id'
                    },
                    value:[]
                },
            ],
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
        pageType:{
            type:String,
            default:'add'
        },
        title:String
        
    },
    watch:{
        '$store.state.backstageSetting.roleList':{
            handler(newValue) {
                this.dataList[3].option = newValue
    　　　　},
    　　　　deep: true
        },
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
    mounted(){
        this.$store.dispatch({
            type:'backstageSetting/getRoleList'
        })
    },
    methods:{
        close(){
            this.tableData=[]
        },
        open(){
            const {id,pageType,title} = this
            if(pageType === 'edit'){
                console.log(id,pageType,title)
                console.log(22)
                this.getDetail()
            }
        },
        getChild(data){
            const {pageType} = this;
            if(pageType === 'edit'){
                data.id = this.id
            }
            data.roleId = data.roleId.join(',')
            menuAddOrEdit(data,pageType).then(res=>{
                if(res.statusCode === 0){
                    this.$message({
                        message: `菜单${pageType === 'add' ? '创建' : '修改'}成功`,
                        type: 'success'    
                    })
                    this.$emit('close',false)
                }
            })
        },
        getDetail(){
                console.log(22)
            
            const parmas={}
            if(this.title === '修改子菜单'){
                parmas.id=this.id
            }else{
                parmas.title = this.id
            }

            selectAdminMenuById(parmas,this.title).then(res=>{
                if(res.statusCode === 0){
                    const {content} = res
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
            })
        },
        handleClose(){
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