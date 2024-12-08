"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const user = common_vendor.ref(common_vendor.index.getStorageSync("item"));
    const name = common_vendor.ref(user.value[0]);
    const avator = common_vendor.ref(user.value[1]);
    const text = common_vendor.ref(user.value[2]);
    const imgArr = common_vendor.ref(user.value[3]);
    const views = common_vendor.ref(user.value[4]);
    const date = common_vendor.ref(user.value[5]);
    const _id = common_vendor.ref(user.value[6]);
    const id = common_vendor.ref(common_vendor.index.getStorageSync("success"));
    function preview(index) {
      common_vendor.index.previewImage({
        urls: imgArr.value,
        current: index
      });
    }
    common_vendor.onMounted(() => {
      console.log(_id.value);
      if (id.value && user.value[7] !== id.value[2]) {
        common_vendor.index.request({
          url: "https://dwdeal.cn/viewsUp",
          method: "POST",
          header: { "content-type": "application/json" },
          data: { _id: _id.value },
          success: (res) => {
            if (res.data.success) {
              console.log("views增加成功");
            } else {
              console.log("服务器出错", res.data.message, res.data.error);
            }
          },
          fail: (err) => {
            console.error("views自增失败");
          }
        });
      } else {
        console.log("点赞的发布的是同一个人！！");
      }
    });
    return (_ctx, _cache) => {
      return {
        a: avator.value,
        b: common_vendor.t(name.value),
        c: common_vendor.t(views.value),
        d: common_vendor.p({
          type: "eye",
          size: "30"
        }),
        e: common_vendor.t(date.value),
        f: common_vendor.t(text.value),
        g: common_vendor.f(imgArr.value, (img, index, i0) => {
          return {
            a: img,
            b: img,
            c: common_vendor.o(($event) => preview(index), img)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"]]);
wx.createPage(MiniProgramPage);
