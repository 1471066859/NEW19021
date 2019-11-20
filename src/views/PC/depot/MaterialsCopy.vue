<template>
  <div class="materials">
    <div class="backBg" @click="closeAddStuff('addStuffForm')" v-show="addMaterBox"></div>
    <h1>物料出入库管理</h1>
    <!--物料数量 -->
    <div class="materWrap">
      <div class="item" v-for="(item,index) in stuffList" :key="index">
        <i class="iconfont" :class="item.icon"></i>
        <div class="msgWrap">
          <p>{{item.stuffName}}</p>
          <h2 v-if="item.warehouse">
            {{item.warehouse.amount}}
            <span>kg</span>
          </h2>
        </div>
      </div>
      <!-- <div class="item addMater" @click="addPackFn">
        <p class="addWrap">
          <i class="el-icon-circle-plus-outline"></i>
          <span>新增物料</span>
        </p>
      </div>-->
    </div>

    <!-- 废弃 新增物料弹窗 -->

    <div class="addMaterBox" v-show="addMaterBox" v-loading="addMaterBoxLoad">
      <i class="el-icon-close closeIcon" @click="closeAddStuff('addStuffForm')"></i>
      <div class="hd">
        <h2>新增物料</h2>
        <p>
          时间:
          <span>{{addStuffForm.time}}</span>
        </p>
      </div>
      <el-form
        :model="addStuffForm"
        :rules="stuffrules"
        ref="addStuffForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="item">
          <el-form-item label="物料名称" prop="stuffname">
            <el-input v-model="addStuffForm.stuffname"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="操作人" prop="userid">
            <el-select v-model="addStuffForm.userid" placeholder="操作人">
              <el-option
                v-for="item in adminList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- butn -->
        <div class="item btns">
          <el-form-item>
            <el-button type="primary" @click="postAddStuff('addStuffForm')">确定</el-button>
            <el-button @click="closeAddStuff('addStuffForm')">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <div class="tabWrap">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="出库" name="leave">
          <!-- 筛选内容 -->
          <ul class="selWrap">
            <!-- 新增入库 -->
            <li class="btnsWrap leaveEnterBtns">
              <el-button
                v-show="activeName == 'enter'"
                @click="($refs.MaterEnterTables.showAddEnterBox())"
                type="success"
              >
                <i class="el-icon-circle-plus"></i>
                新增入库
              </el-button>
            </li>
            <!-- 选择出库物料名 -->
            <li class="selNameWrap" v-show="activeName == 'leave'">
              <span>物料名称:</span>
              <el-select v-model="leaveForm.materLeaveVal" placeholder="请选择">
                <el-option
                  v-for="item in stuffList"
                  :key="item.stuffId"
                  :label="item.stuffName"
                  :value="item.stuffId"
                ></el-option>
              </el-select>
            </li>
            <!-- 选择入库物料名 -->
            <li class="selNameWrap" v-show="activeName == 'enter'">
              <span>物料名称:</span>
              <el-select v-model="enterForm.materEnterVal" placeholder="请选择">
                <el-option
                  v-for="item in stuffList"
                  :key="item.stuffId"
                  :label="item.stuffName"
                  :value="item.stuffId"
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
              <span>入库时间:</span>
              <el-date-picker
                v-model="enterForm.selEnterTimeVal"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </li>

            <li class="btnsWrap">
              <el-button @click="PostSerBtnFn" type="primary">查询</el-button>
              <el-button @click="clearSerFn">重置</el-button>
            </li>
          </ul>
          <MaterLeaveTables></MaterLeaveTables>
        </el-tab-pane>
        <el-tab-pane label="入库" name="enter">
          <!-- 筛选内容 -->
          <ul class="selWrap">
            <!-- 新增入库 -->
            <li class="btnsWrap leaveEnterBtns">
              <el-button
                v-show="activeName == 'enter'"
                @click="($refs.MaterEnterTables.showAddEnterBox())"
                type="success"
              >
                <i class="el-icon-circle-plus"></i>
                新增入库
              </el-button>
            </li>
            <!-- 选择出库物料名 -->
            <li class="selNameWrap" v-show="activeName == 'leave'">
              <span>物料名称:</span>
              <el-select v-model="leaveForm.materLeaveVal" placeholder="请选择">
                <el-option
                  v-for="item in stuffList"
                  :key="item.stuffId"
                  :label="item.stuffName"
                  :value="item.stuffId"
                ></el-option>
              </el-select>
            </li>
            <!-- 选择入库物料名 -->
            <li class="selNameWrap" v-show="activeName == 'enter'">
              <span>物料名称:</span>
              <el-select v-model="enterForm.materEnterVal" placeholder="请选择">
                <el-option
                  v-for="item in stuffList"
                  :key="item.stuffId"
                  :label="item.stuffName"
                  :value="item.stuffId"
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
              <span>入库时间:</span>
              <el-date-picker
                v-model="enterForm.selEnterTimeVal"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </li>

            <li class="btnsWrap">
              <el-button @click="PostSerBtnFn" type="primary">查询</el-button>
              <el-button @click="clearSerFn">重置</el-button>
            </li>
          </ul>
          <MaterEnterTables
            :selVal="enterForm"
            ref="MaterEnterTables"
            @getStuffList="getStuffList"
            :stuffList="stuffList"
            :adminList="adminList"
          ></MaterEnterTables>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <div class="tabWrap">
      <div v-show="activeName == 'leave'"></div>
      <div v-show=" activeName == 'enter'"></div>
    </div>-->
  </div>
