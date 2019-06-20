/**
 * 聊天时间
 */
function getTime(time) {
  var $currentDate = new Date();
  // var $createdDate = new Date(time.replace(/-/g, "/")); /*兼容safari的时间判断bug*/
  var $createdDate = new Date(time);
  var hours = $createdDate.getHours() < 10 ? '0' + $createdDate.getHours() : $createdDate.getHours();
  var minutes = $createdDate.getMinutes() < 10 ? '0' + $createdDate.getMinutes() : $createdDate.getMinutes();
  var newTime = $currentDate.getTime();
  var oldTime = $createdDate.getTime();
  var currentYears = $currentDate.getFullYear();
  var intervalTime = getInterval(newTime - oldTime, $createdDate, currentYears, hours + ":" + minutes); /* 获取时间差 */
  return intervalTime;
}
/**
 * 计算时间差
 */
function getInterval(intervalTime, $oldDate, currentYears,time) {
  var $interval;
  var days, years, months, hours, minutes, seconds, leave1, leave2, leave3;
  /*计算出相差天数*/
  days = Math.floor(intervalTime / (24 * 3600 * 1000))
  /*计算出小时数*/
  leave1 = intervalTime % (24 * 3600 * 1000) /*计算天数后剩余的毫秒数*/
  hours = Math.floor(leave1 / (3600 * 1000))
  //计算相差分钟数
  leave2 = leave1 % (3600 * 1000) /*计算小时数后剩余的毫秒数*/
  minutes = Math.floor(leave2 / (60 * 1000))
  //计算相差秒数
  leave3 = leave2 % (60 * 1000) /*计算分钟数后剩余的毫秒数*/
  seconds = Math.round(leave3 / 1000)
  if (days === 0) {
    if (hours === 0) {
      if (minutes === 0) {
        $interval = '刚刚';
      } else {
        $interval = minutes + '分钟前';
      }
    } else {
      $interval = hours + '小时前';
    }
  } else {
    if (days > 1) {
      years = $oldDate.getFullYear();
      months = $oldDate.getMonth() + 1; /* 月份从0月开始 */
      days = $oldDate.getDate()
      if (years === currentYears) {
        $interval = months + '月' + days + '日 ' + time;
      } else {
        $interval = years + '年' + months + '月' + days + '日 ' + time;
      }
    } else {
      $interval ='昨天 ' + time;
    }
  }
  return $interval;
}

/**
 * 时间比较
 */
function GetDateDiff(startTime, endTime, diffType) {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
  startTime = startTime.replace(/\-/g, "/");
  endTime = endTime.replace(/\-/g, "/");

  //将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase();
  var sTime = new Date(startTime); //开始时间
  if (endTime == '') {
    var eTime = new Date(); //结束时间
  } else {
    var eTime = new Date(endTime); //结束时间
  }
  //作为除数的数字
  var divNum = 1;
  switch (diffType) {
    case "second":
      divNum = 1000;
      break;
    case "minute":
      divNum = 1000 * 60;
      break;
    case "hour":
      divNum = 1000 * 3600;
      break;
    case "day":
      divNum = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return parseFloat((eTime.getTime() - sTime.getTime()) / parseFloat(divNum));
}
/**
 * 功能：将浮点数四舍五入，取小数点后2位
 */
function toDecimal(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 100) / 100;
  return f;
}

/**
 * 腾讯经纬度--转--百度经纬度
 */
function Convert_GCJ02_To_BD09(point) {
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = point.lng,
    y = point.lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  point.lng = z * Math.cos(theta) + 0.0065;
  point.lat = z * Math.sin(theta) + 0.006;
  return point;
}

/**
 * 百度经纬度--转--腾讯经纬度
 */
function Convert_BD09_To_GCJ02(point) {
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = point.lng - 0.0065;
  var y = point.lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  point.lng = z * Math.cos(theta);
  point.lat = z * Math.sin(theta);
  return point;
}

/**
 * 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
 */
function Rad(d) {
  return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
}

function GetDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000 * 1000; //输出为米
  return s;
}

/**
 * 函数在一段时间内多次触发只会执行第一次，在这段时间结束前，不管触发多少次也不会执行函数
 */
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null
  return function() {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn()
      _lastTime = _nowTime
    }
  }
}
/**
 * 获取系统动态时间：例如（09:28）
 * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * "yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * "yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * "yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * "yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * "yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 * 参数
 * format：（hh:mm）
 */
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //月份         
    "d+": this.getDate(), //日         
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
    "H+": this.getHours(), //小时         
    "m+": this.getMinutes(), //分         
    "s+": this.getSeconds(), //秒         
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
    "S": this.getMilliseconds() //毫秒         
  };
  var week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(format)) {
    format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return format;
};
/**
 * 判断value值是否为空
 * 参数
 * value:数据值
 */
function isNull(value) {
  if (value !== null && value !== undefined && value !== '') {
    return false;
  } else {
    return true;
  }
}
function isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
/**
 * 判断json格式是否正确
 */
function isJSON(str) {
  if (isObject(str))
    return true;
  if (!isString(str))
    return false;
  // 将对象转换为String
  // str = JSON.stringify(str);
  // if (typeof str == 'string') {
  //   try {
  //     var obj = JSON.parse(str);
  //     if (str.indexOf('{') > -1) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     return false;
  //   }
  // }
  return false;
}
module.exports = {
  isNull: isNull,
  isJSON: isJSON,
  getTime: getTime,
  throttle: throttle,
  toDecimal: toDecimal,
  GetDistance: GetDistance,
  GetDateDiff: GetDateDiff,
  Convert_GCJ02_To_BD09: Convert_GCJ02_To_BD09,
  Convert_BD09_To_GCJ02: Convert_BD09_To_GCJ02
}