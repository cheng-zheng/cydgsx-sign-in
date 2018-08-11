//var accounts = require('./config').accounts;
var task = require('./controller/task');
var autoCheckIn = require('./controller/autoCheckIn');
var mySQL = require('./controller/mysql');
var date = require('./common').date;
var _Time_ = 1000;
// 定时执行
task({h: [17], m: [0]}, function () {
  // sql获取 账号密码
  mySQL.getUserInfo('select * from user', function (res) {
    var $accounts = res
    // 打乱
    $accounts.sort(function () {
      return (0.5 - Math.random());
    });
    // 延迟执行
    $accounts.forEach(function (v) {
      setTimeout(function () {
        autoCheckIn(v);
      }, _Time_);
      _Time_ += 60000;//1000等于1秒
    });

  });

});
// 定时执行
/*task({h: [17], m: [03]}, function () {

  $accounts.forEach(function (v) {
    setTimeout(function () {
      autoCheckIn(v);
    },_Time_);
    _Time_ += 1000;
    ;
  });
});*/

console.log(date.getYMD() + ' 自动签到服务运行中..');
