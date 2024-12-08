"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_easyinput + itemCard)();
}
const itemCard = () => "../../components/item-preview/item-preview.js";
const imagesPerPage = 6;
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const value = common_vendor.ref("");
    common_vendor.ref(false);
    const displayedImages = common_vendor.ref([]);
    const currentPage = common_vendor.ref(1);
    const imgArr = common_vendor.ref([]);
    const flag = common_vendor.ref(false);
    function loadImages() {
      common_vendor.index.showNavigationBarLoading();
      const totalImages = imgArr.value.length;
      const start = Math.max(totalImages - currentPage.value * imagesPerPage, 0);
      const end = totalImages - (currentPage.value - 1) * imagesPerPage;
      const newImages = imgArr.value.slice(start, end).reverse();
      displayedImages.value.push(...newImages);
      currentPage.value++;
      common_vendor.index.hideNavigationBarLoading();
      common_vendor.index.stopPullDownRefresh();
    }
    function getimgArr() {
      console.log("take getimgArr");
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: "https://dwdeal.cn/search",
          method: "POST",
          data: { value: value.value },
          success: (res) => {
            imgArr.value = res.data.items;
            console.log("getimgArr is", imgArr.value);
            resolve();
          },
          fail: (err) => {
            console.log("获取图片数组失败", err);
            reject(err);
          }
        });
      });
    }
    common_vendor.onReachBottom(() => {
      if (displayedImages.value.length === imgArr.value.length) {
        flag.value = true;
        common_vendor.index.showToast({
          title: "没有更多了",
          icon: "none"
        });
        setTimeout(() => {
          return;
        }, 1e3);
      }
      if (!flag.value)
        loadImages();
    });
    async function onClick() {
      displayedImages.value = [];
      currentPage.value = 1;
      imgArr.value = [];
      common_vendor.index.showLoading({
        title: "加载中"
      });
      await getimgArr();
      loadImages();
      common_vendor.index.hideLoading();
      if (imgArr.value.length === 0) {
        common_vendor.index.showToast({
          title: `没有找到关于${value.value}的帖子`,
          icon: "none"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClick),
        b: common_vendor.o(($event) => value.value = $event),
        c: common_vendor.p({
          suffixIcon: "search",
          placeholder: "请输入内容",
          modelValue: value.value
        }),
        d: common_vendor.f(displayedImages.value, (img, k0, i0) => {
          return {
            a: img.id,
            b: img.id,
            c: "c10c040c-1-" + i0,
            d: common_vendor.p({
              _id: img._id,
              src: img.src,
              detail: img.detail,
              id: img.id,
              views: img.views,
              date: img.date
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
