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
        height="400"
        border
        id="tableData"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="orderId" label="订单编号"></el-table-column>
        <el-table-column prop="stuffName" label="物料名称"></el-table-column>
        <el-table-column prop="des" label="质量问题描述"></el-table-column>
        <el-table-column prop="userName" label="操作人"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="bz" label="备注"></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="selPageWrap">
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
    </div>
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
        "2012-12-30 20:33:45",
        "2012-12-30 20:33:45",
      ],
    }
  },
  components: {
    PageTitle,
  },

  created() {
    const data = {
      loginId: getSession('loginId')
    };
    this.axios.post('/api/webapi/user/logout', this.qs.stringify(data))
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    initNavBar(this)
    this.getOrderList(this.page, this.size, this.time);
  },
  methods: {
    getOrderList() {
      const data = {
        amount: 1123,
        err: 12,
        success: 51,
        list: [
          {
            time: "2011-12-20 20:35:48",
            err: 4,
            success: 1
          },
          {
            time: "2011-12-21 20:35:48",
            err: 7,
            success: 3
          },
          {
            time: "2011-12-22 20:35:48",
            err: 6,
            success: 3
          },
          {
            time: "2011-12-23 20:35:48",
            err: 1,
            success: 5
          },
          {
            time: "2011-12-24 20:35:48",
            err: 3,
            success: 3
          },
          {
            time: "2011-12-25 20:35:48",
            err: 1,
            success: 3
          },
        ],
        tableList: [
          {
            orderId: 1123,  // 订单编号
            stuffName: '物料1',  // 物料名（原材料质量管理字段）
            des: '问题描述', // 质量问题描述
            userName: '张三', // 操作人
            time: '2012-12-30 12:30:44', // 时间
            bz: '备注' // 备注
          },
          {
            orderId: 1123,  // 订单编号
            stuffName: '物料1',  // 物料名（原材料质量管理字段）
            des: '问题描述', // 质量问题描述
            userName: '张三', // 操作人
            time: '2012-12-30 12:30:44', // 时间
            bz: '备注' // 备注
          },
          {
            orderId: 1123,  // 订单编号
            stuffName: '物料1',  // 物料名（原材料质量管理字段）
            des: '问题描述', // 质量问题描述
            userName: '张三', // 操作人
            time: '2012-12-30 12:30:44', // 时间
            bz: '备注' // 备注
          },
          {
            orderId: 1123,  // 订单编号
            stuffName: '物料1',  // 物料名（原材料质量管理字段）
            des: '问题描述', // 质量问题描述
            userName: '张三', // 操作人
            time: '2012-12-30 12:30:44', // 时间
            bz: '备注' // 备注
          },
        ]
      };
      data.list.forEach(item => {
        this.rightList.YSuccess.push(item.success);
        this.rightList.YError.push(item.err);
        this.rightList.X.push(item.time.slice(0, 10));
      });
      this.amount = data.amount;
      this.leftList.push({
        name: '质量异常',
        value: data.err
      });
      this.leftList.push({
        name: '质量正常',
        value: data.success
      });
      this.allOrderList = data.tableList;
      this.$nextTick(() => {
        this.initChartLeft();
        this.initChartRight();
      })

    },
    initChartLeft() {
      this.eChart = echarts.init(this.$refs.myEchartLeft);
      this.eChart.setOption({
        title: {
          text: `原材料质量比例分布`,
          subtext: `${this.time[0].slice(0, 10)}-${this.time[1].slice(0, 10)}`,
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
      this.eChart = echarts.init(this.$refs.myEchartRight);
      this.eChart.setOption({
        title: {
          text: '原材料质量变化趋势',
          x: 'center',
          subtext: `${this.time[0].slice(0, 10)}-${this.time[1].slice(0, 10)}`,
        },

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

    },
    closeSelForm() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

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