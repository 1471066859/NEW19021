<template>
  <div class="materLeaveTables">
    <el-table
      :data="materLeaveList"
      height="510"
      style="width: 100%"
      :header-cell-style="{'background-color': '#fafafa'}"
    >
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="id" label="库存编号"></el-table-column>
      <el-table-column prop="name" label="物料名称"></el-table-column>
      <el-table-column prop="time" label="出库时间"></el-table-column>
      <el-table-column prop="orderId" label="订单编号"></el-table-column>
      <el-table-column prop="proId" label="产线编号"></el-table-column>
      <el-table-column prop="count" label="数量"></el-table-column>
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
      materLeaveList: [
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          time: "2012-12-3 12:30:20",
          orderId: '4D34gB',
          proId: '1',
          count: "12"
        },
      ],
    }
  },
  methods: {
    // 切换每页条数方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //切换页数方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="scss" scope>
.materLeaveTables {
}
</style>