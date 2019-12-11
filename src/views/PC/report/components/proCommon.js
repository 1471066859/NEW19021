import echarts from 'echarts'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
// 订单状态列表
export const orderStateList = [{
    "stateId": 1,
    "stateName": "待生产订单"
  },
  {
    "stateId": 2,
    "stateName": "正在生产订单"
  },
  {
    "stateId": 3,
    "stateName": "已完成订单"
  },
  {
    "stateId": 4,
    "stateName": "异常订单"
  }
];
// 监听数据详情弹窗清除计时器
export function desPopOver(val) {
  if (!val) {
    this.$refs.PopOverWrap.clearTimer();
  }
}
// 拉取chart数据
export function getCharR() {
  const data = this.qs.stringify({
    startTime: this.selForm.time[0],
    endTime: this.selForm.time[1],
  })
  this.axios.post('/api/webapi/order/getAmountOrdersByState', data)
    .then(res => {
      const {
        code,
        data
      } = res.data;
      if (code == 200) {
        this.amount = data.allOrders
        const list = [];
        list.push({
          value: data.pendingOrders + data.productionOrders,
          name: "未完成订单",
          itemStyle: {
            color: "#909399"
          }
        });
        list.push({
          value: data.completedOrders,
          name: "已完成订单",
          itemStyle: {
            color: "#409EFF"
          }
        });
        list.push({
          value: data.wrongOrders,
          name: "异常订单",
          itemStyle: {
            color: "#F56C6C"
          }
        });
        list.forEach(element => {
          this.list.push(element);
        });
        this.initChartLeft();
        this.initChartRight();
      }
    })
};

// 拉取数表格数据
export function getOrderList(page, size, sels) {
  console.log(sels.time[0]);
  console.log(sels.time[1]);
  this.loading = true;
  const data = this.qs.stringify({
    orderState: sels.orderState,
    pageNum: page,
    pageSize: size,
    userName: sels.userName,
    orderId: sels.orderId,
    startTime: sels.time[0],
    endTime: sels.time[1]
  });
  this.axios.post('/api/webapi/order/getAllOrdersByCondition', data)
    .then(res => {
      console.log(res);
      const {
        data,
        code,
        count,
        msg
      } = res.data;
      if (code == 200) {
        this.count = count;
        data.forEach(element => {
          switch (element.orderState) {
            case 1:
              element.orderStateName = "待生产"
              break;
            case 2:
              element.orderStateName = "正在生产"
              break;
            case 3:
              element.orderStateName = "已完成"
              break;
            case 4:
              element.orderStateName = "异常"
              break;
            default:
              break;
          }
        });
        this.allOrderList = data;
        this.loading = false;
      } else {
        alert('数据拉取失败');
        console.log(res);
      }
    })
    .catch(err => console.log(err));
};

// 订单详情
export function orderDesFn(id) {
  let orderInfo = this.allOrderList.find((item) => {
    return item.id == id;
  });
  this.orderId = id;
  this.desPopOver = true;
  this.$refs.PopOverWrap.getOrderDes(id, orderInfo);
};

// 绘制图表
export function initChartLeft() {
  this.eChart = echarts.init(this.$refs.myEchartLeft);
  this.eChart.setOption({
    title: {
      text: `${this.titleTime}报表扇形图`,
      subtext: `${this.selForm.time[0].slice(0, 10)}-${this.selForm.time[1].slice(0, 10)}`,
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      data: ['未完成订单', '已完成订单', '异常订单'],
    },
    series: [{
      name: `${this.titleTime}报表数`,
      type: 'pie',
      radius: '55%',
      center: ['47%', '50%'],
      data: this.list,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  })
};
export function initChartRight() {
  this.eChart1 = echarts.init(this.$refs.myEchartRight);
  this.eChart1.setOption({
    title: {
      text: `${this.titleTime}报表扇形图`,
      subtext: `${this.selForm.time[0].slice(0, 10)}-${this.selForm.time[1].slice(0, 10)}`,
      x: 'center'
    },
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['未完成订单', '已完成订单', '异常订单'],
      axisTick: {
        alignWithLabel: true
      }
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: `${this.titleTime}报表数`,
      type: 'bar',
      barWidth: '60%',
      data: this.list
    }]
  })
};
// 筛选查询
export function postSelFn() {
  this.getOrderList(this.page, this.size, this.selForm);
};
// 清空筛选
export function closeSelForm() {
  this.selForm.userName = "";
  this.selForm.orderId = "";
  this.selForm.orderState = "";
};
// 切换条数
export function handleSizeChange(size) {
  this.size = size;
  this.getOrderList(this.page, this.size, this.selForm)
};
// 切换页数
export function handleCurrentChange(page) {
  this.page = page;
  this.getOrderList(this.page, this.size, this.selForm)
};

// 数据导出
export function exportExcel() {
  var xlsxParam = {
    raw: true
  } // 导出的内容只做解析，不进行格式转换
  var wb = XLSX.utils.table_to_book(document.querySelector('#tableData'), xlsxParam)
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(new Blob([wbout], {
      type: 'application/octet-stream'
    }), `${this.titleTime}生产报表${this.selForm.time[0].slice(0, 10)}-${this.selForm.time[1].slice(0, 10)}.xlsx`)
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.log(e, wbout)
    }
  }
  return wbout
};