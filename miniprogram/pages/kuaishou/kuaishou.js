var app = getApp();
var params = {};
var util = require("../../utils/util.js");
// 网络请求
var netRequest = require("../../utils/httpUtils.js");
Page({
  data: {
    hidden: true,
    note: []
  },
  onLoad: function(e) {
    this.requestList();
  },
  onPullDownRefresh(res) {
    this.requestList();
  },
  // item点击事件
  itemTap(res) {
    // 索引0开始
    var index = res.currentTarget.dataset.index;
    var type = this.data.note[index].type;
    var url = "";
    if (type == 1) {
      url = this.data.note[index].main_mv_urls[0].url;
    } else {
      url = this.data.note[index].playInfo.playUrls[0].url;
    }

    wx.navigateTo({
      url: '../kuaishouplay/kuaishouplay?type=' + type + '&url=' + encodeURIComponent(url),
    })
  },
  requestList() {
    var that = this;
    params = {};
    params.page = 1;
    params.type = 6;
    params.count = 20;
    params.id = 16525;
    params.source = 1;
    params.refreshTimes = 2;
    params.coldStart = false;
    params.myFollowSlideType = 1;
    params.os = "android";
    params.client_key = "3c2cd3f3";
    params.sig = "6f1d567c289f0a4fe12ca3aa94ebf105";
    params.token = "a27426e33c3848f1822ce367476ac383-22126166";
    params.__NStokensig = "dd32b0c9dab6c5b06c81b5957e10be878f3ed83ef6b1cf1f81d3ff961f7f85d7";
    netRequest.requestLoading("http://103.107.217.65/rest/n/feed/myfollow?app=0&kpf=ANDROID_PHONE&ver=6.0&c=360APP%2C1&mod=samsung%28SM-G9350%29&appver=6.0.3.7943&ftt=&isp=CMCC&kpn=KUAISHOU&lon=115.996868&language=zh-cn&sys=ANDROID_8.0.0&max_memory=256&ud=22126166&country_code=cn&oc=UNKNOWN&hotfix_ver=&did_gt=1545397461972&iuid=&net=WIFI&did=ANDROID_b3910a26b6f8b63b&lat=28.675062", "POST", params, "正在加载", function(res) {
      wx.stopPullDownRefresh();
      if (res.feeds.length > 0) {
        for (var i = 0; i < res.feeds.length; i++) {
          res.feeds[i].timestamp = util.getTime(res.feeds[i].timestamp);
        }
        that.setData({
          hidden: true,
          note: res.feeds
        });
      }
    }, function(res) {
      wx.stopPullDownRefresh();
      console.log(res);
    });
  }
})