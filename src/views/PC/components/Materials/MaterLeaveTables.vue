<template>
  <div class="materLeaveTables">
    <el-table
      :data="materLeaveList"
      height="510"
      style="width: 100%"
      :header-cell-style="{'background-color': '#fafafa'}"
    >
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="batchid" label="批次"></el-table-column>
      <el-table-column prop="stuffname" label="物料名称"></el-table-column>
      <el-table-column prop="time" label="出库时间"></el-table-column>
      <el-table-column prop="orderid" label="订单编号"></el-table-column>
      <el-table-column prop="proid" label="产线编号"></el-table-column>
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
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "MaterLeaveTables",
  data() {
    return {
      // 当前页
      leavePage: 1,
      // 出库表格内容
      materLeaveList: []
    }
  },
  created() {
    this.getMaterLeaveList(this.page, this.size);
  },
  methods: {
    // 拉取物料出库列表
    getMaterLeaveList(page, size) {
      this.axios.get('http://localhost:53000/stuffLeaveList')
        .then(res => {
          const { data } = res;
          data.forEach((item, index) => {
            item.index = ++index;
          });
          this.materLeaveList = data;
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