(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-98f0b90e"],{a97d:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"operation clearfix"},[o("div",{staticClass:"operationLeft"},[o("el-dropdown",{attrs:{"split-button":"",type:"primary"},on:{command:t.handleCommand}},[t._v("\n      操作\n        "),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",{attrs:{command:1}},[t._v("启用")]),t._v(" "),o("el-dropdown-item",{attrs:{command:0}},[t._v("禁用")]),t._v(" "),o("el-dropdown-item",{attrs:{command:"yes"}},[t._v("实名认证审核通过")]),t._v(" "),o("el-dropdown-item",{attrs:{command:"no"}},[t._v("实名认证审核不通过")]),t._v(" "),o("el-dropdown-item",{attrs:{command:"group"}},[t._v("分组")])],1)],1)],1),t._v(" "),o("div",{staticClass:"operationRight"},[o("el-button-group",[o("search-list",{attrs:{dataList:this.$store.state.userManage.searchData,labelWidth:"120px"},on:{getValue:t.getChild}}),t._v(" "),o("el-button",{attrs:{type:"primary",icon:"el-icon-refresh-left"},on:{click:function(e){return t.refresh()}}},[t._v("刷新")])],1),t._v(" "),o("el-button-group",[o("el-button",{attrs:{type:"primary",loading:t.exportLoading,icon:"el-icon-s-promotion"},on:{click:t.exportDate}},[t._v("导出")])],1)],1)]),t._v(" "),o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[o("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),o("el-table-column",{attrs:{prop:"id",label:"ID",width:"55"}}),t._v(" "),o("el-table-column",{attrs:{prop:"email",width:"150",label:"用户邮箱","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"userName",width:"110",label:"用户名","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"userType",label:"用户类型","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"mobile",width:"110",label:"手机号","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"inviteCode",label:"分享码","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"realName",label:"真实姓名","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"groupName",label:"分组","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"idCardTime",label:"上传认证时间",width:"170","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"referrerMobile",label:"推荐人手机号","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"realNameStatus",label:"身份认证状态","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.setRealNameStatus(e.row.realNameStatus)))]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"registerTime",width:"170",label:"注册时间","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{label:"状态","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.status?o("el-tag",{attrs:{type:"success"}},[t._v("正常")]):o("el-tag",{attrs:{type:"info"}},[t._v("禁用")])]}}])}),t._v(" "),o("el-table-column",{attrs:{align:"center",fixed:"right",label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.editData(e.row.id)}}},[t._v("修改")]),t._v(" "),o("el-button",{attrs:{slot:"reference",type:"text",size:"small"},on:{click:function(e){t.detailedVisible=!0}},slot:"reference"},[t._v("明细")]),t._v(" "),o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.disabledData(e.row.id,e.row.status)}}},[t._v(t._s(0!==e.row.status?"启用":"禁用")+" ")]),t._v(" "),o("el-popconfirm",{attrs:{title:"确定重置支付密码吗"},on:{onConfirm:function(o){return t.resetPassword(e.row.id,"pay")}}},[o("el-button",{attrs:{slot:"reference",type:"text",size:"small"},slot:"reference"},[t._v("重置支付密码")])],1),t._v(" "),o("el-popconfirm",{attrs:{title:"确定重置登录密码吗"},on:{onConfirm:function(o){return t.resetPassword(e.row.id,"login")}}},[o("el-button",{attrs:{slot:"reference",type:"text",size:"small"},slot:"reference"},[t._v("重置登录密码")])],1)]}}])})],1),t._v(" "),o("el-pagination",{attrs:{background:"",layout:"total,prev, pager, next",total:t.total,"current-page":t.pageNo},on:{"current-change":t.handleCurrentChange}}),t._v(" "),o("Detailed",{attrs:{visible:t.detailedVisible,tableData:t.detailedTableData},on:{changeDrawer:t.changeDrawer}}),t._v(" "),o("el-dialog",{attrs:{title:"修改分组",visible:t.groupVisible,width:"30%"},on:{"update:visible":function(e){t.groupVisible=e}}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择分组"},model:{value:t.selectGroupValue,callback:function(e){t.selectGroupValue=e},expression:"selectGroupValue"}},t._l(t.groupArr,(function(t,e){return o("el-option",{key:e,attrs:{label:t.key,value:t.value}})})),1),t._v(" "),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.groupVisible=!1}}},[t._v("取 消")]),t._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:t.groupYes}},[t._v("确 定")])],1)],1)],1)},l=[],r=(o("8e6e"),o("456d"),o("bd86")),n=(o("ac6a"),o("c24f")),s=o("5f87"),i=o("9d83"),c=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("el-drawer",{attrs:{title:"明细",visible:t.show,direction:"rtl",size:"50%"},on:{"update:visible":function(e){t.show=e}}},[o("el-table",{attrs:{data:t.tableData}},[o("el-table-column",{attrs:{property:"ID",label:"ID"}}),t._v(" "),o("el-table-column",{attrs:{property:"name",label:"交易数量"}}),t._v(" "),o("el-table-column",{attrs:{property:"address",label:"币种名称"}}),t._v(" "),o("el-table-column",{attrs:{property:"address1",label:"账户特性"}}),t._v(" "),o("el-table-column",{attrs:{property:"address2",label:"变动类型"}}),t._v(" "),o("el-table-column",{attrs:{property:"address3",label:"交易时间"}})],1)],1)},u=[],p={name:"detailed",computed:{show:{get:function(){return this.visible},set:function(t){this.$emit("changeDrawer",t)}}},props:{visible:{type:Boolean,required:!0},tableData:{type:Array,default:[]}}},d=p,b=o("2877"),f=Object(b["a"])(d,c,u,!1,null,null,null),h=f.exports;function g(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,a)}return o}function v(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?g(Object(o),!0).forEach((function(e){Object(r["a"])(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):g(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var m={name:"UserManage",data:function(){return{loading:!1,tableData:[],detailedTableData:[],multipleSelection:[],pageNo:1,pageSize:10,total:0,exportLoading:!1,detailedVisible:!1,groupVisible:!1,selectGroupValue:"",groupArr:this.$store.state.userManage.groupArr}},created:function(){this.getArticleByLocaleList()},mounted:function(){},methods:{setRealNameStatus:function(t){var e=this.$store.state.userManage.authStatusArr,o="";return e.forEach((function(e){e.value===t&&(o=e.key)})),o},editData:function(t){this.$router.push({path:"/user-modules/operation",query:{id:t}})},changeDrawer:function(t){this.detailedVisible=t},getChild:function(t){this.pageNo=1,this.getArticleByLocaleList(t)},refresh:function(){this.pageNo=1,this.getArticleByLocaleList()},exportDate:function(t){var e=this;this.exportLoading=!0,Object(n["c"])().then((function(t){Object(s["d"])(t,"用户列表"),e.exportLoading=!1})).catch((function(){e.exportLoading=!1}))},resetPassword:function(t,e){var o=this;Object(n["j"])({userId:t},e).then((function(t){0===t.statusCode&&o.$message({message:"".concat("pay"===e?"支付密码重置成功":"登录密码重置成功"),type:"success"})}))},disabledData:function(t,e){var o=this;Object(n["n"])({userIds:t},e).then((function(t){console.log(t),0===t.statusCode&&(o.$message({message:"操作成功",type:"success"}),o.getArticleByLocaleList())}))},handleCurrentChange:function(t){this.pageNo=t,this.getArticleByLocaleList()},getArticleByLocaleList:function(t){var e=this;this.loading=!0;var o=this.pageNo,a=this.pageSize,l={pageNo:o,pageSize:a};"Object"===Object(s["c"])(t)&&(l=v({pageNo:o,pageSize:a},t)),Object(n["o"])(l).then((function(t){var o=t.content,a=t.total;e.tableData=o||[],e.total=a,e.loading=!1})).catch((function(){e.loading=!1}))},getTitle:function(t){var e="";switch(t){case 0:e="禁用";break;case 1:e="启用";break;case"yes":e="审核通过";break;case"no":e="审核不通过";break;case"group":e="分组";break;default:break}return e},handleCommand:function(t){var e=this,o=this.multipleSelection,a=[];o.length>0?this.$confirm("确定要".concat(this.getTitle(t),"当前选中的数据吗？"),this.getTitle(t),{distinguishCancelAndClose:!0,confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(){o.forEach((function(t){a.push(t.id)}));var l=a.join(",");if(0!==t&&1!==t||e.disabledData(l,t),"yes"===t||"no"===t){var r="yes"===t?1:3,s={userIds:l,cardStatus:r};Object(n["g"])(s).then((function(t){console.log(t),0===t.statusCode&&(e.$message({message:"操作成功",type:"success"}),e.getArticleByLocaleList())}))}"group"===t&&(e.groupVisible=!0)})).catch((function(t){})):this.$message({message:"请选择你要".concat(this.getTitle(t),"的数据"),type:"warning"})},handleSelectionChange:function(t){this.multipleSelection=t},groupYes:function(){var t=this,e=[],o=this.multipleSelection,a=this.selectGroupValue;o.forEach((function(t){e.push(t.id)}));var l=e.join(",");Object(n["k"])({userIds:l,groupType:a}).then((function(e){console.log(e),0===e.statusCode&&(t.$message({message:"操作成功",type:"success"}),t.groupVisible=!1,t.getArticleByLocaleList())}))}},components:{SearchList:i["a"],Detailed:h}},w=m,y=(o("d5f3"),Object(b["a"])(w,a,l,!1,null,"f1bc318a",null));e["default"]=y.exports},ac5f:function(t,e,o){},d5f3:function(t,e,o){"use strict";var a=o("ac5f"),l=o.n(a);l.a}}]);