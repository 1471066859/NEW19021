// 下单人匹配手输入结果
export function querySearch(queryString, cb) {
  var restaurants = this.userList;
  var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
  // 调用 callback 返回建议列表的数据
  cb(results);
};

export function createFilter(queryString) {
  return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
};

// 拉取所有订单人姓名
export function getUserList() {
  this.axios.get('api/webapi/user/getAllUserName')
    .then(res => {
      const {
        success,
        code,
        msg
      } = res.data;
      if (success) {
        const {
          data
        } = res.data;
        data.forEach((item, i) => {
          this.userList.push({
            value: item
          });
        });
      } else {
        alert('拉取下单人信息失败')
      }
    })
    .catch(err => console.log(err))
}

// 切换页数
export function handleCurrentChange(val) {
  console.log(`当前页: ${val}`);
  this.page = val;
  const {
    page,
    size,
    selForm
  } = this;
  this.getOrderList(page, size, selForm);
};

// 切换页数
export function handleSizeChange(val) {
  console.log(`每页 ${val} 条`);
  this.size = val;
  const {
    page,
    size,
    selForm
  } = this;
  this.getOrderList(page, size, selForm);
};

// 条件查询
export function postSelFn() {
  this.page = 1;
  this.size = 10;
  const {
    selForm,
    page,
    size
  } = this;
  this.getOrderList(page, size, selForm)
  console.log(page, size, selForm)
};