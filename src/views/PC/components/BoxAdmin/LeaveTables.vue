<template>
  <div class="leaveTables">
    <el-table
      :data="leaveAdminList"
      height="520"
      style="width: 100%"
      :header-cell-style="{'background-color': '#fafafa'}"
    >
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="batch" label="入库批次"></el-table-column>
      <el-table-column prop="packname" label="料号型号"></el-table-column>
      <el-table-column prop="time" label="出库时间"></el-table-column>
      <el-table-column prop="stuffname" label="物料类型"></el-table-column>
      <el-table-column prop="amount" label="出库数量"></el-table-column>
      <el-table-column prop="orderid" label="订单编号"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pageSizeBtn">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="leavePage"
        :page-sizes="[10, 15, 20, 25]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeaveTables",
  data() {
    return {
      leavePage: 1,
      // 出库管理列表
      leaveAdminList: [],
      page: 1,
      size: 10
    }
  },
  created() {
    // 初始化入库数据
    this.getInitBoxLeaveData(this.page, this.size)
  },
  methods: {
    // 初始化入库数据
    getInitBoxLeaveData(page, size) {
      // console.log(page, size)
      const data = [
        {
          index: 1,
          model: '大',
          leaveTime: '2018-12-30 12:20:30',
          class: 'A',
          ID: "D3659",
          state: "投料中"
        },
        {
          index: 2,
          model: '大',
          leaveTime: '2018-12-30 12:20:30',
          class: 'A',
          ID: "D3659",
          state: "投料中"
        },
        {
          index: 3,
          model: '大',
          leaveTime: '2018-12-30 12:20:30',
          class: 'A',
          ID: "D3659",
          state: "投料中"
        },
        {
          index: 4,
          model: '大',
          leaveTime: '2018-12-30 12:20:30',
          class: 'A',
          ID: "D3659",
          state: "投料中"
        },
        {
          index: 5,
          model: '大',
          leaveTime: '2018-12-30 12:20:30',
          class: 'A',
          ID: "D3659",
          state: "投料中"
        },
        {
          index: 6,
          model: '大',
          leaveTime: '2018-12-30 12:20:30',
          class: 'A',
          ID: "D3659",
          state: "投料中"
        },
        {
          index: 7,
          model: '大',
          leaveTime: '2018-12-30 12:20:30',
          class: 'A',
          ID: "D3659",
          state: "投料中"
        },
        {
          index: 8,
          model: '大',
          leaveTime: '2018-12-30 12:20:30',
          class: 'A',
          ID: "D3659",
          state: "投料中"
        },
        {
          index: 9,
          model: '大',
          leaveTime: '2018-12-30 12:20:30',
          class: 'A',
          ID: "D3659",
          state: "投料中"
        },
        {
          index: 10,
          model: '大',
          leaveTime: '2018-12-30 12:20:30',
          class: 'A',
          ID: "D3659",
          state: "投料中"
        }
      ];
      this.axios.get("http://localhost:53000/boxLeave")
        .then(res => {
          const { data } = res;
          data.forEach((item, index) => {
            item.index = ++index
          });
          this.leaveAdminList = res.data;
        });
    },
    // 切换条数方法
    handleSizeChange(val) {
      this.size = val;
      const { page, size } = this;
      this.getInitBoxLeaveData(page, size);
    },
    //切换页数方法
    handleCurrentChange(val) {
      this.page = val;
      const { page, size } = this;
      this.getInitBoxLeaveData(page, size);
    }
  }
}
</script>