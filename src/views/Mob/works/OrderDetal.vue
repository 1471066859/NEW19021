<template>
  <div class="orderDetal">
    <!-- 物料信息 -->
    <div class="stuffInfo">
      <div class="title">
        <div class="left">
          订单号:
          <span>{{orderInfo.orderId}}</span>
        </div>
        <div class="right">{{orderInfo.orderState}}</div>
      </div>
      <!-- 物料列表 -->
      <div class="stuffList">
        <div
          class="item"
          v-for="(item, index) in orderStuffInfo"
          :key="index"
        >
          <div class="left">
            <span>{{item.stuffName}}</span>
            -
            <span>{{item.packName}}</span>
          </div>
          <div class="right">X1</div>
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="orderInfo">
        <i></i>
        <h2>订单信息</h2>
        <div class="item">
          创建人:
          <span>{{orderInfo.userName}}</span>
        </div>
        <div class="item itemFlex">
          <div class="infoLeft">
            产线编号:
            <span>{{orderInfo.proId}}</span>
          </div>
          <div class="infoRgiht">
            创建时间:
            <span>{{orderInfo.time}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="orderState">
      <i></i>
      <h2>订单进度</h2>
      <!-- <div class="item" v-if="orderStuffInfo" v-for="(item, i) in orderStuffInfo.orderStuffPackRes" :key="i"> -->
      <div class="item" v-for="(item, i) in orderStuffInfo" :key="i">
        <div class="itemLeft">{{item.stuffName}}</div>
        <div class="itemRight" v-if="item.orderStuffUnit">{{item.orderStuffUnit.unitName}}</div>
        <div class="itemRight" v-else>上料区</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetal',
  data() {
    return {
      orderInfo: {
        orderId: null,
        time: null,
        userName: null,
        orderState: null
      },
      timer: null,
      orderStuffInfo: null
    }
  },
  created() {
    // console.log(this.$route.query);
    let arr = null
    if (arr) {
      console.log(123);
    }
    this.getOrderStuffInfo();
    this.getOrderInfo();
    this.timer = setInterval(() => {
      this.getOrderStuffInfo();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    getOrderStuffInfo() {
      const { id } = this.$route.query;
      console.log(id);
      const data = this.qs.stringify({
        id,
      });
      this.axios.post('/api/webapi/order/getOrdersById', data)
        .then(res => {
          console.log(res);
          const { code, data, msg } = res.data;
          data.orderStuffPackRes.forEach(item => {
            if (item.stuffId == 1) item.stuffName = "物料1"
            if (item.stuffId == 2) item.stuffName = "物料2"
            if (item.stuffId == 3) item.stuffName = "物料3"
            if (item.stuffId == 4) item.stuffName = "物料4"
            if (item.packId == 1) item.packName = "大料盒"
            if (item.packId == 2) item.packName = "小料盒"
            if (item.orderStuffUnit) {
              if (item.orderStuffUnit.unitId == 1) item.orderStuffUnit.unitName = "上料区"
              if (item.orderStuffUnit.unitId == 2) item.orderStuffUnit.unitName = "投料区"
              if (item.orderStuffUnit.unitId == 3) item.orderStuffUnit.unitName = "视觉检测"
              if (item.orderStuffUnit.unitId == 4) item.orderStuffUnit.unitName = "异常区"
              if (item.orderStuffUnit.unitId == 5) item.orderStuffUnit.unitName = "堆垛区"
              if (item.orderStuffUnit.unitId == 6) item.orderStuffUnit.unitName = "堆垛区"
              if (item.orderStuffUnit.unitId == 7) item.orderStuffUnit.unitName = "堆垛区"
            }
          });
          this.orderStuffInfo = data.orderStuffPackRes;
          // console.log(this.orderStuffInfo, '11111');
        })
        .catch(err => console.log(err));
    },
    getOrderInfo() {
      this.orderInfo.orderId = sessionStorage.getItem('orderId');
      this.orderInfo.time = sessionStorage.getItem('time');
      this.orderInfo.userName = sessionStorage.getItem('userName');
      this.orderInfo.orderState = sessionStorage.getItem('orderState');
      this.orderInfo.proId = sessionStorage.getItem('proId');
    }
  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.orderDetal {
  width: 100%;
  border-radius: px(5);
  font-size: px(16);
  height: 100%;
  box-sizing: border-box;
  h2 {
    font-size: px(14);
    padding: px(10);
    border-bottom: 1px solid #ccc;
    margin-bottom: px(10);
  }
  .orderState {
    i {
      height: px(5);
      display: block;
      width: 100%;
      background: #f2f2f2;
    }
    background: #fff;
    h2 {
      font-size: px(14);
      padding: px(10);
      border-bottom: 1px solid #ccc;
      margin-bottom: px(10);
    }
    .item {
      display: flex;
      justify-content: space-between;
      padding: px(5) px(30);
      border-bottom: 1px solid #ccc;
    }
  }
  .orderInfo {
    margin-top: px(10);
    border-radius: px(4);
    i {
      height: px(5);
      display: block;
      width: 100%;
      background: #f2f2f2;
    }
    h2 {
      font-size: px(14);
      border-bottom: 1px solid #ccc;
      padding: px(10);
    }
    .item {
      border-bottom: 1px solid #ccc;
      padding: px(5) 0;
      padding-left: px(20);
      font-size: px(14);
    }
    .itemFlex {
      display: flex;
      justify-content: space-between;
      margin-right: px(20);
      font-size: px(14);
    }
  }
  .stuffInfo {
    background: #fff;
    border-radius: 4px;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: px(14);
      padding: px(10);
      border-bottom: 1px solid #ccc;
    }
    .stuffList {
      width: 90%;
      margin: 0 auto;
      margin-top: px(15);
      .item {
        border-bottom: 1px solid #ccc;
        font-size: px(14);
        display: flex;
        justify-content: space-between;
        padding: px(5) px(30);
      }
    }
  }
}
</style>