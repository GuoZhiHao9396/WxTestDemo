/**
 * 验证码工具类
 */
module.exports = class Mcaptcha {
  constructor(options) {
    this.options = options;
    this.fontSize = options.height * 3 / 8;
    this.offsetTop = options.height * 0.5;
    this.ctx = wx.createCanvasContext(this.options.el);
    this.refresh(this.options.code);
  }
  refresh(code) {
    this.options.code = code + '';
    this.ctx.clearRect(0, 0, this.options.width, this.options.height);
    this.ctx.setTextBaseline("middle");
    this.ctx.setFillStyle(this.randomColor(180, 240));
    this.ctx.fillRect(0, 0, this.options.width, this.options.height);
    let arr = this.options.code.split('');
    if (arr.length === 0) {
      arr = ['e', 'r', 'r', 'o', 'r'];
    };
    let offsetLeft = this.options.width * 0.6 / (arr.length - 1);
    let marginLeft = this.options.width * 0.2;
    arr.forEach((item, index) => {
      this.ctx.setFillStyle(this.randomColor(0, 180));
      let size = this.randomNum(24, this.fontSize);
      this.ctx.setFontSize(size);
      let dis = offsetLeft * index + marginLeft - size * 0.3;
      let deg = this.randomNum(-30, 30);
      this.ctx.translate(dis, this.offsetTop);
      this.ctx.rotate(deg * Math.PI / 180);
      this.ctx.fillText(item, 0, 0);
      this.ctx.rotate(-deg * Math.PI / 180);
      this.ctx.translate(-dis, -this.offsetTop);
    })
    this.ctx.draw();
  }
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  randomColor(min, max) {
    let r = this.randomNum(min, max);
    let g = this.randomNum(min, max);
    let b = this.randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  getrandom() {
    var arr = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var index1 = Math.floor((Math.random() * arr.length));
    var index2 = Math.floor((Math.random() * arr.length));
    var index3 = Math.floor((Math.random() * arr.length));
    var index4 = Math.floor((Math.random() * arr.length));
    return arr[index1] + arr[index2] + arr[index3] + arr[index4];
  }
}