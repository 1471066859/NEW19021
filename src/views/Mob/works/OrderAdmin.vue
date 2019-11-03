<template>
  <div class="OrderAdmin">
    <!-- 标题 -->
    <div class="orderTitle">
      订单管理
      <i class="el-icon-s-operation" @click="showSearchLoadFn"></i>
    </div>

    <!-- 搜索框 -->
    <OrderAdminSerBox
      :showSearchLoad="showSearchLoad"
      ref="OrderAdminSerBoxRef"
      @closeSearchLoad="closeSearchLoad"
      @getSelData="getSelData"
    />
    <!-- <div class="searchWrap">
      订单号
      <span>/</span>创建人
      <span>/</span>创建时间
      <span>/</span>产线编号
      <span>/</span>订单状态
    </div>-->
    <!-- 数据容器 可滚动-->
    <div
      class="orderListWrap"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      @click="closeSearchLoad"
    >
      <OrderAdminTable
        v-for="OrderItem in OrderAdminTableList"
        :key="OrderItem.orderId"
        :OrderAdminTable="OrderItem"
      />
      <p class="loadText">
        <i v-if="loadText == '数据加载中...'" class="el-icon-loading"></i>
        {{loadText}}
      </p>
    </div>
  </div>
</template>

<script>
import '@/hotcss/hotcss'
import OrderAdminTable from '@/views/Mob/components/OrderAdminTable'
import OrderAdminSerBox from '@/views/Mob/components/OrderAdminSerBox'
export default {
  name: 'OrderAdmin',
  components: {
    OrderAdminTable,
    OrderAdminSerBox,
  },
  data() {
    return {
      // 筛选弹窗
      showSearchLoad: false,
      loadText: '数据加载中...',
      loading: false,
      // 筛选数据
      selData: {},
      OrderAdminTableList: [
        {
          orderId: 'D2043',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D20243',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D12043',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D204443',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D3312043',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D204133',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D2231043',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D2044523',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
      ],
      getNum: 1

    }
  },
  created() {
    this.$store.dispatch("setTabState", 1);
    this.$store.dispatch('setMobHdMsg', "WELCOME")
  },
  methods: {
    // 显示弹窗
    showSearchLoadFn() {
      this.showSearchLoad = !this.showSearchLoad;
      if (this.showSearchLoad == false) {
        this.closeSearchLoad();
      }
    },
    // 加载更多
    loadMore() {
      if (this.getNum == 5) {
        this.loading = false;
        this.loadText = "暂无更多数据";
        return;
      }
      this.loading = true;
      setTimeout(() => {
        this.OrderAdminTableList.push({
          orderId: this.getNum++,
          orderUser: 'mqlmqlmql',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        });
        this.loading = false;
      }, 1000);
    },
    // 关闭弹窗清空数据
    closeSearchLoad() {
      this.showSearchLoad = false;
      this.$refs.OrderAdminSerBoxRef.clearSearchData();
    },
    // 获取筛选数据
    getSelData(data) {
      this.showSearchLoad = false;
      this.$refs.OrderAdminSerBoxRef.clearSearchData();
      this.selData = data;
      console.log(this.selData);
    }
  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.OrderAdmin {
  width: 100%;
  border-radius: px(5);
  font-size: px(16);
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: px(10);
  padding-top: 0;
  overflow: hidden;
  // overflow: scroll;
  display: flex;
  flex-direction: column;
  .orderListWrap {
    flex: 1;
    overflow: scroll;
    .loadText {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: px(16);
      .el-icon-loading {
        font-size: px(16);
      }
    }
  }
  .orderTitle {
    text-align: center;
    font-size: px(13);
    font-weight: 700;
    padding: px(7) 0;
    position: relative;
    i {
      position: absolute;
      display: inline-block;
      box-sizing: border-box;
      font-size: px(18);
      padding: px(5);
      top: px(0);

      right: 0;
    }
  }

  .searchWrap {
    border-radius: px(4);
    text-align: left;
    margin-bottom: px(7);
    font-size: px(12);
    border: 1px solid rgba(204, 204, 204, 1);
    padding: px(5);
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.247);
    span {
      display: block;
      padding: 0 px(3);
    }
  }
}
</style>