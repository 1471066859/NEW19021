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
    </div>

    <div class="addMaterBox" v-show="addMaterBox" v-loading="addMaterBoxLoad">
      <i class="el-icon-close closeIcon" @click="closeAddStuff('addStuffForm')"></i>
      <div class="hd">
        <h2>新增物料入库</h2>
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
          <el-form-item label="物料名称" prop="stuffid">
            <el-select v-model="addStuffForm.stuffid" placeholder="请选择物料名称">
              <el-option
                v-for="item in stuffList"
                :key="item.id"
                :label="item.stuffName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="操作人" prop="userid">
            <el-select v-model="addStuffForm.userid" placeholder="操作人">
              <el-option
                v-for="item in adminList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userName"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="入库数量" prop="amount">
            <el-input v-model.number="addStuffForm.amount">
              <span slot="suffix" class="kgDes">kg</span>
            </el-input>
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
          <!-- 筛选 -->
          <ul class="selWrap">
            <li class="selNameWrap">
              <span>物料名称:</span>
              <el-select v-model="leaveSel.stuffid" placeholder="请选择">
                <el-option
                  v-for="item in stuffList"
                  :key="item.stuffId"
                  :label="item.stuffName"
                  :value="item.stuffName"
                ></el-option>
              </el-select>
            </li>
            <li class="selTimeWrap">
              <span>出库时间:</span>
              <el-date-picker
                v-model="leaveSel.time"
                type="datetimerange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
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

          <el-table
            :data="stuffTabList"
            height="450"
            style="width: 100%"
            v-loading="tableLoad"
            :header-cell-style="{'background-color': '#fafafa'}"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="batchId" label="批次"></el-table-column>
            <el-table-column prop="stuff.stuffName" label="物料名称"></el-table-column>
            <el-table-column prop="time" label="出库时间"></el-table-column>
            <!-- <el-table-column prop="orderid" label="订单编号"></el-table-column> -->
            <el-table-column prop="amount" label="数量(kg)"></el-table-column>
          </el-table>

          <div class="pageSizeBtn">
            <el-pagination
              background
              @size-change="leaveHandleSizeChange"
              @current-change="leaveHandleCurrentChange"
              :current-page="leaveTable.page"
              :page-size="leaveTable.size"
              :page-sizes="[10, 15, 20, 25]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="leaveTable.count"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="入库" name="enter">
          <ul class="selWrap">
            <li class="btnsWrap leaveEnterBtns">
              <el-button @click="addPackFn" type="success">
                <i class="el-icon-circle-plus"></i>
                新增入库
              </el-button>
            </li>
            <li class="selNameWrap">
              <span>物料名称:</span>
              <el-select v-model="enterSel.stuffid" placeholder="请选择">
                <el-option
                  v-for="item in stuffList"
                  :key="item.stuffId"
                  :label="item.stuffName"
                  :value="item.stuffName"
                ></el-option>
              </el-select>
            </li>
            <li class="selTimeWrap">
              <span>出库时间:</span>
              <el-date-picker
                v-model="enterSel.time"
                type="datetimerange"
                range-separator="至"
                value-format="yyyy-MM-dd HH:mm:ss"
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
          <el-table
            :data="stuffTabList"
            height="450"
            v-loading="tableLoad"
            style="width: 100%"
            :header-cell-style="{'background-color': '#fafafa'}"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="batchId" label="库存编号"></el-table-column>
            <el-table-column prop="stuff.stuffName" label="物料名称"></el-table-column>
            <el-table-column prop="time" label="入库时间"></el-table-column>
            <el-table-column prop="amount" label="数量(kg)"></el-table-column>
            <el-table-column prop="userName" label="操作人员"></el-table-column>
          </el-table>
          <!-- 分页器 -->
          <div class="pageSizeBtn">
            <el-pagination
              background
              @size-change="enterHandleSizeChange"
              @current-change="enterHandleCurrentChange"
              :current-page="enterTable.Page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="enterTable.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="enterTable.count"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import qs from "qs"
import { getUserName, getBoxId, getTime, initNavBar } from '@/Tools/intScaleNum'

