(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60334842"],{"06cb":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"operation clearfix"},[o("div",{staticClass:"operationLeft"},[o("el-button",{attrs:{type:"primary",icon:"el-icon-refresh-left"},on:{click:function(e){return t.refresh()}}},[t._v("刷新")])],1),t._v(" "),o("div",{staticClass:"operationRight"},[o("el-button-group",[o("search-list",{attrs:{dataList:this.$store.state.OTCManage.otcOrderListSearch},on:{getValue:t.getChild}})],1)],1)]),t._v(" "),o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark"}},[o("el-table-column",{attrs:{prop:"id",label:"ID",width:"70"}}),t._v(" "),o("el-table-column",{attrs:{prop:"orderNo",label:"订单号",width:"200",align:"center","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"coinName",label:"币种名称","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"legalName",label:"法币名称","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"createUser",label:"用户","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"amount",label:"总数量","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"ramount",label:"剩余数量","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"mamount",label:"匹配数量","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"samount",label:"交易成功数量","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"price",label:"价格","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"type",label:"挂单类型","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.getType(e.row.type))+" ")]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"status",label:"状态","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.getStaus(e.row.status))+" ")]}}])}),t._v(" "),o("el-table-column",{attrs:{prop:"createTime",label:"挂单时间",width:"160","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{label:"操作",width:"60","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-popconfirm",{attrs:{title:"确定撤销该数据吗？"},on:{onConfirm:function(o){return t.deleteData(e.row.id)}}},[o("el-button",{attrs:{slot:"reference",type:"text",size:"small"},slot:"reference"},[t._v("撤销")])],1)]}}])})],1),t._v(" "),o("el-pagination",{attrs:{background:"",layout:"total,prev, pager, next",total:t.total,"current-page":t.pageNo},on:{"current-change":t.handleCurrentChange}})],1)},r=[],n=(o("8e6e"),o("456d"),o("bd86")),l=(o("ac6a"),o("3c7c")),c=o("9d83"),i=o("5f87");function s(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,a)}return o}function u(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?s(Object(o),!0).forEach((function(e){Object(n["a"])(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):s(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var p={name:"otcOrderList",data:function(){return{loading:!1,tableData:[],multipleSelection:[],pageNo:1,pageSize:10,total:0}},created:function(){this.getArticleByLocaleList()},methods:{getStaus:function(t){var e=this.$store.state.OTCManage.typeArr,o="";return e.forEach((function(e){t===e.value&&(o=e.key)})),o},getType:function(t){var e=this.$store.state.OTCManage.statusArr,o="";return e.forEach((function(e){t===e.value&&(o=e.key)})),o},getChild:function(t){this.pageNo=1,this.getArticleByLocaleList(t)},deleteData:function(t){var e=this;Object(l["a"])({id:t}).then((function(t){0===t.statusCode&&(e.getArticleByLocaleList(),e.$message({message:"撤销成功",type:"success"}))}))},refresh:function(){this.pageNo=1,this.getArticleByLocaleList()},handleCurrentChange:function(t){this.pageNo=t,this.getArticleByLocaleList()},getArticleByLocaleList:function(t){var e=this;this.loading=!0;var o=this.pageNo,a=this.pageSize,r={pageNo:o,pageSize:a,type:100,status:10};"Object"===Object(i["c"])(t)&&(r=u({},t,{pageNo:o,pageSize:a,type:Object(i["g"])(t.type)?t.type:100,status:Object(i["g"])(t.status)?t.status:10})),Object(l["c"])(r).then((function(t){var o=t.content,a=t.total;e.tableData=o||[],e.total=a,e.loading=!1})).catch((function(){e.loading=!1}))}},components:{SearchList:c["a"]}},d=p,f=(o("e240"),o("2877")),b=Object(f["a"])(d,a,r,!1,null,"5b025a38",null);e["default"]=b.exports},"19ae":function(t,e,o){},"3c7c":function(t,e,o){"use strict";o.d(e,"c",(function(){return r})),o.d(e,"e",(function(){return n})),o.d(e,"d",(function(){return l})),o.d(e,"b",(function(){return c})),o.d(e,"a",(function(){return i})),o.d(e,"f",(function(){return s})),o.d(e,"h",(function(){return u})),o.d(e,"g",(function(){return p})),o.d(e,"i",(function(){return d}));var a=o("b775");function r(t){return Object(a["a"])({url:"admin/otc/applications",method:"get",data:t})}function n(t){return Object(a["a"])({url:"admin/otc/config-list",method:"get",data:t})}function l(t){return Object(a["a"])({url:"admin/otc/config-detail",method:"get",data:t})}function c(t,e){return Object(a["a"])({url:"admin/otc/".concat("add"===e?"add-config":"config"),method:"post",data:t,requestType:"JSON"})}function i(t){return Object(a["a"])({url:"admin/otc/application-cancel",method:"post",data:t})}function s(t){return Object(a["a"])({url:"admin/otc/orders",method:"get",data:t})}function u(t){return Object(a["a"])({url:"admin/otc/order-detail",method:"get",data:t})}function p(t,e){return Object(a["a"])({url:"admin/otc".concat("cancel"===e?"/order-cancel":"/order-deal"),method:"post",data:t})}function d(t){return Object(a["a"])({url:"admin/otc/otc-privileges",method:"get",data:t})}},e240:function(t,e,o){"use strict";var a=o("19ae"),r=o.n(a);r.a}}]);