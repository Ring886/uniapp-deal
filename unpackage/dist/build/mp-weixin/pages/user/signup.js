"use strict";const e=require("../../common/vendor.js"),a={__name:"signup",setup(a){const t=e.ref(""),n=e.ref(""),o=e.ref("");function s(){return!!(t.value&&n.value&&o.value)}function u(){s?e.index.request({url:"https://dwdeal.cn/signup",method:"POST",header:{"content-type":"application/json"},data:{id:t.value,password:n.value,name:o.value},success:a=>{a.data.success?(e.index.showToast({title:"注册成功!",icon:"success"}),setTimeout((()=>{e.index.navigateBack()}),1e3)):e.index.showToast({title:`${a.data.message}`,icon:"none"})},fail:a=>{console.error(a),e.index.showToast({title:"服务器错误",icon:"none"})}}):e.index.showToast({title:"请填全信息！",icon:"none"})}return(a,s)=>({a:t.value,b:e.o((e=>t.value=e.detail.value)),c:n.value,d:e.o((e=>n.value=e.detail.value)),e:o.value,f:e.o((e=>o.value=e.detail.value)),g:e.o(u)})}},t=e._export_sfc(a,[["__scopeId","data-v-687c51b8"]]);wx.createPage(t);
