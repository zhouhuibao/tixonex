(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-657e660e"],{"22a4":function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"operation clearfix"},[o("div",{staticClass:"operationLeft"},[o("el-button-group",[o("el-button",{attrs:{type:"primary",icon:"el-icon-refresh-left"},on:{click:function(e){return t.refresh()}}},[t._v("刷新")])],1)],1),t._v(" "),o("div",{staticClass:"operationRight"},[o("el-button-group")],1)]),t._v(" "),o("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark"}},[o("el-table-column",{attrs:{prop:"id",label:"ID",width:"55"}}),t._v(" "),o("el-table-column",{attrs:{prop:"coinName",label:"币种名称","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"legalName",label:"法币名称","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"lastPrice",label:"最新成交价","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"expiredTimeCancel",label:"付款时间(分钟)","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"expiredTimeFreeze",label:"放行时间(分钟)","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"feeRate",label:"卖家挂单手续费(0.1代表10%)","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"maxApplBuyCount",label:"最大挂单数(买单)","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"maxApplSellCount",label:"最大挂单数(卖单)","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"minExchangeNum",label:"最小挂单数量","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{prop:"maxExchangeNum",label:"最大挂单数量","show-overflow-tooltip":""}}),t._v(" "),o("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[o("el-button",{attrs:{type:"text",size:"small"},on:{click:function(o){return t.editData(e.row.id)}}},[t._v("修改")])]}}])})],1)],1)},n=[],l=(o("ac6a"),o("3c7c")),r=(o("5f87"),{name:"tradingMarketSetting",data:function(){return{loading:!1,tableData:[]}},created:function(){this.getArticleByLocaleList()},mounted:function(){},methods:{getlang:function(t){var e=this.$store.state.advertising.localeArr,o="";return e.forEach((function(e){t===e.value&&(o=e.key)})),o},editData:function(t){this.$router.push({path:"/OTC-manage/OTC-config-operation",query:{id:t}})},refresh:function(){this.getArticleByLocaleList()},add:function(){this.$router.push("/OTC-manage/OTC-config-operation")},getArticleByLocaleList:function(){var t=this;this.loading=!0,Object(l["e"])().then((function(e){var o=e.content;t.tableData=o||[],t.loading=!1})).catch((function(){t.loading=!1}))}}}),i=r,c=(o("4d5f"),o("2877")),u=Object(c["a"])(i,a,n,!1,null,"11a54216",null);e["default"]=u.exports},"3c7c":function(t,e,o){"use strict";o.d(e,"c",(function(){return n})),o.d(e,"e",(function(){return l})),o.d(e,"d",(function(){return r})),o.d(e,"b",(function(){return i})),o.d(e,"a",(function(){return c})),o.d(e,"f",(function(){return u})),o.d(e,"h",(function(){return d})),o.d(e,"g",(function(){return s})),o.d(e,"i",(function(){return f}));var a=o("b775");function n(t){return Object(a["a"])({url:"admin/otc/applications",method:"get",data:t})}function l(t){return Object(a["a"])({url:"admin/otc/config-list",method:"get",data:t})}function r(t){return Object(a["a"])({url:"admin/otc/config-detail",method:"get",data:t})}function i(t,e){return Object(a["a"])({url:"admin/otc/".concat("add"===e?"add-config":"config"),method:"post",data:t,requestType:"JSON"})}function c(t){return Object(a["a"])({url:"admin/otc/application-cancel",method:"post",data:t})}function u(t){return Object(a["a"])({url:"admin/otc/orders",method:"get",data:t})}function d(t){return Object(a["a"])({url:"admin/otc/order-detail",method:"get",data:t})}function s(t,e){return Object(a["a"])({url:"admin/otc".concat("cancel"===e?"/order-cancel":"/order-deal"),method:"post",data:t})}function f(t){return Object(a["a"])({url:"admin/otc/otc-privileges",method:"get",data:t})}},"4d5f":function(t,e,o){"use strict";var a=o("8c79"),n=o.n(a);n.a},"8c79":function(t,e,o){}}]);