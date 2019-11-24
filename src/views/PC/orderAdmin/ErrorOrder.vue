<template>
  <div class="errorOrder">
    <PageTitle pageTitle="异常订单"></PageTitle>
    <!-- 订单详情弹窗 -->
    <div class="back" @click="desPopOver = false" v-show="desPopOver"></div>
    <div class="drawer" :class="{'desPopOverAct': desPopOver==true}">
      <PopOverWrap ref="PopOverWrap" @closeOrderDes="desPopOver = false" :orderId="orderId"></PopOverWrap>
    </div>
    <!-- <el-drawer :visible.sync="desPopOver" size="35%" direction="btt">
      <PopOverWrap :orderId="orderId" orderErrDes></PopOverWrap>
    </el-drawer>-->
    <!-- 筛选区域 -->
    <div class="selContent">
      <ul>
        <!-- 下单人筛选 -->
        <li class="selUser">
          <!-- <el-select v-model="selForm.userId" placeholder="请选择下单人">
            <el-option
              v-for="(item, i) in userList"
              :key="i"
              :label="item.userName"
              :value="item.userId"
            ></el-option>
          </el-select>-->

          <el-autocomplete
            class="inline-input"
            v-model="selForm.userName"
            :fetch-suggestions="querySearch"
            placeholder="请输入下单人姓名"
            suffix-icon="el-icon-user"
            :trigger-on-focus="false"
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
import PageTitle from '@/views/PC/components/PageTitle'
import PopOverWrap from "./components/PopOverWrap"
import { iconBg, initNavBar } from '@/Tools/intScaleNum'
import { querySearch, createFilter, getUserList, handleCurrentChange, handleSizeChange, postSelFn } from './components/common'
export default {
  name: "ErrorOrder",
  components: {
    PageTitle,
    PopOverWrap
  },
  data() {
    return {
      loading: false,
      orderId: "",
      // 详情弹窗
      desPopOver: false,
      // 筛选表单
      selForm: {
        orderId: "",
        time: "",
        userName: ""
      },
      page: 1,
      count: 100,
      size: 10,
      userList: [],
      allOrderList: []
    }
  },
  created() {
    initNavBar(this)
    this.getOrderList(this.page, this.size, this.selForm);
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
       closeSelForm() {
      this.selForm = {
        orderId: "",
        time: "",
        userName: ""
      }
     },
    querySearch,
    createFilter,
    getOrderList(page, size, sels) {
      // this.axios.get('http://localhost:3005/allOrderList?_start=0&_end=10&rate=4')
      //   .then(res => {
      //     const { data } = res;
      //     this.allOrderList = data;
      //   })
      this.loading = true;
      const data = this.qs.stringify({
        typeId: 4,
        pageNum: page,
        pageSize: size,
        userName: sels.userName,
        orderId: sels.orderId,
        startTime: sels.time[0],
        endTime: sels.time[1]
      });

      this.axios.post('api/webapi/order/getAllOrdersByTypeId', data)
        .then(res => {
          console.log(res);
          const { code, count, data, msg } = res.data;
          if (code == 200) {
            data.forEach(element => {
              element.orderStateName = "异常订单"
            });
            this.allOrderList = data;
            this.count = count;
            this.loading = false;
          } else console.log(res);
        })

        .catch(err => console.log(err));
    },
    getUserList,
    // getUserList() {
    //   this.axios.get('http://localhost:3005/userList')
    //     .then(res => {
    //       const { data } = res;
    //       data.forEach((item, i) => {
    //         this.userList.push({
    //           value: item.userName
    //         })
    //       });
    //     })
    // },
    iconBg(key) {
      return iconBg(key);
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
  },
}
</script>

<style lang="scss" scope>
@import "./components/common.scss";
.errorOrder {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  z-index: 1010;
  overflow: hidden;
}
</style>

