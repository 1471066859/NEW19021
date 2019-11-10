<template>
  <div class="materials">
    <h1>物料出入库管理</h1>
    <div class="materWrap">
      <div class="item" v-for="item in stuffList" :key="item.stuffid">
        <!-- <i class="el-icon-eleme"></i> -->
        <i class="iconfont" :class="item.icon"></i>
        <div class="msgWrap">
          <p>{{item.stuffname}}</p>
          <h2>
            {{item.amount}}
            <span>kg</span>
          </h2>
        </div>
      </div>
      <div class="item addMater" @click="addPackFn">
        <p class="addWrap">
          <i class="el-icon-circle-plus-outline"></i>
          <span>新增物料</span>
        </p>
      </div>
    </div>

    <!-- 新增物料弹窗 -->
    <AddEnterBox
      ref="AddEnterBox"
      title="新增物料"
      @postFormFn="postFormFn"
      :addStuff="true"
      :adminPeople="true"
      :adminList="adminList"
    ></AddEnterBox>

    <!-- 筛选内容 -->
    <ul class="selWrap">
      <li class="btnsWrap leaveEnterBtns">
        <el-button :class="{'activeBtn': activeName == 'leave'}" @click="activeName = 'leave'">出库</el-button>
        <el-button :class="{'activeBtn': activeName == 'enter'}" @click="activeName = 'enter'">入库</el-button>
      </li>
      <!-- 选择出库物料名 -->
      <li class="selNameWrap" v-show="activeName == 'leave'">
        <span>物料名称:</span>
        <el-select v-model="leaveForm.materLeaveVal" placeholder="请选择">
          <el-option
            v-for="item in stuffList"
            :key="item.stuffid"
            :label="item.stuffname"
            :value="item.stuffid"
          ></el-option>
        </el-select>
      </li>
      <!-- 选择入库物料名 -->
      <li class="selNameWrap" v-show="activeName == 'enter'">
        <span>物料名称:</span>
        <el-select v-model="enterForm.materEnterVal" placeholder="请选择">
          <el-option
            v-for="item in stuffList"
            :key="item.stuffid"
            :label="item.stuffname"
            :value="item.stuffid"
          ></el-option>
        </el-select>
      </li>
      <!-- 选择出库日期范围 -->
      <li class="selTimeWrap" v-show="activeName == 'leave'">
        <span>出库时间:</span>
        <el-date-picker
          v-model="leaveForm.selLeaveTimeVal"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </li>
      <!-- 选择入库日期范围 -->
      <li class="selTimeWrap" v-show="activeName == 'enter'">
        <span>出库时间:</span>
        <el-date-picker
          v-model="enterForm.selEnterTimeVal"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </li>
      <!-- 选择入库产线编号 -->
      <li class="selIdWrap" v-show="activeName == 'leave'">
        <span>产线编号:</span>
        <el-select v-model="leaveForm.proIdVal" placeholder="请选择">
          <el-option
            v-for="item in proIdList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <!-- 选择出库供应商 -->
      <li class="selIdWrap" v-show="activeName == 'enter'">
        <span>供应商:</span>
        <el-select v-model="enterForm.supplierVal" placeholder="请选择">
          <el-option
            v-for="item in supplierList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </li>
      <li class="btnsWrap">
        <el-button @click="PostSerBtnFn" type="primary">查询</el-button>
        <el-button @click="clearSerFn">重置</el-button>
      </li>
    </ul>
    <!-- 表格区域 -->
    <div class="tabWrap">
      <div v-show="activeName == 'leave'">
        <MaterLeaveTables></MaterLeaveTables>
      </div>
      <div v-show=" activeName == 'enter'">
        <MaterEnterTables :stuffList="stuffList" :adminList="adminList"></MaterEnterTables>
      </div>
    </div>
  </div>
</template>

