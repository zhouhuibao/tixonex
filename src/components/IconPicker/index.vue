<template>
    <div class="ui-fas">
        <el-input v-model="name" placeholder="请选择图标" ref="input" @focus="_popoverShowFun" v-popover:popover
                  clearable
                  @input="changeIcon"
                  @clear="clear"
                  :disabled="disabled">
            <template slot="prepend"><i :class="prefixIcon"/></template>
        </el-input>


        <!-- <div class="delICon" @click="delIcon()">
            <i class="el-icon-circle-close"></i>
        </div> -->



        <!-- 弹出框 -->
        <el-popover :disabled="disabled" ref="popover" :placement="placement" popper-class="el-icon-popper"
                    :width="width" v-model="visible" trigger="click">

            <el-scrollbar tag="div" wrap-class="el-select-dropdown__wrap" view-class="el-select-dropdown__list"
                          class="is-empty">
                <ul class="fas-icon-list">
                    <li v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
                        <i :class="item" :title="item"/>
                        <!-- <span>{{item}}</span>-->
                    </li>
                </ul>
            </el-scrollbar>
        </el-popover>
    </div>
</template>

<script>
    import fontawesome from "./iconList";
    import {off, on} from "./utils/dom";

    export default {
        name: "iconPicker",
        props: {
            // 是否禁用文本框
            disabled: {
                type: Boolean,
                // false
                default() {
                    return false;
                }
            },
            // 弹出框位置
            placement: {
                type: String,
                //  bottom
                default() {
                    return 'bottom';
                }
            },
            value: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        data() {
            return {
                iconList: fontawesome,
                visible: false, // popover v-model
                width: 200,
                prefixIcon: 'el-icon-edit',
                name: ''
            }
        },
        methods: {
            changeIcon(value){
                // this.prefixIcon = value ? value : 'el-icon-edit';
                var arr = [];
                for (var i = 0; i < fontawesome.length; i++) {
                    if (fontawesome[i].split(value).length > 1) {
                        arr.push(fontawesome[i]);
                    }
                }
                this.iconList = arr
            },
            clear(){
                this.$emit('clear')
            },
            delIcon(item){
                console.log(this.name)
            },
            selectedIcon(item) {
                this.visible = false;
                this.name = item;
                this._emitFun();
            },
            // 更新宽度
            _updateW() {
                this.$nextTick(() => {
                    this.width = this.$refs.input.$el.getBoundingClientRect().width - 26;
                });
            },
            // 显示弹出框的时候容错，查看是否和el宽度一致
            _popoverShowFun() {
                this._updateW();
            },
            // 点击控件外，判断是否隐藏弹出框
            _popoverHideFun(e) {
                let isInter = e.path.some(list => {
                    return list.className && list.className.indexOf('fas-icon-list') !== -1;
                });
                if (!isInter) {
                    this.visible = false;
                }
            },
            // 判断类型，抛出当前选中id
            _emitFun() {
                this.$emit('input', this.name);
                this._updatePopoverLocationFun();
            },
            // 更新popover位置
            _updatePopoverLocationFun() {
                // dom高度还没有更新，做一个延迟
                setTimeout(() => {
                    this.$refs.popover.updatePopper();
                }, 50);
            },
        },
        mounted() {
            this._updateW();
            this.$nextTick(() => {
                on(document, 'mouseup', this._popoverHideFun);
            });
        },
        beforeDestroy() {
            off(document, 'mouseup', this._popoverHideFun);
        },
        created() {
            this.prefixIcon = this.value ? this.value : 'el-icon-edit';
            this.name = this.value;
        },
        watch: {
            // name: function (val) {
            //     console.log(val,'jianting')
            //     setTimeout(() => {
            //         this.prefixIcon = val ? val : 'el-icon-edit';
            //     }, 200);
            // },
            value: function (val) {
                setTimeout(() => {
                    this.name = val;
                    this.prefixIcon = val ? val : 'el-icon-edit';
                }, 200);
            }
        }
    }
</script>

<style>
    [class^="fa"] {
        vertical-align: middle;
        text-align: center;
    }

    .el-submenu [class^="fa"] {
        margin-right: 5px;
        width: 24px;
    }

    .fas-icon-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .ui-fas .el-input__inner {
        cursor: pointer;
    }

    .fas-icon-list li {
        width: 30px;
        height: 30px;
        margin: 5px;
    }

    .fas-icon-list li i {
        font-size: 20px;
        cursor: pointer;
    }

    .el-icon-popper {
        max-height: 400px;
        overflow: auto;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .el-icon-popper[x-placement^='bottom'] {
        margin-top: 5px;
    }
    .ui-fas{
        position: relative;
    }
    .delICon{
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
    }
    .delICon i{
        font-size: 16px;
    }
    .delICon i:hover{
        color: red;
    }
</style>
