var WxEmoji = require('../WxEmojiView/WxEmojiView.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    WxEmoji.init(":_/", {
      "00": "00.gif",
      "01": "01.gif",
      "02": "02.gif",
      "03": "03.gif",
      "04": "04.gif",
      "05": "05.gif",
      "06": "06.gif",
      "07": "07.gif",
      "08": "08.gif",
      "09": "09.gif",
      "09": "09.gif",
      "10": "10.gif",
      "11": "11.gif",
      "12": "12.gif",
      "13": "13.gif",
      "14": "14.gif",
      "15": "15.gif",
      "16": "16.gif",
      "17": "17.gif",
      "18": "18.gif",
      "19": "19.gif",
      "20": "20.gif",
    });
    var list=WxEmoji.bindThis(this);
    console.log("表情集合",list);
  },
  /**
   * 输入框
   */
  emojiInput(res){
    this.data.text=res.detail.value;
  },
  /**
   * 点击表情
   */
  wxPreEmojiTap(res) {
    console.log("a",res);
    var text = this.data.text + res.currentTarget.dataset.text;
    console.log(text);
    this.setData({ text: text});
  },
  /**
   * 发送
   */
  send(){
    var emojiObjs=WxEmoji.transEmojiStr(this.data.text);
    console.log("集合",emojiObjs);
    this.setData({emojiObjs:emojiObjs});
  }
})