(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-16c01dbc"],{"1e82":function(t,e,a){},"346f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"operation clearfix"},[a("div",{staticClass:"operationLeft"},[a("el-dropdown",{attrs:{"split-button":"",type:"primary"},on:{command:t.handleCommand}},[t._v("\n      操作\n        "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"HIDE"}},[t._v("启用")]),t._v(" "),a("el-dropdown-item",{attrs:{command:"SHOW"}},[t._v("禁用")])],1)],1),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-refresh-left"},on:{click:function(e){return t.refresh()}}},[t._v("刷新")])],1),t._v(" "),a("div",{staticClass:"operationRight"},[a("el-button-group",[a("search-list",{attrs:{dataList:t.typeList},on:{getValue:t.getChild}}),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-circle-plus-outline"},on:{click:t.add}},[t._v("新增")])],1),t._v(" "),a("el-button-group")],1)]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"id",label:"ID",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"标题","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"type",label:"类型"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return["SHOW"===e.row.status?a("el-tag",{attrs:{type:"success"}},[t._v("启用")]):a("el-tag",{attrs:{type:"info"}},[t._v("禁用")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"添加时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updatedAt",label:"编辑时间"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.disabledData(e.row.id,e.row.status)}}},[t._v(t._s("SHOW"!==e.row.status?"启用":"禁用")+" ")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.editData(e.row.id)}}},[t._v("修改")]),t._v(" "),a("el-popconfirm",{attrs:{title:"确定删除该数据吗"},on:{onConfirm:function(a){return t.deleteData(e.row.id)}}},[a("el-button",{attrs:{slot:"reference",type:"text",size:"small"},slot:"reference"},[t._v("删除")])],1)]}}])})],1),t._v(" "),a("el-pagination",{attrs:{background:"",layout:"total,prev, pager, next",total:t.total,"current-page":t.pageNo},on:{"current-change":t.handleCurrentChange}})],1)},o=[],r=(a("8e6e"),a("456d"),a("ac6a"),a("bd86")),i=a("b0eb"),c=a("9d83"),l=a("5f87");function s(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?s(Object(a),!0).forEach((function(e){Object(r["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var d={name:"articleManage",data:function(){var t=this.$store.state.article.searchData;return{loading:!1,tableData:[],multipleSelection:[],pageNo:1,pageSize:10,total:0,typeList:t}},mounted:function(){this.getArticleByLocaleList(),this.$store.dispatch({type:"article/getArticleType"})},watch:{"$store.state.article.typeList":{handler:function(t){this.typeList[0].option=t},deep:!0}},methods:{editData:function(t){this.$router.push({path:"/article-manage/article-manage-addOrEditArticle",query:{id:t}})},getChild:function(t){this.pageNo=1,this.getArticleByLocaleList(t),console.log(t)},refresh:function(){this.pageNo=1,this.getArticleByLocaleList()},add:function(){this.$router.push("/article-manage/article-manage-addOrEditArticle")},deleteData:function(t){var e=this;Object(i["c"])({articleIds:t}).then((function(t){0===t.statusCode&&(e.getArticleByLocaleList(),e.$message({message:"删除成功",type:"success"}))}))},disabledData:function(t,e){var a=this;Object(i["e"])({articleIds:t},e).then((function(t){0===t.statusCode&&a.getArticleByLocaleList()}))},handleCurrentChange:function(t){this.pageNo=t,this.getArticleByLocaleList()},getArticleByLocaleList:function(t){var e=this;this.loading=!0;var a=this.pageNo,n=this.pageSize,o={pageNo:a,pageSize:n};"Object"===Object(l["c"])(t)&&(o=u({pageNo:a,pageSize:n},t)),Object(i["f"])(o).then((function(t){var a=t.content,n=t.total;e.tableData=a||[],e.total=n,e.loading=!1})).catch((function(){e.loading=!1}))},switchType:function(t){var e="";switch(t){case"NOTICE":e="公告";break;case"NEWS":e="资讯";break;case"HELP":e="帮助";break;case"AGREEMENT":e="注册协议";break;case"FEE":e="费用说明";break;case"SERVICE":e="服务条款";break;case"PRIVACY":e="隐私声明";break;case"JOIN_US":e="加入我们";break;case"PLATFORM":e="平台说明";break;case"MERCHANT":e="商家认证公告";break;case"ALL":e="所有类型";break;default:break}return e},handleCommand:function(t){var e=this,a=this.multipleSelection,n=[];a.length>0?this.$confirm("确定要".concat("HIDE"===t?"启用":"禁用","当前选中的数据吗？"),"".concat("HIDE"===t?"启用":"禁用"),{distinguishCancelAndClose:!0,confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(){a.forEach((function(t){n.push(t.id)}));var o=n.join(",");e.disabledData(o,t)})).catch((function(t){})):this.$message({message:"请选择你要".concat("HIDE"===t?"启用":"禁用","的文章"),type:"warning"})},handleSelectionChange:function(t){this.multipleSelection=t}},components:{SearchList:c["a"]}},p=d,h=(a("656a"),a("2877")),f=Object(h["a"])(p,n,o,!1,null,"10729cd5",null);e["default"]=f.exports},"656a":function(t,e,a){"use strict";var n=a("1e82"),o=a.n(n);o.a}}]);