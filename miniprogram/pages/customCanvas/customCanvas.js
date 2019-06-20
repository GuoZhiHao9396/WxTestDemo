var ctx_height;
Page({
  data: {},
  onLoad() {
  },
  //========================== 以下是方法一 ==========================
  /**
   * 绘制图片
   */
  createImg(res) {
    wx.createSelectorQuery().select('#canvas-test').boundingClientRect(function(res) {
      ctx_height = res.height
      var ctx = wx.createCanvasContext("test", this);
      ctx.setFillStyle('white');
      ctx.fillRect(0, 0, 275, ctx_height);
      ctx.setFontSize(14);
      ctx.setFillStyle('black');
      ctx.fillText("长按识别小程序，加入班级", 95, ctx_height - 45);
      ctx.drawImage('../../images/code.jpg', 20, ctx_height - 80, 70, 70);
      ctx.draw();
    }).exec();
  },
  /**
   * 保存分享图片
   */
  saveImg(res) {
    // 将画布转换为图片
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 275,
      height: ctx_height,
      destWidth: 1280,
      destHeight: 1920,
      canvasId: 'test',
      success(res) {
        // 保存图片到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存图片成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
        console.log("成功", res.tempFilePath)
      },
      fail(res) {
        console.log("失败", res);
      }
    })

  },
  //========================== 以下是方法二 ==========================
  /**
   * 绘制
   */
  eventDraw() {
    wx.showLoading({
      title: '绘制分享图片中',
      mask: false
    })
    this.setData({
      painting: {
        width: 375,
        height: 555,
        clear: true,
        views: [{
            type: 'image',
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531103986231.jpeg',
            top: 0,
            left: 0,
            width: 375,
            height: 555
          },
          {
            type: 'image',
            url: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epJEPdPqQVgv6D8bojGT4DrGXuEC4Oe0GXs5sMsN4GGpCegTUsBgL9SPJkN9UqC1s0iakjQpwd4h4A/132',
            top: 27.5,
            left: 29,
            width: 55,
            height: 55
          },
          {
            type: 'image',
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531401349117.jpeg',
            top: 27.5,
            left: 29,
            width: 55,
            height: 55
          },
          {
            type: 'text',
            content: '您的好友【kuckboy】',
            fontSize: 16,
            color: '#402D16',
            textAlign: 'left',
            top: 33,
            left: 96,
            bolder: true
          },
          {
            type: 'text',
            content: '发现一件好货，邀请你一起0元免费拿！',
            fontSize: 15,
            color: '#563D20',
            textAlign: 'left',
            top: 59.5,
            left: 96
          },
          {
            type: 'text',
            content: '正品MAC魅可口红礼盒生日唇膏小辣椒Chili西柚情人',
            fontSize: 16,
            lineHeight: 20,
            color: '#383549',
            textAlign: 'left',
            top: 336,
            left: 44,
            MaxLineNumber: 2,
            breakWord: true,
            bolder: true,
            width: 287
          },
          {
            type: 'text',
            content: '长按识别图中二维码帮我砍个价呗~',
            fontSize: 14,
            lineHeight: 20,
            color: '#383549',
            textAlign: 'left',
            top: 460,
            left: 165.5,
            MaxLineNumber: 2,
            breakWord: true,
            width: 120
          },
          {
            type: 'image',
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385366950.jpeg',
            top: 136,
            left: 42.5,
            width: 290,
            height: 186
          },
          {
            type: 'image',
            url: 'https://hybrid.xiaoying.tv/miniprogram/viva-ad/1/1531385433625.jpeg',
            top: 443,
            left: 85,
            width: 68,
            height: 68
          },
          {
            type: 'text',
            content: '￥0.00',
            fontSize: 19,
            color: '#E62004',
            textAlign: 'left',
            top: 387,
            left: 44.5,
            bolder: true
          },
          {
            type: 'text',
            content: '原价:￥138.00',
            fontSize: 13,
            color: '#7E7E8B',
            textAlign: 'left',
            top: 391,
            left: 110,
            textDecoration: 'line-through'
          }
        ]
      }
    })
  },
  /**
   * 保存到本地
   */
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  eventGetImage(event) {
    wx.hideLoading()
    const {
      tempFilePath
    } = event.detail
    this.setData({
      shareImage: tempFilePath
    })
  }
})