import {$wuxPicker} from '../../components/wux'

Page({
  data: {},
  onLoad() { },
  onTapPhone() {
    $wuxPicker.init('phone', {
      title: "请选择您的手机",
      cols: [
        {
          textAlign: 'center',
          values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus']
        }
      ],
      value: [0],
      onChange(p) {
        console.log(p)
        this.setData({
          phone: p.value
        })
      },
    })
  }
})