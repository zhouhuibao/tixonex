<template>
    <div class="searchWarpper">
        <el-form :model="dynamicValidateForm" 
            ref="dynamicValidateForm" 
            label-width="auto"
            class="demo-dynamic"
            :style="`width:${width === undefined ? 'auto' : width };`"
        >
        
        <el-form-item 
            v-for="(item,index) in dynamicValidateForm.domains" 
            :key="index" 
            :label="item.title" 
            :prop="'domains.' + index + '.value'"
            
            :rules="setRules(item)"
        >
        
            <Editor 
                v-if="item.type === 'tinymce'"
                :value="item.value"
                v-model="item.value"
            >
            </Editor>
            
            <div class="picker-icon" v-if="item.type === 'icon'">
                <icon-picker
                    v-model="item.value"
                >
                </icon-picker>
                <div class="delICon" @click="delIcon(item)">
                    <i class="el-icon-circle-close"></i>
                </div>
            </div>
             
            

            <el-input autocomplete="new-password" v-if="item.type === 'password'" type="password"  :disabled="item.disabled || false" v-model="item.value" :placeholder="`请输入${item.title}`" />
            <el-input v-if="item.type === 'text'" :show-password="item.password || false" :disabled="item.disabled || false" v-model="item.value" :placeholder="`请输入${item.title}`" ></el-input>
            <el-input type="textarea"  :autosize="{ minRows: 4, maxRows: 10}" v-if="item.type === 'textarea'" :disabled="item.disabled || false" v-model="item.value" :placeholder="`请输入${item.title}`" ></el-input>
            <el-input-number v-if="item.type === 'number'" v-model="item.value" :min="0" :placeholder="`请输入${item.title}`" ></el-input-number>
            
            <el-transfer 
                filterable
                v-if="item.type === 'transfer'" 
                :titles="item.titles ? item.titles : ['列表 1', '列表 2']"
                v-model="item.value" 
                :data="item.option" 
                :props="item.optionObj"
            ></el-transfer>

            <el-select  v-if="item.type === 'select'"
                :multiple="item.multiple || false"
                :disabled="item.disabled || false"
                v-model="item.value"
                clearable 
                style="width: 100%;"
                :placeholder="`请选择${item.title}`">
                <el-option v-for="(optionItem,optionIndex) in filterArr(item)" :key="optionIndex" :label="optionItem.key" :value="optionItem.value" />
            </el-select>

            <el-date-picker 
                v-if="item.type === 'date'" 
                type="date" :placeholder="`请选择${item.title}`" 
                v-model="item.value" 
                style="width: 100%;"
                :value-format='getFormat(item.format)'
                :disabled="item.disabled || false"
            />


            <el-time-picker 
                v-if="item.type === 'time'" 
                type="date" :placeholder="`请选择${item.title}`" 
                v-model="item.value" 
                style="width: 100%;"
                :value-format='getTimeFormat(item.format)'
                :disabled="item.disabled || false"
            />

            <el-date-picker 
                v-if="item.type === 'dateTime'" 
                type="datetime" :placeholder="`请选择${item.title}`" 
                v-model="item.value" 
                style="width: 100%;"
                :value-format='getDateTimeFormat(item.format)'
                :disabled="item.disabled || false"
            />

            <el-radio-group  v-if="item.type === 'radio'"
                v-model="item.value"
                clearable 
                style="width: 100%;"
                :placeholder="`请选择${item.title}`"
                :disabled="item.disabled || false"
            >
                <el-radio v-for="(optionItem,optionIndex) in item.option" :key="optionIndex" :label="optionItem.value" >{{optionItem.key}}</el-radio>
            </el-radio-group>



            <el-upload
                class="upload-demo"
                action="/admin/article/uploadImage"
                v-if="item.type === 'upload'"
                v-model="item.value"
                :on-preview="handlePreview"
                :on-remove="(file, fileList)=>handleRemove(file, fileList,item)"
                :on-success="(response, file, fileList)=>handleSuccess(response, file, fileList,item)"
                :before-remove="beforeRemove"
                :file-list="item.fileList"
                :disabled="item.disabled || false"
                list-type="picture"
            >
                <el-button :disabled="item.disabled || false" size="small" type="primary">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
                
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>

            

        <div v-if="setTips(item.tips)" style="line-height: 10px;" class="el-upload__tip">{{item.tips}}</div>




        </el-form-item>

        <el-form-item>
            <el-button class="createFormSubmit" type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
            <el-button v-if="resetBtn" class="createFormReset" @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
        </el-form>

        <el-dialog title="查看图片" :visible.sync="dialogVisible">
            <el-image width="100%" :src="dialogImageUrl" alt=""> </el-image>
        </el-dialog>
    </div>
      
