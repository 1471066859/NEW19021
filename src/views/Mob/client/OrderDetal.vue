<template>
  <div class="orderDetal">
    <!-- 物料信息 -->
    <div class="stuffInfo">
      <div class="title">
        <div class="left">
          订单号:
          <span>#1234</span>
        </div>
        <div class="right">生产中</div>
      </div>
      <!-- 物料列表 -->
      <div class="stuffList">
        <div class="item" v-for="i in 4" :key="i">
          <div class="left">
            <span>商品1</span>
            -
            <span>小料盒</span>
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
          <span>张三</span>
        </div>
        <div class="item itemFlex">
          <div class="infoLeft">
            产线编号:
            <span>001</span>
          </div>
          <div class="infoRgiht">
            创建时间:
            <span>2019-12-20 12:30:22</span>
          </div>
        </div>
      </div>
    </div>
    <div class="orderState">
      <i></i>
      <h2>订单进度</h2>
      <div class="item" v-for="(item, i) in 4" :key="i">
        <div class="itemLeft">商品1</div>
        <div class="itemRight">投料中</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order_detal',
  data() {
    return {

    }
  },

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