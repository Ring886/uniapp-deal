"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_rect = common_vendor.resolveComponent("rect");
  const _component_circle = common_vendor.resolveComponent("circle");
  (_component_rect + _component_circle)();
}
if (!Math) {
  common_vendor.unref(common_vendor.ContentLoader)();
}
const _sfc_main = {
  __name: "skeleton",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          x: "6",
          y: "10",
          rx: "5",
          ry: "5",
          width: "100",
          height: "20"
        }),
        b: common_vendor.p({
          x: "11",
          y: "54",
          rx: "0",
          ry: "0",
          width: "384",
          height: "110"
        }),
        c: common_vendor.p({
          x: "7",
          y: "176",
          rx: "0",
          ry: "0",
          width: "400",
          height: "125"
        }),
        d: common_vendor.p({
          x: "320",
          y: "235",
          rx: "0",
          ry: "0",
          width: "24",
          height: "0"
        }),
        e: common_vendor.p({
          x: "123",
          y: "17",
          rx: "0",
          ry: "0",
          width: "274",
          height: "20"
        }),
        f: common_vendor.p({
          cx: "36",
          cy: "329",
          r: "15"
        }),
        g: common_vendor.p({
          x: "13",
          y: "352",
          rx: "0",
          ry: "0",
          width: "51",
          height: "5"
        }),
        h: common_vendor.p({
          cx: "124",
          cy: "329",
          r: "15"
        }),
        i: common_vendor.p({
          x: "101",
          y: "352",
          rx: "0",
          ry: "0",
          width: "51",
          height: "5"
        }),
        j: common_vendor.p({
          cx: "211",
          cy: "329",
          r: "15"
        }),
        k: common_vendor.p({
          x: "184",
          y: "352",
          rx: "0",
          ry: "0",
          width: "51",
          height: "5"
        }),
        l: common_vendor.p({
          cx: "289",
          cy: "329",
          r: "15"
        }),
        m: common_vendor.p({
          x: "263",
          y: "352",
          rx: "0",
          ry: "0",
          width: "51",
          height: "5"
        }),
        n: common_vendor.p({
          cx: "371",
          cy: "329",
          r: "15"
        }),
        o: common_vendor.p({
          x: "345",
          y: "352",
          rx: "0",
          ry: "0",
          width: "51",
          height: "5"
        }),
        p: common_vendor.p({
          cx: "37",
          cy: "394",
          r: "15"
        }),
        q: common_vendor.p({
          x: "11",
          y: "423",
          rx: "0",
          ry: "0",
          width: "51",
          height: "5"
        }),
        r: common_vendor.p({
          cx: "126",
          cy: "394",
          r: "15"
        }),
        s: common_vendor.p({
          x: "101",
          y: "423",
          rx: "0",
          ry: "0",
          width: "51",
          height: "5"
        }),
        t: common_vendor.p({
          cx: "213",
          cy: "394",
          r: "15"
        }),
        v: common_vendor.p({
          x: "195",
          y: "424",
          rx: "0",
          ry: "0",
          width: "52",
          height: "0"
        }),
        w: common_vendor.p({
          x: "187",
          y: "423",
          rx: "0",
          ry: "0",
          width: "51",
          height: "5"
        }),
        x: common_vendor.p({
          cx: "288",
          cy: "394",
          r: "15"
        }),
        y: common_vendor.p({
          x: "263",
          y: "423",
          rx: "0",
          ry: "0",
          width: "51",
          height: "5"
        }),
        z: common_vendor.p({
          cx: "371",
          cy: "394",
          r: "15"
        }),
        A: common_vendor.p({
          x: "13",
          y: "443",
          rx: "0",
          ry: "0",
          width: "357",
          height: "76"
        }),
        B: common_vendor.p({
          x: "56",
          y: "537",
          rx: "0",
          ry: "0",
          width: "103",
          height: "60"
        }),
        C: common_vendor.p({
          x: "224",
          y: "537",
          rx: "0",
          ry: "0",
          width: "103",
          height: "60"
        }),
        D: common_vendor.p({
          x: "59",
          y: "606",
          rx: "0",
          ry: "0",
          width: "100",
          height: "5"
        }),
        E: common_vendor.p({
          x: "59",
          y: "616",
          rx: "0",
          ry: "0",
          width: "100",
          height: "5"
        }),
        F: common_vendor.p({
          x: "59",
          y: "627",
          rx: "0",
          ry: "0",
          width: "100",
          height: "5"
        }),
        G: common_vendor.p({
          x: "225",
          y: "607",
          rx: "0",
          ry: "0",
          width: "100",
          height: "5"
        }),
        H: common_vendor.p({
          x: "227",
          y: "618",
          rx: "0",
          ry: "0",
          width: "100",
          height: "5"
        }),
        I: common_vendor.p({
          x: "227",
          y: "627",
          rx: "0",
          ry: "0",
          width: "100",
          height: "5"
        }),
        J: common_vendor.p({
          width: 414,
          height: 836,
          speed: 1,
          primaryColor: "#f3f3f3",
          secondaryColor: "#ecebeb"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
