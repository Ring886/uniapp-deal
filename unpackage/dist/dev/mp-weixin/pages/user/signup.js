"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "signup",
  setup(__props) {
    const id = common_vendor.ref("");
    const password = common_vendor.ref("");
    const name = common_vendor.ref("");
    function check() {
      if (id.value && password.value && name.value)
        return true;
      else
        return false;
    }
    function submit() {
      if (check) {
        common_vendor.index.request({
          url: "https://dwdeal.cn/signup",
          method: "POST",
          header: { "content-type": "application/json" },
          data: { id: id.value, password: password.value, name: name.value },
          success: (res) => {
            if (res.data.success) {
              common_vendor.index.showToast({
                title: "注册成功!",
                icon: "success"
              });
              setTimeout(() => {
                common_vendor.index.navigateBack();
              }, 1e3);
            } else {
              common_vendor.index.showToast({
                title: `${res.data.message}`,
                icon: "none"
              });
            }
          },
          fail: (err) => {
            console.error(err);
            common_vendor.index.showToast({
              title: "服务器错误",
              icon: "none"
            });
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "请填全信息！",
          icon: "none"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: id.value,
        b: common_vendor.o(($event) => id.value = $event.detail.value),
        c: password.value,
        d: common_vendor.o(($event) => password.value = $event.detail.value),
        e: name.value,
        f: common_vendor.o(($event) => name.value = $event.detail.value),
        g: common_vendor.o(submit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6eebd129"]]);
wx.createPage(MiniProgramPage);
