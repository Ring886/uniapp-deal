"use strict";const e=require("../../common/vendor.js"),t={__name:"my-applied",props:{_id:String,src:Array,detail:String,id:String,views:Number,date:String},setup(t){const n=t,i=e.ref(e.index.getStorageSync("success"));function s(){try{e.index.setStorageSync("item",[i.value[0],i.value[1],n.detail,n.src,n.views,n.date,n._id,n.id]),e.index.navigateTo({url:"/pages/detail/detail"})}catch(t){console.error("设置缓存失败")}}function a(){return new Promise(((t,i)=>{e.index.showModal({title:"提示",content:"您确定要删除该帖子？",success:function(s){s.confirm&&e.index.request({url:"https://dwdeal.cn/deleteItem",method:"POST",header:{"content-type":"application/json"},data:{_id:n._id},success:e=>{e.data.success?t():i(`服务器出错${e.data.message}`)},fail:e=>{i(`删除失败${e}`)}})}})})).then((()=>{e.index.showToast({title:"删除成功"})})).catch((t=>{e.index.showToast({title:`操作失败: ${t}`,icon:"none"})}))}return(n,i)=>({a:t.src[0],b:e.t(t.detail),c:e.o(a),d:e.o(s)})}},n=e._export_sfc(t,[["__scopeId","data-v-a29c2ee6"]]);wx.createComponent(n);
