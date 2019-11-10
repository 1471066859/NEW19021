<template>
  <div class="materEnterTables">
    <el-table
      :data="materEnterList"
      height="510"
      style="width: 100%"
      :header-cell-style="{'background-color': '#fafafa'}"
    >
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="batchid" label="库存编号"></el-table-column>
      <el-table-column prop="stuffname" label="物料名称"></el-table-column>
      <el-table-column prop="time" label="入库时间"></el-table-column>
      <el-table-column prop="supplier" label="供应商"></el-table-column>
      <el-table-column prop="amount" label="数量(kg)"></el-table-column>
      <el-table-column prop="username" label="操作人员"></el-table-column>
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
      :adminList="adminList"
      :stuffList="stuffList"
    ></AddEnterBox>
  </div>
</template>
<script>
import { getStuffName } from '@/Tools/intScaleNum'
import AddEnterBox from '@/views/PC/components/AddEnterBox'
export default {
  name: "MaterEnterTables",
  components: {
    AddEnterBox
  },
  props: {
    adminList: {
      type: Array,
      default: []
    },
    stuffList: {
      type: Array,
      default: []
    }
  },
  created() {
    this.getMaterEnterList(this.page, this.size);
  },
  data() {
    return {
      // 入库表格内容
      materEnterList: [],
      // 当前也
      enterPage: 1
    }
  },
  methods: {
    // 拉取物料入库信息
    getMaterEnterList(page, size) {
      this.axios.get('http://localhost:53000/stuffEnterList')
        .then(res => {
          const { data } = res;
          data.forEach((item, index) => {
            item.index = ++index;
          });
          this.materEnterList = data;
        })
    },
    // 提交入库表单数据
    postFormFn(data) {
      // console.log(data)
      const stuffname = getStuffName(this.stuffList, data.packName);
      const obj = {
        stuffname,
        stuffid: data.packName,
        amount: data.count,
        username: data.username,
        userid: data.userid,
        supplier: data.supplier,
        time: data.time
      };
      console.log(obj)
    },
    // 添加入库表单显示
    showAddEnterBox() {
      this.$refs.AddEnterBox.showAddEnterBox();
    },
    // 切换每页条数方法
    handleSizeChange(val) {
      this.size = val;
      const { page, size } = this;
      this.getMaterEnterList(page, size);
    },
    //切换页数方法
    handleCurrentChange(val) {
      this.page = val;
      const { page, size } = this;
      this.getMaterEnterList(page, size);
    }
  },
}
</script>