var mysql  = require('mysql');
var config  = require('../config');

exports.getUserInfo = function (sql,fun) {
  var accounts = [];
  var connection = mysql.createConnection(config.mysql);

  connection.connect();

//查
  connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }

    result.forEach(function (item, index) {
      accounts.push({
        username: item.user_name,
        UserPwd: item.user_pwd,
      })
    });
    return fun(accounts);
  });
  connection.end();
}

/*
module.exports = function (sql) {
  return new getUserInfo(sql);
};*/
