<template>
  <div class="materEnterTables">
    <el-table
      :data="materEnterList"
      height="510"
      style="width: 100%"
      :header-cell-style="{'background-color': '#fafafa'}"
    >
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="id" label="库存编号"></el-table-column>
      <el-table-column prop="name" label="物料名称"></el-table-column>
      <el-table-column prop="batch" label="入库批次"></el-table-column>
      <el-table-column prop="time" label="入库时间"></el-table-column>
      <el-table-column prop="supplier" label="供应商"></el-table-column>
      <el-table-column prop="cowunt" label="数量(kg)"></el-table-column>
      <el-table-column prop="people" label="操作人员"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="primary" @click="showAddEnterBox">
            <i class="el-icon-circle-plus"></i>新增入库
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pageSizeBtn">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="enterPage"
        :page-sizes="[10, 15, 20, 25]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>

    <!-- 入库表单 -->
    <AddEnterBox
      ref="AddEnterBox"
      @postFormFn="postFormFn"
      :packName="true"
      :supplier="true"
      :adminPeople="true"
      :count="true"
    ></AddEnterBox>
  </div>
</template>
<script>
import AddEnterBox from '@/views/PC/components/AddEnterBox'
export default {
  name: "MaterEnterTables",
  components: {
    AddEnterBox
  },
  data() {
    return {
      // 入库表格内容
      materEnterList: [
        {
          index: 1,
          id: 'D2356',
          name: "A",
          batch: "3",
          time: "2012-12-3 12:30:20",
          supplier: '商家名称',
          count: "12",
          people: "张三"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          batch: "3",
          time: "2012-12-3 12:30:20",
          supplier: '商家名称',
          count: "12",
          people: "张三"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          batch: "3",
          time: "2012-12-3 12:30:20",
          supplier: '商家名称',
          count: "12",
          people: "张三"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          batch: "3",
          time: "2012-12-3 12:30:20",
          supplier: '商家名称',
          count: "12",
          people: "张三"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          batch: "3",
          time: "2012-12-3 12:30:20",
          supplier: '商家名称',
          count: "12",
          people: "张三"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          batch: "3",
          time: "2012-12-3 12:30:20",
          supplier: '商家名称',
          count: "12",
          people: "张三"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          batch: "3",
          time: "2012-12-3 12:30:20",
          supplier: '商家名称',
          count: "12",
          people: "张三"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          batch: "3",
          time: "2012-12-3 12:30:20",
          supplier: '商家名称',
          count: "12",
          people: "张三"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          batch: "3",
          time: "2012-12-3 12:30:20",
          supplier: '商家名称',
          count: "12",
          people: "张三"
        },
        {
          index: 1,
          id: 'D2356',
          name: "A",
          batch: "3",
          time: "2012-12-3 12:30:20",
          supplier: '商家名称',
          count: "12",
          people: "张三"
        },

      ],
      // 当前也
      enterPage: 1
    }
  },
  methods: {
    // 提交入库表单数据
    postFormFn(data) {
      console.log(data);
    },
    // 添加入库表单显示
    showAddEnterBox() {
      this.$refs.AddEnterBox.showAddEnterBox();
    },
    // 切换每页条数方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //切换页数方法
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
}
</script>