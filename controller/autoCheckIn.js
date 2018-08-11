var request = require('superagent');
//var sendEmail = require('./sendEmail');

var headers = {
  'cache-control': 'private',
  'Content-Type': 'application/json; charset=utf-8',
  Host: 'hzjs.cydgsx.com',
  Origin: 'https://hzjs.cydgsx.com',
  Referer: 'https://hzjs.cydgsx.com/m/s/log/wLog',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.8'
};

var origin = 'https://hzjs.cydgsx.com',
  urls = {
    login: origin + '/m/Home/CheckLoginJson',
    checkIn: origin + '/m/s/Log/SaveWriteLog'
  };
var InternStateId = ["2","3","4"];
var interContent = ["","哈哈哈嗝", "今天俺","记得签到",""];

/**
 * 自动签到
 * @param account {object}
 * @constructor
 */
function AutoCheckIn(account) {
  this.account = account;

  this.cookie = {
    value: null,
    expires: null
  };

  this.init();
}

AutoCheckIn.prototype = {
  constructor: AutoCheckIn,

  init: function () {
    var that = this;

    that.checkIn(function () {
      //sendEmail(that.account.user + '，签到完毕。 ' + new Date());
      console.log('======', '签到完毕，' + that.account.username, '======');
    });
  },

  // 验证登录，如果凭证没过期，无需重新验证
  _verify: function (cb) {
    Date.now() > this.cookie.expires ? this._login(cb) : cb(this.cookie);
  },

  // 登录
  _login: function (cb) {
    var that = this;

    request
      .post(urls.login)
      .set(headers)
      .type('form')
      .send({
        username: that.account.username,
        UserPwd: that.account.UserPwd
      })
      .redirects(0) // 防止页面重定向
      .end(function (err, result) {
        if(result.body.state == 100){
          console.log('登陆成功!');
          var cookie = result.headers['set-cookie'];
          that.cookie = {
            value: cookie,
            //expires: cookie.join().match(/Expires=(.*);/)[1]
            //expires: 100
          };
          cb(that.cookie);
        }else {
          console.log(err);
          console.log(result);
        }

      });
  },

  // 签到
  checkIn: function (cb) {
    var that = this;

    that._verify(function (cookie) {
      request
        .get(urls.checkIn)
        .set(headers)
        .set('Cookie', cookie.value)
        .type('form')
        .send({
          InternStateId:InternStateId[Math.floor(Math.random()*InternStateId.length)],
          interContent:interContent[Math.floor(Math.random()*interContent.length)]
        })
        .end(cb);
    });
  }
};


module.exports = function (account) {
  return new AutoCheckIn(account);
};