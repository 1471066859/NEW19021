<template>
  <div class="allOrder">
    <!-- 订单详情弹窗 -->
    <!-- <el-drawer
      :visible.sync="desPopOver"
      :modal-append-to-body="false"
      direction="ltr"
      custom-class="custom-classDemon"
    >
      <PopOverWrap :orderId="orderId"></PopOverWrap>
    </el-drawer>-->
    <div class="back" @click="desPopOver = false" v-show="desPopOver"></div>
    <div class="drawer" :class="{'desPopOverAct': desPopOver==true}">
      <PopOverWrap ref="PopOverWrap" @closeOrderDes="desPopOver = false" :orderId="orderId"></PopOverWrap>
    </div>

    <PageTitle pageTitle="全部订单"></PageTitle>
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
        <!-- 下单时间 -->
        <li class="selTime">
          <el-date-picker
            v-model="selForm.time"
            type="datetimerange"
            range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
        height="620"
        border
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
import { iconBg, initNavBar } from '@/Tools/intScaleNum'
import { querySearch, createFilter, getUserList, handleCurrentChange, handleSizeChange, postSelFn } from './components/common'
import qs from "qs"
import PageTitle from '@/views/PC/components/PageTitle'
import PopOverWrap from "./components/PopOverWrap"
import { createSocket } from 'dgram'
export default {
  name: "AllOrder",
  components: {
    PageTitle,
    PopOverWrap
  },
  data() {
    return {
      // 详情弹窗
      desPopOver: false,
      loading: false,
      // 订单详情数据
      orderId: "",
      // 筛选表单
      selForm: {
        orderId: "",
        time: "",
        orderState: "",
        userName: ""
      },
      userList: [

      ],
      orderStateList: [
      ],
      count: 100,
      page: 1,
      size: 10,
      allOrderList: []
    }
  },
  computed: {
  },
  created() {
    initNavBar(this)
    this.getOrderList(this.page, this.size, this.selForm);
    this.getOrderStateList();
    this.getUserList()
  },
  watch: {
    desPopOver(val) {
      if (!val) {
        this.$refs.PopOverWrap.clearTimer();
      }
    }
  },
  methods: {
    querySearch,
    createFilter,
    closeSelForm() {
      this.selForm = {
        orderId: "",
        time: "",
        orderState: "",
        userName: ""
      }
    },
    // 拉取订单信息
    getOrderList(page, size, sels) {
      this.loading = true;
      const data = qs.stringify({
        typeId: sels.orderState,
        pageNum: page,
        pageSize: size,
        userName: sels.userName,
        orderId: sels.orderId,
        startTime: sels.time[0],
        endTime: sels.time[1]
      });
      console.log(data);
      // this.axios.get('http://localhost:3005/allOrderList?_start=0&_end=10')
      this.axios.post('api/webapi/order/getAllOrdersByTypeId', data)
        .then(res => {
          console.log(res);
          const { data, code, count, msg } = res.data;
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
    },
    // 拉取订单状态
    getOrderStateList() {
      this.axios.get('http://localhost:3005/orderStateList')
        .then(res => {
          const { data } = res;
          this.orderStateList = data;
        })
    },
    // 拉取下单人
    getUserList,
    // getUserList() {
    //   // http://localhost:3005/userList 
    //   this.axios.get('api/webapi/user/getAllUserName')
    //     .then(res => {
    //       const { success, code, msg } = res.data;
    //       if (code == 200) {
    //         const { data } = res.data;
    //         data.forEach((item, i) => {
    //           this.userList.push({
    //             value: item
    //           });
    //         });
    //       } else {
    //         alert('拉取下单人信息失败')
    //       }
    //     })
    //     .catch(err => console.log(err))
    // },
    // 订单图标
    iconBg(key) {
      return iconBg(key)
    },
    // 订单详情
    orderDesFn(id) {
      let orderInfo = this.allOrderList.find((item) => {
        return item.id == id;
      });
      this.orderId = id;
      this.desPopOver = true;
      this.$refs.PopOverWrap.getOrderDes(id, orderInfo);
    },
    handleCurrentChange,
    handleSizeChange,
    postSelFn
    // 筛选查询
    // postSelFn() {
    //   this.page = 1;
    //   this.size = 10;
    //   const { selForm, page, size } = this;
    //   this.getOrderList(page, size, selForm)
    // },
    // // 分页器相关
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    //   this.size = val;
    //   const { page, size, selForm } = this;
    //   this.getOrderList(page, size, selForm);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    //   this.page = val;
    //   const { page, size, selForm } = this;
    //   this.getOrderList(page, size, selForm);
    // },
  },
}
</script>

<style lang="scss" scope>
@import "./components/common.scss";
.allOrder {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  z-index: 1010;
  overflow: hidden;
}
</style>