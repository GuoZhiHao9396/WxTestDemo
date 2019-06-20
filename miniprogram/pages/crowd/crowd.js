var app=getApp();
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (!util.isNull(app.globalData.gid)){
      console.log("Gid", app.globalData.gid);
      this.setData({ gid: app.globalData.gid});
    }
    wx.showShareMenu({
      withShareTicket: true,
      success(res) {
        console.log("成功", res);
      },
      fail(res) {
        console.log("失败", res);
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options)
    }else{
      console.log(options);
    }
    return {
      title: '测试转发群',
      path: '/pages/crowd/crowd',
      success: function (res) {
        console.log("转发成功",res);
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败",res);
      }
    }
  }
})