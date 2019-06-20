var INFO = wx.getSystemInfoSync();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取状态栏的高度px
    STATUS_BAR_HEIGHT: INFO.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  goBackHandler() {
    wx.navigateBack();
  }

})