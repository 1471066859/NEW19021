<template>
  <div class="carryOrder">
    <PageTitle pageTitle="完成生产订单"></PageTitle>
    <!-- 订单详情弹窗 -->
    <el-drawer :visible.sync="desPopOver" size="32%" direction="btt">
      <PopOverWrap :orderId="orderId"></PopOverWrap>
    </el-drawer>
    <!-- 筛选区域 -->
    <div class="selContent">
      <ul>
        <!-- 下单人筛选 -->
        <li class="selUser">
          <el-select v-model="selForm.userId" placeholder="请选择下单人">
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            ></el-option>
          </el-select>
        </li>
        <!-- 订单编号 -->
        <li class="selOrderId">
          <el-input
            placeholder="请输入订单编号"
            suffix-icon="el-icon-edit-outline"
            v-model="selForm.orderId"
          ></el-input>
        </li>
        <li class="selTime">
          <el-date-picker
            v-model="selForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </li>
      </ul>

      <!-- btn区域 -->
      <div class="btns">
        <el-button type="primary" @click="postSelFn">查询</el-button>
        <el-button @click="selForm={}">清空</el-button>
      </div>
    </div>
    <!-- 数据展示区域 -->
    <div class="dataContent">
      <el-table :data="allOrderList" height="620" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="orderId" label="订单编号"></el-table-column>
        <el-table-column prop="time" label="下单时间"></el-table-column>
        <el-table-column prop="userName" label="下单人"></el-table-column>
        <el-table-column prop="proId" label="产线编号"></el-table-column>
        <el-table-column prop="orderState" label="订单状态">
          <template slot-scope="scope">
            <i class="stateIcon iconfont" :class="iconBg(scope.row)"></i>
            {{scope.row.orderState}}
          </template>
        </el-table-column>
        <el-table-column prop="des" label="详情" width="50">
          <template slot-scope="scope">
            <el-button @click="orderDesFn(scope.row.orderId)" type="text" size="small">详情</el-button>
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
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 25]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/views/PC/components/PageTitle'
import PopOverWrap from "./components/PopOverWrap"
import { iconBg, initNavBar } from '@/Tools/intScaleNum'
export default {
  name: "CarryOrder",
  components: {
    PageTitle,
    PopOverWrap
  },
  data() {
    return {
      orderId: "",
      // 详情弹窗
      desPopOver: false,
      // 筛选表单
      selForm: {
        orderId: "",
        time: "",
        userId: ""
      },
      currentPage: 1,
      userList: [],
      allOrderList: []
    }
  },
  created() {
    initNavBar(this)
    this.getOrderList();
    this.getUserList();
  },
  methods: {
    getOrderList() {
      this.axios.get('http://localhost:3005/allOrderList?_start=0&_end=10&rate=3')
        .then(res => {
          const { data } = res;
          this.allOrderList = data;
        })
    },
    getUserList() {
      this.axios.get('http://localhost:3005/userList')
        .then(res => {
          const { data } = res;
          this.userList = data;
        })
    },
    iconBg(key) {
      return iconBg(key);
    },

    // 订单详情
    orderDesFn(id) {
      this.orderId = id;
      this.desPopOver = true;

      console.log(id, "订单id")
    },
    // 筛选查询
    postSelFn() {
      const { selForm } = this;
      console.log(selForm, "筛选查询obj")
    },
    // 分页器相关
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
}
</script>

<style lang="scss" scope>
@import "./components/common.scss";
.carryOrder {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
}
</style>

