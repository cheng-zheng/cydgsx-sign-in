var request = require('superagent');
var date = require('../common').date;

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
var interContent = ["忙成狗","哈哈哈嗝", "睡觉吧 狗命要紧","记得签到","哼！","今天又学到了东西","啦啦啦","不知所措","一脸懵逼.jpg","感到鸭梨","扎心了 老铁","顿墙角。jpg","量子学","学无止境","勤学苦练","相信谎言的人必将在真理之前毁灭。","成者为王败者为寇","往往有这样的情形：为科学和技术开拓新道路的，有时并不是科学界的著名人物，而是科学界毫不知名的人物，平凡的人物，实践家，工作革新者","较高级复杂的劳动，是这样一种劳动力的表现，这种劳动力比较普通的劳动力需要较高的教育费用，它的生产需要花费较多的劳动时间。因此，具有较高的价值。","什么都无法舍弃的人，就什么都无法改变。","人生贵知心，定交无暮早。","先付报酬的工作是肯定干不好的。","有所作为是生活的最高境界。","道德衰亡，诚亡国灭种之根基。","一花一世界","强者是孤独的","真相不止一个，有多少人见证过就有多少真相，如果不相信历史的话，就亲眼看世界吧。","往往有这样的情形：为科学和技术开拓新道路的，有时并不是科学界的著名人物，而是科学界毫不知名的人物，平凡的人物，实践家，工作革新者。","唧唧复唧唧，木兰开飞唧，开的什么唧，波音74唧","生活有度，人生添寿。", "量子力学（Quantum Mechanics）是研究物质世界微观粒子运动规律的物理学分支，主要研究原子、分子、凝聚态物质，以及原子核和基本粒子的结构、性质的基础理论它与相对论一起构成现代物理学的理论基础。量子力学不仅是现代物理学的基础理论之一，而且在化学等学科和许多近代技术中得到广泛应用。","粒子束武器","高等数学 离散数学", "系统运行、自动控制、电力电子技术、信息处理", "模拟电子技术、数字电子技术、过程工程基础", "电力电子技术、自动控制理论、现代控制理论、", "半导体变流技术、微机原理与接口技术、单片机原理与应用、", "信号与系统分析、过程检测及仪表、运筹学、", "计算机仿真、计算机网络、过程控制、运动控制、", "系统辨识基础、计算机控制系统、", "系统工程导论、复变函数与积分变换、自动化概论、", "嵌入式系统原理与设计。", "并行工程（CE）、敏捷制造（AM）", "数控技术于模块化、网络化、多媒体和智能化"];

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
      console.log(' 签到完毕:' + that.account.username);
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
          console.log(that.account.username);
          console.log(result.body);
          return;
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
          InternStateId:that._writeInterState(),
          interContent:that._writeInterContent()
        })
        .end(cb);
    });
  },
  // 写内容
  _writeInterState:function () {
    //数据库 为1 就自定义签到内容
    if(this.account.isContent == 1){
      var IC = this.account.content.InternState;
      return IC[Math.floor(Math.random()*IC.length)]
    }
    return InternStateId[Math.floor(Math.random()*InternStateId.length)]
  },
  // 写内容
  _writeInterContent:function () {
    //数据库 为1 就自定义签到内容
    if(this.account.isContent == 1){
      var IC = this.account.content.InterContent;
      return IC[Math.floor(Math.random()*IC.length)]
    }
    return interContent[Math.floor(Math.random()*interContent.length)]
  }
};


module.exports = function (account) {
  return new AutoCheckIn(account);
};