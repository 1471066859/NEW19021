import echarts from 'echarts'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
// 切换出入库
export function activeName(val) {
  console.log(1);
  // 初始化分页条件
  this.leaveTable.page = 1;
  this.leaveTable.size = 10;
  this.enterTable.page = 1;
  this.enterTable.size = 10;
  if (val == 'leave') {
    // 出库
    const page = this.leaveTable.page;
    const size = this.leaveTable.size;
    const sel = this.leaveSel;
    this.getMaterLeaveList(page, size, sel);
  } else if (val == "enter") {
    // 入库
    const page = this.enterTable.page;
    const size = this.enterTable.size;
    const sel = this.enterSel;
    this.getMaterEnterList(page, size, sel);
  };
};
// 拉取剩余物料信息
export function getStuffList() {
  this.axios.get("/api/webapi/warehouse/getAllStuffAmount?contentid=1")
    .then(res => {
      const iconList = [
        "icon-guazi",
        "icon-huasheng",
        "icon-yumi",
        "icon-dadou"
      ]
      const {
        data
      } = res.data;
      data.forEach((item, index) => {
        item.icon = iconList[index];
      });
      this.stuffList = data;
    })
    .catch(err => console.log(err))
};

//拉取chart数据
export function getCharR() {
  const data = this.qs.stringify({
    startTime: this.leaveSel.time[0],
    endTime: this.leaveSel.time[1]
  })
  this.axios.post('/api/webapi/outInWarehouse/getAmountOutInWarehouseByState', data)
    .then(res => {
      console.log(res);
      const {
        code,
        data
      } = res.data;
      if (code == 200) {
        this.amount = data.outInAmount
        const list = [];
        list.push({
          value: data.outAmount,
          name: "原材料出库",
          itemStyle: {
            color: "#409EFF"
          }
        });
        list.push({
          value: data.inAmount,
          name: "原材料入库",
          itemStyle: {
            color: "#67C23A"
          }
        });
        this.chartList = list;
        this.initChartLeft();
        this.initChartRight();
      }
    })
};
// 绘制图表
export function initChartLeft() {
  this.eChart = echarts.init(this.$refs.myEchartLeft);
  this.eChart.setOption({
    title: {
      text: `${this.titleTime}原材料报表扇形图`,
      // subtext: '纯属虚构',
      subtext: `${this.enterSel.time[0].slice(0, 10)}-${this.enterSel.time[1].slice(0,10)}`,
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      data: ['原材料出库', '原材料入库']
    },
    series: [{
      name: `${this.titleTime}原材料报表占比`,
      type: 'pie',
      radius: '55%',
      center: ['47%', '50%'],
      data: this.chartList,
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
      text: `${this.titleTime}原材料报表柱形图`,
      // subtext: '纯属虚构',
      subtext: `${this.enterSel.time[0].slice(0, 10)}-${this.enterSel.time[1].slice(0,10)}`,
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
      data: ['原材料出库', '原材料入库'],
      axisTick: {
        alignWithLabel: true
      }
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: '原材料报表数',
      type: 'bar',
      barWidth: '60%',
      data: this.chartList
    }]
  })
};

// 提交筛选项
export function PostSerBtnFn() {
  const {
    activeName
  } = this;
  if (activeName == "leave") {
    // 出库查询
    this.leaveTable.page = 1;
    const page = this.leaveTable.page;
    const size = this.leaveTable.size;
    const sel = this.leaveSel;
    this.getMaterLeaveList(page, size, sel);
  }
  if (activeName == "enter") {
    // 入库查询
    this.enterTable.page = 1;
    const page = this.enterTable.page;
    const size = this.enterTable.size;
    const sel = this.enterSel;
    this.getMaterEnterList(page, size, sel);
  }
};
// 清除筛选项
export function clearSerFn() {
  const {
    activeName
  } = this;
  if (activeName == "leave") {
    // 出库清空
    this.leaveSel.stuffid = ""
  } else if (activeName == "enter") {
    // 入库清空
    this.enterSel.stuffid = ""
  }
};

