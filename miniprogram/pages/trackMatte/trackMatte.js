// pages/trackMatte/trackMatte.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 删除广告
   */
  deleteAd:function(res){
    console.log(res);
   this.setData({
     showModalStatus:false
   });
  }
  
})