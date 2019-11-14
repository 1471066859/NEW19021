/*返回顶生产订单进度比例 * 有4个订单，每个订单完成的进度比例约为 33% 向下取整
 后端传递进度字段应为 0 - 100 list.length - 1 / 1 *100 向下取整
 *@scaleNum 方法名
 *@param{ Array }list 订单阶段名数组
 *@return {Number} 返回阶段进度比例
 */

export const scaleNum = list => {
  const scaleNum = 1 / (list.length - 1);
  const intScaleNum = Math.floor(scaleNum * 100)
  return intScaleNum;
};

// 页面刷新初始化导航栏
export const initNavBar = (_this) => {
  const {
    path
  } = _this.$route;
  _this.$store.dispatch("setTabState", path);
};

// 设置订单状态icon标识
export const iconBg = key => {
  // return 'red'
  switch (key.rate) {
    case 0:
      return 'icon-loading-v'
    case 1:
      return 'icon-yichang'
    case 2:
      return 'icon-kaishi'
    case 3:
      return 'icon-wancheng-yuanshijituantubiao'
    default:
      break;
  }
};

// 展示当前时间年月日时分秒
export const getTime = () => {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  let x = date.getDay(); //获取星期
  let time = year + '-' + ++month + '-' + day + ' ' + hour + ':' + "00" + ':' + "00";
  return time;
}

// 判断是否为移动端设备
export const isMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  return flag;
};
// 通过料盒id获取料盒名
export const getBoxId = (boxList, packname) => {
  const packid = boxList.find(item => {
    return item.packname == packname;
  }).packid;
  return packid
}

// 通过物料id获取物料名
export const getStuffName = (stuffList, stuffid) => {
  const stuffname = stuffList.find(item => {
    return item.stuffId == stuffid;
  }).stuffName;
  return stuffname
}

// 通过用户id获取用户名
export const getUserName = (AdminList, userid) => {
  const username = AdminList.find(item => {
    return item.userId == userid;
  }).userName;
  return username
}

// 存取session
export const setSession = (key, data) => {
  sessionStorage.setItem(key, data)
};

// 获取session
export const getSession = key => {
  const data = sessionStorage.getItem(key);
  return data;
};