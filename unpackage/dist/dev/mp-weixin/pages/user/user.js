"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_popup2)();
}
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (myItem + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_popup)();
}
const myItem = () => "../../components/my-applied/my-applied.js";
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const admin = common_vendor.ref([]);
    const avator = common_vendor.ref("");
    const myItems = common_vendor.ref([]);
    admin.value = common_vendor.index.getStorageSync("success");
    function logOut() {
      try {
        common_vendor.index.removeStorageSync("success");
        common_vendor.index.redirectTo({
          url: "/pages/user/login"
        });
      } catch (e2) {
        console.log("清除缓存失败");
      }
    }
    function changeFile() {
      common_vendor.index.showActionSheet({
        itemList: ["修改头像", "修改昵称"],
        success: function(res) {
          if (res.tapIndex === 0) {
            common_vendor.index.chooseImage({
              count: 1,
              // 最多可以选择9张图片
              success: (res2) => {
                compressAndUploadImage(res2.tempFilePaths[0]);
              },
              fail: (err) => {
                console.error("选择图片失败");
              }
            });
          } else {
            showPopup();
          }
        },
        fail: function(res) {
          console.log(res.errMsg);
        }
      });
    }
    const compressAndUploadImage = (filePath) => {
      return new Promise((resolve, reject) => {
        common_vendor.index.compressImage({
          src: filePath,
          // 图片的路径
          quality: 10,
          // 压缩质量，0-100，数字越小，压缩率越高
          success: (res) => {
            avator.value = res.tempFilePath;
            console.log("压缩成功");
            resolve();
          },
          fail: (err) => {
            console.error("压缩失败:", err);
            reject(e);
          }
        });
      }).then(() => {
        submitImages();
      }).catch((e2) => {
        console.error(e2);
      });
    };
    const uploadImage = (filePath) => {
      return new Promise((resolve, reject) => {
        common_vendor.index.uploadFile({
          url: "https://dwdeal.cn/uploadAvator",
          // 后端的上传接口
          filePath,
          name: "file",
          success: (uploadRes) => {
            const data = JSON.parse(uploadRes.data);
            if (data.filePath) {
              resolve(`https://dwdeal.cn/${data.filePath}`);
            } else {
              reject("图片不存在");
            }
          },
          fail: (err) => {
            console.error("上传失败:", err);
          }
        });
      });
    };
    const submitImages = async () => {
      avator.value = await uploadImage(avator.value);
      common_vendor.index.request({
        url: "https://dwdeal.cn/submitAvator",
        method: "POST",
        header: { "content-type": "application/json" },
        data: {
          id: admin.value[2],
          avator: avator.value
        },
        success: (res) => {
          if (res.data.success) {
            return new Promise((resolve, reject) => {
              const id = admin.value[2];
              const name = admin.value[0];
              common_vendor.index.setStorageSync("success", [name, avator.value, id]);
              admin.value = common_vendor.index.getStorageSync("success");
              resolve();
            }).then(() => {
              common_vendor.index.showToast({
                title: "修改成功"
              });
            }).catch((e2) => {
              console.error("服务器超时");
            });
          } else {
            console.err("服务器错误,", res.data.message);
          }
        },
        fail: (err) => {
          console.error("提交失败:", err);
        }
      });
    };
    const popupRef = common_vendor.ref(null);
    const inputValue = common_vendor.ref("");
    const showPopup = () => {
      popupRef.value.open();
    };
    const cancel = () => {
      inputValue.value = "";
      popupRef.value.close();
    };
    const submitInput = () => {
      console.log("输入的内容:", inputValue.value);
      common_vendor.index.request({
        url: "https://dwdeal.cn/changeName",
        method: "POST",
        header: { "content-type": "application/json" },
        data: { id: admin.value[2], newName: inputValue.value },
        success: (res) => {
          if (res.data.success) {
            return new Promise((resolve, reject) => {
              common_vendor.index.showToast({
                title: "修改成功"
              });
              const id = admin.value[2];
              const avator2 = admin.value[1];
              common_vendor.index.setStorageSync("success", [inputValue.value, avator2, id]);
              admin.value = common_vendor.index.getStorageSync("success");
              resolve();
            }).then(() => {
              popupRef.value.close();
            }).catch((e2) => {
              console.error("服务器超时");
            });
          } else {
            console.err("服务器错误,", res.data.message);
          }
        },
        fail: (err) => {
          console.error("修改失败", err);
        }
      });
    };
    common_vendor.onShow(() => {
      console.log("onLoad");
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
      } catch (e2) {
        console.log("获取缓存失败");
      }
    });
    function getSelfItems() {
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: "https://dwdeal.cn/getSelfItems",
          method: "POST",
          header: { "content-type": "application/json" },
          data: { id: admin.value[2] },
          success: (res) => {
            console.log("进入了后端");
            if (res.data.success) {
              common_vendor.index.setStorageSync("myItems", res.data.myItems);
              myItems.value = common_vendor.index.getStorageSync("myItems");
              console.log(myItems.value);
              resolve();
            } else {
              reject({ message: "服务器错啦", details: res.data.message });
            }
          },
          fail: (err) => {
            reject({ message: "读取个人发布失败", error: err });
          }
        });
      });
    }
    common_vendor.onPullDownRefresh(async () => {
      await getSelfItems();
      common_vendor.index.stopPullDownRefresh();
    });
    common_vendor.onLoad(async () => {
      await getSelfItems();
    });
    return (_ctx, _cache) => {
      return {
        a: admin.value[1],
        b: common_vendor.o(changeFile),
        c: common_vendor.t(admin.value[0]),
        d: common_vendor.o(logOut),
        e: common_vendor.f(myItems.value, (img, k0, i0) => {
          return {
            a: img.id,
            b: img.id,
            c: "0f7520f0-2-" + i0 + ",0f7520f0-1",
            d: common_vendor.p({
              src: img.src,
              views: img.views,
              detail: img.detail,
              date: img.date,
              id: img.id,
              _id: img._id
            })
          };
        }),
        f: common_vendor.p({
          title: "我发布的"
        }),
        g: common_vendor.sr("collapse", "0f7520f0-0"),
        h: common_vendor.o(($event) => _ctx.value = $event),
        i: common_vendor.p({
          modelValue: _ctx.value
        }),
        j: inputValue.value,
        k: common_vendor.o(($event) => inputValue.value = $event.detail.value),
        l: common_vendor.o(cancel),
        m: common_vendor.o(submitInput),
        n: common_vendor.sr(popupRef, "0f7520f0-3", {
          "k": "popupRef"
        }),
        o: common_vendor.p({
          type: "center"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
