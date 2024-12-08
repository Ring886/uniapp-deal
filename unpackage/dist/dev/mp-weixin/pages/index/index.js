"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (Skeleton + itemCard)();
}
const itemCard = () => "../../components/item-preview/item-preview.js";
const Skeleton = () => "../../components/skeleton/skeleton.js";
const imagesPerPage = 6;
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const notice = common_vendor.ref("");
    const isLoaded = common_vendor.ref(false);
    const displayedImages = common_vendor.ref([]);
    const currentPage = common_vendor.ref(1);
    const imgArr = common_vendor.ref([]);
    const flag = common_vendor.ref(false);
    const imageNotice = common_vendor.ref([]);
    function getImageNotice() {
      common_vendor.index.request({
        url: "https://dwdeal.cn/getImageNotice",
        method: "POST",
        success: (res) => {
          if (res.data.success) {
            imageNotice.value = res.data.imageNotice;
          } else {
            console.error("服务器错误", res.data.message);
          }
        },
        fail: (err) => {
          console.error("获取imageNotice失败", err);
        }
      });
    }
    function getNotice() {
      common_vendor.index.request({
        url: "https://dwdeal.cn/getNotice",
        method: "POST",
        success: (res) => {
          if (res.data.success) {
            notice.value = res.data.notice;
          } else {
            console.error("服务器错误", res.data.message);
          }
        },
        fail: (err) => {
          console.error("获取notice失败", err);
        }
      });
    }
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
          url: "https://dwdeal.cn/getimgArr",
          method: "POST",
          success: (res) => {
            imgArr.value = res.data.imgArr;
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
    common_vendor.onLoad(async () => {
      console.log("onLoad");
      common_vendor.index.showLoading({
        title: "加载中"
      });
      await getimgArr();
      loadImages();
      getNotice();
      getImageNotice();
      isLoaded.value = true;
      common_vendor.index.hideLoading();
    });
    common_vendor.onPullDownRefresh(async () => {
      displayedImages.value = [];
      currentPage.value = 1;
      imgArr.value = [];
      flag.value = false;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      await getimgArr();
      loadImages();
      common_vendor.index.hideLoading();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isLoaded.value
      }, !isLoaded.value ? {} : {
        b: common_assets._imports_0,
        c: common_vendor.t(notice.value),
        d: common_vendor.f(imageNotice.value, (src, k0, i0) => {
          return {
            a: src,
            b: src
          };
        }),
        e: common_assets._imports_1
      }, {
        f: common_vendor.f(displayedImages.value, (img, k0, i0) => {
          return {
            a: img.id,
            b: img.id,
            c: "1cf27b2a-1-" + i0,
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
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