export default {
  name: "Materials",
  components: {

  },
  data() {
    return {
      // 料盒入库表单
      addMaterBox: false,
      addMaterBoxLoad: false,
      // 表格数据
      stuffTabList: [],
      // 出库分页
      leaveTable: {
        page: 1,
        size: 10,
        count: 100
      },
      // 入库分页
      enterTable: {
        page: 1,
        size: 10,
        count: 100
      },
      // 表格loading
      tableLoad: false,
      // 添加物料表单
      addStuffForm: {
        stuffname: '',
        username: '',
        userid: "",
        time: "",
      },
      // 新增物料验证
      stuffrules: {
        stuffid: [
          { required: true, message: '请输入物料名称', trigger: 'blur' }
        ],
        userid: [
          { required: true, message: '请选择操作人员', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请选择操作人员', trigger: 'blur' }
        ],
      },
      // 出库筛选
      leaveSel: {
        stuffid: '',
        time: ''
      },
      // 入库筛选
      enterSel: {
        stuffid: '',
        time: ''
      },
      // 标签页内容
      activeName: 'leave',
      // 物料列表
      stuffList: [
        {
          stuffName: '瓜子',
          icon: "icon-guazi",
          stuffId: 1,
          warehouse: {
            amount: 253
          }
        },
        {
          stuffName: '花生',
          stuffId: 2,
          icon: "icon-guazi",
          warehouse: {
            amount: 253
          }
        },
        {
          stuffName: '玉米',
          stuffId: 3,
          icon: "icon-guazi",
          warehouse: {
            amount: 253
          }
        },
        {
          stuffName: '大豆',
          stuffId: 4,
          icon: "icon-guazi",
          warehouse: {
            amount: 253
          }
        }
      ],
      // 管理员信息
      adminList: [
        {
          userName: "mql",
          userId: 1,
        },
        {
          userName: "mql1",
          userId: 2,
        }
      ]
    }
  },
  created() {
    // 获取物料列表
    this.getStuffList();
    this.getMaterLeaveList(this.leaveTable.page, this.leaveTable.size, this.leaveSel);
    initNavBar(this)
    // 获取操作人员列表
    this.getAdminList()
  },
  watch: {
    activeName(val) {
      // 初始化分页条件
      this.leaveTable.page = 1;
      this.leaveTable.size = 10;
      this.enterTable.page = 1;
      this.enterTable.size = 10;
      if (val == 'leave') {
        // 出库
        const page = this.leaveTable.page;
        const size = this.leaveTable.size;
        const sel = this.leaveSel;
        this.getMaterLeaveList(page, size, sel);
      } else if (val == "enter") {
        // 入库
        const page = this.enterTable.page;
        const size = this.enterTable.size;
        const sel = this.enterSel;
        this.getMaterEnterList(page, size, sel);
      };
    }
  },
  methods: {
    PostSerBtnFn() {
      const { activeName } = this;
      if (activeName == "leave") {
        // 出库查询
        const page = this.leaveTable.page;
        const size = this.leaveTable.size;
        const sel = this.leaveSel;
        this.getMaterLeaveList(page, size, sel);
      }
      if (activeName == "enter") {
        // 入库查询
        const page = this.enterTable.page;
        const size = this.enterTable.size;
        const sel = this.enterSel;
        this.getMaterEnterList(page, size, sel);
      }
    },
    clearSerFn() {
      const { activeName } = this;
      if (activeName == "leave") {
        // 出库清空
        this.leaveSel = {
          stuffid: "",
          time: ""
        }
      } else if (activeName == "enter") {
        // 入库清空
        this.enterSel = {
          stuffid: "",
          time: ""
        }
      }
    },
    // tab切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 提交新增物料表单
    postAddStuff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addMaterBoxLoad = true;
          // let username = getUserName(this.adminList, this.addStuffForm.userid);
          this.addStuffForm.time = getTime();
          // this.addStuffForm.username = username;
          const data = {
            contentType: 1,
            outInType: 1,
            contentId: this.addStuffForm.stuffid,
            amount: this.addStuffForm.amount,
            userName: this.addStuffForm.username
          }
          console.log(data, '物料信息新增');
          this.axios.post('api/webapi/warehouse/insertWarehouseInfo', qs.stringify(data))
            .then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$notify.success({
                  title: '新增物料成功',
                });
                this.getStuffList();
                this.addMaterBox = false;
                this.addMaterBoxLoad = false;
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
      console.log(this.addStuffForm.time, 1111);
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
          this.stuffList = data.splice(0, 4);
          this.stuffList.forEach((item, index) => {
            item.icon = iconList[index];
          });
        })
        .catch(err => console.log(err))
    },
    // 获取操作人列表
    getAdminList() {
      this.axios.get("api/webapi/user/getAdministrator")
        .then(res => {
          console.log(res, '操作人');
          const { data } = res.data;
          this.adminList = data;
        });

    },
    // 新增物料
    addPackFn() {
      console.log(123);
      this.addMaterBox = true;
      this.addStuffForm = {};
      this.getTime();
    },
    // 拉取物料入库信息
    getMaterEnterList(page, size, sel) {
      this.tableLoad = true;
      const data = {
        contentType: 1,
        outInType: 1,
        pageNum: page,
        pageSize: size,
        contentName: sel.stuffid,
        outInTimeStart: sel.time[0],
        outInTimeEnd: sel.time[1]
      };
      const parms = {}
      if (data.contentName != "") parms.contentName = data.contentName;
      if (data.outInTimeStart != "") parms.outInTimeStart = data.outInTimeStart;
      if (data.outInTimeEnd != "") parms.outInTimeEnd = data.outInTimeEnd;
      parms.contentType = 1;
      parms.outInType = 1;
      parms.pageNum = page;
      parms.pageSize = size;
      console.log(data,'入库信息');
      this.axios.post('api/webapi/warehouse/getOutinWarehouseInfo', qs.stringify(parms))
        .then(res => {
          console.log(res,'入库数据表格');
          const { data } = res.data
          this.enterTable.count = res.data.count;
          this.stuffTabList = data;
          this.tableLoad = false;
        })
    },
    // 拉取物料出库列表
    getMaterLeaveList(page, size, sel) {
      this.tableLoad = true;
      const data = {
        contentType: 1,
        outInType: 2,
        pageNum: page,
        pageSize: size,
        contentName: sel.stuffid,
        outInTimeStart: sel.time[0],
        outInTimeEnd: sel.time[1]
      };
      const parms = {}
      if (data.contentName != "") parms.contentName = data.contentName;
      if (data.outInTimeStart != "") parms.outInTimeStart = data.outInTimeStart;
      if (data.outInTimeEnd != "") parms.outInTimeEnd = data.outInTimeEnd;
      parms.contentType = 1;
      parms.outInType = 2;
      parms.pageNum = page;
      parms.pageSize = size;
      console.log(data);
      this.axios.post('api/webapi/warehouse/getOutinWarehouseInfo', qs.stringify(parms))
        .then(res => {
          console.log(res, '出库信息');
          this.leaveTable.count = res.data.count;
          const { data } = res.data;
          this.stuffTabList = data;
          this.tableLoad = false;
        })
    },
    // 出库分页器相关
    leaveHandleSizeChange(val) {
      this.leaveTable.size = val;
      const page = this.leaveTable.page;
      const size = this.leaveTable.page;
      const sel = this.leaveSel;
      this.getMaterLeaveList(page, size, sel);
    },
    leaveHandleCurrentChange(val) {
      this.userPage = val;
      const page = this.leaveTable.page;
      const size = this.leaveTable.page;
      const sel = this.leaveSel;
      this.getMaterLeaveList(page, size, sel);
      console.log(`当前页: ${val}`);
    },

    // 入库分页器相关
    enterHandleSizeChange(val) {
      this.roleUserSize = val;
      console.log(`每页 ${val} 条`);
      const page = this.enterTable.page;
      const size = this.enterTable.size;
      const sel = this.enterSel;
      this.getMaterEnterList(page, size, sel);
    },
    enterHandleCurrentChange(val) {
      this.roleUserPage = val;
      console.log(`当前页: ${val}`);
      const page = this.enterTable.page;
      const size = this.enterTable.size;
      const sel = this.enterSel;
      this.getMaterEnterList(page, size, sel);
    },
  },

}
</script>

<style lang="scss" scope>
.materials {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  .tabWrap {
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