</template>

<script>
import qs from "qs"
import { getUserName, getBoxId, getTime, initNavBar } from '@/Tools/intScaleNum'
import MaterLeaveTables from '@/views/PC/components/Materials/MaterLeaveTables'
import MaterEnterTables from '@/views/PC/components/Materials/MaterEnterTables'
export default {
  name: "Materials",
  components: {
    MaterLeaveTables,
    MaterEnterTables
  },
  data() {
    return {

      // 废弃添加物料相关
      addMaterBox: false,
      addMaterBoxLoad: false,
      // 添加物料表单
      addStuffForm: {
        stuffname: '',
        username: '',
        userid: "",
        time: "",
      },
      // 新增物料验证
      stuffrules: {
        stuffname: [
          { required: true, message: '请输入物料名称', trigger: 'blur' }
        ],
        userid: [
          { required: true, message: '请选择操作人员', trigger: 'blur' }
        ],
      },
      leaveForm: {
        // 所选出库物料
        materLeaveVal: '',
        // 所选出库时间内容
        selLeaveTimeVal: '',
        // 产线id内容
        proIdVal: '',
      },
      enterForm: {
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
      // 物料列表
      stuffList: [],
      // 管理员信息
      adminList: []
    }
  },
  created() {
    // this.$store.dispatch('setTabState', "/page/Materials");
    // 获取物料列表
    this.getStuffList();
    initNavBar(this)
    // 获取操作人员列表
    this.getAdminList();
  },
  methods: {
    // tab切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 提交新增物料表单
    postAddStuff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addMaterBoxLoad = true;
          let username = getUserName(this.adminList, this.addStuffForm.userid);
          this.addStuffForm.time = getTime();
          this.addStuffForm.username = username;
          const data = qs.stringify({
            stuffName: this.addStuffForm.stuffname,
            userName: this.addStuffForm.username
          })
          this.axios.post('api/webapi/stuff/addStuff', data)
            .then(res => {
              if (res.data.code == 200) {
                this.$notify.success({
                  title: '新增物料成功',
                });
                this.getStuffList();
                this.addMaterBox = false;
                addMaterBoxLoad = false;
              }
            })
        } else {
          return false;
        }
      });
    },
    // 关闭并清空新增物料表单
    closeAddStuff(formName) {
      this.addMaterBox = false;
      this.$refs[formName].resetFields();
    },
    // 计时器
    getTime() {
      const time = getTime();
      this.addStuffForm.time = time.slice(0, 10);
    },
    // 获取物料列表
    getStuffList() {
      this.axios.get("api/webapi/warehouse/getAllStuffAmount?contentid=1")
        .then(res => {
          const iconList = [
            "icon-guazi",
            "icon-huasheng",
            "icon-yumi",
            "icon-dadou"
          ]
          const { data } = res.data;
          this.stuffList = data.splice(0, 4);;
          this.stuffList.forEach((item, index) => {
            item.icon = iconList[index];
          });
        })
        .catch(err => console.log(err))
    },
    // 获取操作人列表
    getAdminList() {
      this.axios.get("api/webapi/getUserNameByAccess?useruuid=7be9a8b1a6784ea590af644fa7fb930d")
        .then(res => {
          const { data } = res.data;
          this.adminList = data;
        });

    },
    // 新增物料
    addPackFn() {
      this.addMaterBox = true;
      this.addStuffForm = {};
      this.getTime();
    },
    // 查询方法
    PostSerBtnFn() {
      const { activeName } = this;
      if (activeName == 'leave') {
        const { leaveForm } = this;
        console.log(leaveForm);

        return;
      };
      if (activeName == 'enter') {
        const { enterForm } = this;
        console.log(enterForm);
        this.$refs.MaterEnterTables.emitSelEnterList();
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
  .tabWrap {
    .el-tabs__nav-scroll {
      // display: flex;
      // flex-direction: row-reverse;
    }
  }
  .backBg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    top: 0;
    left: 0;
    z-index: 899;
  }
  .addMaterBox {
    border-radius: 5px;
    width: 500px;
    margin: 0 auto;
    position: fixed;
    top: 200px;
    left: calc(50% - 200px);
    box-sizing: border-box;
    padding: 30px 60px;
    padding-left: 45px;
    background: #fff;
    z-index: 999;
    .closeIcon {
      cursor: pointer;
      position: absolute;
      top: 10px;
      font-weight: 700;
      font-size: 20px;
      right: 10px;
    }
    .item {
      width: 290px;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .hd {
      display: flex;
      width: 100%;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      margin-bottom: 30px;
      padding-bottom: 20px;
      p {
        font-size: 14px;
        span {
          margin-left: 10px;
          display: inline-block;
        }
      }
    }
  }
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