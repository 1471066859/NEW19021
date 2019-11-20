<template>
  <div class="proAdmin">
    <h1>产线管理</h1>
    <!-- 展示区 -->
    <div class="proContent">
      <div class="proWrap">
        <div class="proLeft">
          <img src="@/assets/img/u78.png" alt />
        </div>

        <div class="proRight">
          <!-- 表头 -->
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
              v-show="item.boxList.length > 1"
              @click="moreBoxId(index)"
              :class="{'iconActive': item.isAct}"
            ></i>
            <li>{{item.index}}</li>
            <li>{{item.unitName}}</li>
            <li :style="{'color':stateColor(item.unitState)}">
              <i class="iconfont" :class="stateIcon(item.unitState)"></i>
              {{item.unitState}}
            </li>
            <!-- <li style="overflow:scroll" v-if="item.boxList"> -->
            <li class="boxList" :class="{'isScroll': item.isAct}" v-show="item.boxList">
              <p
                v-show="item.boxList.length > 0"
                v-for="(boxItem, i) in item.boxList"
                :key="i"
              >{{boxItem.boxId}}</p>
              <p
                v-show="item.boxList.length == 0"
                style="font-size:30px"
                class="iconfont icon-jianqujianhaowubiankuang"
              ></p>
            </li>
          </ul>
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
      timer: null
    };
  },
  destroyed() {
    clearInterval(this.timer);
  },
  created() {
    initNavBar(this);
    this.getUnitData();
    this.timer = setInterval(() => {
      this.getUnitData();
    }, 1000);
  },
  methods: {
    getUnitData() {
      console.log('请求数据');
      this.axios.get('http://localhost:3005/proAdminList')
        .then(res => {
          const { data } = res;
          data.forEach((element, index) => {
            element.isAct = false;
            element.index = ++index;
          });
          this.unitList = data;
        })
    },
    stateColor(state) {
      switch (state) {

        case '空闲':
          return '#909399'
          break;

        case '工作中':
          return '#409eff'
          break;

        case '异常':
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
      // if (this.activeUnitItem == index) {
      //   this.activeUnitItem = null;
      //   return;
      // }
      // this.activeUnitItem = index;
    },
    stateIcon(state) {
      switch (state) {

        case '空闲':
          return 'icon-loading-v'
          break;

        case '工作中':
          return 'icon-kaishi'
          break;

        case '异常':
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
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  min-height: 820px;
  border-radius: 4px;
  box-sizing: border-box;
  .icon-kaishi {
    color: #409eff;
  }
  .icon-yichang {
    color: #f56c6c;
  }

  .isScroll {
    overflow: scroll;
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
        box-sizing: border-box;
        padding-right: 50px;
        img {
          width: 674px;
          height: 472px;
        }
      }
      .proRight {
        margin-right: 100px;
        flex: 1;
        box-sizing: border-box;
        li {
          flex: 1;
          box-sizing: border-box;
          text-align: left;
        }
        .activeUnitItem {
          transition: all 0.5s;
          height: 160px;
          overflow: scroll !important;
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
            box-sizing: border-box;
            padding: 20px;
          }
          .iconActive {
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