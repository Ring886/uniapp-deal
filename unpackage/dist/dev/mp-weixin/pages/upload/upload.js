"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  _easycom_uni_transition2();
}
const _easycom_uni_transition = () => "../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  _easycom_uni_transition();
}
const _sfc_main = {
  __name: "upload",
  setup(__props) {
    const show = common_vendor.ref(false);
    const modeClass = common_vendor.ref(["fade", "zoom-in"]);
    const styles = common_vendor.ref({
      transition: "opacity 0.5s ease, transform 0.5s ease"
    });
    common_vendor.onShow(() => {
      show.value = true;
    });
    common_vendor.onHide(() => {
      show.value = false;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr("ani", "aa5cff34-0"),
        b: common_vendor.p({
          ["mode-class"]: modeClass.value,
          styles: styles.value,
          show: show.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aa5cff34"]]);
wx.createPage(MiniProgramPage);
