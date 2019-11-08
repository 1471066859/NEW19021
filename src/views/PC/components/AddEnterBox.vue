<template>
  <!-- 添加入库表单 -->
  <div v-show="addEnterBox">
    <div class="blackBox" @click="hideAddEnterBox"></div>
    <div class="addEnterBox">
      <div class="title">
        <h2>{{title}}</h2>
        <p>
          时间:
          <span>2017-12-30</span>
        </p>
      </div>
      <el-form ref="form" :model="postForm" label-width="80px">
        <el-form-item label="物料名称" v-if="packName">
          <el-input v-model="postForm.packName"></el-input>
        </el-form-item>
        <el-form-item label="供应商" v-if="supplier">
          <el-input v-model="postForm.supplier"></el-input>
        </el-form-item>
        <el-form-item label="料盒编号" v-if="boxId">
          <el-input v-model="postForm.boxId"></el-input>
        </el-form-item>
        <el-form-item label="料盒型号" v-if="boxVersion">
          <el-input v-model="postForm.boxVersion" disabled></el-input>
        </el-form-item>
        <el-form-item label="操作人员" v-if="adminPeople">
          <el-select v-model="postForm.adminPeople" placeholder="请选择操作人员">
            <el-option label="张三" value="zhangsan"></el-option>
            <el-option label="李四" value="lisi"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量" v-if="count">
          <el-input v-model="postForm.count"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postFormFn">提交</el-button>
          <el-button @click="hideAddEnterBox">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "新增入库项目"
    },
    boxVersion: {
      type: Boolean,
      default: false
    },
    adminPeople: {
      type: Boolean,
      default: false
    },
    boxId: {
      type: Boolean,
      default: false
    },
    packName: {
      type: Boolean,
      default: false
    },
    supplier: {
      type: Boolean,
      default: false
    },
    count: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      addEnterBox: false,
      postForm: {
        boxId: '',
        boxVersion: '',
        adminPeople: '',
        count: "",
        supplier: "",
        packName: ""
      },

    }
  },
  methods: {
    postFormFn() {
      // 传递值给父组件
      this.$emit('postFormFn', this.postForm);
      this.hideAddEnterBox();
    },
    // 开启弹窗
    showAddEnterBox() {
      this.addEnterBox = true;
    },
    // 关闭弹窗
    hideAddEnterBox() {
      this.addEnterBox = false;
      this.postForm = {}
    },
  },
}
</script>

<style lang="scss" scope>
.blackBox {
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.addEnterBox {
  z-index: 99;
  position: fixed;
  top: 35%;
  left: 40%;
  background: #fff;
  font-size: 18px;
  box-sizing: border-box;
  padding: 20px 0;
  padding-top: 100px;
  padding-left: 100px;
  padding-right: 130px;
  border-radius: 4px;
  .title {
    position: absolute;
    top: 20px;
    left: 5%;
    width: 90%;
    box-sizing: border-box;
    padding: 0 30px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    font-size: 16px;
    h2 {
      font-size: 18px;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>