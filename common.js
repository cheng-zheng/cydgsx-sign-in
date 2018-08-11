var dates = new Date();  //Object.create(Date);
exports.date = {
  /*
   * 返回年月日
   * @tag:设置分隔符，如果不设置，默认使用"-"
   */
  getYMD : function(tag){
    var tag = (tag === null || tag === undefined || tag === ""?"-":tag);
    tag = new String(tag);
    var ymd =
      dates.getFullYear() + tag +
      dates.getMonth() + tag +
      dates.getDate();
    return ymd;
  },
  /*
   * 返回时分秒
   * @tag:设置分隔符，如果不设置，默认使用":"
   */
  getHMS : function(tag){
    var tag = (tag === null || tag === undefined || tag === ""?":":tag);
    tag = new String(tag);
    var hms =
      dates.getHours() + tag +
      dates.getMinutes() + tag +
      dates.getSeconds();
    return hms;
  },
};