</template>

<script>

import {isEmpty, dataType} from '@/utils/auth'
import Editor from '@/components/Tinymce'
export default {
    data() {
      return {
        dynamicValidateForm: {
          domains: [],
        },
        fileList:[],
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    props:{
        dataList:{
            required: true,
            type: Array,
        },
        width:{
            type:String
        },
        resetBtn:{
            type:Boolean,
            default:true
        }
        
    },
    watch: {
        dataList: {
    　　　　handler(newValue, oldValue) {
                this.dynamicValidateForm.domains = newValue
    　　　　},
    　　　　deep: true
　　    }
    },
    mounted(){
        const {dataList} = this;
        dataList.forEach(item=>{
            const obj={
                ...item,
            }
            obj.value = isEmpty(obj.value) ? obj.value : ''
            this.dynamicValidateForm.domains.push(obj)
        })
    },
    components: {
        Editor
    },
    methods: {
        delIcon(data){
            console.log()
            this.dynamicValidateForm.domains.forEach(item=>{
                if(item.id === data.id){
                    item.value=''
                }
            })
            
        },
        filterArr(obj){
            const {option,optionObj} = obj;
            const arr = []
            if(dataType(optionObj) == 'Object'){
                option.forEach(item=>{
                    const itemObj={}
                    itemObj.key=item[optionObj.key]
                    itemObj.value=item[optionObj.value]
                    arr.push(itemObj)
                })
                return arr
            }

            return option
        },
        setRules(item){
            if(dataType(item.rules) === 'Object' || dataType(item.rules) === 'Array'){
                return item.rules
            }

            if(item.required){
                return {required: true, message: `${item.title}不能为空`, trigger: 'blur'}
            }


            return null
        },
        getDateTimeFormat(value){
            if(!isEmpty(value)){
                return "yyyy-MM-dd HH:mm:ss"
            }
            return value
        },
        getFormat(value){
            if(!isEmpty(value)){
                return "yyyy-MM-dd"
            }
            return value
        },
        getTimeFormat(value){
            if(!isEmpty(value)){
                return "hh:mm:ss"
            }
            return value
        },
        setTips(value){
            if(dataType(value) === 'String'){
                return true
            }
            return false
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const {dynamicValidateForm:{domains}} = this;
                const obj={}
                domains.forEach(item=>{
                    obj[item.id] = isEmpty(item.value) ? item.value : undefined
                })
                this.$emit('getValue', obj)
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            console.log(this.$refs[formName])
            this.$refs[formName].resetFields();

            const {dynamicValidateForm:{domains}} = this;
            domains.forEach(item=>{
                item.value = ''
                if(item.type === 'upload'){
                    item.fileList = []
                }
            })
            this.dynamicValidateForm.domains = domains
        },

        handleRemove(file, fileList,props) {
            const {multiple,id} = props
            if(multiple){
                console.log(file, fileList);

            }else{
                if(fileList.length<=0){
                    this.dynamicValidateForm.domains.forEach(item=>{
                        if(item.id === id){
                            item.value  = ''
                            item.fileList = []
                        }
                    })
                }
                
            }
            
        },
        handleSuccess(response, file,fileList,props) {
            const {statusCode,errorMessage,content} = response
            const {multiple,id} = props
            if(statusCode === 0){
                this.$message({
                    message:'上传成功',
                    type:'success'
                })

                if(multiple){  // 多选
                    console.log(file, fileList);
                }else{
                    this.dynamicValidateForm.domains.forEach(item=>{
                        if(item.id === id){
                            item.value  = content
                            item.fileList = [file]
                        }
                    })
                    console.log(file, fileList);
                }

            }

            

        },
        handlePreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
      
    }
  }
</script>

<style scoped lang="scss">
.picker-icon{
    position: relative;
    .delICon{
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        i{
            font-size: 16px;
        }
        &:hover{
            i{
                color: red;
            }
        }
    }
}
    
</style>