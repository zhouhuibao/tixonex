(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7487b080"],{"286c":function(t,e,a){"use strict";var s=a("3362"),n=a.n(s);n.a},3362:function(t,e,a){},"3c7c":function(t,e,a){"use strict";a.d(e,"c",(function(){return n})),a.d(e,"e",(function(){return l})),a.d(e,"d",(function(){return r})),a.d(e,"b",(function(){return i})),a.d(e,"a",(function(){return o})),a.d(e,"f",(function(){return c})),a.d(e,"h",(function(){return u})),a.d(e,"g",(function(){return p})),a.d(e,"i",(function(){return d}));var s=a("b775");function n(t){return Object(s["a"])({url:"admin/otc/applications",method:"get",data:t})}function l(t){return Object(s["a"])({url:"admin/otc/config-list",method:"get",data:t})}function r(t){return Object(s["a"])({url:"admin/otc/config-detail",method:"get",data:t})}function i(t,e){return Object(s["a"])({url:"admin/otc/".concat("add"===e?"add-config":"config"),method:"post",data:t,requestType:"JSON"})}function o(t){return Object(s["a"])({url:"admin/otc/application-cancel",method:"post",data:t})}function c(t){return Object(s["a"])({url:"admin/otc/orders",method:"get",data:t})}function u(t){return Object(s["a"])({url:"admin/otc/order-detail",method:"get",data:t})}function p(t,e){return Object(s["a"])({url:"admin/otc".concat("cancel"===e?"/order-cancel":"/order-deal"),method:"post",data:t})}function d(t){return Object(s["a"])({url:"admin/otc/otc-privileges",method:"get",data:t})}},"87ce":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"operation clearfix"},[a("div",{staticClass:"operationLeft"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-refresh-left"},on:{click:function(e){return t.refresh()}}},[t._v("刷新")])],1),t._v(" "),a("div",{staticClass:"operationRight"},[a("el-button-group",[a("search-list",{attrs:{dataList:this.$store.state.OTCManage.OTCauthSeatch},on:{getValue:t.getChild}})],1)],1)]),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{prop:"orderNo",label:"订单号",width:"180","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"id",label:"用户ID",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"用户名",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"publishEnable",label:"是否允许挂买单","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(0===e.row.publishEnable?"否":"是")+" ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"申请状态","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.getStatus(e.row.status))+" ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"applyTime",label:"申请时间",width:"160","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",label:"修改时间",width:"160","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"挂单时间",width:"160","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{align:"right",label:"操作"}})],1),t._v(" "),a("el-pagination",{attrs:{background:"",layout:"total,prev, pager, next",total:t.total,"current-page":t.pageNo},on:{"current-change":t.handleCurrentChange}}),t._v(" "),a("Detailed",{attrs:{visible:t.detailVisible,selectedId:t.selectedId},on:{changeDrawer:t.changeDrawer}})],1)},n=[],l=(a("8e6e"),a("456d"),a("bd86")),r=(a("ac6a"),a("3c7c")),i=a("9d83"),o=a("bf79"),c=a("5f87");function u(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?u(Object(a),!0).forEach((function(e){Object(l["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var d={name:"otcJYOrderList",data:function(){return{loading:!1,tableData:[],multipleSelection:[],pageNo:1,pageSize:10,total:0,detailVisible:!1,selectedId:""}},created:function(){this.getArticleByLocaleList()},mounted:function(){},methods:{getDetail:function(t){this.detailVisible=!0,this.selectedId=t},changeDrawer:function(t){this.detailVisible=!1},getStatus:function(t){var e=this.$store.state.OTCManage.SHstatus,a="";return e.forEach((function(e){e.value===t&&(a=e.key)})),a},getChild:function(t){this.pageNo=1,this.getArticleByLocaleList(t)},refresh:function(){this.pageNo=1,this.getArticleByLocaleList()},deleteData:function(t,e){var a=this;Object(r["g"])({id:t},e).then((function(t){0===t.statusCode&&a.getArticleByLocaleList()}))},handleCurrentChange:function(t){this.pageNo=t,this.getArticleByLocaleList()},getArticleByLocaleList:function(t){var e=this;this.loading=!0;var a=this.pageNo,s=this.pageSize,n={pageNo:a,pageSize:s,status:10};"Object"===Object(c["c"])(t)&&(n=p({},t,{pageNo:a,pageSize:s,status:Object(c["g"])(t.status)?t.status:10})),Object(r["i"])(n).then((function(t){var a=t.content,s=t.total;e.tableData=a||[],e.total=s,e.loading=!1})).catch((function(){e.loading=!1}))}},components:{SearchList:i["a"],Detailed:o["a"]}},f=d,b=(a("d907"),a("2877")),v=Object(b["a"])(f,s,n,!1,null,"0eff8b0a",null);e["default"]=v.exports},bf79:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-drawer",{attrs:{title:"订单详情",visible:t.show,direction:"rtl",size:"600px"},on:{"update:visible":function(e){t.show=e},close:t.close,open:t.open}},[a("el-row",{staticClass:"wrapper",attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("id")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.id||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("订单号")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.orderNo||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("申诉人角色")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.appeal||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("申诉说明")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.appealDesc||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("买家邮箱")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.buyMobile||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("买家身份证")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.buyIdCard||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("买家手机号")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.buyMobile||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("买家名字")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.buyName||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("买家真实姓名")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.buyRealName||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("卖家身份证")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.sellIdCard||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("卖家手机号")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.sellMobile||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("卖家用户名")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.sellName||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("卖家真实姓名")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.tableData.sellRealName||""))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left"},[t._v("状态")]),t._v(":"),a("span",{staticClass:"right"},[t._v(t._s(t.getStatus(t.tableData.status)))])]),t._v(" "),a("el-col",{attrs:{span:12}},[a("span",{staticClass:"left pull-left"},[t._v("付款凭证:")]),t._v(" "),a("el-image",{staticClass:"pull-left",staticStyle:{width:"200px",height:"200px"},attrs:{src:t.tableData.credentialUrls,fit:"contain","preview-src-list":[t.tableData.credentialUrls]}})],1)],1)],1)},n=[],l=(a("8e6e"),a("456d"),a("bd86")),r=(a("ac6a"),a("3c7c"));function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function o(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){Object(l["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var c={name:"OTCorderDetailed",data:function(){return{tableData:{},loading:!1}},props:{visible:{type:Boolean,required:!0},selectedId:{default:""}},computed:{show:{get:function(){return this.visible},set:function(t){this.$emit("changeDrawer",t)}}},methods:{close:function(){this.tableData={}},open:function(){this.getArticleByLocaleList()},getStatus:function(t){var e=this.$store.state.OTCManage.OTCorderStatus,a="";return e.forEach((function(e){e.value===t&&(a=e.key)})),a},getArticleByLocaleList:function(t){var e=this;this.loading=!0;var a={id:this.selectedId};Object(r["h"])(a).then((function(t){var a=t.content;t.total;e.tableData=o({},a)||{},e.loading=!1})).catch((function(){e.loading=!1}))},handleCurrentChange:function(t){this.pageNo=t,this.getArticleByLocaleList()}}},u=c,p=(a("286c"),a("2877")),d=Object(p["a"])(u,s,n,!1,null,"604f6fba",null);e["a"]=d.exports},c46a:function(t,e,a){},d907:function(t,e,a){"use strict";var s=a("c46a"),n=a.n(s);n.a}}]);