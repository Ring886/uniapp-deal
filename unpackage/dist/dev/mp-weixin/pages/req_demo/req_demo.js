"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "req_demo",
  setup(__props) {
    common_vendor.ref("");
    common_vendor.onLoad(async () => {
    });
    const req = () => {
      common_vendor.index.request({
        url: "https://dwdeal.cn/connectDB",
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: "POST",
        success: (res) => {
          console.log(res.data.collections);
        },
        fail: (err) => {
          console.log(err);
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(req),
        b: common_vendor.o((...args) => _ctx.login && _ctx.login(...args))
      };
    };
  }
};
wx.createPage(_sfc_main);
