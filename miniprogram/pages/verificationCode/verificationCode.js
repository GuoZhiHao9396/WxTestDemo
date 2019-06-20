var Mcaptcha = require('../../utils/mcaptcha.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始化验证码
    initRandom: "",
    // 获取输入的验证码
    setCode: "",
    // 控件大小px
    codData:{width:120,height:45}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化验证码
    this.data.initRandom = new Mcaptcha({}).getrandom();
    console.log("初始化验证码", this.data.initRandom);
    this.mcaptcha = new Mcaptcha({
      el: 'canvas',
      width: this.data.codData.width,
      height: this.data.codData.height,
      code: this.data.initRandom
    });
  },
  /**
   * 刷新图形验证码
   */
  onRefreshCode() {
    // 获取刷新后的验证码
    this.data.initRandom=this.mcaptcha.getrandom();
    this.mcaptcha.refresh(this.data.initRandom);
  },
  /**
   * 获取验证码
   */
  getCode: function (res) {
    console.log("输入的验证码", res.detail.value);
    this.data.setCode = res.detail.value;
  },
  /**
   * 验证
   */
  verificationCode: function (res) {
    if (this.data.initRandom === this.data.setCode) {
      wx.showToast({
        title: "验证成功",
      })
    } else {
      wx.showToast({
        title: "验证失败",
      })
    }
  }
})