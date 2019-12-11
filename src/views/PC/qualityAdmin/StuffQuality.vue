<template>
  <div class="allOrder">
    <PageTitle pageTitle="原材料质量管理"></PageTitle>
    <div class="wrap">
      <div class="materWrap" ref="myEchartLeft"></div>
      <div class="item">
        <i class="el-icon-pie-chart"></i>
        <div class="msgWrap">
          <p>物料总量</p>
          <h2>
            {{amount}}
            <span>kg</span>
          </h2>
        </div>
      </div>
      <div class="materWrap" ref="myEchartRight"></div>
    </div>
    <!-- 筛选区域 -->
    <div class="selContent">
      <ul>
        <li class="selTime">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </li>
      </ul>

      <!-- btn区域 -->
      <div class="btns" style>
        <el-button type="primary" @click="postSelFn">查询</el-button>
        <el-button @click="closeSelForm">清空</el-button>
      </div>
    </div>

    <!-- 数据展示区域 -->
    <div class="dataContent">
      <el-table
        :data="allOrderList"
        :header-cell-style="{'background-color': '#fafafa'}"
        v-loading="loading"
        height="460"
        border
        id="tableData"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="stuffName" label="物料名称"></el-table-column>
        <el-table-column prop="sectionTotalAmount" label="物料总量"></el-table-column>
        <el-table-column prop="sectionErrorAmount" label="正常数量"></el-table-column>
        <el-table-column prop="errorPortion" label="正常比例"></el-table-column>
        <el-table-column prop="sectionNormalAmount" label="异常数量"></el-table-column>
        <el-table-column prop="normalPortion" label="异常比例"></el-table-column>
        <!-- <el-table-column prop="bz" label="备注"></el-table-column> -->
        <!-- <el-table-column prop="bz" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editNote(scope.row.id,scope.row.orderId)"
              type="text"
              size="small"
            >修改备注</el-button>
          </template>
        </el-table-column>-->
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <div class="selPageWrap">
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>-->
  </div>
</template>

<script>
import echarts from 'echarts'
import { initNavBar, getSession } from '@/Tools/intScaleNum'
import PageTitle from '@/views/PC/components/PageTitle'

