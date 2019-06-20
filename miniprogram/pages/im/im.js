let chatInput = require('../../components/chat-input/chat-input');
let utils = require('../../utils/util');
// 时间定时器对象
var minterval;
// item索引
var index = 0;
// item索引
var oldIndex = 0;
// 动画叠加
var voiceAnimation = 0;
// 语音对象
var innerAudioContext;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //
    scrollTop: 0,
    // 列表滚动高度
    scrollHeight: 91.5,
    // 聊天集合
    chatItems: [{
      types: '0', // 0:自己 1:好友
      userheadUrl: 'http://image.weilanwl.com/img/square-3.jpg', // 用户头像
      date: '2018年7月23日 13:23', // 消息时间
      messagetype: '0', //0:文本 1:图片 2:语音
      showDate: true, // 是否显示消息时间（true:显示 false:隐藏）
      text: '喵喵喵' // 消息文本内容
    }, {
      types: '1',
      userheadUrl: 'http://image.weilanwl.com/img/3x4-1.jpg',
      date: '2018年3月23日 13:23',
      messagetype: '1',
      showDate: false,
      imageUrl: 'http://image.weilanwl.com/img/3x4-1.jpg' //消息图片内容
    }, {
      types: '1',
      userheadUrl: 'http://image.weilanwl.com/img/3x4-1.jpg',
      date: '2018年3月23日 13:26',
      messagetype: '2',
      showDate: true,
      leftVoice: '../../images/icon_left_3.png', // 消息语音图片
      voiceUrl: "http://www.ytmp3.cn/?down/41370.mp3", // 消息语音地址
      voiceTime: "2" // 消息语音时长
    }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData();
    // 滑至底部
    this.pageScrollToBottom();
    // 创建语音对象
    innerAudioContext = wx.createInnerAudioContext();
    // 设置语音监听事件
    this.voicePlay(); // 播放
    this.voiceStop(); // 停止
    this.voiceError(); // 异常
    this.voiceEnded(); // 自然停止
    //
    console.log("消息", utils.getTime(new Date().format('yyyy/MM/dd HH:mm:ss')));
  },
  /**
   * 初始化
   */
  initData: function() {
    let that = this;
    let systemInfo = wx.getSystemInfoSync();
    console.log("设备信息", systemInfo);
    //
    var list = ["您好，孩子最近成绩下降，方便聊一下吗？", "家长你好，想和您聊一下孩子最近的学习情况", "孩子课堂学习状态不佳，望家长和孩子多沟通", "孩子最近表现不错，家长可以适当表扬鼓励一下哦"]
    chatInput.init(this, {
      // 必填。手机的系统信息，用于控件的适配
      systemInfo: systemInfo,
      // 最小录音时长，秒，小于该值则弹出‘说话时间太短’
      minVoiceTime: 1,
      // 最大录音时长，秒，填写的数值大于该值则按60秒处理。录音时长如果超过该值，则会保存最大时长的录音，并弹出‘说话时间超时’并终止录音
      maxVoiceTime: 60,
      // 开始倒计时时间，秒，录音时长达到该值时弹窗界面更新为倒计时弹窗
      startTimeDown: 56,
      // 录音格式，有效值：mp3或aac，仅在基础库1.6.0及以上生效，低版本不生效
      format: 'mp3', //aac/mp3
      // 发送按钮背景颜色
      sendButtonBgColor: 'mediumseagreen',
      // 发送按钮文本颜色
      sendButtonTextColor: 'white',
      // 非必填。点击右侧加号时，显示的自定义功能。picName元素的名字就是对应images/chat/extra文件夹下的png格式的图片名称，用于展示自定义功能的图片。description元素用于展示自定义功能的文字说明
      extraArr: [{
        picName: 'choose_picture',
        description: '照片'
      }, {
        picName: 'take_photos',
        description: '拍摄'
      }, {
        picName: 'close_chat',
        description: '常用语'
      }],
      // 非必填。这个也是用于适配。如果你的小程序有tabbar，那么需要填写这个字段，填48就行。如果你的小程序没有tabbar，那么就不要填写这个字段
      // tabbarHeigth: 48
    });
    chatInput.initCommonExpressions(this, list);
    //新增右下角加号button点击事件
    chatInput.setExtraButtonClickListener(function(dismiss) {
      console.log('Extra弹窗是否消息', dismiss);
      // dismiss为false时，显示3个选项
      that.setData({
        commonExpressions: true
      });
    })
    // 绑定事件
    that.setData({
      pageHeight: systemInfo.windowHeight,
    });
    // 聊天好友名称
    wx.setNavigationBarTitle({
      title: '好友'
    });
    //
    if (systemInfo.model.indexOf('iPhone X') != -1) {
      console.log("手机为：IPhonex");
      this.data.inputObj.paddingbottom = 4;
      this.data.scrollHeight=87.5;
    } else {
      this.data.inputObj.paddingbottom = 0;
    }
    this.setData({
      inputObj: this.data.inputObj,
      scrollHeight: this.data.scrollHeight
    })
    that.textButton();
    that.extraButton();
    that.voiceButton();
    that.commonExpressions();
    that.addCommonExpressions();
  },
  getCurrentTime() {
    return new Date().format('yyyy/MM/dd HH:mm:ss');
  },
  /**
   * 文本监听事件
   */
  textButton: function() {
    var that = this;
    chatInput.setTextMessageListener(function(e) {
      let content = e.detail.value;
      console.log('文本监听', content);
      var chatItem = {
        types: '0',
        userheadUrl: 'http://image.weilanwl.com/img/square-3.jpg',
        showDate: utils.getTime(that.getCurrentTime()) == '刚刚' ? false : true,
        date: utils.getTime(that.getCurrentTime()),
        messagetype: '0',
        text: content
      };
      // 添加到集合中
      that.data.chatItems.push(chatItem);
      // 更新UI
      that.setData({
        chatItems: that.data.chatItems
      });
      // 滑至底部
      that.pageScrollToBottom();
      console.log("聊天集合", that.data.chatItems);
    });
  },
  /**
   * 语音监听事件
   */
  voiceButton: function() {
    var that = this;
    //获取录音之后的音频临时文件
    chatInput.recordVoiceListener(function(res, duration) {
      let tempFilePath = res.tempFilePath; //语音临时文件的路径
      let vDuration = duration; //录音时长
      console.log('语音监听', "时长：" + vDuration + "；路径" + tempFilePath);
      var chatItem = {
        types: '0',
        userheadUrl: 'http://image.weilanwl.com/img/square-3.jpg',
        showDate: utils.getTime(utils.formatTime(new Date())) == '刚刚' ? false : true,
        date: utils.getTime(utils.formatTime(new Date())),
        messagetype: '2',
        rightVoice: '../../images/icon_right_3.png',
        voiceUrl: tempFilePath,
        voiceTime: vDuration
      };
      // 添加到集合中
      that.data.chatItems.push(chatItem);
      // 更新UI
      that.setData({
        chatItems: that.data.chatItems
      });
      // 滑至底部
      that.pageScrollToBottom();
      console.log("聊天集合", that.data.chatItems);
    });
    //监听录音状态
    chatInput.setVoiceRecordStatusListener(function(status) {
      switch (status) {
        case chatInput.VRStatus.START: //开始录音
          console.log('开始录音');
          break;
        case chatInput.VRStatus.SUCCESS: //录音成功
          console.log('录音成功');
          break;
        case chatInput.VRStatus.CANCEL: //取消录音
          console.log('取消录音');
          break;
        case chatInput.VRStatus.SHORT: //录音时长太短
          console.log('录音时长太短');
          break;
        case chatInput.VRStatus.UNAUTH: //未授权录音功能
          console.log('未授权录音功能');
          break;
        case chatInput.VRStatus.FAIL: //录音失败(已经授权了)
          console.log('录音失败(已经授权了)');
          break;
      }
    })
  },
  /**
   * 显示常用语
   */
  commonButton: function() {
    this.data.inputObj.extraObj.commonExpressions.isShowExpressions = false;
    this.setData({
      inputObj: this.data.inputObj
    });
  },
  /**
   * 常用语监听事件
   */
  commonExpressions: function() {
    var that = this;
    chatInput.setCommonExpressionsListener(function(res) {
      let content = res.currentTarget.dataset.text;
      console.log('文本监听', content);
      var chatItem = {
        types: '0',
        userheadUrl: 'http://image.weilanwl.com/img/square-3.jpg',
        showDate: utils.getTime(utils.formatTime(new Date())) == '刚刚' ? false : true,
        date: utils.getTime(utils.formatTime(new Date())),
        messagetype: '0',
        text: content
      };
      // 添加到集合中
      that.data.chatItems.push(chatItem);
      // 更新UI
      that.setData({
        chatItems: that.data.chatItems
      });
      // 关闭弹窗
      that.resetInputStatus();
      // 滑至底部
      that.pageScrollToBottom();
      console.log("聊天集合", that.data.chatItems);
    });
  },
  /**
   * 添加常用语
   */
  addCommonExpressions: function() {
    chatInput.addcommonExpressionListener(function(res) {
      wx.showModal({
        title: '温馨提示',
        content: '点击了添加常用语',
      })
    });
  },
  /**
   * 图片或拍照监听事件
   */
  extraButton: function() {
    let that = this;
    //自定义功能点击事件
    chatInput.clickExtraListener(function(e) {
      console.log(e);
      let itemIndex = parseInt(e.currentTarget.dataset.index); //点击的自定义功能索引
      if (itemIndex === 2) {
        that.commonButton(); //其他的自定义功能
        return;
      }
      //选择图片或拍照
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'],
        sourceType: itemIndex === 0 ? ['album'] : ['camera'],
        success: function(res) {
          let tempFilePath = res.tempFilePaths[0];
          console.log("图片/拍照监听", tempFilePath);
          var chatItem = {
            types: '0',
            userheadUrl: 'http://image.weilanwl.com/img/square-3.jpg',
            showDate: utils.getTime(utils.formatTime(new Date())) == '刚刚' ? false : true,
            date: utils.getTime(utils.formatTime(new Date())),
            messagetype: '1',
            imageUrl: tempFilePath
          }
          // 添加到集合中
          that.data.chatItems.push(chatItem);
          // 更新UI
          that.setData({
            chatItems: that.data.chatItems
          });
          // 关闭弹窗
          that.resetInputStatus();
          // 滑至底部
          that.pageScrollToBottom();
          console.log("聊天集合", that.data.chatItems);
        }
      });
    });
  },
  /**
   * 列表滚动最底部
   */
  pageScrollToBottom() {
    var that=this;
    wx.createSelectorQuery().select('#chat-item').boundingClientRect(function(rect) {
      // 使页面滚动到底部
      that.setData({
        scrollTop: rect.height
      });
    }).exec()
  },
  /**
   * 收起自定义功能窗口
   */
  resetInputStatus() {
    chatInput.closeExtraView();
  },
  /**
   * item点击效果
   */
  chatTap(res) {
    index = res.currentTarget.dataset.index;
    // 判断item消息类型
    switch (this.data.chatItems[index].messagetype) {
      case "1": // 图片
        wx.previewImage({
          urls: [this.data.chatItems[index].imageUrl],
        })
        break;
      case "2": // 语音
        this.tapPlayVoice(res);
        break;
    }
  },
  /**
   * 语音动画
   */
  currentTimer: function(index) {
    var that = this;
    voiceAnimation++;
    console.log("叠加", voiceAnimation);
    if (that.data.chatItems[index].types == '0') {
      var rightVoice = '';
      if (voiceAnimation % 3 == 1) {
        rightVoice = '../../images/icon_right_1.png';
      } else if (voiceAnimation % 3 == 2) {
        rightVoice = '../../images/icon_right_2.png';
      } else if (voiceAnimation % 3 == 0) {
        rightVoice = '../../images/icon_right_3.png';
      }
      that.data.chatItems[index].rightVoice = rightVoice;
    } else {
      // 好友
      var leftVoice = '';
      if (voiceAnimation % 3 == 1) {
        leftVoice = '../../images/icon_left_1.png';
      } else if (voiceAnimation % 3 == 2) {
        leftVoice = '../../images/icon_left_2.png';
      } else if (voiceAnimation % 3 == 0) {
        leftVoice = '../../images/icon_left_3.png';
      }
      that.data.chatItems[index].leftVoice = leftVoice;
    }
    // 更新UI
    that.setData({
      chatItems: that.data.chatItems
    });
  },
  /**
   * 播放语音
   */
  tapPlayVoice(res) {
    var that = this;
    // 判断当前是否正在播放
    if (voiceAnimation > 0) {
      // 停止播放
      innerAudioContext.stop();
    } else {
      // 录音播放地址
      innerAudioContext.src = that.data.chatItems[index].voiceUrl;
      // 启动播放
      innerAudioContext.play();
      // 启动计时器
      minterval = setInterval(function() {
        that.currentTimer(index)
      }, 300);
    }
  },
  voiceEnded() {
    var that = this;
    innerAudioContext.onEnded(() => {
      // 关闭计时器
      if (minterval != null) {
        console.log("自然播放结束", minterval);
        voiceAnimation = 0;
        clearInterval(minterval);
        // 初始化语音图标
        if (that.data.chatItems[index].types == '0') {
          // 自己
          that.data.chatItems[index].rightVoice = '../../images/icon_right_3.png'
        } else {
          // 好友
          that.data.chatItems[index].leftVoice = '../../images/icon_left_3.png'
        }
        this.setData({
          chatItems: that.data.chatItems
        });
      }
    })
  },
  voiceStop() {
    var that = this;
    innerAudioContext.onStop(() => {
      // 关闭计时器
      if (minterval != null) {
        voiceAnimation = 0;
        clearInterval(minterval);
        console.log("音频停止de", minterval);
      }
      // 初始化语音图标
      if (that.data.chatItems[oldIndex].types == '0') {
        // 自己
        that.data.chatItems[oldIndex].rightVoice = '../../images/icon_right_3.png'
      } else {
        // 好友
        that.data.chatItems[oldIndex].leftVoice = '../../images/icon_left_3.png'
      }
      that.setData({
        chatItems: that.data.chatItems
      });
      // 停止正在播放的语音，再次播放切换的语音
      // 录音播放地址
      innerAudioContext.src = that.data.chatItems[index].voiceUrl;
      // 启动播放
      innerAudioContext.play();
      // 启动计时器
      minterval = setInterval(function() {
        that.currentTimer(index)
      }, 300);
    })
  },
  voiceError() {
    // 开始监听
    innerAudioContext.onError(() => {
      console.log("音频播放失败");
    })
  },
  voicePlay() {
    // 开始监听
    innerAudioContext.onPlay(() => {
      // 记录老的ID
      oldIndex = index;
      console.log("音频开始播放");
    })
  },
  onUnload() {
    innerAudioContext.destroy();
    index = 0;
    oldIndex = 0;
    voiceAnimation = 0;
    clearInterval(minterval);
    console.log("关闭界面de", minterval);
  }
});