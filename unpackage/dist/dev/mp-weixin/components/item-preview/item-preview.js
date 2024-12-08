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
  __name: "item-preview",
  props: {
    _id: String,
    src: Array,
    detail: String,
    id: String,
    views: Number,
    date: String
  },
  setup(__props) {
    const props = __props;
    const text = common_vendor.ref("");
    const avator = common_vendor.ref("");
    const name = common_vendor.ref("");
    text.value = props.detail;
    common_vendor.index.request({
      url: "https://dwdeal.cn/getAvator",
      method: "POST",
      header: { "content-type": "application/json" },
      data: { id: props.id },
      success: (res) => {
        console.log(props.id);
        if (res.data.success) {
          avator.value = res.data.avator;
          name.value = res.data.name;
          console.log(name.value);
        } else {
          console.log("服务器失败", res.data.message);
        }
      },
      fail: (err) => {
        console.log("请求失败", err);
      }
    });
    function gotoDetail() {
      try {
        common_vendor.index.setStorageSync("item", [name.value, avator.value, text.value, props.src, props.views, props.date, props._id, props.id]);
        common_vendor.index.navigateTo({
          url: "/pages/detail/detail"
        });
      } catch (e) {
        console.error("设置缓存失败");
      }
    }
    return (_ctx, _cache) => {
      return {
        a: __props.src[0],
        b: common_vendor.t(text.value),
        c: avator.value,
        d: common_vendor.t(name.value),
        e: common_vendor.t(__props.views),
        f: common_vendor.p({
          type: "eye",
          size: "15"
        }),
        g: common_vendor.o(gotoDetail)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-224a038c"]]);
wx.createComponent(Component);
