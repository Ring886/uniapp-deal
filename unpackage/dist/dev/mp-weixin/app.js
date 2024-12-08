"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/user/user.js";
  "./pages/upload/upload.js";
  "./pages/req_demo/req_demo.js";
  "./pages/opt-1/opt-1.js";
  "./pages/opt-2/opt-2.js";
  "./pages/opt-3/opt-3.js";
  "./pages/user/login.js";
  "./pages/user/signup.js";
  "./pages/detail/detail.js";
  "./pages/search/search.js";
  "./pages/skeleton/skeleton.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
