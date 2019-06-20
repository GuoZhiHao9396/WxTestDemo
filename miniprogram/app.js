import Touches from '/utils/Touches.js'
// 百度地图
var bmap = require('/libs/bmap-wx.min.js');
var util=require('/utils/util.js');
// 
var wxBizDataCrypt = require("/utils/WXBizDataCrypt.js");
// 
var appId = "wx52816275cbf232c0";
App({

  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getUserInfo();
  },
  onShow(res) {
    var that = this;
    var shareTicket = res.shareTicket;
    if (!util.isNull(shareTicket)) {
      // 获取分享信息
      wx.getShareInfo({
        shareTicket: shareTicket,
        success(res) {
          console.log("群信息", res);
          var encryptedData = res.encryptedData;
          var iv = res.iv;
          // 登录
          wx.login({
            success(a) {
              console.log("个人信息", a);
              // 获取sessionkey
              wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=e22027c5284ec4d8144db32142bda5ae&js_code=' + a.code + '&grant_type=authorization_code',
                success(b) {
                  console.log("个人详细", b);
                  // 得到群openGID
                  var data = wxBizDataCrypt.decryptData(appId, b.data.session_key, encryptedData, iv);
                  console.log('解密后群标识: ', data)
                  that.globalData.gid=data.openGId;
                }
              })
            }
          })
        },
        fail(res) {
          console.log("失败获取群消息", res);
        }
      })
    }
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          // wx.getUserInfo({
          //   success: function (res) {
          //     console.log(res);
          //     that.globalData.userInfo = res.userInfo
          //     typeof cb == "function" && cb(that.globalData.userInfo)
          //   }
          // })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    gid:"",
    
  },
  /**
   * 发送bug至后台
   */
  sendBug(res) {
    xbossdebug.notifyError(res);
  },
  /**
   * 获取具体地理位置
   */
  getAddress: function(address, locationFail) {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: '1USGjaKByf66GCuQoyi5ALvjncfEx7fN'
    });
    BMap.regeocoding({
      fail: function(data) {
        console.log("定位失败", data)
        typeof locationFail == "function" && locationFail()
      },
      success: function(data) {
        console.log("定位成功", data);
        that.globalData.address = data;
        typeof address == "function" && address(that.globalData.address)
      }
    });
  },
  Touches: new Touches()
})