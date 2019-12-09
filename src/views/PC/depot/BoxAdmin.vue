<template>
  <div class="boxAdmin">
    <h1>料盒出入库管理</h1>
    <!-- 头部料盒描述 -->
    <div class="packBox">
      <div class="item" v-for="(item, index) in packList" :key="index">
        <i class="iconfont icon-box" :class="{'smort':item.packName == '小盒'}"></i>
        <div class="msgWrap">
          <p>{{item.packName}}</p>
          <h2 v-if="item.warehouse">{{item.warehouse.amount}}</h2>
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
        <EnterTables @getPackList="getPackList" :adminList="adminList" :packList="packList"></EnterTables>
      </div>
    </div>
  </div>
</template>

<script>
import LeaveTables from '@/views/PC/components/BoxAdmin/LeaveTables'
import EnterTables from '@/views/PC/components/BoxAdmin/EnterTables'
import { initNavBar } from '@/Tools/intScaleNum'
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
      packList: [],
      // 管理员信息
      adminList: []
    }
  },
  created() {
    initNavBar(this);
    // 初始化数据
    this.getPackList();
    // 获取管理员信息
    this.getAdminList();
    this.getLogin();
  },
  methods: {
    // 拉取料盒信息列表
    getPackList() {
      this.axios.get('/api/webapi/warehouse/getAllPackAmount?contentid=1')
        .then(res => {
          const { data } = res.data;
          this.packList = data;
        })
        .catch(err => {
          console.log(err)
        });

    },
    getLogin() {
      this.axios.post("/api/webapi/login?userId=1&userPwd=1")
        .then(res => {
          console.log(res)
        });
    },
    // 获取管理员信息
    getAdminList() {
      this.axios.get("/api/webapi/getUserNameByAccess?useruuid=7be9a8b1a6784ea590af644fa7fb930d")
        .then(res => {
          const { data } = res.data;
          this.adminList = data;
          console.log(this.adminList, 111111)
        });
    }
  }
}
</script>

<style lang="scss" scope>
.boxAdmin {
  h1 {
    font-size: 18px;
    padding: 10px 20px;
  }
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
      .smort {
        font-size: 50px;
      }
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