Component({
  properties: {
    // 指示器标题集合
    indicatorTextArray: {
      type: Array, 
      value: []  
    },
    // 当前指示器的位置
    currentTab: {
      type: String,
      value: '0'
    },
    // 分割线长度的百分比
    currentLinePercentage:{
      type:Float32Array,
      value:1.0
    }
  },
  methods: {
    // 指示器切换事件
    switchTab(e){
      this.triggerEvent('switchTab', e);
    }
  }
})