<template>
  <div class="proAdmin">
    <h1>产线管理</h1>
    <!-- 展示区 -->
    <div class="proContent">
      <div class="proWrap">
        <div class="proLeft">
          <img src="@/assets/img/u78.png" alt />
        </div>

        <!-- <div class="proRight">
          <el-scrollbar style="height:100%">
            <ul style="border: 1px solid #DCDFE6">
              <Li>序号</Li>
              <Li>单元</Li>
              <Li>状态</Li>
              <Li>料盒ID</Li>
            </ul>
            <ul
              class="unitList"
              v-for="(item, index) in unitList"
              :key="index"
              :class="{'activeUnitItem': item.isAct}"
            >
              <i
                class="el-icon-caret-bottom moreBoxId"
                v-show="item.unitOrderStuffPackDetailRes.length > 1"
                @click="moreBoxId(index)"
                :class="{'iconActive': item.isAct}"
              ></i>
              <li>{{item.index}}</li>
              <li>{{item.unitName}}</li>
              <li :style="{'color':stateColor(item.unitState)}">
                <i class="iconfont" :class="stateIcon(item.unitState)"></i>
                {{item.unitStateName}}
              </li>
              <li
                class="boxList"
                :class="{'isScroll': item.isAct}"
                v-show="item.unitOrderStuffPackDetailRes"
              >
                <p
                  v-show="item.unitOrderStuffPackDetailRes.length > 0"
                  v-for="(boxItem, i) in item.unitOrderStuffPackDetailRes"
                  :key="i"
                >{{boxItem.id}}</p>
                <p
                  v-show="item.unitOrderStuffPackDetailRes.length == 0"
                  style="font-size:30px"
                  class="iconfont icon-jianqujianhaowubiankuang"
                ></p>
              </li>
            </ul>
          </el-scrollbar>
        </div>-->
        <div class="proRight"> 
          <el-scrollbar style="height:100%">
            <el-collapse v-model="activeNames" @change="handleChange">
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
                    <el-table-column prop="startTime" label="开始时间"></el-table-column>
                    <el-table-column prop="orderStuffPack.packRfid" label="料盒RFID"></el-table-column>
                    <el-table-column prop="pack.packName" label="规格"></el-table-column>
                    <el-table-column prop="stuff.stuffName" label="物料"></el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initNavBar } from '@/Tools/intScaleNum'
export default {
  data() {
    return {
      activeName: 'pro001',
      unitList: [],
      timer: null,
      activeNames: []
    };
  },
  destroyed() {
    clearInterval(this.timer);
  },
  created() {
    initNavBar(this);
    this.getUnitData();
    this.timer = setInterval(() => {
      // this.getUnitData();
      this.getUpdateUnitData();
    }, 1000);
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    moreBoxId(index) {
      this.unitList[index].isAct = !this.unitList[index].isAct;
    },
    stateIcon(state) {
      switch (state) {

        case 2:
          return 'icon-loading-v'
          break;

        case 1:
          return 'icon-kaishi'
          break;

        case 0:
          return 'icon-yichang'
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.proAdmin {
  .test {
    // max-height: 200px;
    height: 200px;
    position: relative;
    p {
      line-height: 30px;
    }
    // overflow-y: scroll !important;
    // autoscroll: False;
  }
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  // min-height: 820px;
  border-radius: 4px;
  box-sizing: border-box;
  .icon-kaishi {
    color: #409eff;
  }
  .icon-yichang {
    color: #f56c6c;
  }

  .isScroll {
    // overflow: scroll;
  }
  h1 {
    font-size: 18px;
    padding: 10px 20px;
  }
  .proContent {
    margin-top: 50px;
    box-sizing: border-box;
    .proWrap {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      // padding-top: 150px;
      .proLeft {
        // box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding-right: 50px;
        img {
          width: 674px;
          height: 472px;
        }
      }

      .proRight {
        height: 700px;
        margin-bottom: 30px;
        position: relative;
        border: 1px solid #f2f2f2;
        margin-right: 100px;
        flex: 1;
        box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        li {
          flex: 1;
          box-sizing: border-box;
          text-align: left;
        }
        .reAct {
        }
        .activeUnitItem {
          height: auto;
          transition: all 0.5s;
          // overflow: scroll !important;
        }
        .unitList {
          border-bottom: 1px solid #dcdfe6;
          background: #fff !important;
          position: relative;
          overflow: hidden;
          .moreBoxId {
            position: absolute;
            right: 0px;
            font-size: 30px;
            top: -10px;
            transform: rotateZ(-90deg);
            box-sizing: border-box;
            padding: 20px;
          }
          .iconActive {
            transform: rotateZ(0deg);
            color: #007fcb;
          }
          i:hover {
            cursor: pointer;
            color: #007fcb;
            opacity: 0.7;
          }

          li {
            line-height: 50px;
          }
        }
        ul {
          display: flex;
          justify-content: space-around;
          transition: all 1s;
          padding: 0 10px;
          height: 50px;
          box-sizing: border-box;
          line-height: 50px;
          background-color: #e4e7ed;
          li {
            box-sizing: border-box;
            font-size: 18px;
            color: #303133;
          }
        }
      }
    }
  }
}
</style>