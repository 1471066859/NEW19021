<template>
  <div class="allOrder materials">
    <PageTitle pageTitle="年原材料报表"></PageTitle>
    <div class="wrap">
      <div class="materWrap" ref="myEchartLeft"></div>
      <div class="item">
        <i class="el-icon-pie-chart"></i>
        <div class="msgWrap">
          <p>年出入库总量</p>
          <h2>
            {{amount}}
            <span>个</span>
          </h2>
        </div>
      </div>
      <div class="materWrap" ref="myEchartRight"></div>
    </div>
    <div class="tabWrap">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="出库" name="leave">
          <!-- 筛选 -->
          <ul class="selWrap">
            <li class="selNameWrap">
              <span>物料名称:</span>
              <el-select v-model="leaveSel.stuffid" placeholder="请选择">
                <el-option
                  v-for="item in stuffList"
                  :key="item.stuffId"
                  :label="item.stuffName"
                  :value="item.stuffId"
                ></el-option>
              </el-select>
            </li>
            <li class="btnsWrap">
              <el-button @click="PostSerBtnFn" type="primary">查询</el-button>
              <el-button @click="clearSerFn">重置</el-button>
            </li>
          </ul>

          <el-table
            id="leave"
            :data="stuffTabList"
            height="350"
            style="width: 100%"
            v-loading="tableLoad"
            :header-cell-style="{'background-color': '#fafafa'}"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="batchId" label="批次"></el-table-column>
            <el-table-column prop="stuff.stuffName" label="物料名称"></el-table-column>
            <el-table-column prop="time" label="出库时间"></el-table-column>
            <el-table-column prop="amount" label="数量(kg)"></el-table-column>
            <el-table-column align="right">
              <template slot="header">
                <el-button icon="el-icon-download" type="success" @click="exportExcel('#leave')">导出</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pageSizeBtn">
            <el-pagination
              background
              @size-change="leaveHandleSizeChange"
              @current-change="leaveHandleCurrentChange"
              :current-page="leaveTable.page"
              :page-size="leaveTable.size"
              :page-sizes="[10, 15, 20, 25]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="leaveTable.count"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="入库" name="enter">
          <ul class="selWrap">
            <li class="selNameWrap">
              <span>物料名称:</span>
              <el-select v-model="enterSel.stuffid" placeholder="请选择">
                <el-option
                  v-for="item in stuffList"
                  :key="item.stuffId"
                  :label="item.stuffName"
                  :value="item.stuffId"
                ></el-option>
              </el-select>
            </li>
            <li class="btnsWrap">
              <el-button @click="PostSerBtnFn" type="primary">查询</el-button>
              <el-button @click="clearSerFn">重置</el-button>
            </li>
          </ul>
          <el-table
            id="enter"
            :data="stuffTabList"
            height="350"
            v-loading="tableLoad"
            style="width: 100%"
            :header-cell-style="{'background-color': '#fafafa'}"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="batchId" label="批次"></el-table-column>
            <el-table-column prop="stuff.stuffName" label="物料名称"></el-table-column>
            <el-table-column prop="time" label="入库时间"></el-table-column>
            <el-table-column prop="amount" label="数量(kg)"></el-table-column>
            <el-table-column prop="userName" label="操作人员"></el-table-column>
            <el-table-column align="right">
              <template slot="header">
                <el-button icon="el-icon-download" type="success" @click="exportExcel('#enter')">导出</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页器 -->
          <div class="pageSizeBtn">
            <el-pagination
              background
              @size-change="enterHandleSizeChange"
              @current-change="enterHandleCurrentChange"
              :current-page="enterTable.Page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="enterTable.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="enterTable.count"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { nowYear } from '@/Tools/time'
import { initNavBar } from '@/Tools/intScaleNum'
import PageTitle from '@/views/PC/components/PageTitle'
import echarts from 'echarts'
import {  activeName, getStuffList, getCharR, initChartRight,
  initChartLeft, PostSerBtnFn, clearSerFn, getMaterEnterList,
  getMaterLeaveList, leaveHandleSizeChange, leaveHandleCurrentChange,
  enterHandleSizeChange, enterHandleCurrentChange, exportExcel} from '@/views/PC/report/components/sTuffcommon'
export default {
  name: 'StuffReportN',
  data() {
    return {
      // 表格数据
      stuffTabList: [],
      eChart: null,
      amount: null,
      eChart1: null,
      chartList: [],
      // tab切换
      activeName: 'leave',
      tableLoad: false,
      // 物料集合
      stuffList: [],
      // 出库筛选
      leaveSel: {
        stuffid: '',
        time: []
      },
      // 入库筛选
      enterSel: {
        stuffid: '',
        time: []
      },
      leaveTable: {
        page: 1,
        size: 10,
        count: null
      },
      // 入库分页
      enterTable: {
        page: 1,
        size: 10,
        count: null
      },
      titleTime: "年"
    }
  },
  components: {
    PageTitle,
  },
  created() {
    this.getTime();
    initNavBar(this)
    this.getCharR();
    this.getStuffList();
    this.getMaterLeaveList(this.leaveTable.page, this.leaveTable.size, this.leaveSel);
  },
  watch: {
    activeName,
  },
  methods: {
    getTime() {
      this.leaveSel.time[0] = nowYear + "-01-01 00:00:00";
      this.leaveSel.time[1] = nowYear + "-12-31 23:59:59";

      this.enterSel.time[0] = nowYear + "-01-01 00:00:00";
      this.enterSel.time[1] = nowYear + "-12-31 23:59:59";
      console.log('年');
    },
    exportExcel,
    getStuffList,
    getCharR,
    initChartLeft,
    initChartRight,
    PostSerBtnFn,
    clearSerFn,
    getMaterEnterList,
    getMaterLeaveList,
    leaveHandleSizeChange,
    leaveHandleCurrentChange,
    enterHandleSizeChange,
    enterHandleCurrentChange
  }
}
</script>

<style lang="scss" scoped>
// @import "/components/common.scss";
@import "@/views/PC/orderAdmin/components/common.scss";
@import "@/views/PC/depot/components/common.scss";
.allOrder {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  z-index: 1010;
  overflow: hidden;
  .btnsWrap {
    position: absolute;
    right: 0;
  }
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
    padding-left: 0;
    box-sizing: border-box;
    width: 400px;
    height: 250px;
    padding-bottom: 0 !important;
    // height: auto;
    margin-top: 0 !important;
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

    // .item {
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    //   width: 180px;
    //   box-sizing: border-box;
    //   border: 1px solid red;
    //   margin-right: 30px;
    //   align-items: center;
    //   h2 {
    //     font-size: 14px;
    //     padding: 3px 0;
    //     width: 90%;
    //     margin: 0 auto;
    //     border-bottom: 1px solid red;
    //     text-align: center;
    //   }
    //   p {
    //     font-size: 30px;
    //     padding: 10px 0;
    //   }
    // }
  }
}
</style>