const Toast = require('../../components/toast/toast');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: ["显示toast", "显示 Icon 图标的toast", "自定义图片作为图标的toast", "显示 Loading toast", "只显示图标的toast", "显示 Loading"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 点击事件
   */
  itemOnClick(res) {
    switch (res.target.id) {
      case "0": // 
        Toast.setDefaultOptions({
          selector: '#zan-toast'
        });
        Toast('toast的内容');
        break;
      case "1": // 
        Toast({
          type: 'fail',
          message: 'toast的内容',
          selector: '#zan-toast'
        });
        break;
      case "2": // 
        Toast({
          message: 'toast的内容',
          selector: '#zan-toast',
          image: 'https://b.yzcdn.cn/v2/image/dashboard/secured_transaction/suc_green@2x.png'
        });
        break;
      case "3": // 
        Toast({
          type: 'loading',
          message: 'toast的内容',
          selector: '#zan-toast'
        });
        break;
      case "4": // 
        Toast({
          type: 'fail',
          selector: '#zan-toast'
        });
        break;
      case "5": // 
        Toast.loading({
          message: '加载中',
          selector: '#zan-toast'
        });
        break;
    }
  }
})