"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "opt-2",
  setup(__props) {
    const feedback = common_vendor.ref("");
    const noText = () => feedback.value.trim() === "";
    const broken = common_vendor.computed(() => noText());
    const admin = common_vendor.ref(common_vendor.index.getStorageSync("success"));
    function useDebounce(fn, delay) {
      const timeout = common_vendor.ref(null);
      return function(...args) {
        if (timeout.value)
          clearTimeout(timeout.value);
        timeout.value = setTimeout(() => {
          fn(...args);
        }, delay);
      };
    }
    const submitFeedback = () => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      common_vendor.index.request({
        url: "https://dwdeal.cn/feedback/submit",
        method: "POST",
        data: { feedback: feedback.value, id: admin.value[2] },
        success: (res) => {
          common_vendor.index.showToast({
            title: "感谢您的反馈!",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          }, 1e3);
        },
        fail: (err) => {
          console.error("提交失败:", err);
        }
      });
      common_vendor.index.hideLoading();
    };
    const debouncedSubmitFeedback = useDebounce(submitFeedback, 1e3);
    return (_ctx, _cache) => {
      return {
        a: feedback.value,
        b: common_vendor.o(($event) => feedback.value = $event.detail.value),
        c: common_vendor.o((...args) => common_vendor.unref(debouncedSubmitFeedback) && common_vendor.unref(debouncedSubmitFeedback)(...args)),
        d: broken.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bdccc6df"]]);
wx.createPage(MiniProgramPage);
