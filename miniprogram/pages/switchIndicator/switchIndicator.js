Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始化显示的选中tab
    currentTab: 1,
    // 分割线的百分比（0-1）
    percentage: 0.5,
    // 指示器tab集合
    citys: ['北京', '上海', '南昌'],
  },
  /**
   * 指示器切换事件
   */
  switchIndicator(res) {
    console.log("点击", res);
    this.setData({ currentTab: res.detail.currentTarget.id });
  },
  swiperChange(res) {
    console.log("滑动", res);
    this.setData({ currentTab: res.detail.current});
  }
})