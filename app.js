//var accounts = require('./config').accounts;
var task = require('./controller/task');
var autoCheckIn = require('./controller/autoCheckIn');
var mySQL = require('./controller/mysql');
//var date = require('./common').date;

// 定时执行
task({h: [17], m: [0]}, function () {
  var _Time_ = 1000;
  // sql获取 账号密码
  mySQL.getUserInfo('SELECT * FROM user ORDER BY RAND()', function (res) {
    // 延迟执行
    res.forEach(function (v) {
      setTimeout(function () {
        autoCheckIn(v);
      }, _Time_);
      _Time_ += ( 60000 + Math.round( Math.random()*10000) ) ;//1000等于1秒
    });

  });
  console.log(new Date() + ' 开始签到..');
});

console.log('自动签到服务运行中..');
