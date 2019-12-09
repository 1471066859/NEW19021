<template>
  <div class="allOrder">
    <div class="back" @click="desPopOver = false" v-show="desPopOver"></div>
    <div class="drawer" :class="{'desPopOverAct': desPopOver==true}">
      <PopOverWrap ref="PopOverWrap" @closeOrderDes="desPopOver = false" :orderId="orderId"></PopOverWrap>
    </div>
    <PageTitle pageTitle="成品质量管理"></PageTitle>
    <div class="wrap">
      <div class="materWrap" ref="myEchartLeft"></div>
      <div class="item">
        <i class="el-icon-pie-chart"></i>
        <div class="msgWrap">
          <p>年生产总量</p>
          <h2>
            {{amount}}
            <span>个</span>
          </h2>
        </div>
      </div>
      <div class="materWrap" ref="myEchartRight"></div>
    </div>
    <!-- 筛选区域 -->
    <div class="selContent">
      <ul>
        <!-- 下单人筛选 -->
        <li class="selUser">
          <el-autocomplete
            class="inline-input"
            v-model="selForm.userName"
            :fetch-suggestions="querySearch"
            placeholder="请输入下单人姓名"
            :trigger-on-focus="false"
            suffix-icon="el-icon-edit-outline"
          ></el-autocomplete>
        </li>
        <!-- 订单编号 -->
        <li class="selOrderId">
          <el-input
            placeholder="请输入订单编号"
            suffix-icon="el-icon-edit-outline"
            v-model="selForm.orderId"
          ></el-input>
        </li>
        <!-- 订单状态 -->
        <li class="orderState">
          <el-select v-model="selForm.orderState" placeholder="请选择订单状态">
            <el-option
              v-for="item in orderStateList"
              :key="item.stateId"
              :label="item.stateName"
              :value="item.stateId"
            >
              <!-- <span style="float: left; color: #8492a6; font-size: 13px">{{ item.stateId }}</span> -->
              <i style="float: left" class="stateIcon iconfont" :class="iconBg(item.stateId)"></i>
              <span>{{ item.stateName }}</span>
            </el-option>
          </el-select>
        </li>
      </ul>

      <!-- btn区域 -->
      <div class="btns">
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
        <el-table-column prop="startTime" label="下单时间"></el-table-column>
        <el-table-column prop="user.userName" label="下单人"></el-table-column>
        <el-table-column prop="orderState" label="订单状态">
          <template slot-scope="scope">
            <i class="stateIcon iconfont" :class="iconBg(scope.row.orderState)"></i>
            {{scope.row.orderStateName}}
          </template>
        </el-table-column>
        <el-table-column prop="des" label="详情" width="50">
          <template slot-scope="scope">
            <el-button @click="orderDesFn(scope.row.id)" type="text" size="small">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-button icon="el-icon-download" type="success" @click="exportExcel('#enter')">导出</el-button>
          </template>
        </el-table-column>
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
import { nowYear } from '@/Tools/time'
import { iconBg, initNavBar } from '@/Tools/intScaleNum'
import { querySearch, createFilter, getUserList, } from '@/views/PC/orderAdmin/components/common'
import PageTitle from '@/views/PC/components/PageTitle'
import PopOverWrap from "@/views/PC/orderAdmin/components/PopOverWrap"
import {  orderStateList, desPopOver, getCharR,
  getOrderList, orderDesFn, initChartLeft, initChartRight,
  postSelFn, closeSelForm, handleSizeChange, handleCurrentChange, exportExcel
} from '@/views/PC/report/components/proCommon'
export default {
  name: 'OrderQuality',
  data() {
    return {
      amount: null,
      titleTime: "年",
      eChart: null,
      desPopOver: false,
      eChart1: null,
      orderId: null,
      list: [],
      // 筛选
      selForm: {
        userName: "",
        orderId: "",
        orderState: "",
        time: [],
      },
      userList: [],
      count: null,
      page: 1,
      loading: false,
      size: 10,
      allOrderList: [],
      orderStateList,
    }
  },
  components: {
    PageTitle,
    PopOverWrap
  },
  watch: {
    desPopOver,
  },
  created() {
    initNavBar(this)
    this.getTime();
    this.getUserList();
    this.getOrderList(this.page, this.size, this.selForm);
    this.getCharR();
  },
  methods: {
    exportExcel,
    getCharR,
    getOrderList,
    orderDesFn,
    initChartLeft,
    initChartRight,
    postSelFn,
    closeSelForm,
    handleSizeChange,
    handleCurrentChange,
    iconBg(key) {
      return iconBg(key)
    },
    querySearch,
    createFilter,
    getUserList,
    getTime() {
      this.selForm.time[0] = nowYear + "-01-01 00:00:00";
      this.selForm.time[1] = nowYear + "-12-31 23:59:59";
      console.log('年');
    }
  }
}
</script>

<style lang="scss" scoped>
// @import "/components/common.scss";
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