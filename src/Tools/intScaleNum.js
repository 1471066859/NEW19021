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
}

// 存取session
export const setSession = (key, data) => {
  sessionStorage.setItem(key, data)
};

// 获取session
export const getSession = key => {
  const data = sessionStorage.getItem(key);
  return data;
}