<template>
  <div class="productionAdminPage1">
    <el-scrollbar style="height:100%">
      <div class="contentImg">
        <img src="@/assets/img/production_img.png" alt="产线可视化" />
      </div>
      <div class="contentWrap">
        <h1>产线管理1</h1>
        <div class="productionList">
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="item in unitList" :key="item.index" :name="item.index">
              <template slot="title">
                <div style="display:flex; width:100%">
                  <p style="margin-left:50px">{{item.index}}</p>
                  <p style="margin-left:150px">{{item.unitName}}</p>
                  <p
                    :style="{'color':stateColor(item.unitState)}"
                    style="margin-left:150px"
                  >{{item.unitStateName}}</p>
                </div>
              </template>
              <div>
                <el-table
                  :data="item.unitOrderStuffPackDetailRes"
                  :header-cell-style="{'background-color': '#fafafa'}"
                  style="width: 100%"
                >
                  <el-table-column prop="orderStuffPack.packRfid" label="料盒RFID"></el-table-column>
                  <el-table-column prop="pack.packName" label="规格"></el-table-column>
                  <el-table-column prop="stuff.stuffName" label="物料"></el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'ProductionAdminPage1',
  components: {
  },
  data() {
    return {
      activeNames: [],
      unitList: [],
      // 产线管理列表
      productionList: [
        {
          index: 1,
          productionName: '备料区',
          orderId: '0034'
        },
        {
          index: 2,
          productionName: '上料盒',
          orderId: '0635'
        },
        {
          index: 3,
          productionName: '投料',
          orderId: '0514'
        },
        {
          index: 4,
          productionName: '视觉检测',
          orderId: '6954'
        },
        {
          index: 5,
          productionName: '异常处理',
          orderId: '0369'
        },
        {
          index: 6,
          productionName: '分类码垛',
          orderId: '5741'
        },
      ]
    }
  },
  created() {
    this.getUnitData();
    this.timer = setInterval(() => {
      this.getUnitData();
      // this.getUpdateUnitData();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    getUnitData() {
      this.axios.get('/api/webapi/order/getUnitDetail')
        .then(res => {
          console.log(res);
          const { data } = res.data;
          data.forEach((element, index) => {
            element.isAct = false;
            element.index = ++index;
            if (element.unitState == 0) element.unitStateName = '异常'
            if (element.unitState == 1) element.unitStateName = '工作中'
            if (element.unitState == 2) element.unitStateName = '空闲'
          });
          this.unitList = data;
        })
    },
    getUpdateUnitData() {
      console.log('请求数据');
      // this.axios.get('http://localhost:3005/proAdminList')
      this.axios.get('/api/webapi/order/getUnitDetail')
        .then(res => {
          const { data } = res.data;
          // console.log(data);
          this.unitList.forEach((item, index) => {
            item.unitOrderStuffPackDetailRes = data[index].unitOrderStuffPackDetailRes;
          });
        })
    },
    stateColor(state) {
      switch (state) {

        case 2:
          return '#909399'
          break;

        case 1:
          return '#409eff'
          break;

        case 0:
          return '#F56C6C'
          break;

        default:
          break;
      }
    },
  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.productionAdminPage1,
.productionAdminPage2,
.productionAdminPage3,
.productionAdminPage3 {
  height: 100%;
  overflow: scroll;
  .el-collapse-item__header {
    height: px(48);
    line-height: px(48);
    font-size: px(13);
  }
  .el-collapse-item__content {
    padding-bottom: px(25);
    font-size: px(13);
  }
  .el-table {
    font-size: px(12);
  }
  .cell {
    padding-left: px(10) !important;
    padding-right: px(10) !important;
    line-height: px(23);
  }
  .contentImg {
    background: #fff;
    text-align: center;
    border-radius: px(4);
    padding-top: px(70);
    padding-bottom: px(10);
    img {
      width: px(337);
      height: px(236);
    }
  }
  .contentWrap {
    width: 100%;
    margin-top: px(10);
    background: #fff;
    padding-bottom: px(10);
    h1 {
      font-size: px(12);
      font-weight: 700;
      color: gray;
      padding: px(10);
      border-bottom: px(1) solid #ccc;
    }
    .productionList {
      padding: 0 px(20);
    }
  }
}
</style>