// 拉取物料入库信息
export function getMaterEnterList(page, size, sel) {
  this.tableLoad = true;
  const data = {
    contentType: 1,
    outInType: 1,
    pageNum: page,
    pageSize: size,
    contentId: sel.stuffid,
    startTime: sel.time[0],
    endTime: sel.time[1]
  };
  const parms = {}
  if (data.contentId != "") parms.contentId = data.contentId;
  if (data.startTime != "") parms.startTime = data.startTime;
  if (data.endTime != "") parms.endTime = data.endTime;
  parms.contentType = 1;
  parms.outInType = 1;
  parms.pageNum = page;
  parms.pageSize = size;
  console.log(data, '入库信息');
  this.axios.post('/api/webapi/outInWarehouse/getOutinWarehouseInfo', this.qs.stringify(parms))
    .then(res => {
      console.log(res, '入库数据表格');
      const {
        data
      } = res.data
      this.enterTable.count = res.data.count;
      this.stuffTabList = data;
      this.tableLoad = false;
    })
};
// 拉取物料出库列表
export function getMaterLeaveList(page, size, sel) {
  this.tableLoad = true;
  const data = {
    contentType: 1,
    outInType: 2,
    pageNum: page,
    pageSize: size,
    contentId: sel.stuffid,
    startTime: sel.time[0],
    endTime: sel.time[1]
  };
  console.log(data, 111);
  const parms = {}
  if (data.contentId != "") parms.contentId = data.contentId;
  if (data.startTime != "") parms.startTime = data.startTime;
  if (data.endTime != "") parms.endTime = data.endTime;
  parms.contentType = 1;
  parms.outInType = 2;
  parms.pageNum = page;
  parms.pageSize = size;
  console.log(data);
  this.axios.post('/api/webapi/outInWarehouse/getOutinWarehouseInfo', this.qs.stringify(parms))
    .then(res => {
      console.log(res, '出库信息');
      this.leaveTable.count = res.data.count;
      const {
        data
      } = res.data;
      this.stuffTabList = data;
      this.tableLoad = false;
    })
};
// 出库分页器相关
export function leaveHandleSizeChange(val) {
  this.leaveTable.size = val;
  const page = this.leaveTable.page;
  const size = this.leaveTable.page;
  const sel = this.leaveSel;
  this.getMaterLeaveList(page, size, sel);
};
export function leaveHandleCurrentChange(val) {
  // this.userPage = val;
  this.leaveTable.page = val;
  const page = this.leaveTable.page;
  const size = this.leaveTable.page;
  const sel = this.leaveSel;
  this.getMaterLeaveList(page, size, sel);
  console.log(`当前页: ${val}`);
};

// 入库分页器相关
export function enterHandleSizeChange(val) {
  this.enterTable.size = val;
  console.log(`每页 ${val} 条`);
  const page = this.enterTable.page;
  const size = this.enterTable.size;
  const sel = this.enterSel;
  this.getMaterEnterList(page, size, sel);
};
export function enterHandleCurrentChange(val) {
  this.enterTable.page = val;
  console.log(`当前页: ${val}`);
  const page = this.enterTable.page;
  const size = this.enterTable.size;
  const sel = this.enterSel;
  this.getMaterEnterList(page, size, sel);
};

// 数据导出
export function exportExcel(id) {
  let fileName = "";
  id == "#leave" ? fileName = "出库" : fileName = "入库";
  var xlsxParam = {
    raw: true
  } // 导出的内容只做解析，不进行格式转换
  var wb = XLSX.utils.table_to_book(document.querySelector(id), xlsxParam)
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(new Blob([wbout], {
      type: 'application/octet-stream'
    }), `${this.titleTime}原材料${fileName}报表${this.enterSel.time[0].slice(0, 10)}-${this.enterSel.time[1].slice(0,10)}.xlsx`)
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.log(e, wbout)
    }
  }
  return wbout
};