"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my-applied",
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
    const admin = common_vendor.ref(common_vendor.index.getStorageSync("success"));
    function gotoDetail() {
      try {
        common_vendor.index.setStorageSync("item", [admin.value[0], admin.value[1], props.detail, props.src, props.views, props.date, props._id, props.id]);
        common_vendor.index.navigateTo({
          url: "/pages/detail/detail"
        });
      } catch (e) {
        console.error("设置缓存失败");
      }
    }
    function deleteItem() {
      return new Promise((resolve, reject) => {
        common_vendor.index.showModal({
          title: "提示",
          content: "您确定要删除该帖子？",
          success: function(res) {
            if (res.confirm) {
              common_vendor.index.request({
                url: "https://dwdeal.cn/deleteItem",
                method: "POST",
                header: { "content-type": "application/json" },
                data: { _id: props._id },
                success: (res2) => {
                  if (res2.data.success) {
                    resolve();
                  } else {
                    reject(`服务器出错${res2.data.message}`);
                  }
                },
                fail: (err) => {
                  reject(`删除失败${err}`);
                }
              });
            }
          }
        });
      }).then(() => {
        common_vendor.index.showToast({
          title: "删除成功"
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: `操作失败: ${err}`,
          icon: "none"
        });
      });
    }
    return (_ctx, _cache) => {
      return {
        a: __props.src[0],
        b: common_vendor.t(__props.detail),
        c: common_vendor.o(deleteItem),
        d: common_vendor.o(gotoDetail)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-69e607bf"]]);
wx.createComponent(Component);
