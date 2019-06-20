Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url = decodeURIComponent(options.url);
    console.log("播放地址：" + url);
    this.setData({
      url: url,
      type: options.type
    });
  },
  /**
   * 保存视频至本地
   */
  downloadTap(res) {
    var url = res.currentTarget.dataset.url;
    wx.setClipboardData({
      data: url,
      success(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 2000
        })
      }
    })
   
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  }

})