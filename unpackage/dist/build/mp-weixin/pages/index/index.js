"use strict";const e=require("../../common/vendor.js"),a=require("../../common/assets.js");Math||(t+o)();const o=()=>"../../components/item-preview/item-preview.js",t=()=>"../../components/skeleton/skeleton.js",s={__name:"index",setup(o){const t=e.ref(""),s=e.ref(!1),i=e.ref([]),n=e.ref(1),l=e.ref([]),r=e.ref(!1),d=e.ref([]);function c(){e.index.showNavigationBarLoading();const a=l.value.length,o=Math.max(a-6*n.value,0),t=a-6*(n.value-1),s=l.value.slice(o,t).reverse();i.value.push(...s),n.value++,e.index.hideNavigationBarLoading(),e.index.stopPullDownRefresh()}function u(){return console.log("take getimgArr"),new Promise(((a,o)=>{e.index.request({url:"https://dwdeal.cn/getimgArr",method:"POST",success:e=>{l.value=e.data.imgArr,console.log("getimgArr is",l.value),a()},fail:e=>{console.log("获取图片数组失败",e),o(e)}})}))}return e.onReachBottom((()=>{i.value.length===l.value.length&&(r.value=!0,e.index.showToast({title:"没有更多了",icon:"none"}),setTimeout((()=>{}),1e3)),r.value||c()})),e.onLoad((async()=>{console.log("onLoad"),e.index.showLoading({title:"加载中"}),await u(),c(),e.index.request({url:"https://dwdeal.cn/getNotice",method:"POST",success:e=>{e.data.success?t.value=e.data.notice:console.error("服务器错误",e.data.message)},fail:e=>{console.error("获取notice失败",e)}}),e.index.request({url:"https://dwdeal.cn/getImageNotice",method:"POST",success:e=>{e.data.success?d.value=e.data.imageNotice:console.error("服务器错误",e.data.message)},fail:e=>{console.error("获取imageNotice失败",e)}}),s.value=!0,e.index.hideLoading()})),e.onPullDownRefresh((async()=>{i.value=[],n.value=1,l.value=[],r.value=!1,e.index.showLoading({title:"加载中"}),await u(),c(),e.index.hideLoading()})),(o,n)=>e.e({a:!s.value},s.value?{b:a._imports_0,c:e.t(t.value),d:e.f(d.value,((e,a,o)=>({a:e,b:e}))),e:a._imports_1}:{},{f:e.f(i.value,((a,o,t)=>({a:a.id,b:a.id,c:"075b2b38-1-"+t,d:e.p({_id:a._id,src:a.src,detail:a.detail,id:a.id,views:a.views,date:a.date})})))})}},i=e._export_sfc(s,[["__scopeId","data-v-075b2b38"]]);wx.createPage(i);
