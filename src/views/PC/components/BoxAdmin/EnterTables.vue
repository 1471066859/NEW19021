<template>
  <div class="enterTables">
    <el-table
      :data="enterAdminList"
      height="520"
      style="width: 100%"
      size= 'mini'
      :header-cell-style="{'background-color': '#fafafa'}"
    >
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="ID" label="料盒编号"></el-table-column>
      <el-table-column prop="model" label="型号"></el-table-column>
      <el-table-column prop="enterTime" label="入库时间"></el-table-column>
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
    <AddEnterBox
      ref="AddEnterBox"
      @postFormFn="postFormFn"
      :boxVersion="true"
      :adminPeople="true"
      :boxId="true"
    ></AddEnterBox>
  </div>
</template>

<script>
import AddEnterBox from '@/views/PC/components/AddEnterBox'
export default {
  name: 'EnterTables',
  components: {
    AddEnterBox
  },
  data() {
    return {
      addEnterBox: false,
      // 默认页数
      enterPage: 1,
      // 入库管理列表
      enterAdminList: null,
      // 当前页数
      page: 1,
      // 当前展示条数
      size: 10
    }
  },
  created() {
    // 初始化入库数据
    this.getInitBoxEnterData(this.page, this.size);
  },
  methods: {
    // 初始化入库数据
    getInitBoxEnterData(page, size) {
      console.log(page, size)
      const data = [
        {
          index: 1,
          ID: "D5696",
          model: "大",
          enterTime: "2018-1230 12:30:40",
          people: "小张"
        },
        {
          index: 2,
          ID: "D5696",
          model: "大",
          enterTime: "2018-1230 12:30:40",
          people: "小张"
        },
        {
          index: 3,
          ID: "D5696",
          model: "大",
          enterTime: "2018-1230 12:30:40",
          people: "小张"
        },
        {
          index: 4,
          ID: "D5696",
          model: "大",
          enterTime: "2018-1230 12:30:40",
          people: "小张"
        },
        {
          index: 5,
          ID: "D5696",
          model: "大",
          enterTime: "2018-1230 12:30:40",
          people: "小张"
        },
        {
          index: 6,
          ID: "D5696",
          model: "大",
          enterTime: "2018-1230 12:30:40",
          people: "小张"
        },
        {
          index: 7,
          ID: "D5696",
          model: "大",
          enterTime: "2018-1230 12:30:40",
          people: "小张"
        },
        {
          index: 8,
          ID: "D5696",
          model: "大",
          enterTime: "2018-1230 12:30:40",
          people: "小张"
        },
        {
          index: 9,
          ID: "D5696",
          model: "大",
          enterTime: "2018-1230 12:30:40",
          people: "小张"
        },
        {
          index: 10,
          ID: "D5696",
          model: "大",
          enterTime: "2018-1230 12:30:40",
          people: "小张"
        }
      ];
      this.enterAdminList = data;
    },
    // 新增入库弹窗
    showAddEnterBox() {
      this.$refs.AddEnterBox.showAddEnterBox();
    },
    // 提交入库表单
    postFormFn(data) {
      console.log(data);
    },
    // 切换条数方法
    handleSizeChange(val) {
      this.size = val;
      const { page, size } = this;
      this.getInitBoxEnterData(page, size);
    },
    //切换页数方法
    handleCurrentChange(val) {
      this.page = val;
      const { page, size } = this;
      this.getInitBoxEnterData(page, size);
    }
  }
}
</script>

<style lang="scss" scoped>
.enterTables {
}
</style>