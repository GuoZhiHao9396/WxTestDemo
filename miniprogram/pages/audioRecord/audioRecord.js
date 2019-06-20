Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 开始录音
   */
  startRecord(res) {
    var that = this;
    wx.startRecord({
      success: function(res) {
        //
        that.setData({
          tempFilePath:res.tempFilePath
        });
      },
      fail: function(res) {
        //录音失败
        console.log("录音失败", res);
      }
    })
  },
  /**
   * 停止录音
   */
  stopRecord(res) {
    //结束录音  
    wx.stopRecord();
  },
  /**
   * 播放录音
   */
  playRecord(res) {
    var that = this;
    wx.playVoice({
      filePath: that.data.tempFilePath,
      complete: function() {}
    })
  }
})