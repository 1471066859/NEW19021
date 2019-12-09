<template>
  <div class="materials">
    <h1>成品出入库管理</h1>
    <!--物料数量 -->
    <div class="materWrap">
      <div class="item" v-for="(item,index) in stuffList" :key="index">
        <i class="iconfont" :class="item.icon"></i>
        <div class="msgWrap">
          <p>{{item.name}}</p>
          <h2 v-if="item">
            {{item.amount}}
            <span>个</span>
          </h2>
        </div>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="tabWrap">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="出库" name="leave">
          <!-- 筛选 -->
          <ul class="selWrap">
            <!-- <li class="btnsWrap leaveEnterBtns">
              <el-button type="success">
                <i class="el-icon-circle-plus"></i>
                批量出库
              </el-button>
            </li>-->
            <li class="selNameWrap" style="display:flex; align-items:center">
              <span>下单人:</span>
              <div style="width:170px">
                <el-autocomplete
                  class="inline-input"
                  v-model="leaveSel.userName"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入下单人姓名"
                  suffix-icon="el-icon-user"
                  :trigger-on-focus="false"
                ></el-autocomplete>
              </div>
            </li>
            <li class="selNameWrap" style="display:flex; align-items:center">
              <span>订单编号:</span>
              <div style="width:170px">
                <el-input
                  placeholder="请输入订单编号"
                  suffix-icon="el-icon-edit-outline"
                  v-model="leaveSel.orderId"
                ></el-input>
              </div>
            </li>
            <li class="selNameWrap" style="display:flex; align-items:center">
              <span>成品编号:</span>
              <div style="width:170px">
                <el-input
                  placeholder="请输入成品编号"
                  suffix-icon="el-icon-edit-outline"
                  v-model="leaveSel.batchId"
                ></el-input>
              </div>
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
            height="480"
            style="width: 100%"
            ref="multipleTable"
            v-loading="tableLoad"
            :header-cell-style="{'background-color': '#fafafa'}"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="batchId" label="批次"></el-table-column>
            <el-table-column prop="orderId" label="订单编号"></el-table-column>
            <el-table-column prop="time" label="出库时间"></el-table-column>
            <el-table-column prop="admin" label="操作人"></el-table-column>
            <el-table-column prop="des" label="操作" width="50">
              <template slot-scope="scope">
                <el-button
                  @click="leaveFn(scope.row.id,scope.row.batchId)"
                  type="text"
                  size="small"
                >出库</el-button>
              </template>
            </el-table-column>

            <el-table-column v-if="tabSel" type="selection" width="55"></el-table-column>
            <el-table-column align="right">
              <template slot="header">
                <el-button v-show="tabSel" type="success" @click="postLeave">
                  <i class="el-icon-circle-plus"></i>
                  批量出库
                </el-button>
                <el-button :type="tabSelBtn" @click="tabSelFn">
                  <i class="el-icon-circle-plus"></i>
                  {{tabSelText}}
                </el-button>
              </template>
            </el-table-column>
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
            <li class="selNameWrap" style="display:flex; align-items:center">
              <span>下单人:</span>
              <div style="width:170px">
                <el-autocomplete
                  class="inline-input"
                  v-model="enterSel.userName"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入下单人姓名"
                  suffix-icon="el-icon-user"
                  :trigger-on-focus="false"
                ></el-autocomplete>
              </div>
            </li>
            <li class="selNameWrap" style="display:flex; align-items:center">
              <span>订单编号:</span>
              <div style="width:170px">
                <el-input
                  placeholder="请输入订单编号"
                  suffix-icon="el-icon-edit-outline"
                  v-model="enterSel.orderId"
                ></el-input>
              </div>
            </li>
            <li class="selNameWrap" style="display:flex; align-items:center">
              <span>成品编号:</span>
              <div style="width:170px">
                <el-input
                  placeholder="请输入成品编号"
                  suffix-icon="el-icon-edit-outline"
                  v-model="enterSel.batchId"
                ></el-input>
              </div>
            </li>
            <li class="selTimeWrap">
              <span>入库时间:</span>
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
            height="480"
            v-loading="tableLoad"
            style="width: 100%"
            :header-cell-style="{'background-color': '#fafafa'}"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="batchId" label="批次"></el-table-column>
            <el-table-column prop="orderId" label="物料名称"></el-table-column>
            <el-table-column prop="time" label="入库时间"></el-table-column>
            <el-table-column prop="userName" label="下单人"></el-table-column>
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
import { initNavBar } from '@/Tools/intScaleNum'
import { querySearch, createFilter, getUserList } from '@/views/PC/orderAdmin/components/common'

