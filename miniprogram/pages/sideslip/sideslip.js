// pages/leftSlide/leftSlide.js

const App = getApp()
import itemData from './mock.js'

Page({
  data: {
    itemData,
  },
  touchS: function (e) {  // touchstart
    let startX = App.Touches.getClientX(e)
    startX && this.setData({ startX })
  },
  touchM: function (e) {  // touchmove
    let itemData = App.Touches.touchM(e, this.data.itemData, this.data.startX)
    itemData && this.setData({ itemData })

  },
  touchE: function (e) {  // touchend
    const width = 150  // 定义操作列表宽度
    let itemData = App.Touches.touchE(e, this.data.itemData, this.data.startX, width)
    itemData && this.setData({ itemData })
  },
  /**
   * 刪除item项
   */
  itemDelete: function (e) {  // itemDelete
    let itemData = App.Touches.deleteItem(e, this.data.itemData)
    itemData && this.setData({ itemData })
  }
})