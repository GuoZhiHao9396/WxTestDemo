var util = require('../../utils/util.js');
var app = getApp();
var animation;
var INFO = wx.getSystemInfoSync();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    STATUS_BAR_HEIGHT: INFO.statusBarHeight,
    isShow: false,
    animationData: {},
    listData: ["Wifi管理", "系统相机", "手机震动", "图片验证码", "可拖动控件", "广告蒙层控件", "列表底部加载", "webView控件", "城市列表选择", "微信扫码功能", "横向平分视图", "列表项侧滑删除", "点击获取视图参数", "地图添加markers", "跳转界面，带返回参数", "自定义指示器", "自定义时间控件", "自定义图片缩放", "自定义底部弹窗控件", "自定义界面弹窗控件", "最新获取用户信息方法", "使用文字代替图片", "视频录制", "音频录制", "表情包", "群分享功能", "自定义Toast", "js动画和css动画", "自定义dialog", "自定义popupWindow", "即时通讯", "自定义标题栏", "自定义徽章", "自定义签名", "自定义画布", "腾讯视频插件", "tab悬浮","二维码支付"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      complete(res) {
        console.log("complete", res);
        if (res.errMsg.indexOf("fail") != -1) {
          console.log("未获取用户信息");
        } else {
          that.setData({
            userInfo: res.data
          });
        }
      }
    })
    //
    animation = wx.createAnimation({
      // 动画持续时间，单位ms
      duration: 100,
      // 定义动画的效果
      timingFunction: 'ease',
      // 动画延迟时间，单位 ms
      delay: 0,
      // 设置transform-origin
      transformOrigin: "100% 50% 0",
    })
  },
  /**
   * item的点击事件
   */
  itemOnClick: function(res) {
    switch (res.target.id) {
      case "0": // Wifi管理
        wx.navigateTo({
          url: '../wifi/wifi',
        })
        break;
      case "1": // 系统相机
        wx.navigateTo({
          url: '../camera/camera',
        })
        break;
      case "2": // 手机震动
        wx.vibrateLong({
          success: function() {}
        })
        break;
      case "3": // 图片验证码
        wx.navigateTo({
          url: '../verificationCode/verificationCode',
        })
        break;
      case "4": // 可拖动控件
        wx.navigateTo({
          url: '../move/move',
        })
        break;
      case "5": // 广告蒙层
        wx.navigateTo({
          url: '../trackMatte/trackMatte',
        })
        break;
      case "6": // 列表底部加载
        wx.navigateTo({
          url: '../pullToRefresh/pullToRefresh',
        })
        break;
      case "7": // webview网页
        wx.navigateTo({
          url: '../webView/webView',
        })
        break;
      case "8": // 城市列表选择
        wx.navigateTo({
          url: '../citys/citys',
        })
        break;
      case "9": // 微信扫描
        wx.scanCode({
          // 是否只能从相机扫码，不允许从相册选择图片
          onlyFromCamera: true,
          success(res) {
            console.log(res);
            wx.showToast({
              title: res.result,
            })
          },
          fail(res) {
            wx.showToast({
              title: '扫码失败，请看日志',
            })
            console.log(res);
          }
        })
        break;
      case "10": // 横向平分视图
        wx.navigateTo({
          url: '../divide/divide',
        })
        break;
      case "11": // 列表侧滑删除item
        wx.navigateTo({
          url: '../sideslip/sideslip',
        })
        break;
      case "12": // 点击获取视图参数（如：宽、高等）
        wx.createSelectorQuery().select('#test-id').fields({
          dataset: true,
          size: true,
          scrollOffset: true
        }, function(res) {
          wx.showModal({
            title: '提示',
            content: '详细信息，请见日志',
          })
          console.log(res);
        }).exec()
        break;
      case "13": // 地图添加markers
        wx.navigateTo({
          url: '../map/map',
        })
        break;
      case "14": // 跳转界面，带返回参数
        wx.navigateTo({
          url: '../index/index?id=test',
        })
        break;
      case "15": // 自定义指示器
        wx.navigateTo({
          url: '../switchIndicator/switchIndicator',
        })
        break;
      case "16": // 自定义时间控件
        wx.navigateTo({
          url: '../datePickerView/datePickerView',
        })
        break;
      case "17": // 自定义图片缩放
        wx.navigateTo({
          url: '../touchImage/touchImage',
        })
        break;
      case "18": // 自定义底部弹窗
        wx.navigateTo({
          url: '../pickerView/pickerView',
        })
        break;
      case "19": // 自定义界面弹窗
        wx.navigateTo({
          url: '../showMode/showMode',
        })
        break;
      case "20": // 获取用户信息
        wx.navigateTo({
          url: '../newGetUserInfo/newGetUserInfo',
        })
        break;
      case "21": // 文字转图片
        wx.navigateTo({
          url: '../textChangeImage/textChangeImage',
        })
        break;
      case "22": // 视频录制
        wx.navigateTo({
          url: '../videoRecord/videoRecord',
        })
        break;
      case "23": // 音频录制
        wx.navigateTo({
          url: '../audioRecord/audioRecord',
        })
        break;
      case "24": // 表情包
        wx.navigateTo({
          url: '../emoji/emoji',
        })
        break;
      case "25": // 群分享功能
        wx.navigateTo({
          url: '../crowd/crowd',
        })
        break;
      case "26": // 自定义toast
        wx.navigateTo({
          url: '../customToast/customToast',
        })
        break;
      case "27": // js动画和css动画
        wx.navigateTo({
          url: '../wxAnimation/wxAnimation',
        })
        break;
      case "28": // dialog
        wx.navigateTo({
          url: '../customDialog/customDialog',
        })
        break;
      case "29": // pop弹窗
        wx.navigateTo({
          url: '../popuwindow/popuwindow',
        })
        break;
      case "30": // 即时通讯
        wx.navigateTo({
          url: '../im/im',
        })
        break;
      case "31": // 自定义标题栏
        wx.navigateTo({
          url: '../customTitle/customTitle',
        })
        break;
      case "32": // 自定义徽章
        wx.navigateTo({
          url: '../customBadge/customBadge',
        })
        break;
      case "33": // 自定义签名
        wx.navigateTo({
          url: '../canvas/canvas',
        })
        break;
      case "34": // 自定义画布customCanvas
        wx.navigateTo({
          url: '../customCanvas/customCanvas',
        })
        break;
      case "35": // 腾讯视频插件
        wx.navigateTo({
          url: '../tencentVideo/tencentVideo',
        })
        break;
      case "36":
        wx.navigateTo({
          url: '../floatNavigation/floatNavigation',
        })
        break;
      case "37":
        wx.navigateTo({
          url: '../codePlay/codePlay',
        })
        break;
    }
  },
  /**
   * 回传的数据
   */
  getReturnData(res) {
    wx.showModal({
      title: '提示',
      content: "回传的数据：" + res.index,
    })
    console.log("回传的数据", res);
  },
  /**
   * 显示操作界面
   */
  showDialog() {
    animation.scale(1.2).step();
    // 1秒后还原
    animation.scale(1).step({
      duration: 100
    });
    // export 方法每次调用后会清掉之前的动画操作
    this.setData({
      isShow: !this.data.isShow,
      animationData: animation.export()
    });
  }
})