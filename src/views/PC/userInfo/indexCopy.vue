<template>
  <div class="userInfo">
    <PageTitle pageTitle="账号管理"></PageTitle>
    <!-- 数据展示区域 -->
    <div class="dataContent">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="普通用户" name="Users">
          <div class="selContent">
            <ul>
              <!-- 下单人筛选 -->
              <li class="selUser">
                <el-autocomplete
                  class="inline-input"
                  v-model="userSel.userName"
                  :fetch-suggestions="userQuerySearch"
                  placeholder="请输入用户姓名"
                  :trigger-on-focus="false"
                  suffix-icon="el-icon-user"
                ></el-autocomplete>
              </li>
              <li class="selTime">
                <el-date-picker
                  v-model="userSel.time"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </li>
            </ul>
            <!-- btn区域 -->
            <div class="btns">
              <el-button type="primary" @click="postSelFn">查询</el-button>
              <el-button @click="clearSel">清空</el-button>
              <el-button type="success" v-if="tabSelKey" @click="postSetUser">确定修改</el-button>
              <el-button type="primary" @click="setUserRole">{{setUserTest}}</el-button>
            </div>
          </div>
          <el-table
            @selection-change="handleSelectionChange"
            :data="tabUserList"
            :header-cell-style="{'background-color': '#fafafa'}"
            v-loading="loading"
            ref="multipleTable"
            height="580"
            style="width: 100%"
          >
            <el-table-column type="selection" v-if="tabSelKey" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="userName" label="姓名"></el-table-column>
            <el-table-column prop="loginId" label="用户账号"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="roleName" label="权限"></el-table-column>
            <el-table-column align="right" width>
              <template slot="header" slot-scope="scope">
                <!-- <el-button type="primary" @click="setUserRole">{{setUserTest}}</el-button>
                <el-button type="success" v-if="tabSelKey" @click="postSetUser">确定修改</el-button>-->
              </template>
            </el-table-column>
          </el-table>
          <div class="selPageWrap">
            <el-pagination
              @size-change="userHandleSizeChange"
              background
              @current-change="userHandleCurrentChange"
              :current-page="userTable.userPage"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="userTable.userSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="userTable.userCount"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="权限用户" name="roleUsers">
          <div class="selContent">
            <ul>
              <!-- 下单人筛选 -->
              <li class="selUser">
                <el-autocomplete
                  class="inline-input"
                  v-model="adminSel.userName"
                  :fetch-suggestions="adminQuerySearch"
                  placeholder="请输入用户姓名"
                  suffix-icon="el-icon-user"
                  :trigger-on-focus="false"
                ></el-autocomplete>
              </li>
              <li class="selTime">
                <el-date-picker
                  v-model="adminSel.time"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </li>
            </ul>
            <!-- btn区域 -->
            <div class="btns">
              <el-button type="primary" @click="postSelFn">查询</el-button>
              <el-button @click="clearSel">清空</el-button>
              <el-button type="primary" @click="setUserRole">{{setUserTest}}</el-button>
              <el-button type="success" v-if="tabSelKey" @click="postSetUser">确定修改</el-button>
            </div>
          </div>
          <el-table
            @selection-change="handleSelectionChange"
            :data="tabUserList"
            ref="multipleTable"
            v-loading="loading"
            height="550"
            style="width: 100%"
            :header-cell-style="{'background-color': '#fafafa'}"
          >
            <el-table-column type="selection" v-if="tabSelKey" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="userName" label="姓名"></el-table-column>
            <el-table-column prop="loginId" label="用户账号"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="roleName" label="权限"></el-table-column>
            <el-table-column align="right" width>
              <template slot="header" slot-scope="scope">
                <!-- <el-button type="primary" @click="setUserRole">{{setUserTest}}</el-button>
                <el-button type="success" v-if="tabSelKey" @click="postSetUser">确定修改</el-button>-->
              </template>
            </el-table-column>
          </el-table>

          <div class="selPageWrap">
            <el-pagination
              @size-change="RoleUserHandleSizeChange"
              background
              @current-change="RoleUserHandleCurrentChange"
              :current-page="adminTable.roleUserPage"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="adminTable.roleUserSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="adminTable.roleUserCount"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 分页 -->
  </div>
