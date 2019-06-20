// pages/date/date.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    datePickerValue: ['', '', ''],
    datePickerIsShow: false
  },

  showDatePicker: function (e) {
    console.log("show", e);
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
    });
  },

  datePickerOnSureClick: function (e) {
    console.log('datePickerOnSureClick');
    console.log("前端确认后的日期数据", e);
    this.setData({
      date: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日${e.detail.value[3]}时${e.detail.value[4]}分`,
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

  datePickerOnCancelClick: function (event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },


})