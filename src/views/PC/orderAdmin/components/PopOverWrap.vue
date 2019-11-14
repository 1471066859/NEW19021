<template >
  <!-- 订单详情弹窗 -->
  <div class="popOverWrap">
    <h2>订单信息</h2>
    <ul class="orderMsg">
      <li>
        <p>订单编号:</p>
        <span>{{orderId}}</span>
      </li>
      <li>
        <p>下单时间:</p>
        <span>2019-10-11 12:20:41</span>
      </li>
      <li>
        <p>下单人:</p>
        <span>张三</span>
      </li>
      <li class="errDesWrap" v-if="orderErrDes">
        <p>异常原因:</p>
        <span style="color: #F56C6C">物料混入</span>
      </li>
    </ul>
    <ul class="orderDes">
      <li v-for="item in 4" :key="item">
        <span>瓜子</span>
        <span>X2</span>
        <span>大盒</span>
        <span>#2012</span>
        <span>投料区</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PopOverWrap",
  data() {
    return {
      // 详情弹窗
    }
  },
  props: {
    orderErrDes: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scope>
.popOverWrap {
  width: 400px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 auto;
  position: absolute;
  left: calc(50% - 200px);
  top: 20px;
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
    justify-content: center;
    li {
      display: flex;
      padding: 5px 50px;
      border-top: 1px solid #ccc;
      justify-content: space-between;
      font-size: 16px;
      align-items: center;
      span {
        color: #000;
        font-weight: 400;
      }
    }
  }
  .orderMsg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    // border-bottom: 1px solid #ccc;
    li {
      display: flex;
      align-items: center;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 50px;
      font-size: 18px;
      color: #000;
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
    color: #000;
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    border-bottom: 1px solid #ccc;
  }
}
</style>