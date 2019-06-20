Page({
  data:{
    shift:"back",
    flash:"on"
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  /**
   * 切换摄像头
   */
  shiftSetting(res){
   console.log("切换摄像头",res);
   var shift=res.currentTarget.dataset.shift;
   this.setData({
     shift: shift
   });
  },
  /**
   * 闪光灯（开/关）
   */
  offSetting(res){
    console.log("闪光灯（开/关）", res);
    var flash = res.currentTarget.dataset.flash;
    this.setData({
      status:falsh=='on'?'开':'关',
      flash: flash
    });
  },
  error(e) {
    console.log(e.detail)
  }
})