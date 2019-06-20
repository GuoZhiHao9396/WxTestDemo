Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentWifiName: "",
    currentWifiMac: "",
    wifiList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        console.log("网络状态", res);
        if (res.networkType == "wifi") {
          console.log("当前处于wifi状态");
          // 初始化wifi
          wx.startWifi({
            success: function (res) {
              // 获取wifi列表数据
              wx.getWifiList({
                success: function (res) {
                  // 监听在获取到 Wi-Fi 列表数据时的事件，在回调中将返回 wifiList
                  wx.onGetWifiList(function(res){
                    console.log("list - success", res);
                    // 便利数据
                    if(res.wifiList.length>0){
                      var wifiList=[];
                       for(var i=0;i<res.wifiList.length;i++){
                         var wifiObject={};
                         wifiObject.name= res.wifiList[i].SSID;
                         wifiObject.mac = res.wifiList[i].BSSID;
                         wifiList.push(wifiObject);
                       }
                       // 绑定数据，显示wifi列表
                       that.setData({
                         wifiList: wifiList
                       });
                    }
                  })
                },
                fail: function (res) { 
                  console.log("list - fail", res);
                },
                complete: function (res) { 
                  console.log("list - complete", res);
                }
              })
              // 当前连接的wifi
              wx.getConnectedWifi({
                success: function (res) {
                  console.log("current - success", res);
                  that.setData({
                    currentWifiMac: res.wifi.BSSID,
                    currentWifiName: res.wifi.SSID
                  });
                },
                fail: function (res) {
                  console.log("current - fail", res);
                },
                complete: function (res) {
                  console.log("current - complete", res);
                }
              });
            }
          })

        }
      },
    })
  }
})