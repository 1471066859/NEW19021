<template>
  <div class="materLeaveTables">
    <el-table
      :data="materLeaveList"
      height="490"
      style="width: 100%"
      v-loading="tableLoad"
      :header-cell-style="{'background-color': '#fafafa'}"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="batchId" label="批次"></el-table-column>
      <el-table-column prop="stuff.stuffName" label="物料名称"></el-table-column>
      <el-table-column prop="time" label="出库时间"></el-table-column>
      <!-- <el-table-column prop="orderid" label="订单编号"></el-table-column> -->
      <el-table-column prop="amount" label="数量"></el-table-column>
    </el-table>

    <div class="pageSizeBtn">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="leavePage"
        :page-sizes="[10, 15, 20, 25]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sizeCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs"
export default {
  name: "MaterLeaveTables",
  props: {
    // 筛选
    selVal: {
      type: Object,
      default: {

      }
    }
  },
  data() {
    return {
      // 当前页
      leavePage: 1,
      // 出库表格内容
      materLeaveList: [],
      page: 1,
      size: 10,
      tableLoad: false,
      sizeCount: 100
    }
  },
  created() {
    console.log(this.selVal, 1312);
    this.getMaterLeaveList(this.page, this.size, this.selVal);

  },
  methods: {
    // 拉取物料出库列表
    getMaterLeaveList(page, size, sel) {
      this.tableLoad = true;
      const parms = {};
      if (sel.materEnterVal != "") parms.materEnterVal = sel.materEnterVal;
      if (sel.selEnterTimeVal != "") parms.selEnterTimeVal[0] = sel.selEnterTimeVal[0];
      if (sel.selEnterTimeVal != "") parms.selEnterTimeVal[1] = sel.selEnterTimeVal[1];
      parms.contentType = 1;
      parms.outInType = 2;
      parms.pageNum = page;
      parms.pageSize = size;
      const data = qs.stringify({
        contentType: 1,
        outInType: 2,
        pageNum: page,
        pageSize: size,
        contentName: sel.materEnterVal,
        outInTimeStart: sel.selEnterTimeVal[0],
        outInTimeEnd: sel.selEnterTimeVal[0]
      })
      this.axios.post('api/webapi/warehouse/getOutinWarehouseInfo', qs.stringify(parms))
        .then(res => {
          this.sizeCount = res.data.count;
          const { data } = res.data;
          this.materLeaveList = data;
          this.tableLoad = false;
        })
    },
    // 切换每页条数方法
    handleSizeChange(val) {
      this.size = val;
      const { page, size } = this;
      this.getMaterLeaveList(page, size);
    },
    //切换页数方法
    handleCurrentChange(val) {
      this.page = val;
      const { page, size } = this;
      this.getMaterLeaveList(page, size);
    }
  }
}
</script>

<style lang="scss" scope>
.materLeaveTables {
}
</style>