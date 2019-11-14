<template>
  <div class="leaveTables">
    <el-table
      :data="leaveAdminList"
      height="520"
      v-loading="tableLoad"
      style="width: 100%"
      :header-cell-style="{'background-color': '#fafafa'}"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="batchId" label="入库批次"></el-table-column>
      <el-table-column prop="pack.packName" label="料号型号"></el-table-column>
      <el-table-column prop="outInTime" label="出库时间"></el-table-column>
      <el-table-column prop="stuffname" label="物料类型"></el-table-column>
      <el-table-column prop="outinAmount" label="出库数量"></el-table-column>
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
        :total="sizeCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: "LeaveTables",
  data() {
    return {
      leavePage: 1,
      // 出库管理列表
      leaveAdminList: [],
      page: 1,
      size: 10,
      sizeCount: 100,
      tableLoad: false,
    }
  },
  created() {
    // 初始化入库数据
    this.getInitBoxLeaveData(this.page, this.size)
  },
  methods: {
    // 初始化入库数据
    getInitBoxLeaveData(page, size) {
      this.tableLoad = true;
      // 拉取料盒信息列表
      const data = qs.stringify({
        contentType: 2,
        outInType: 2,
        pageNum: page,
        pageSize: size,
      });
      this.axios.post('api/webapi/warehouse/getOutinWarehouseInfo', data)
        .then(res => {
          const { data } = res.data;
          this.leaveAdminList = data;
          this.sizeCount = res.data.count;
          this.tableLoad = false;
        })
        .catch(err => {
          console.log(err);
        })

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