export default {
  name: "Materials",
  components: {

  },
  computed: {
    tabSelBtn() {
      let type = ""
      this.tabSel ? type = "" : type = "success";
      return type;
    },
    tabDes() {
      let key = false;
      this.tabSel ? key = false : key = true;
      return key;
    },
  },
  data() {
    return {
      leaveList: [],
      tabSelText: "批量出库",
      // 多选key
      tabSel: false,
      // 表格数据
      stuffTabList: [],
      // 出库分页
      leaveTable: {
        page: 1,
        size: 10,
        count: null
      },
      // 入库分页
      enterTable: {
        page: 1,
        size: 10,
        count: null
      },
      // 表格loading
      tableLoad: false,
      // 出库筛选
      leaveSel: {
        userName: '',
        orderId: "",
        batchId: "",
        time: ''
      },
      // 入库筛选
      enterSel: {
        userName: '',
        orderId: "",
        batchId: "",
        time: ''
      },
      // 标签页内容
      activeName: 'leave',
      // 物料列表
      stuffList: [
      ],
      // 管理员信息
      userList: [
      ]
    }
  },
  created() {
    // 获取物料列表
    this.getStuffList();
    this.getMaterLeaveList(this.leaveTable.page, this.leaveTable.size, this.leaveSel);
    initNavBar(this)
    this.getUserList();
  },
  watch: {
    tabSel(val) {
      if (val) {
        this.tabSelText = "取消多选";
      } else {
        this.tabSelText = "批量出库"
      }
    },
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
    postLeave() {
      console.log(this.leaveList);
      if (this.leaveList.length <= 0) {
        this.$notify({
          type: 'warning',
          title: `操作失败`,
          message: `请选择需出库成品`,
          // duration: 0
        });
      } else {
        this.tabSel = false;
        this.$refs.multipleTable.clearSelection();
      }
    },
    tabSelFn() {
      this.tabSel = !this.tabSel;
      if (!this.tabSel) {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.leaveList = val;
    },
    leaveFn(id, orderId) {
      if (this.tabSel) {
        const item = this.stuffTabList.find(item => {
          return item.id == id;
        });
        this.$refs.multipleTable.toggleRowSelection(item)
      } else {
        console.log(id);
        this.$confirm(`您确定要为成品<span class="confirmOrderId">${orderId}</span>提交出库申请吗?`, '提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          const data = this.qs.stringify({
            id: JSON.stringify([id])
          })
          this.axios.post('/api/webapi/order/updateOrderState', data)
            .then(res => {
              console.log(res, '立即开始生产订单！！！！');
              const { code, msg } = res.data;
              if (code == 200) {
                this.loading = false;
                this.$notify({
                  type: 'success',
                  title: `${orderId} 操作成功`,
                  message: `${orderId}已出库`
                });
                this.getMaterLeaveList(this.page, this.size, this.leaveSel);
              } else {
                this.loading = false;
                this.$notify({
                  type: 'error',
                  title: `${orderId} 操作失败`,
                  message: `删除失败原因`,
                  duration: 0
                });
                this.getMaterLeaveList(this.page, this.size, this.leaveSel);
              }
            })
            .catch(err => console.log(err));
        }).catch(() => {
          this.$notify({
            type: 'success',
            title: '已取消操作',
          });
        });
      }
    },
    querySearch,
    createFilter,
    getUserList,

    PostSerBtnFn() {
      const { activeName } = this;
      if (activeName == "leave") {
        // 出库查询
        this.leaveTable.page = 1;
        // this.leaveTable.size = 10;
        const page = this.leaveTable.page;
        const size = this.leaveTable.size;
        const sel = this.leaveSel;
        this.getMaterLeaveList(page, size, sel);
      }
      if (activeName == "enter") {
        // 入库查询
        this.enterTable.page = 1;
        // this.enterTable.size = 10;
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
          userName: '',
          orderId: "",
          batchId: "",
          time: ""
        }
      } else if (activeName == "enter") {
        // 入库清空
        this.enterSel = {
          userName: '',
          orderId: "",
          batchId: "",
          time: '',
        }
      }
    },
    // tab切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 获取物料列表
    getStuffList() {
      this.axios.get("/api/webapi/warehouse/getAllStuffAmount?contentid=1")
        .then(res => {
          const iconList = [
            "icon-guazi",
            "icon-huasheng",
            "icon-yumi",
            "icon-dadou"
          ]
          const testData = [
            // {
            //   icon: "icon-guazi",
            //   name: "出库",
            //   amount: 11
            // },
            {
              icon: "icon-guazi",
              name: "库存成品数量",
              amount: 332
            }
          ];
          this.stuffList = testData;
          return;
          const { data } = res.data;
          this.stuffList = data.splice(0, 4);
          this.stuffList.forEach((item, index) => {
            item.icon = iconList[index];
          });
        })
        .catch(err => console.log(err))
    },

    // 拉取物料入库信息
    getMaterEnterList(page, size, sel) {
      const testData = [
        {
          id: 1,
          "batchId": 123,
          "orderId": 321,
          "userName": "mql",
          "time": "2012-12-30 12:30:20",
          "admin": "mql"
        },
        {
          id: 2,
          "batchId": 123,
          "orderId": 321,
          "userName": "mql",
          "time": "2012-12-30 12:30:20",
          "admin": "mql"
        },
        {
          id: 3,
          "batchId": 123,
          "orderId": 321,
          "userName": "mql",
          "time": "2012-12-30 12:30:20",
          "admin": "mql"
        },
      ];
      this.stuffTabList = testData;
      this.tableLoad = false;
      return;
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
      console.log(data, '入库信息');
      this.axios.post('/api/webapi/warehouse/getOutinWarehouseInfo', qs.stringify(parms))
        .then(res => {
          console.log(res, '入库数据表格');
          const { data } = res.data
          this.enterTable.count = res.data.count;
          this.stuffTabList = data;
          this.tableLoad = false;
        })
    },
    // 拉取物料出库列表
    getMaterLeaveList(page, size, sel) {
      const testData = [
        {
          id: 1,
          "batchId": 123,
          "orderId": 321,
          "userName": "mql",
          "time": "2012-12-30 12:30:20",
          "admin": "mql"
        },
        {
          id: 2,
          "batchId": 123,
          "orderId": 321,
          "userName": "mql",
          "time": "2012-12-30 12:30:20",
          "admin": "mql"
        },
        {
          id: 3,
          "batchId": 123,
          "orderId": 321,
          "userName": "mql",
          "time": "2012-12-30 12:30:20",
          "admin": "mql"
        },
      ];
      this.stuffTabList = testData;
      this.tableLoad = false;
      return;
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
      this.axios.post('/api/webapi/warehouse/getOutinWarehouseInfo', qs.stringify(parms))
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
      // this.userPage = val;
      this.leaveTable.page = val;
      const page = this.leaveTable.page;
      const size = this.leaveTable.page;
      const sel = this.leaveSel;
      this.getMaterLeaveList(page, size, sel);
      console.log(`当前页: ${val}`);
    },

    // 入库分页器相关
    enterHandleSizeChange(val) {
      this.enterTable.size = val;
      console.log(`每页 ${val} 条`);
      const page = this.enterTable.page;
      const size = this.enterTable.size;
      const sel = this.enterSel;
      this.getMaterEnterList(page, size, sel);
    },
    enterHandleCurrentChange(val) {
      this.enterTable.page = val;
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
.confirmOrderId {
  color: #f56c6c;
  display: inline-block;
  padding: 0 5px;
  font-weight: 700;
}
.btnsWrap {
}
@import "@/views/PC/depot/components/common.scss";
</style>