export default {
  name: 'StuffQuality',
  data() {
    return {
      amount: null,
      eChart: null,
      eChart1: null,
      leftList: [],
      rightList: {
        X: [],
        YSuccess: [],
        YError: []
      },
      count: null,
      page: 1,
      size: 10,
      loading: false,
      allOrderList: [],
      time: [
      ],
    }
  },
  components: {
    PageTitle,
  },

  created() {
    initNavBar(this)
    this.getOrderList(this.page, this.size, this.time);
    this.getChartData();
  },
  methods: {
    // editNote(id, orderId) {
    //   // console.log(id);
    //   this.$prompt('请输入备注信息', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //   }).then(({ value }) => {
    //     const parms = {
    //       id,
    //       note: value,
    //     }
    //     this.axios.post('api/webapi/order/updateOrderNote', this.qs.stringify(parms))
    //       .then(res => {
    //         this.getOrderList();
    //         this.$notify({
    //           title: "操作成功",
    //           type: 'success',
    //           message: `成品${orderId}修改备注成功`
    //         });
    //       })
    //   }).catch(() => {
    //     this.$notify({
    //       type: 'info',
    //       message: '操作取消'
    //     });
    //   });
    // },
    getTime() {
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
      return year + '-' + ++month + '-' + day + ' ' + "23" + ':' + "59" + ':' + "59";
    },
    getChartData() {
      let startTime = "";
      let endTime = "";
      if (this.time.length <= 0) {
        startTime = "1111-11-11 11:11:11"
        endTime = this.getTime()
      } else {
        startTime = this.time[0]
        endTime = this.time[1]
      }
      const parms = {
        startTime,
        endTime,
        contentType: 1,
      };
      console.log(parms);
      this.axios.post('/api/webapi/qulity/getAmountByTime', this.qs.stringify(parms))
        .then(res => {
          console.log(res);
          const { data, code } = res.data;
          if (code == 200) {
            console.log(data);
            this.amount = data.QulityRes.sectionTotalAmount;
            this.leftList[0] = {
              name: '质量异常',
              value: data.QulityRes.sectionErrorAmount
            };
            this.leftList[1] = {
              name: '质量正常',
              value: data.QulityRes.sectionNormalAmount
            };
            data.Qulity.forEach((item, i) => {
              this.rightList.YSuccess[i] = item.normalAmount;
              this.rightList.YError[i] = item.errorAmount;
              this.rightList.X[i] = item.time.slice(0, 10);
            });
            this.$nextTick(() => {
              this.initChartLeft();
              this.initChartRight();
            })
          }
        })
    },
    getOrderList() {
      this.loading = true;
      let startTime = "";
      let endTime = "";
      if (this.time.length <= 0) {
        startTime = "1111-11-11 11:11:11"
        endTime = this.getTime()
      } else {
        startTime = this.time[0]
        endTime = this.time[1]
      }
      const parms = {
        startTime,
        endTime
      }
      this.axios.post('/api/webapi/qulity/getAmountAndProportionByTime', this.qs.stringify(parms))
        .then(res => {
          const { code, data } = res.data;
          if (code == 200) {
            data.forEach(element => {
              switch (element.contentId) {
                case 1:
                  element.stuffName = '物料一'
                  break;
                case 2:
                  element.stuffName = '物料二'
                  break;
                case 3:
                  element.stuffName = '物料三'
                  break;
                case 4:
                  element.stuffName = '物料四'
                  break;
                default:
                  break;
              }
            });
            data.pop();
            this.allOrderList = data;
            this.loading = false;
          }
        })

    },
    initChartLeft() {
      let subtext = ""
      if (this.time.length > 0) {
        subtext = `${this.time[0].slice(0, 10)}-${this.time[1].slice(0, 10)}`
      } else {
        subtext = ""
      }
      this.eChart = echarts.init(this.$refs.myEchartLeft);
      this.eChart.setOption({
        title: {
          text: `原材料质量比例分布`,
          subtext,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['质量异常', '质量正常'],
        },
        series: [{
          name: `质量数量,单位kg`,
          type: 'pie',
          radius: '55%',
          center: ['47%', '50%'],
          data: this.leftList,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      })
    },
    initChartRight() {
      let subtext = ""
      if (this.time.length > 0) {
        subtext = `${this.time[0].slice(0, 10)}-${this.time[1].slice(0, 10)}`
      } else {
        subtext = ""
      }
      this.eChart = echarts.init(this.$refs.myEchartRight);
      this.eChart.setOption({
        title: {
          text: '原材料质量变化趋势',
          x: 'center',
          subtext,
        },
        dataZoom: [{
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          left: '9%',
          bottom: -5,
          start: 0,
          end: 50 //初始化滚动条
        }],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['质量异常', '质量正常']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.rightList.X
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} kg'
          }
        },
        series: [
          {
            name: '质量异常',
            type: 'line',
            data: this.rightList.YError,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '质量正常',
            type: 'line',
            data: this.rightList.YSuccess,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },

        ]
      })
    },
    postSelFn() {
      this.getChartData();
    },
    closeSelForm() {
      this.time = [];
    },
    handleSizeChange(size) {
      this.size = size;
    },
    handleCurrentChange(page) {
      this.page = page;
    },

  }
}
</script>

<style lang="scss" scoped>
@import "@/views/PC/orderAdmin/components/common.scss";
.allOrder {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  z-index: 1010;
  overflow: hidden;
  .wrap {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    padding-left: 80px;
    padding-right: 150px;
    .item:hover {
      transform: translateY(-10px);
      box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
    }
    .item {
      box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
      display: flex;
      justify-content: space-between;
      width: 220px;
      box-sizing: border-box;
      // padding: 20px 20px;
      height: 80px;
      padding: 12px 20px;
      margin-right: 20px;
      align-items: center;
      // border: 1px solid red;
      background: #16a2fb;
      border-radius: 4px;
      i {
        font-size: 50px;
        color: #fff;
      }
      .msgWrap {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          // font-size: 20px;
          font-weight: 700;
          text-align: center;
          // color: rgba(0, 0, 0, 0.45);
          color: #fff;
          font-size: 16px;
        }
        h2 {
          font-size: 20px;
          color: #fff;
          text-align: center;
          font-weight: 700;
          span {
            display: inline-block;
            padding-left: 3px;
            font-weight: 400;
          }
        }
      }
    }
  }
  .materWrap {
    box-sizing: border-box;
    // width: 25%;
    width: 400px;
    height: 250px;
    .addMater {
      cursor: pointer;
      .addWrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      p {
        text-align: center;
        width: 100%;
        font-size: 23px !important;
        color: #fff;
      }
    }
  }
}
</style>