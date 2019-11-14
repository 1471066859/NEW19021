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
      <el-table-column prop="outInTime" label="出库时间"></el-table-column>
      <el-table-column prop="orderid" label="订单编号"></el-table-column>
      <el-table-column prop="proid" label="产线编号"></el-table-column>
      <el-table-column prop="outinAmount" label="数量"></el-table-column>
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
    this.getMaterLeaveList(this.page, this.size);

  },
  methods: {
    // 拉取物料出库列表
    getMaterLeaveList(page, size) {
      this.tableLoad = true;
      const data = qs.stringify({
        contentType: 1,
        outInType: 2,
        pageNum: page,
        pageSize: size,
      })
      this.axios.post('api/webapi/warehouse/getOutinWarehouseInfo', data)
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