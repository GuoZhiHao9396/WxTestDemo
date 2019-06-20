var app = getApp();
// 工具对象
var util = require("../../utils/util.js");
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = '';
var httpurl = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    markers: [
      { latitude: "28.680007", longitude: "116.000923", iconPath: "/images/location.png", title: "江西省南昌市青山湖区艾溪湖东地铁1号口" },
      { latitude: "28.680839", longitude: "116.000905", iconPath: "/images/location.png", title: "江西省南昌市青山湖区艾溪湖东地铁2号口" },
      { latitude: "28.680669", longitude: "115.999333", iconPath: "/images/location.png", title: "江西省南昌市青山湖区艾溪湖东地铁3号口" },
      { latitude: "28.680023", longitude: "115.999342", iconPath: "/images/location.png", title: "江西省南昌市青山湖区艾溪湖东地铁4号口" }
    ]
  },
  onLoad: function (res) {
    qqmapsdk = new QQMapWX({
      key: '2YNBZ-XOAW6-ZEOSS-MRSOE-LIHUT-B2FGU'
    });
    var that = this;
    var point1 = {};
    var point2 = {};
    // 获取定位
    app.getAddress(function (res) {
      //
      var point = {};
      point.lat = res.wxMarkerData[0].latitude;
      point.lng = res.wxMarkerData[0].longitude;
      point = util.Convert_GCJ02_To_BD09(point);
      console.log("腾讯 - 经纬度",res);
      console.log("百度 - 经纬度", point);
      // 腾讯的定位信息
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.wxMarkerData[0].latitude,
          longitude: res.wxMarkerData[0].longitude
        },
        success: function (res) {
          console.log("腾讯 - 定位数据", res.result);
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
      
      //
      that.setData({
        latitude: res.wxMarkerData[0].latitude,
        longitude: res.wxMarkerData[0].longitude
      });
    }, function () {
    });
    var wx = util.GetDistance(28.680007, 116.000923
      , 28.680839, 116.000905
    );
    console.log(wx);
  },
  makertap: function (res) {
    console.log("makertap", res);
  },
  callouttap: function (res) {
    console.log("callouttap", res);
  },
  controltap: function (res) {
    console.log("controltap", res);
  }

})