</template>

<script>
import qs from 'qs'
import PageTitle from '@/views/PC/components/PageTitle'
import { createFilter } from '../orderAdmin/components/common'
import { initNavBar } from '@/Tools/intScaleNum'
export default {
  name: "UserInfo",
  components: {
    PageTitle
  },
  data() {
    return {
      setUserTest: "修改权限",
      activeName: "Users",
      tabSelKey: false,
      loading: false,
      // 数据容器
      tabUserList: [
      ],
      // 普通用户筛选容器
      userSel: {
        time: "",
        userName: "",
      },
      // 管理员用户筛选容器
      adminSel: {
        time: "",
        userName: ""
      },

      // 普通用户分页相关
      userTable: {
        userPage: 1,
        userSize: 10,
        userCount: 100,

      },
      // 权限用户分页相关
      adminTable: {
        roleUserPage: 1,
        roleUserSize: 10,
        roleUserCount: 100,
      },
      // 普通用户列表
      userList: [],
      // 管理用户列表
      adminUserList: [],
      // 选中用户容器
      multipleSelection: []
    }
  },
  watch: {
    // 监听是否按下修改权限
    tabSelKey(val) {
      if (val) this.setUserTest = "取消修改";
      else this.setUserTest = "修改权限";
    },
    activeName(val) {
      // 初始化分页条件
      this.userTable.userPage = 1;
      this.userTable.userSize = 10;
      this.adminTable.roleUserPage = 1;
      this.adminTable.roleUserSize = 10;
      // 关闭表格多选状态
      this.tabSelKey = false;
      if (val == 'Users') {
        // 普通用户
        const page = this.userTable.userPage;
        const size = this.userTable.userSize;
        const sel = this.userSel;
        this.getUserTabList(page, size, sel);
      } else if (val == "roleUsers") {
        // 权限用户
        const page = this.adminTable.roleUserPage;
        const size = this.adminTable.roleUserSize;
        const sel = this.adminSel;
        this.getRoleUserList(page, size, sel);
      };
    }
  },
  created() {
    this.postSetUser();
    initNavBar(this);
    this.getUserList();
    this.getUserTabList(this.userTable.userPage, this.userTable.userSize, this.userSel)
  },
  methods: {
    clearSel() {
      const { activeName } = this;
      if (activeName == "Users") {
        console.log(1111);
        // 清空普通用户筛选
        this.userSel = {
          userName: "",
          time: ""
        }
      } else if (activeName == "roleUsers") {
        console.log(123);
        // 清空权限用户
        this.adminSel = {
          userName: "",
          time: ""
        }
      }
    },
    // 确定修改提交方法
    postSetUser() {
      // 拿到数据
      // console.log(this.multipleSelection);
      // 
      if (this.activeName == "Users") {
        console.log(1111);
        // 权限升级
        // const user = qs.stringify({ a: ['b', 'c', 'd'] });
        // const user1 = qs.stringify({ user: [1, 2, 3] });
        // console.log(user1);
        // return;
        // const user = JSON.stringify(this.multipleSelection)
        // let user = JSON.stringify({
        //   user: [1, 2, 3]
        // })
        let data = { user: [1, 2, 3] }
        this.axios.post('api/webapi/user/updateRoleToAdmin', JSON.stringify(data), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then((res) => {
            console.log(res, '权限修改');
          })
        // 清空存放拿到的数据容器
        // this.$refs.multipleTable.clearSelection();
        // 关闭多选
        // this.tabSelKey = false;
      }
    },
    // 开始修改全选
    setUserRole() {
      if (this.tabSelKey) {
        // 关闭多选、清空状态
        this.$refs.multipleTable.clearSelection();
      }
      //切换多选状态
      this.tabSelKey = !this.tabSelKey;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 拉取管理员用户table数据
    getRoleUserList(page, size, sel) {
      this.loading = true;
      const data = {
        role: 0,
        userName: sel.userName,
        startTime: sel.time[0],
        endTime: sel.time[1],
        pageNum: page,
        pageSize: size
      };

      const parms = this.filterParms(data);
      ;
      this.axios.post('api/webapi/user/selectUsersByCondition', this.qs.stringify(parms))
        .then(res => {
          console.log(res);
          const { data, success, code, msg, count } = res.data;
          if (code == 200) {
            this.adminTable.roleUserCount = count
            data.forEach(item => {
              item.roleName = "权限用户";
            });
            this.tabUserList = data;
          };
          this.loading = false;
        })
        .catch(err => console.log(err))
    },
    userQuerySearch(queryString, cb) {
      var restaurants = this.userList;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    adminQuerySearch(queryString, cb) {
      var restaurants = this.adminUserList;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter,
    // 过滤空熟悉
    filterParms(data) {
      const parms = {};
      if (data.userName != "") parms.userName = data.userName;
      if (data.startTime != "") parms.startTime = data.startTime;
      if (data.endTime != "") parms.endTime = data.endTime;
      if (data.role != "") parms.role = data.role;
      if (data.pageNum != "") parms.pageNum = data.pageNum;
      if (data.pageSize != "") parms.pageSize = data.pageSize;
      parms.role = data.role;
      return parms
    },
    // 拉取普通用户table数据
    getUserTabList(page, size, sel) {
      this.loading = true;
      const data = {
        role: 1,
        userName: sel.userName,
        startTime: sel.time[0],
        endTime: sel.time[1],
        pageNum: page,
        pageSize: size
      };
      console.log(qs.stringify(data));
      const parms = this.filterParms(data);
      console.log(parms.role);
      this.axios.post('api/webapi/user/selectUsersByCondition', qs.stringify(parms))
        .then(res => {
          console.log(res);
          const { data, success, code, msg, count } = res.data;
          if (code == 200) {
            this.userTable.userCount = count
            data.forEach(item => {
              item.roleName = "普通用户";
            });
            this.tabUserList = data;
          };
          this.loading = false;
        })

        .catch(err => console.log(err))
    },

    getUserList() {
      this.axios.get('api/webapi/user/getAllUsers')
        .then(res => {
          const { data, code, msg } = res.data;
          data.forEach((item, i) => {
            if (item.role == 1) {
              // 普通用户
              this.userList.push({
                value: item.userName
              });
            } else if (item.role == 0) {
              // 权限用户
              this.adminUserList.push({
                value: item.userName
              });
            };
          });
        });
    },
    // 筛选查询
    postSelFn() {
      if (this.activeName == "Users") {
        this.page = 1;
        const page = this.userTable.userPage;
        const size = this.userTable.userSize;
        const sel = this.userSel;
        this.getUserTabList(page, size, sel);
      }
      if (this.activeName == "roleUsers") {
        this.page = 1;
        const page = this.adminTable.roleUserPage;
        const size = this.adminTable.roleUserSize;
        const sel = this.adminSel;
        this.getRoleUserList(page, size, sel);
      }
    },
    // 分页器相关
    userHandleSizeChange(val) {
      this.userTable.userSize = val;
      const page = this.userTable.userPage;
      const size = this.userTable.userSize;
      const sel = this.userSel;
      this.getUserTabList(page, size, sel);
    },
    userHandleCurrentChange(val) {
      this.userTable.userPage = val;
      const page = this.userTable.userPage;
      const size = this.userTable.userSize;
      const sel = this.userSel;
      this.getUserTabList(page, size, sel);
      console.log(`当前页: ${val}`);
    },

    // 分页器相关
    RoleUserHandleSizeChange(val) {
      this.adminTable.roleUserSize = val;
      const page = this.adminTable.roleUserPage;
      const size = this.adminTable.roleUserSize;
      const sel = this.adminSel;
      console.log(`每页 ${val} 条`);
      this.getRoleUserList(page, size, sel);
    },
    RoleUserHandleCurrentChange(val) {
      this.adminTable.roleUserPage = val;
      const page = this.adminTable.roleUserPage;
      const size = this.adminTable.roleUserSize;
      const sel = this.adminSel;
      console.log(`当前页: ${val}`);
      this.getRoleUserList(page, size, sel);
    },
  },
}
</script>

<style lang="scss" scope>
@import "../orderAdmin/components/common.scss";
.userInfo {
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  z-index: 1010;
  overflow: hidden;
  .dataContent {
    padding-top: 0;
    position: relative;
    .setUserWrap {
      position: absolute;
      right: 0;
      top: 20px;
    }
  }
}
</style>

