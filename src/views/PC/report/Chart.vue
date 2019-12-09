<template>
  <div class="chart">
    <PageTitle pageTitle="报表总览"></PageTitle>
    <div class="chartWrap">
      <div class="item" style="width: 33.333%; height:400px" ref="R"></div>
      <div class="item" style="width: 33.333%; height:400px" ref="Z"></div>
      <div class="item" style="width: 33.333%; height:400px" ref="Y"></div>
      <div class="item" style="width: 33.333%; height:400px" ref="J"></div>
      <div class="item" style="width: 33.333%; height:400px" ref="N"></div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/views/PC/components/PageTitle'
import {  nowYear, formatDate, ghGetWeekStartDate,
  ghGetWeekEndDate, ghGetMonthEndDate, ghGetMonthStartDate,
  ghGetQuarterStartDate, ghGetQuarterEndDate} from '@/Tools/time'
import { initNavBar } from '@/Tools/intScaleNum'
import echarts from 'echarts'
export default {
  name: 'Chart',
  components: {
    PageTitle
  },
  data() {
    return {
      listR: [],
      listZ: [],
      listY: [],
      listJ: [],
      listN: [],
      chartR: null,
      chartZ: null,
      chartY: null,
      chartJ: null,
      chartN: null,
    }
  },
  mounted() {
    // 拉取日报表
    initNavBar(this);
    this.getCharR();
    // 拉取周报表
    this.getCharZ();
    this.getCharY();
    this.getCharJ();
    this.getCharN();

  },
  methods: {
    getCharR() {
      const data = this.qs.stringify({
        startTime: formatDate(new Date) + " 00:00:00",
        endTime: formatDate(new Date) + " 23:59:59"
      })
      this.axios.post('/api/webapi/order/getAmountOrdersByState', data)
        .then(res => {
          console.log(res);
          const { code, data } = res.data;
          if (code == 200) {
            this.listR.push({
              value: data.pendingOrders + data.productionOrders,
              name: "未完成订单",
              itemStyle: { color: "#909399" }
            });
            this.listR.push({
              value: data.completedOrders,
              name: "已完成订单",
              itemStyle: { color: "#409EFF" }
            });
            this.listR.push({
              value: data.wrongOrders,
              name: "异常订单",
              itemStyle: { color: "#F56C6C" }
            });
            this.chartR = echarts.init(this.$refs.R);
            this.chartR.setOption({
              title: {
                text: "日报表",
                subtext: `${formatDate(new Date)}`,
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'right',
                data: ['未完成订单', '已完成订单', '异常订单']
              },
              series: [
                {
                  name: '当前占比',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '50%'],
                  data: this.listR,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            })
          }
        })
        .catch(err => console.log(err))
    },
    getCharZ() {
      const data = this.qs.stringify({
        startTime: ghGetWeekStartDate() + " 00:00:00",
        endTime: ghGetWeekEndDate() + " 23:59:59"
      })
      this.axios.post('/api/webapi/order/getAmountOrdersByState', data)
        .then(res => {
          console.log(res);
          const { code, data } = res.data;
          if (code == 200) {
            this.listZ.push({
              value: data.pendingOrders + data.productionOrders,
              name: "未完成订单",
              itemStyle: { color: "#909399" }
            });
            this.listZ.push({
              value: data.completedOrders,
              name: "已完成订单",
              itemStyle: { color: "#409EFF" }
            });
            this.listZ.push({
              value: data.wrongOrders,
              name: "异常订单",
              itemStyle: { color: "#F56C6C" }
            });
            this.chartZ = echarts.init(this.$refs.Z);
            this.chartZ.setOption({
              title: {
                text: "周报表",
                subtext: `${ghGetWeekStartDate()}-${ghGetWeekEndDate()}`,
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'right',
                data: ['未完成订单', '已完成订单', '异常订单']
              },
              series: [
                {
                  name: '当前占比',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '50%'],
                  data: this.listZ,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            })
          }
        })
        .catch(err => console.log(err))
    },
    getCharY() {
      const data = this.qs.stringify({
        startTime: ghGetMonthStartDate() + " 00:00:00",
        endTime: ghGetMonthEndDate() + " 23:59:59"
      })
      this.axios.post('/api/webapi/order/getAmountOrdersByState', data)
        .then(res => {
          console.log(res);
          const { code, data } = res.data;
          if (code == 200) {
            this.listY.push({
              value: data.pendingOrders + data.productionOrders,
              name: "未完成订单",
              itemStyle: { color: "#909399" }
            });
            this.listY.push({
              value: data.completedOrders,
              name: "已完成订单",
              itemStyle: { color: "#409EFF" }
            });
            this.listY.push({
              value: data.wrongOrders,
              name: "异常订单",
              itemStyle: { color: "#F56C6C" }
            });
            this.chartY = echarts.init(this.$refs.Y);
            this.chartY.setOption({
              title: {
                text: "月报表",
                subtext: `${ghGetMonthStartDate()}-${ghGetMonthEndDate()}`,
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'right',
                data: ['未完成订单', '已完成订单', '异常订单']
              },
              series: [
                {
                  name: '当前占比',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '50%'],
                  data: this.listY,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            })
          }
        })
        .catch(err => console.log(err))
    },
    getCharJ() {
      const data = this.qs.stringify({
        startTime: ghGetQuarterStartDate() + " 00:00:00",
        endTime: ghGetQuarterEndDate() + " 23:59:59"
      })
      this.axios.post('/api/webapi/order/getAmountOrdersByState', data)
        .then(res => {
          console.log(res);
          const { code, data } = res.data;
          if (code == 200) {
            this.listJ.push({
              value: data.pendingOrders + data.productionOrders,
              name: "未完成订单",
              itemStyle: { color: "#909399" }
            });
            this.listJ.push({
              value: data.completedOrders,
              name: "已完成订单",
              itemStyle: { color: "#409EFF" }
            });
            this.listJ.push({
              value: data.wrongOrders,
              name: "异常订单",
              itemStyle: { color: "#F56C6C" }
            });
            this.chartJ = echarts.init(this.$refs.J);
            this.chartJ.setOption({
              title: {
                text: "季报表",
                subtext: `${ghGetQuarterStartDate()}-${ghGetQuarterEndDate()}`,
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'right',
                data: ['未完成订单', '已完成订单', '异常订单']
              },
              series: [
                {
                  name: '当前占比',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '50%'],
                  data: this.listJ,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            })
          }
        })
        .catch(err => console.log(err))
    },
    getCharN() {
      const data = this.qs.stringify({
        startTime: nowYear + "-01-01 00:00:00",
        endTime: nowYear + "-12-31 23:59:59"
      })
      this.axios.post('/api/webapi/order/getAmountOrdersByState', data)
        .then(res => {
          console.log(res);
          const { code, data } = res.data;
          if (code == 200) {
            this.listN.push({
              value: data.pendingOrders + data.productionOrders,
              name: "未完成订单",
              itemStyle: { color: "#909399" }
            });
            this.listN.push({
              value: data.completedOrders,
              name: "已完成订单",
              itemStyle: { color: "#409EFF" }
            });
            this.listN.push({
              value: data.wrongOrders,
              name: "异常订单",
              itemStyle: { color: "#F56C6C" }
            });
            this.chartN = echarts.init(this.$refs.N);
            this.chartN.setOption({
              title: {
                text: "年报表",
                subtext: `${nowYear}-10-01-${nowYear}-12-31`,
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'right',
                data: ['未完成订单', '已完成订单', '异常订单']
              },
              series: [
                {
                  name: '当前占比',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '50%'],
                  data: this.listN,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            })
          }
        })
        .catch(err => console.log(err))
    },
    getTime() {
      this.selForm.time[0] = formatDate(new Date) + " 00:00:00";
      this.selForm.time[1] = formatDate(new Date) + " 23:59:59";
      console.log('日');
      this.selForm.time[0] = ghGetWeekStartDate() + " 00:00:00"
      this.selForm.time[1] = ghGetWeekEndDate() + " 23:59:59"
      console.log('周');
      this.selForm.time[0] = ghGetMonthStartDate() + " 00:00:00"
      this.selForm.time[1] = ghGetMonthEndDate() + " 23:59:59"
      console.log('月');
      this.selForm.time[0] = ghGetQuarterStartDate() + " 00:00:00";
      this.selForm.time[1] = ghGetQuarterEndDate() + " 23:59:59";
      console.log('季度');
      this.selForm.time[0] = nowYear + "-01-01 00:00:00";
      this.selForm.time[1] = nowYear + "-12-31 23:59:59";
      console.log('年');
    },

  }
}
</script>

<style lang="scss" scope>
.chart {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  z-index: 1010;
  overflow: hidden;
  .chartWrap {
    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
}
</style>