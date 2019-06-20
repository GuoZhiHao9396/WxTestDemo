var animation;
var interval;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    jsOrcss: true,
    translateBoole: false,
    continueBoole2: false,
    rotateBoole: false,
    scaleBoole: false,
    skewBoole: false,
    queueBoole: false,
    continueBoole: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    animation = wx.createAnimation({
      // 动画持续时间，单位ms
      duration: 1000,
      // 定义动画的效果
      timingFunction: 'linear',
      // 动画延迟时间，单位 ms
      delay: 0,
      // 设置transform-origin
      transformOrigin: "50% 50% 0",
    })
  },
  /**
   * ===============================================偏移
   */
  translateTap(res) {
    // opacity透明度（0-1）
    animation.opacity(0).translate(30, 30).step();
    // 1秒后还原
    animation.opacity(1).translate(0).step({
      duration: 1000
    });
    // export 方法每次调用后会清掉之前的动画操作
    this.setData({
      jsOrcss: true,
      animationData: animation.export()
    });
  },
  /**
   * 偏移
   */
  translateTap2(res) {
    this.setData({
      jsOrcss: false,
      translateBoole: true,
      continueBoole2: false,
      rotateBoole: false,
      scaleBoole: false,
      skewBoole: false,
      queueBoole: false,
      continueBoole: false,
    });
  },
  /**
   * ===============================================旋转
   */
  rotateTap(res) {
    animation.rotate(180).step();
    // 1秒后还原
    animation.rotate(0).step({
      duration: 1000
    });
    // export 方法每次调用后会清掉之前的动画操作
    this.setData({
      jsOrcss: true,
      animationData: animation.export()
    });
  },
  /**
  * 旋转
  */
  rotateTap2(res) {
    this.setData({
      jsOrcss: false,
      rotateBoole: true,
      translateBoole: false,
      continueBoole2: false,
      scaleBoole: false,
      skewBoole: false,
      queueBoole: false,
      continueBoole: false,
    });
  },
  /**
   * ===============================================缩放
   */
  scaleTap(res) {
    animation.scale(0.5).step();
    // 1秒后还原
    animation.scale(1).step({
      duration: 1000
    });
    // export 方法每次调用后会清掉之前的动画操作
    this.setData({
      jsOrcss: true,
      animationData: animation.export()
    });
  },
  /**
  * 缩放
  */
  scaleTap2(res) {
    this.setData({
      jsOrcss: false,
      scaleBoole: true,
      rotateBoole: false,
      translateBoole: false,
      continueBoole2: false,
      skewBoole: false,
      queueBoole: false,
      continueBoole: false,
    });
  },
  /**
   * ===============================================倾斜
   */
  skewTap(res) {
    animation.skew(-60).step();
    // 1秒后还原
    animation.skew(1).step({
      duration: 1000
    });
    // export 方法每次调用后会清掉之前的动画操作
    this.setData({
      jsOrcss: true,
      animationData: animation.export()
    });
  },
  /**
   * 倾斜
   */
  skewTap2(res) {
    this.setData({
      jsOrcss: false,
      skewBoole: true,
      scaleBoole: false,
      rotateBoole: false,
      translateBoole: false,
      continueBoole2: false,
      queueBoole: false,
      continueBoole: false,
    });
  },
  /**
   * ===============================================队列
   */
  queueTap(res) {
    animation.translateY(100).rotate(180).scale(0.5).step();
    // 1秒后还原
    animation.translateY(0).rotate(0).scale(1).step({
      duration: 1000
    });
    // export 方法每次调用后会清掉之前的动画操作
    this.setData({
      jsOrcss: true,
      animationData: animation.export()
    });
  },
  /**
   * 队列
   */
  queueTap2(res) {
    this.setData({
      jsOrcss: false,
      queueBoole: true,
      skewBoole: false,
      continueBoole2: false,
      scaleBoole: false,
      rotateBoole: false,
      translateBoole: false,
      continueBoole: false,
    });
  },
  /**
   * ===============================================持续动画开始
   */
  continueStartTap(res) {
    var that = this;
    var num = 180;
    animation.rotate(num).step();
    // export 方法每次调用后会清掉之前的动画操作
    that.setData({
      jsOrcss: true,
      animationData: animation.export()
    });
    interval = setInterval(function () {
      num = num + 180
      animation.rotate(num).step();
      // export 方法每次调用后会清掉之前的动画操作
      that.setData({
        animationData: animation.export()
      });
    }, 1000);
  },
  /**
   * 持续动画开始
   */
  continueStartTap2(res) {
    this.setData({
      jsOrcss: false,
      continueBoole: true,
      continueBoole2: false,
      queueBoole: false,
      skewBoole: false,
      scaleBoole: false,
      rotateBoole: false,
      translateBoole: false,
    });
  },
  /**
   * ===============================================持续动画结束
   */
  continueEndTap(res) {
    clearInterval(interval);
  },
  /**
   * 持续动画结束
   */
  continueEndTap2(res) {
    this.setData({
      jsOrcss: false,
      continueBoole2: true,
      queueBoole: false,
      skewBoole: false,
      scaleBoole: false,
      rotateBoole: false,
      translateBoole: false,
    });
  },
  /**
   * 图片点击效果
   */
  imageTap() {
    wx.showToast({
      title: '我是\'P\'',
    })
  }
})