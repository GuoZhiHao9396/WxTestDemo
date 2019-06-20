Page({
  data: function() {
    var model = {};
    model.pageVariable = {
      curSelectedItemId: '0', //顶部导航栏，当前选中的项
      isFloat: false, //控制导航栏浮动
    }
    return model;
  }(),
  /**
   * 选择导航
   */
  selectNavigationItem: function(e) {
    this.setData({
      'pageVariable.curSelectedItemId': e.currentTarget.dataset.id,
      'pageVariable.isFloat': false
    });
    wx.pageScrollTo({
      scrollTop: 0,
    });
    this.initData(e.currentTarget.dataset.id);     //加载数据
  },
  onPageScroll: function(res) {
    if (res.scrollTop >= 1) { //开始滚动
      if (!this.data.pageVariable.isFloat) {
        this.setData({
          'pageVariable.isFloat': true
        });
      }
    } else {
      this.setData({
        'pageVariable.isFloat': false
      });
    }
  }
})