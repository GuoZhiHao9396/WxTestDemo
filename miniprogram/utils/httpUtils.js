var util = require("util.js");
// 有效网络请求3次
var requestNumber = 3;
var url, filePath, name, formData, method, params, message, success, fail;
// 展示进度条的网络请求
// url:网络请求的url
// method:请求方式(post/get)
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, method, params, message, success, fail) {
  console.log(method + " - " + url + "\n请求参数", params)
  url = url;
  method = method;
  params = params;
  message = message;
  success = success;
  fail = fail;
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url, // 请求接口
    data: params, // 请求参数
    method: method, // 请求方式
    header: {
      'content-Type': 'application/x-www-form-urlencoded'
      // 'content-type': 'json'
    },
    success: function(res) {
      requestNumber = 3;
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        console.log(method + " - " + url + "\n返回数据", res.data);
        // 判断json格式是否正确
        if (util.isJSON(res.data)) {
          success(res.data)
        } else {
          //
          wx.showModal({
            title: '温馨提示',
            content: 'json数据格式错误',
            showCancel: false,
            confirmColor: '#fe943e'
          })
        }
      } else if (res.statusCode == 404 || res.statusCode == 500 || res.statusCode == 400) {
        //
        wx.showModal({
          title: '温馨提示',
          content: '请求失败 - Code：' + res.statusCode,
          showCancel: false,
          confirmColor: '#fe943e'
        });
        fail()
      }
      url = "";
      method = "";
      params = "";
      message = "";
      success = "";
      fail = "";
    },
    fail: function(res) {
      console.log("网络请求异常", res);
      if (res.errMsg.indexOf("timeout") != -1) {
        wx.showModal({
          title: '温馨提示',
          content: '网络请求超时，请检查网络设置',
          showCancel: false,
          confirmColor: '#fe943e'
        })
      } else {
        if (requestNumber == 0) {
          wx.showModal({
            title: '温馨提示',
            content: '网络不稳定，请检查网络设置',
            showCancel: false,
            confirmColor: '#fe943e'
          })
        }  else if(requestNumber > 0){
          wx.showModal({
            title: '温馨提示',
            content: '网络不稳定，请重新加载',
            confirmText: '重新加载',
            showCancel: false,
            confirmColor: '#fe943e',
            success() {
              requestNumber--;
              requestLoading(url, method, params, message, success, fail);
            }
          })
        }
      }
      //
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function(res) {

    },
  })
}

//不显示对话框的请求
function request(url, method, params, success, fail) {
  this.requestLoading(url, method, params, "", success, fail)
}

// url:网络请求的url
// filePath:图片地址
// name:请求键
// formData:额外数据
// success:成功的回调函数
// fail：失败的回调
function uploadFile(url, filePath, name, formData, message, success, fail) {
  url = url;
  filePath = filePath;
  name = name;
  formData = formData;
  message = message;
  success = success;
  fail = fail;
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.uploadFile({
    url: url,
    filePath: filePath,
    name: name,
    formData: formData,
    success: function(res) {
      requestNumber = 3;
      wx.hideLoading();
      if (res.statusCode == 200) {
        success(JSON.parse(res.data))
      } else {
        //
        console.log("网络请求异常", res);
        wx.showModal({
          title: '温馨提示',
          content: 'json数据格式错误',
          showCancel: false,
          confirmColor: '#fe943e'
        })
      }
      url = "";
      filePath = "";
      name = "";
      formData = "";
      message = "";
      success = "";
      fail = "";
    },
    fail: function(res) {
      //
      wx.hideLoading();
      console.log("网络请求异常", res);
      if (res.errMsg.indexOf("timeout") != -1) {
        wx.showModal({
          title: '温馨提示',
          content: '网络请求超时，请检查网络设置',
          showCancel: false,
          confirmColor: '#fe943e'
        })
      } else {
        if (requestNumber == 0) {
          wx.showModal({
            title: '温馨提示',
            content: '网络不稳定，请检查网络设置',
            showCancel: false,
            confirmColor: '#fe943e'
          })
        } else if (requestNumber > 0) {
          wx.showModal({
            title: '温馨提示',
            content: '网络不稳定，请重新加载',
            confirmText: '重新加载',
            showCancel: false,
            confirmColor: '#fe943e',
            success(res) {
              console.log(res);
              requestNumber--;
              uploadFile(url, filePath, name, formData, message, success, fail);
            }
          })
        }
      }
      fail()
    }
  })
}
//formdata上传表单
function requestFormData(url, method, params, message, success, fail) {
  console.log(url + "\n请求参数", params);
  url = url;
  method = method;
  params = params;
  message = message;
  success = success;
  fail = fail;
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url, // 请求接口
    data: params, // 请求参数
    method: method, // 请求方式
    contentType: false,
    processData: false,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function(res) {
      requestNumber = 3;
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        console.log(url + "\n返回数据", res.data);
        // 判断json格式是否正确
        if (util.isJSON(res.data)) {
          success(res.data)
        } else {
          wx.showModal({
            title: '温馨提示',
            content: 'json数据格式错误',
            showCancel: false,
            confirmColor: '#fe943e'
          })
        }
      } else if (res.statusCode == 404 || res.statusCode == 500 || res.statusCode == 400) {
        //
        wx.showModal({
          title: '温馨提示',
          content: '请求失败 - Code：' + res.statusCode,
          showCancel: false,
          confirmColor: '#fe943e'
        });
        fail()
      }
      url = "";
      method = "";
      params = "";
      message = "";
      success = "";
      fail = "";
    },
    fail: function(res) {
      //
      console.log("网络请求异常", res);
      if (res.errMsg.indexOf("timeout") != -1) {
        wx.showModal({
          title: '温馨提示',
          content: '网络请求超时，请检查网络设置',
          showCancel: false,
          confirmColor: '#fe943e'
        })
      } else {
        if (requestNumber == 0) {
          wx.showModal({
            title: '温馨提示',
            content: '网络不稳定，请检查网络设置',
            showCancel: false,
            confirmColor: '#fe943e'
          })
        } else if (requestNumber > 0) {
          wx.showModal({
            title: '温馨提示',
            content: '网络不稳定，请重新加载',
            confirmText: '重新加载',
            showCancel: false,
            confirmColor: '#fe943e',
            success() {
              requestNumber--;
              requestFormData(url, method, params, message, success, fail);
            }
          })
        }
      }
      //
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function(res) {

    },
  })
}

module.exports = {
  request: request,
  uploadFile: uploadFile,
  requestFormData: requestFormData,
  requestLoading: requestLoading
}