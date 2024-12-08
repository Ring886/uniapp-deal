"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const userId = common_vendor.ref("");
    const password = common_vendor.ref("");
    function check() {
      if (userId.value && password.value)
        return true;
      else
        return false;
    }
    function submit() {
      if (check) {
        ({
          userId: userId.value,
          password: password.value
        });
        common_vendor.index.request({
          url: "https://dwdeal.cn/login",
          method: "POST",
          // header:{'content-type':'application/x-www-form-urlencoded'},
          header: { "content-type": "application/json" },
          data: { userId: userId.value, password: password.value },
          // data: `userId=${encodeURIComponent(userId.value)}&password=${encodeURIComponent(password.value)}`,
          success: (res) => {
            if (res.data.success) {
              common_vendor.index.setStorage({
                key: "success",
                data: [res.data.name, res.data.avator, userId.value],
                success: function() {
                  common_vendor.index.showToast({
                    title: "登陆成功",
                    icon: "success",
                    success: (res2) => {
                      setTimeout(() => {
                        common_vendor.index.switchTab({
                          url: "/pages/index/index"
                        });
                      }, 2e3);
                    }
                  });
                }
              });
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
              title: "服务器失败",
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
    function signup() {
      common_vendor.index.navigateTo({
        url: "/pages/user/signup"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: userId.value,
        c: common_vendor.o(($event) => userId.value = $event.detail.value),
        d: password.value,
        e: common_vendor.o(($event) => password.value = $event.detail.value),
        f: common_vendor.o(submit),
        g: common_vendor.o(signup)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6163e5ce"]]);
wx.createPage(MiniProgramPage);
