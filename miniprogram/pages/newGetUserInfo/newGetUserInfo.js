Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: { nickName: "未知" },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUserInfo(res) {
    console.log("用户信息", res);
    this.setData({
      userInfo: res.detail.userInfo
    });
    wx.setStorage({
      key: "userInfo",
      data: res.detail.userInfo
    })
  }
})