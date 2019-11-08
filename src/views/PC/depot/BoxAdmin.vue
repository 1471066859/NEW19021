<template>
  <div class="boxAdmin">
    <h1>料盒出入库管理</h1>
    <!-- 头部料盒描述 -->
    <div class="packBox">
      <!-- <div class="item" :class="{'sild': index == 0}" v-for="(item,index) in packList" :key="index">
        <h2>{{item.packname}}</h2>
        <p>{{item.amount}}</p>
      </div>-->
      <div class="item" :class="{'sild': index == 0}" v-for="(item,index) in packList" :key="index">
        <i class="el-icon-takeaway-box"></i>
        <div class="msgWrap">
          <p>{{item.packname}}</p>
          <h2>{{item.amount}}</h2>
        </div>
      </div>
    </div>

    <!-- 筛选内容 -->
    <ul class="selWrap">
      <li class="btnsWrap leaveEnterBtns">
        <el-button :class="{'activeBtn': activeName == 'leave'}" @click="activeName = 'leave'">出库</el-button>
        <el-button :class="{'activeBtn': activeName == 'enter'}" @click="activeName = 'enter'">入库</el-button>
      </li>
    </ul>
    <!--切换表格区域  -->
    <div class="tabsWrap">
      <div v-show="activeName == 'leave'">
        <LeaveTables></LeaveTables>
      </div>
      <div v-show=" activeName == 'enter'">
        <EnterTables></EnterTables>
      </div>
    </div>
  </div>
</template>

<script>
import LeaveTables from '@/views/PC/components/BoxAdmin/LeaveTables'
import EnterTables from '@/views/PC/components/BoxAdmin/EnterTables'
export default {
  name: 'BoxAdmin',
  components: {
    LeaveTables,
    EnterTables
  },
  data() {
    return {
      // 标签页索引
      activeName: 'leave',
      // 仓库料盒数据
      packList: null,
    }
  },
  created() {
    // 初始化数据
    this.getPackList()
  },
  methods: {
    // 拉取料盒信息列表
    getPackList() {
      const data = [
        {
          packid: '#12356',
          packname: '大盒',
          amount: 75,
        },
        {
          packid: '#79656',
          packname: '小盒',
          amount: 49,
        },
      ];
      this.packList = data;
    }
  }
}
</script>

<style lang="scss" scope>
.boxAdmin {
  .selWrap {
    width: 100%;
    padding: 15px 40px;
    display: flex;
    box-sizing: border-box;
    position: relative;
    border-top: 1px solid #ccc;
    margin-top: 15px;
    height: 70px;
    li {
      margin-right: 20px;
      span {
        display: inline-block;
        font-size: 14px;
        margin-right: 5px;
      }
    }
    .leaveEnterBtns {
      position: absolute;
      right: 0;
      .activeBtn {
        // border: 1px solid #16a2fb;
        color: #fff;
        background: #16a2fb;
      }
    }
  }
  .pageSizeBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }
  padding: 0 20px;
  .tabsWrap {
    box-sizing: border-box;
    padding: 0 20px;
  }
  .packBox {
    width: 800px;
    height: 100px;
    padding: 20px 0;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sild {
      // border-right: 1px solid #007bce;
    }
    .item:hover {
      transform: translateY(-10px);
    }
    .item {
      // opacity: .5;
      transition: transform 0.3s;
      transition: transform 0.3s;
      display: flex;
      justify-content: space-between;
      width: 45%;
      box-sizing: border-box;
      height: 100px;
      padding: 12px 50px;
      margin-right: 20px;
      align-items: center;
      background: #16a2fb;
      border-radius: 4px;
      i {
        font-size: 70px;
        color: #fff;
      }
      .msgWrap {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          // font-size: 20px;
          font-weight: 700;
          text-align: center;
          // color: rgba(0, 0, 0, 0.45);
          color: #fff;
          font-size: 25px;
        }
        h2 {
          font-size: 30px;
          color: #fff;
          text-align: center;
          // color: #666;
          font-weight: 700;
        }
      }
    }
    // .item {
    //   width: 50%;
    //   height: 100%;
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    //   box-sizing: border-box;
    //   h2 {
    //     text-align: center;
    //     font-size: 18px;
    //     color: #ccc;
    //     font-weight: 400;
    //   }
    //   p {
    //     font-weight: 400;
    //     text-align: center;
    //     font-size: 30px;
    //     color: #000;
    //   }
    // }
  }
}
</style>