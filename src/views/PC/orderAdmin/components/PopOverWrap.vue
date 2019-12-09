<template >
  <!-- 订单详情弹窗 -->
  <div class="popOverWrap">
    <el-button class="closeBtn" @click="$emit('closeOrderDes')" icon="el-icon-close" circle></el-button>
    <h2>订单信息</h2>
    <ul class="orderMsg">
      <li>
        <p>订单编号:</p>
        <span>{{orderTitle.orderId}}</span>
      </li>
      <li>
        <p>下单时间:</p>
        <span>{{orderTitle.startTime}}</span>
      </li>
      <li>
        <p>下单人:</p>
        <span v-if="orderTitle.user">{{orderTitle.user.userName}}</span>
      </li>
      <li class="errDesWrap" v-if="orderInfo.deviantInfo">
        <p>异常原因:</p>
        <span style="color: #F56C6C">{{orderInfo.deviantInfo}}</span>
      </li>
    </ul>
    <h3>物料详情</h3>
    <ul class="orderDes" v-if="orderInfo.orderStuffPackRes">
      <li v-for="(item, index) in orderInfo.orderStuffPackRes" :key="index">
        <span>{{item.stuffName}}</span>
        <span>X1</span>
        <span>{{item.packName}}</span>
        <span>{{item.packRfid}}</span>
        <span v-if="item.orderStuffUnit">{{item.orderStuffUnit.unitName}}</span>
        <span v-else>上料区</span>
      </li>
    </ul>
    <h3>异常原因</h3>
    <ul class="orderDes">
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PopOverWrap",
  data() {
    return {
      a: 1,
      orderTitle: {},
      orderInfo: {},
      timer: null
    }
  },
  props: ['orderId'],
  mounted() {

  },
  destroyed() {
    this.clearTimer();
  },
  methods: {
    clearTimer() {
      clearInterval(this.timer);
    },
    getOrderDes(id, orderInfo) {
      this.getData(id, orderInfo);
      this.timer = setInterval(() => {
        this.getData(id, orderInfo);
      }, 1000);
    },
    getData(id, orderInfo) {
      console.log('请求数据');
      this.orderTitle = orderInfo;
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
          this.orderInfo = data;
        })
        .catch(err => console.log(err));
    }
  }
}
</script>

<style lang="scss" scope>
.popOverWrap {
  width: 400px;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 0 auto;
  position: relative;
  left: calc(50% - 200px);
  top: 20px;
  .closeBtn {
    position: absolute;
    top: -100px;
    right: -30px;
    border: none;
  }
  .errDesWrap {
    width: 100%;
    font-size: 16px;
    padding-left: 50px;
    padding-top: 30px;
    color: #f56c6c;
  }
  .orderDes {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-height: 50px;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    li {
      display: flex;
      padding: 5px 50px;
      // border-top: 1px solid #dcdfe6;
      justify-content: space-between;
      font-size: 16px;
      align-items: center;
      span {
        color: #303133;
        font-weight: 400;
      }
    }
  }
  .orderMsg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    // margin-bottom: 30px;
    // border-bottom: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    margin-bottom: 30px;
    li {
      display: flex;
      align-items: center;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 50px;
      font-size: 18px;
      color: #303133;
      p {
        width: 100px;
        overflow: hidden;
      }
      span {
        display: inline-block;
        margin-left: 50px;
        font-weight: 400;
        font-size: 16px;
      }
    }
  }
  h2 {
    font-family: "Courier New", Courier, monospace;
    color: #303133;
    width: 100%;
    // text-align: center;
    font-size: 20px;
    font-weight: 400;
    position: absolute;
    top: -60px;
  }
  h3 {
    font-family: "Courier New", Courier, monospace;
    color: #303133;
    width: 100%;
    // text-align: center;
    font-size: 20px;
    font-weight: 400;
    margin-top: 30px;
    margin-bottom: 30px;
    // position: absolute;
    // top: -60px;
  }
}
</style>