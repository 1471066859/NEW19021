<template>
  <!-- 添加入库表单 -->
  <div v-show="addEnterBox">
    <div class="blackBox" @click="hideAddEnterBox"></div>
    <div class="addEnterBox">
      <div class="title">
        <h2>{{title}}</h2>

        <p>
          时间:
          <span>{{postForm.time}}</span>
        </p>
        <i class="el-icon-close closeIcon" @click="hideAddEnterBox"></i>
      </div>
      <el-form ref="form" :model="postForm" label-width="80px">
        <el-form-item label="物料名称" v-if="packName">
          <!-- <el-input v-model="postForm.packName"></el-input> -->
          <el-select v-model="postForm.packName" placeholder="请选择物料名称">
            <el-option
              v-for="(item, index) in stuffList"
              :label="item.stuffname"
              :value="item.stuffid"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" v-if="supplier">
          <el-input v-model="postForm.supplier"></el-input>
        </el-form-item>
        <!-- 新增物料！！ -->
        <el-form-item label="物料名" v-if="addStuff">
          <el-input v-model="postForm.stuffname"></el-input>
        </el-form-item>
        <el-form-item label="料盒编号" v-if="boxId">
          <el-input v-model="postForm.boxId"></el-input>
        </el-form-item>
        <el-form-item label="料盒型号" v-if="boxVersion">
          <!-- <el-input v-model="postForm.boxVersion"></el-input> -->
          <el-select v-model="postForm.boxVersion" placeholder="请选择料盒型号名">
            <el-option
              v-for="(item, index) in packList"
              :label="item.packname"
              :value="item.packid"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作人员" v-if="adminPeople">
          <el-select v-model="postForm.userid" placeholder="请选择操作人员">
            <el-option
              v-for="(item, index) in adminList"
              :label="item.username"
              :value="item.userid"
              :key="index"
            ></el-option>
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
import { getUserName, getBoxId, getTime } from '@/Tools/intScaleNum'
export default {
  props: {
    title: {
      type: String,
      default: "新增入库项目"
    },
    addStuff: {
      type: Boolean,
      default: false
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
    adminList: {
      type: Array,
      default: []
    },
    packList: {
      type: Array,
      // default: []
      default: function () {
        return []
      }
    },
    stuffList: {
      type: Array,
      // default: []
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      addEnterBox: false,
      timer: null,
      postForm: {
        time: null,
        boxId: "",
        boxVersion: "",
        count: "",
        supplier: "",
        packName: "",
        username: "",
        userid: "",
        stuffname: ""
      },
    }
  },
  created() {

  },
  methods: {
    // 确定入库
    postFormFn() {
      // 传递值给父组件
      const swh = this.verification();
      console.log(swh);
      // 料盒入库判断
      if (!swh) {
        this.$notify({
          title: '警告',
          message: '请输入完整信息',
          type: 'error'
        });
        return;
      }
      // console.log(1)
      const { adminList } = this;
      const { userid } = this.postForm
      let username = getUserName(adminList, userid);
      this.postForm.username = username;
      this.$emit('postFormFn', this.postForm);
      this.hideAddEnterBox();
    },
    // 验证弹窗
    verification() {
      let swh = false
      const { boxId, boxVersion, count, supplier, packName, username, userid, stuffname } = this.postForm;
      if (boxId != "" && boxVersion != "" && userid != "") {
        swh = true;
        return swh;
      } else if (packName != "" && supplier != "" && userid != "" && count != "") {
        swh = true;
        return swh;
      } else if (packName != "" && userid != "") {
        swh = true;
        return swh;
      } else if (stuffname != "" && userid != "") {
        swh = true;
        return swh;
      } else {
        return swh;
      }

    },
    // 开启弹窗
    showAddEnterBox() {
      this.getTime();
      this.addEnterBox = true;
    },
    getTime() {
      // 防止初次执行延迟1s
      this.postForm.time = getTime();
      this.timer = setInterval(() => {
        this.postForm.time = getTime();
      }, 1000);
    },
    // 关闭弹窗
    hideAddEnterBox() {
      this.addEnterBox = false;
      this.postForm = {
        time: null,
        boxId: "",
        boxVersion: "",
        count: "",
        supplier: "",
        packName: "",
        username: "",
        userid: "",
        stuffname: ""
      };
      clearInterval(this.timer)
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
    // position: relative;
    .closeIcon {
      position: absolute;
      width: 50px;
      height: 50px;
      display: inline-block;
      font-size: 20px;
      right: -44px;
      top: -10px;
      font-weight: 700;
      cursor: pointer;
    }
    h2 {
      font-size: 18px;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>