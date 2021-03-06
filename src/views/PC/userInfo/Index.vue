<template>
  <div class="userInfo">
    <PageTitle pageTitle="账号管理"></PageTitle>
    <!-- 数据展示区域 -->
    <div class="selContent">
      <ul>
        <!-- 姓名筛选 -->
        <li class="selUser">
          <el-autocomplete
            class="inline-input"
            v-model="selForm.userName"
            :fetch-suggestions="querySearch"
            placeholder="请输入用户姓名"
            :trigger-on-focus="false"
            suffix-icon="el-icon-user"
          ></el-autocomplete>
        </li>
        <li class="selTime">
          <el-date-picker
            v-model="selForm.time"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </li>
        <li class="selUser">
          <el-select v-model="selForm.role" placeholder="请选择权限">
            <el-option v-for="item in roleList" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </li>
      </ul>
      <!-- btn区域 -->
      <div class="btns">
        <el-button type="primary" @click="postSelFn">查询</el-button>
        <el-button @click="clearSel">清空</el-button>
      </div>
    </div>
    <!-- 数据展示区域 -->
    <div class="dataContent">
      <el-table
        :data="userData"
        :header-cell-style="{'background-color': '#fafafa'}"
        v-loading="loading"
        height="620"
        border
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="userName" label="姓名"></el-table-column>
        <el-table-column prop="loginId" label="用户账号"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="roleName" label="权限">
          <template slot-scope="scope">
            <el-select
              @change="setRoleFn"
              @click.native="userId = scope.row.id"
              v-model="scope.row.role"
              placeholder="请选择权限"
            >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="des" label="操作" width="80">
          <template slot-scope="scope">
            <el-button
              style="color: #f56c6c;"
              @click="removeUser(scope.row)"
              type="text"
              size="small"
            >删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="selPageWrap">
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import PageTitle from '@/views/PC/components/PageTitle'
import { createFilter, querySearch } from '../orderAdmin/components/common'
import { initNavBar } from '@/Tools/intScaleNum'
export default {
  name: "UserInfo",
  components: {
    PageTitle
  },
  data() {
    return {
      // 筛选内容
      selForm: {
        userName: "",
        time: "",
        role: "",
      },
      // 筛选权限下拉列表
      roleList: [
        {
          label: "普通用户",
          id: 1
        },
        {
          label: "管理员",
          id: 0
        }
      ],
      // 用户名集合
      userList: [],
      // 数据总条数
      count: null,
      // 页数
      page: 1,
      // 条数
      size: 10,
      loading: false,
      // 表格数据
      userData: [],
      // 点击修改权限的用户标识
      userId: null,
    }
  },

  created() {
    initNavBar(this);
    // 拉取列表数据
    this.getUserData(this.page, this.size, this.selForm);
    // 拉取用户名集合
    this.getUserList();
  },
  methods: {
    // 删除用户
    removeUser(row) {
      this.$confirm(`您确定要删除用户<span class="confirmOrderId">${row.userName}</span>吗?`, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(res => {
          const userId = [{ id: row.id }]
          const data = this.qs.stringify({
            user: JSON.stringify(userId)
          })
          this.axios.post('/api/webapi/user/deleteUser', data)
            .then(res => {
              console.log(res);
              if (res.data.code == 200) {
                this.$notify({
                  type: 'success',
                  title: `操作成功`,
                  message: `用户${row.userName}删除成功`,
                });
                this.getUserData(this.page, this.size, this.selForm);
              } else {
                this.$notify({
                  type: 'error',
                  title: `操作失败`,
                  message: `用户${row.userName}删除失败`,
                });
              }
            })
            .catch(err => {
              this.$notify({
                type: 'error',
                title: `操作失败`,
                message: `网络异常请稍后再试`,
              });
            })
        })
        .catch(err => {
          this.$notify({
            type: 'success',
            title: '已取消删除操作',
          });
        })

    },
    // 拉取用名集合 用于搜索
    getUserList() {
      this.axios.get('/api/webapi/user/getAllUserName')
        .then(res => {
          console.log(res);
          const { data } = res.data;
          data.forEach((item) => {
            this.userList.push({
              value: item,
            });
          });
        }).catch(err => console.log(err));
    },
    // 修改权限
    setRoleFn(role) {
      this.loading = true;
      const id = this.userId;
      // 发送修改权限请求
      const data = this.qs.stringify({
        // 要修改的用户标识
        id: this.userId,
        // 修改后的权限
        role,
      });
      const userInfo = this.userData.find(item => {
        return item.id == id
      });
      this.axios.post('/api/webapi/user/updateRole', data)
        .then(res => {          `           `
          if (res.data.code == 200) {
            this.$notify({
              type: 'success',
              title: `操作成功`,
              message: `用户${userInfo.userName}修改权限成功`,
            });
            this.getUserData(this.page, this.size, this.selForm);
          } else {
            this.$notify({
              type: 'error',
              title: `操作失败`,
              message: `请刷新后重试`,
            });
          }
        })
    },
    // 拉取表格数据
    getUserData(page, size, sel) {
      this.loading = true;
      const data = {
        pageNum: page,
        pageSize: size,
        startTime: sel.time[0],
        endTime: sel.time[1],
        userName: sel.userName,
        role: sel.role,
      }
      console.log(data);
      this.axios.post('/api/webapi/user/getAllUsers', this.qs.stringify(data))
        .then(res => {
          const { data, count, code } = res.data;
          if (code == 200) {

            this.count = count;
            data.forEach(i => {
              if (i.role == 0) {
                i.roleName = '权限用户'
              } else if (i.role == 1) {
                i.roleName = '普通用户'
              }
            })
            this.userData = data;
            this.loading = false;
          } else {
            this.$notify({
              type: 'error',
              title: `获取数据失败`,
              message: `请刷新后重试`,
            });
          }
        })
    },
    // 用户匹配用户输入的姓名
    querySearch,
    createFilter,
    // 提交筛选
    postSelFn() {
      this.page = 1;
      this.getUserData(this.page, this.size, this.selForm);
    },
    // 清空筛选项
    clearSel() {
      this.selForm = {
        userName: "",
        role: "",
        time: "",
      }
    },
    // 分页分条相关
    handleSizeChange(size) {
      this.size = size;
      this.getUserData(this.page, this.size, this.selForm);

    },
    handleCurrentChange(page) {
      this.page = page;
      this.getUserData(this.page, this.size, this.selForm);
    }
  }
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
    padding-top: 20px;
    position: relative;
  }
}
</style>

