<template>
  <div class="enterTables">
    <div class="blakBg" v-show="addMaterBox" @click="closeAddStuff('addStuffForm')"></div>
    <el-table
      :data="enterAdminList"
      height="520"
      style="width: 100%"
      :header-cell-style="{'background-color': '#fafafa'}"
      v-loading="tableLoad"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="batchId" label="入库批次"></el-table-column>
      <el-table-column prop="pack.packName" label="料盒型号"></el-table-column>
      <el-table-column prop="outInTime" label="入库时间"></el-table-column>
      <el-table-column prop="outinAmount" label="入库数量"></el-table-column>
      <el-table-column prop="userName" label="操作人员"></el-table-column>
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
        :total="sizeCount"
      ></el-pagination>
    </div>
    <!-- 新增物料弹窗 -->
    <div class="addMaterBox" v-show="addMaterBox" v-loading="addMaterBoxLoad">
      <i class="el-icon-close closeIcon" @click="closeAddStuff('addStuffForm')"></i>
      <div class="hd">
        <h2>新增料盒入库</h2>
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
          <el-form-item label="料盒编号" prop="packid">
            <el-input v-model="addStuffForm.packid"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="料盒型号" prop="packname">
            <el-select v-model="addStuffForm.packname" placeholder="请选择料盒型号">
              <el-option
                v-for="item in packList"
                :key="item.packId"
                :label="item.packName"
                :value="item.packId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
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
  name: 'EnterTables',
  components: {
    AddEnterBox
  },
  props: {
    adminList: {
      type: Array,
      default: []
    },
    packList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      addMaterBox: false,
      addMaterBoxLoad: false,
      tableLoad: false,
      sizeCount: 100,
      // 添加物料表单
      addStuffForm: {
        username: '',
        userid: "",
        time: "",
        packname: "",
        packid: ""
      },
      // 新增物料验证
      stuffrules: {
        userid: [
          { required: true, message: '请选择操作人员', trigger: 'blur' }
        ],
        packid: [
          { required: true, message: '请输入料盒编号', trigger: 'blur' }
        ],
        packname: [
          { required: true, message: '请选择料盒型号', trigger: 'blur' }
        ]
      },
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
    // 提交新增物料表单
    postAddStuff(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addMaterBoxLoad = true;
          const username = getUserName(this.adminList, this.addStuffForm.userid);
          this.addStuffForm.username = username;
          this.addStuffForm.time = getTime();
          const data = qs.stringify({
            contentType: 2,
            contentId: this.addStuffForm.packname,
            amount: 1,
            outInType: 1,
            userName: username
          })
          this.axios.post('api/webapi/warehouse/insertWarehouseInfo', data)
            .then(res => {
              console.log(res, 'ressss')
              if (res.data.code == 200) {
                this.$notify.success({
                  title: '料盒入库成功',
                  // message: '这是一条错误的提示消息'
                });
                this.addMaterBox = false;
                this.addMaterBoxLoad = false;
                this.getInitBoxEnterData(this.page, this.size);
                this.$emit('getPackList')
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
    // 初始化入库数据
    getInitBoxEnterData(page, size) {
      this.tableLoad = true;
      const data = qs.stringify({
        contentType: 2,
        outInType: 1,
        pageNum: page,
        pageSize: size,
      });
      this.axios.post('api/webapi/warehouse/getOutinWarehouseInfo', data)
        .then(res => {
          const { data } = res.data;
          this.enterAdminList = data;
          this.tableLoad = false;
          this.sizeCount = res.data.count;
        })
    },
    // 新增入库弹窗
    showAddEnterBox() {
      this.addMaterBox = true;
      this.addStuffForm = {};
      this.getTime();
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
      font-weight: 700;
      font-size: 20px;
      cursor: pointer;
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
}
</style>