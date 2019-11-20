<template>
  <div class="materEnterTables">
    <div class="blakBg" v-show="addMaterBox" @click="closeAddStuff('addStuffForm')"></div>
    <el-table
      :data="materEnterList"
      height="490"
      v-loading="tableLoad"
      style="width: 100%"
      :header-cell-style="{'background-color': '#fafafa'}"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="batchId" label="库存编号"></el-table-column>
      <el-table-column prop="stuff.stuffName" label="物料名称"></el-table-column>
      <el-table-column prop="outInTime" label="入库时间"></el-table-column>
      <el-table-column prop="outinAmount" label="数量(kg)"></el-table-column>
      <el-table-column prop="userName" label="操作人员"></el-table-column>
      <!-- <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="primary" @click="showAddEnterBox">
            <i class="el-icon-circle-plus"></i>新增入库
          </el-button>
        </template>
      </el-table-column>-->
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
        :total="sizeCount"
      ></el-pagination>
    </div>

    <!-- 入库表单 -->
    <!-- 新增物料弹窗 -->
    <div class="addMaterBox" v-show="addMaterBox" v-loading="addMaterBoxLoad">
      <i class="el-icon-close closeIcon" @click="closeAddStuff('addStuffForm')"></i>
      <div class="hd">
        <h2>新增物料入库</h2>
        <p>
          时间:
          <span>{{addStuffForm.time}}</span>
        </p>
      </div>
      <el-form
        :model="addStuffForm"
        :rules="stuffrules"
        ref="addStuffForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="item">
          <el-form-item label="物料名称" prop="stuffid">
            <el-select v-model="addStuffForm.stuffid" placeholder="请选择物料名称">
              <el-option
                v-for="item in stuffList"
                :key="item.stuffId"
                :label="item.stuffName"
                :value="item.stuffId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- <div class="item">
          <el-form-item label="供应商" prop="supplier">
            <el-select v-model="addStuffForm.supplier" placeholder="请选择供应商">
              <el-option
                v-for="item in supplierList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>-->
        <div class="item">
          <el-form-item label="操作人" prop="userid">
            <el-select v-model="addStuffForm.userid" placeholder="操作人">
              <el-option
                v-for="item in adminList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="入库数量" prop="amount">
            <el-input v-model.number="addStuffForm.amount">
              <span slot="suffix" class="kgDes">kg</span>
            </el-input>
          </el-form-item>
        </div>
        <!-- butn -->
        <div class="item btns">
          <el-form-item>
            <el-button type="primary" @click="postAddStuff('addStuffForm')">确定</el-button>
            <el-button @click="closeAddStuff('addStuffForm')">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getStuffName, getTime, getUserName } from '@/Tools/intScaleNum'
import AddEnterBox from '@/views/PC/components/AddEnterBox'
import qs from "qs"
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
    },
    // 筛选
    selVal: {
      type: Object,
      default: {}
    }
  },
  created() {
    this.getMaterEnterList(this.page, this.size, this.selVal);

  },
  data() {
    return {
      page: 1,
      size: 10,
      sizeCount: 100,
      addMaterBoxLoad: false,
      tableLoad: false,
      // 供应商
      // supplierList: [
      //   {
      //     name: "供应商1",
      //     id: "one"
      //   },
      //   {
      //     name: "供应商2",
      //     id: "tow"
      //   },
      //   {
      //     name: "供应商3",
      //     id: "three"
      //   },
      // ],
      // 入库表格内容
      materEnterList: [],
      // 当前也
      enterPage: 1,
      // 计时器
      addMaterBox: false,
      // 添加物料表单
      addStuffForm: {
        stuffname: '',
        stuffid: "",
        username: '',
        userid: "",
        time: "",
        amount: "",
        // supplier
      },
      // 新增物料验证
      stuffrules: {
        stuffid: [
          { required: true, message: '请选择物料名称', trigger: 'blur' }
        ],
        userid: [
          { required: true, message: '请选择操作人员', trigger: 'blur' }
        ],
        // supplier: [
        //   { required: true, message: '请选择供应商', trigger: 'blur' }
        // ],
        amount: [
          { required: true, message: '请输入入库数量', trigger: 'blur' },
          { type: 'number', message: '入库数量必须为数字', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    // 提交新增物料表单
    postAddStuff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addMaterBoxLoad = true;
          const stuffname = getStuffName(this.stuffList, this.addStuffForm.stuffid);
          this.addStuffForm.stuffname = stuffname;
          this.addStuffForm.time = getTime();
          const username = getUserName(this.adminList, this.addStuffForm.userid);
          this.addStuffForm.username = username;
          const data = qs.stringify({
            contentType: 1,
            contentId: this.addStuffForm.stuffid,
            amount: this.addStuffForm.amount,
            userName: this.addStuffForm.username
          })
          this.axios.post('api/webapi/warehouse/insertWarehouseInfo', data)
            .then(res => {
              if (res.data.code == 200) {
                this.$notify.success({
                  title: '物料入库成功',
                });
                this.addMaterBox = false;
                this.addMaterBoxLoad = false;
                this.getMaterEnterList(this.page, this.size,this.selVal);
                this.$emit('getStuffList');
              }
            })

        } else {
          return false;
        }
      });
    },
    // 关闭并清空新增物料变淡
    closeAddStuff(formName) {
      this.addMaterBox = false;
      this.$refs[formName].resetFields();
    },
    // 计时器
    getTime() {
      const time = getTime();
      this.addStuffForm.time = time.slice(0, 10);
    },

    // 父组件调动筛选分页
    emitSelEnterList() {
      console.log(this.page, this.size, this.selVal);

    },
    // 拉取物料入库信息
    getMaterEnterList(page, size, selVal) {
      console.log(selVal)
      this.tableLoad = true;
      const data = qs.stringify({
        contentType: 1,
        outInType: 1,
        pageNum: page,
        pageSize: size,
        // contentName: selVal.materEnterVal
      })
      this.axios.post('api/webapi/warehouse/getOutinWarehouseInfo', data)
        .then(res => {
          const { data } = res.data
          this.sizeCount = res.data.count;
          this.materEnterList = data;
          this.tableLoad = false;
        })
    },
    // 添加入库表单显示
    showAddEnterBox() {
      this.addMaterBox = true;
      this.addStuffForm = {};
      this.getTime();
    },
    // 切换每页条数方法
    handleSizeChange(val) {
      this.size = val;
      const { page, size, selVal } = this;
      this.getMaterEnterList(page, size, selVal);
    },
    //切换页数方法
    handleCurrentChange(val) {
      this.page = val;
      const { page, size, selVal } = this;
      this.getMaterEnterList(page, size, selVal);
    }
  },
}
</script>

<style lang="scss" scope>
.blakBg {
  position: fixed;
  width: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 999;
  height: 100%;
  top: 0;
  left: 0;
}
.addMaterBox {
  border-radius: 5px;
  width: 500px;
  margin: 0 auto;
  position: fixed;
  top: 200px;
  left: calc(50% - 200px);
  box-sizing: border-box;
  padding: 30px 60px;
  padding-left: 45px;
  background: #fff;
  z-index: 999;
  .closeIcon {
    position: absolute;
    top: 10px;
    cursor: pointer;
    font-weight: 700;
    font-size: 20px;
    right: 10px;
  }
  .item {
    width: 290px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .hd {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    margin-bottom: 30px;
    padding-bottom: 20px;
    p {
      font-size: 14px;
      span {
        margin-left: 10px;
        display: inline-block;
      }
    }
  }
}
</style>