<script>
import MaterLeaveTables from '@/views/PC/components/Materials/MaterLeaveTables'
import MaterEnterTables from '@/views/PC/components/Materials/MaterEnterTables'
import AddEnterBox from '@/views/PC/components/AddEnterBox'
export default {
  name: "Materials",
  components: {
    AddEnterBox,
    MaterLeaveTables,
    MaterEnterTables
  },
  data() {
    return {
      leaveForm: {
        // 所选出库物料
        materLeaveVal: '',
        // 所选出库时间内容
        selLeaveTimeVal: '',
        // 产线id内容
        proIdVal: '',
      },
      enterForm: {
        // 供应商内容
        supplierVal: "",
        // 所选入库物料
        materEnterVal: '',
        // 所选入库时间内容
        selEnterTimeVal: ''
      },
      // 标签页内容
      activeName: 'leave',

      // 产线列表
      proIdList: [
        {
          value: '选项1',
          label: '产线1'
        }, {
          value: '选项2',
          label: '产线2'
        }, {
          value: '选项3',
          label: '产线3'
        }, {
          value: '选项4',
          label: '产线4'
        }
      ],
      // 供应商列表
      supplierList: [
        {
          value: 'sj1',
          label: '商家1'
        }, {
          value: 'js2',
          label: '商家2'
        }, {
          value: 'sj3',
          label: '商家3'
        }, {
          value: 'sj4',
          label: '商家4'
        }
      ],
      // 物料列表
      stuffList: [],
      // 管理员信息
      adminList: []
    }
  },
  created() {
    // 获取物料列表
    this.getStuffList();
    // 获取操作人员列表
    this.getAdminList();
  },
  methods: {
    // 获取物料列表
    getStuffList() {
      this.axios.get("http://localhost:53000/stuffList")
        .then(res => {
          const { data } = res;
          this.stuffList = data;
        })
        .catch(err => console.log(err))
    },
    // 获取操作人列表
    getAdminList() {
      this.axios.get("http://localhost:53000/adminList")
        .then(res => {
          const { data } = res;
          this.adminList = data;
        })
        .catch(err => console.log(err));
    },
    // 新增物料
    addPackFn() {
      this.$refs.AddEnterBox.showAddEnterBox();
    },
    // 新增物料确定
    postFormFn(data) {
      const obj = {
        stuffname: data.stuffname,
        time: data.time,
        username: data.username,
        userid: data.userid,
      };
      console.log(obj);
    },
    // 查询方法
    PostSerBtnFn() {
      const { activeName } = this;
      if (activeName == 'leave') {
        const { leaveForm } = this;
        console.log(leaveForm)
        return;
      };
      if (activeName == 'enter') {
        const { enterForm } = this;
        console.log(enterForm);
        return;
      }
    },
    // 情况筛选内容
    clearSerFn() {
      const { activeName } = this;
      if (activeName == 'leave') {
        this.leaveForm = {}
        return;
      };
      if (activeName == 'enter') {
        this.enterForm = {}
        return;
      }
    }
  },

}
</script>

<style lang="scss" scope>
.materials {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  .pageSizeBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }
  .selWrap {
    width: 100%;
    padding: 15px 40px;
    display: flex;
    box-sizing: border-box;
    position: relative;
    .el-select {
      width: 120px !important;
    }
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
        color: #fff;
        background: #16a2fb;
      }
    }
  }
  h1 {
    font-size: 18px;
    padding: 10px 20px;
  }
  .materWrap {
    display: flex;
    padding-left: 40px;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    .addMater {
      cursor: pointer;
      .addWrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      p {
        text-align: center;
        width: 100%;
        font-size: 23px !important;
        color: #fff;
      }
    }
    .item:hover {
      transform: translateY(-10px);
      box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
    }
    .item {
      transition: all 0.3s;
      display: flex;
      justify-content: space-between;
      width: 220px;
      box-sizing: border-box;
      // padding: 20px 20px;
      height: 80px;
      padding: 12px 20px;
      margin-right: 20px;
      align-items: center;
      // border: 1px solid red;
      background: #16a2fb;
      border-radius: 4px;
      i {
        font-size: 50px;
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
          font-size: 16px;
        }
        h2 {
          font-size: 20px;
          color: #fff;
          text-align: center;
          font-weight: 700;
          span {
            display: inline-block;
            padding-left: 3px;
            font-weight: 400;
          }
        }
      }
    }
    // .item {
    //   display: flex;
    //   flex-direction: column;
    //   justify-content: center;
    //   width: 180px;
    //   box-sizing: border-box;
    //   border: 1px solid red;
    //   margin-right: 30px;
    //   align-items: center;
    //   h2 {
    //     font-size: 14px;
    //     padding: 3px 0;
    //     width: 90%;
    //     margin: 0 auto;
    //     border-bottom: 1px solid red;
    //     text-align: center;
    //   }
    //   p {
    //     font-size: 30px;
    //     padding: 10px 0;
    //   }
    // }
  }
}
</style>