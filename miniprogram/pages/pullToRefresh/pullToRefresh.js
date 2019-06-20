// pages/pullToRefresh/pullToRefresh.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    hasMore: true,
    list1: ["item01", "item02", "item03", "item04", "item05", "item06", "item07", "item08", "item09", "item10", "item11", "item12"],
    list2: ["send01", "send02", "send03", "send04", "send05", "send06", "send07", "send08", "send09", "send10", "send11", "send12"],
    titlelist: ["方式1 - 系统方法", "方式2 - scrollview"],
    currentNavtab: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onSwitchTab: function (res) {
    this.setData({ currentNavtab: res.detail.currentTarget.id });
  },
  /**
   * 方式一：页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.currentNavtab == 0) {
      var page = this;
      console.log("底部加载");
      this.setData({
        hidden: false
      })
      setTimeout(function () {
        page.data.list1.push("底部加载数据" + (page.data.list1.length + 1));
        page.setData({
          list1: page.data.list1,
          hidden: true
        })
      }, 2000)
    }
  },
  /**
   * 方式二：底部加载
   */
  loadMore: function (res) {
    var page = this;
    console.log("底部加载");
    this.setData({
      hidden: false,
    })
    //
    setTimeout(function () {
      page.data.list2.push("底部加载数据" + (page.data.list2.length + 1));
      page.setData({
        hidden: true,
        list2: page.data.list2
      })
    }, 2000)

  },

})