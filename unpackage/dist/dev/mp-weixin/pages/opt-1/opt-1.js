"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "opt-1",
  setup(__props) {
    const imageArr = common_vendor.ref([]);
    const previewArr = common_vendor.ref([]);
    const description = common_vendor.ref("");
    const noImage = () => previewArr.value.length === 0;
    const noText = () => description.value.trim() === "";
    const broken = common_vendor.computed(() => noImage() || noText());
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
    const chooseImages = () => {
      common_vendor.index.chooseImage({
        count: 1,
        // 最多可以选择9张图片
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          tempFilePaths.forEach((filePath) => {
            compressAndUploadImage(filePath);
          });
        },
        fail: (err) => {
          console.error("选择图片失败");
        }
      });
    };
    const compressAndUploadImage = (filePath) => {
      common_vendor.index.compressImage({
        src: filePath,
        // 图片的路径
        quality: 10,
        // 压缩质量，0-100，数字越小，压缩率越高
        success: (res) => {
          previewArr.value.push(res.tempFilePath);
        },
        fail: (err) => {
          console.error("压缩失败:", err);
        }
      });
    };
    const uploadImage = (filePath) => {
      return new Promise((resolve, reject) => {
        common_vendor.index.uploadFile({
          url: "https://dwdeal.cn/item/upload",
          // 后端的上传接口
          filePath,
          name: "file",
          success: (uploadRes) => {
            const data = JSON.parse(uploadRes.data);
            if (data.filePath) {
              resolve(`https://dwdeal.cn/${data.filePath}`);
            } else {
              reject("文件路径不存在");
            }
          },
          fail: (err) => {
            console.error("上传失败:", err);
            reject(err);
          }
        });
      });
    };
    const submitImages = async () => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      if (previewArr.value.length > 0) {
        imageArr.value.push(...previewArr.value);
        for (let i = 0; i < imageArr.value.length; i++) {
          imageArr.value[i] = await uploadImage(imageArr.value[i]);
        }
        console.log(imageArr.value);
        const id = common_vendor.ref(common_vendor.index.getStorageSync("success"));
        common_vendor.index.request({
          url: "https://dwdeal.cn/item/submit",
          method: "POST",
          data: {
            name: id.value[0],
            id: id.value[2],
            detail: description.value,
            images: imageArr.value,
            views: 0,
            date: (/* @__PURE__ */ new Date()).toLocaleString("zh-CN", { timeZone: "Asia/Shanghai", hour12: false })
          },
          success: (res) => {
            common_vendor.index.showToast({
              title: "发布成功!",
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
      } else {
        console.warn("请选择图片");
      }
      common_vendor.index.hideLoading();
    };
    const debouncedSubmitImages = useDebounce(submitImages, 1e3);
    function longpress(index) {
      common_vendor.index.showActionSheet({
        itemList: ["删除"],
        success: function(res) {
          previewArr.value.splice(index, 1);
        },
        fail: function(res) {
          console.log(res.errMsg);
        }
      });
    }
    common_vendor.onShow(() => {
      try {
        common_vendor.index.getStorageInfo({
          success: (res) => {
            if (common_vendor.index.getStorageSync("success")) {
              console.log("有缓存");
            } else {
              common_vendor.index.redirectTo({
                url: "/pages/user/login"
              });
            }
          }
        });
      } catch (e) {
        console.log("获取缓存失败");
      }
    });
    return (_ctx, _cache) => {
      return {
        a: description.value,
        b: common_vendor.o(($event) => description.value = $event.detail.value),
        c: common_vendor.f(previewArr.value, (img, index, i0) => {
          return {
            a: img,
            b: img,
            c: common_vendor.o(($event) => longpress(index), img)
          };
        }),
        d: common_assets._imports_0$1,
        e: common_vendor.o(chooseImages),
        f: common_vendor.o((...args) => common_vendor.unref(debouncedSubmitImages) && common_vendor.unref(debouncedSubmitImages)(...args)),
        g: broken.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-80b9550c"]]);
wx.createPage(MiniProgramPage);
