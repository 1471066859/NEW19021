//Author : guanghe
//文件引用方法：<script src="${staticPath}/common/js/dateUtil.js"></script>
/**
 * 获取本周、本季度、本月、上月的开始日期、结束日期
 */
var now = new Date(); //当前日期
var nowDayOfWeek = now.getDay(); //今天本周的第几天
var nowDay = now.getDate(); //当前日
var nowMonth = now.getMonth(); //当前月
export var nowYear = now.getYear(); //当前年
nowYear += (nowYear < 2000) ? 1900 : 0;

//格式化日期：yyyy-MM-dd
export function formatDate(date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();
  if (mymonth < 10) {
    mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
    myweekday = "0" + myweekday;
  }
  return (myyear + "-" + mymonth + "-" + myweekday);
}

//获得某月的天数
function getMonthDays(theYear, theMonth) {
  var monthStartDate = new Date(theYear, theMonth, 1);
  var monthEndDate = new Date(theYear, theMonth + 1, 1);
  var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
  return days;
}

//获得本季度的开始月份
function getQuarterStartMonth(theMonth) {
  if (!theMonth) {
    theMonth = nowMonth;
  }
  var quarterStartMonth = 0;
  if (theMonth < 3) {
    quarterStartMonth = 0;
  }
  if (2 < theMonth && theMonth < 6) {
    quarterStartMonth = 3;
  }
  if (5 < theMonth && theMonth < 9) {
    quarterStartMonth = 6;
  }
  if (theMonth > 8) {
    quarterStartMonth = 9;
  }
  return quarterStartMonth;
}

//获得本周的开始日期
export function ghGetWeekStartDate() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
  return formatDate(weekStartDate);
}
//获得本周的结束日期
export function ghGetWeekEndDate() {
  var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 1);
  return formatDate(weekEndDate);
}

//获得下周的开始日期
function ghGetNextWeekStartDate() {
  var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 7 + 1);
  return formatDate(weekStartDate);
}

//获得本月的开始日期
export function ghGetMonthStartDate() {
  var monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}

//获得本月的结束日期
export function ghGetMonthEndDate() {
  var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowYear, nowMonth));
  return formatDate(monthEndDate);
}

//获得下月开始时间
function ghGetNextMonthStartDate() {
  var theYear = nowYear;
  var theMonth = nowMonth + 1;
  if (theMonth == 12) {
    theYear += 1;
    theMonth = 0;
  }
  var nextMonthStartDate = new Date(theYear, theMonth, 1);
  return formatDate(nextMonthStartDate);
}

//获得本季度的开始日期
export function ghGetQuarterStartDate() {
  var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
  return formatDate(quarterStartDate);
}

//或的本季度的结束日期
export function ghGetQuarterEndDate() {
  var quarterEndMonth = getQuarterStartMonth() + 2;
  var quarterStartDate = new Date(nowYear, quarterEndMonth,
    getMonthDays(nowYear, quarterEndMonth));
  return formatDate(quarterStartDate);
}

function ghGetNextQuarterStartDate() {
  var theYear = nowYear;
  var theQuarterMonth = nowMonth + 3;
  if (theQuarterMonth > 11) {
    theYear += 1;
    theQuarterMonth -= 12;
  }
  var quarterStartDate = new Date(theYear, getQuarterStartMonth(theQuarterMonth), 1);
  return formatDate(quarterStartDate);
}

//设置查询时间
function ghSetDate(areaName, inputName, id) {
  var date = $(areaName).children(inputName);
  var dateStart = date.eq(0);
  var dateEnd = date.eq(1);
  switch (id) {
    case "cur_week":
      dateStart.val(ghGetWeekStartDate());
      dateEnd.val(ghGetNextWeekStartDate());
      break;
    case "cur_month":
      dateStart.val(ghGetMonthStartDate());
      dateEnd.val(ghGetNextMonthStartDate());
      break;
    case "cur_quarter":
      dateStart.val(ghGetQuarterStartDate());
      dateEnd.val(ghGetNextQuarterStartDate());
      break;
  }
}