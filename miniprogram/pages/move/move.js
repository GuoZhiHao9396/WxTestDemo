// pages/move/move.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left: "",
    top: ""
  },
  viewTouchMove: function (e) {
    console.log(e);
    this.setData({
      left: e.touches[0].clientX - 60,
      top: e.touches[0].clientY - 60
    });
  }

})