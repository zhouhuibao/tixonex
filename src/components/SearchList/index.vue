<template>
    <div class="el-button-group pull-left searchWarpper">
        <el-button type="primary" @click="dialogVisible  = true" icon="el-icon-search">筛选</el-button>
        <el-dialog
            title="筛选"
            width="600px"
            
            :visible.sync="dialogVisible"
            :before-close="handleClose"
        >
            <el-form label-width="auto" :model="formLabelAlign" ref="formLabelAlign">
                <el-form-item 
                    v-for="(item,index) in formLabelAlign.content" 
                    :key="index" 
                    :label="item.title" 
                    :prop="item.id"
                >
                    <el-input v-if="item.type === 'text'" v-model="item.value" :placeholder="`请输入${item.title}`" ></el-input>
                    <el-select  v-if="item.type === 'select'"
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
                    />

                    <el-date-picker 
                        v-if="item.type === 'dateTime'" 
                        type="datetime" :placeholder="`请选择${item.title}`" 
                        v-model="item.value" 
                        style="width: 100%;"
                        :value-format='getDateTimeFormat(item.format)'
                    />

                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm('formLabelAlign')">重置</el-button>
                <el-button type="primary" @click="submitForm('formLabelAlign')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
      
</template>

<script>

import {isEmpty,dataType} from '@/utils/auth'

export default {
    name:'SearchList',
    data() {
        return {
            dialogVisible:false,
            formLabelAlign: {
                content:[]
            }
        }
    },
    props:{
        dataList:{
            required: true,
            type: Array,
        },
        labelWidth:{
            type:String
        }
    },
    mounted(){
        const {dataList} = this;
        const arr =[]
        dataList.forEach(item=>{
            const obj={
                ...item
            }
            obj.value = ''
            this.formLabelAlign.content.push(obj)
        })
    },
    methods:{
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
        getFormat(value){
            if(!isEmpty(value)){
                return "yyyy-MM-dd"
            }
            return value
        },
        getDateTimeFormat(value){
            if(!isEmpty(value)){
                return "yyyy-MM-dd HH:mm:ss"
            }
            return value
        },
        handleClose(){
            this.dialogVisible =false
        },
        resetForm(formName) {
            this.formLabelAlign.content.forEach(item=>{
                item.value = ''
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const {formLabelAlign:{content}} = this;
                    const obj={}
                    content.forEach(item=>{
                        obj[item.id] = isEmpty(item.value) ? item.value : undefined
                    })
                    this.$emit('getValue', obj)
                    this.dialogVisible =false
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style scoped lang="scss">
    
</style>