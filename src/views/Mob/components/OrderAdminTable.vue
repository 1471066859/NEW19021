<template>
  <div class="order_wrap">
    <!-- 表头 -->
    <div class="item_hd">
      <p>
        <span>订单编号:</span>
        <span>{{OrderAdminTable.orderId}}</span>
      </p>
      <i class="el-icon-more" @click="toOrderDetalFn(OrderAdminTable)"></i>
    </div>
    <!-- 内容容器 -->
    <div class="item_body">
      <div class="bd_row_top">
        <div class="poeople">
          创建人:
          <span v-if="OrderAdminTable.user">{{OrderAdminTable.user.userName}}</span>
        </div>
        <div class="status">
          订单状态:
          <span>{{OrderAdminTable.orderStateName}}</span>
        </div>
      </div>
      <div class="bd_row_bottom">
        <div class="time">
          创建时间:
          <span>{{OrderAdminTable.startTime}}</span>
        </div>
        <div class="pro_id">
          产线编号:
          <span>{{OrderAdminTable.proId}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  name: "OrderAdminTable",
  props: {
    OrderAdminTable: {
      type: Object,
      default: {}
    }
  },
  methods: {
    toOrderDetalFn() {
      const info = this.OrderAdminTable;
      console.log(info);
      sessionStorage.setItem('orderId', info.orderId);
      sessionStorage.setItem('time', info.startTime);
      sessionStorage.setItem('userName', info.user.userName);
      sessionStorage.setItem('orderState', info.orderStateName);
      sessionStorage.setItem('proId', info.proId);
      this.$router.push({
        path: '/works/OrderDetal',
        query: {
          id: info.id,
        }
      })
    }
  },
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
// 表格组件
.order_wrap {
  border-radius: px(4);
  border: 1px solid rgba(204, 204, 204, 1);
  margin-bottom: px(5);
  .item_hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 px(10);
    border-bottom: 1px solid rgba(204, 204, 204, 1);
    p {
      font-size: px(12);
      font-weight: 700;
    }
    i {
      font-size: px(16);
      box-sizing: border-box;
      display: inline-block;
      padding: px(5);
    }
  }
  .item_body {
    padding: px(10);
    font-size: px(12);
    .bd_row_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .poeople {
        width: px(200);
        overflow: hidden;
      }
      .status {
        flex: 1;
      }
    }
    .bd_row_bottom {
      margin-top: px(10);
      display: flex;
      .time {
        width: px(200);
        overflow: hidden;
      }
      .pro_id {
        flex: 1;
      }
    }
  }
}
</style>