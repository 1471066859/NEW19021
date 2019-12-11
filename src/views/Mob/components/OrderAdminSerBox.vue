<template>
  <div>
    <div
      class="balck"
      @click="startTimeKey = false;endTimeKey = false"
      v-show="startTimeKey | endTimeKey"
    ></div>
    <div class="timeWrap">
      <van-datetime-picker
        @confirm="timeConfirm(0)"
        @cancel="timeCancel(0)"
        :item-height="88"
        v-model="startTime"
        type="datetime"
        v-show="startTimeKey"
        :formatter="formatter"
      />
      <van-datetime-picker
        @confirm="timeConfirm(1)"
        @cancel="timeCancel(1)"
        :item-height="88"
        v-model="endTime"
        type="datetime"
        v-show="endTimeKey"
        :formatter="formatter"
      />
    </div>
    <el-collapse-transition>
      <div class="searchLoad" v-show="showSearchLoad">
        <div class="row1">
          <p>创建人</p>
          <el-autocomplete
            class="inline-input"
            v-model="peopleVal"
            :fetch-suggestions="querySearch"
            placeholder="请输入下单人姓名"
            :trigger-on-focus="false"
            suffix-icon="el-icon-edit-outline"
          ></el-autocomplete>
          <p>订单编号</p>
          <el-input
            placeholder="请输入订单编号"
            suffix-icon="el-icon-edit-outline"
            v-model="productionVal"
          ></el-input>
          <p>开始时间</p>
          <div
            @click="startTimeKey = !startTimeKey"
            class="timeSelWrap"
            v-show="startTimeText"
          >{{startTimeText}}</div>
          <div
            @click="startTimeKey = !startTimeKey"
            class="timeSelWrap"
            v-show="!startTimeText"
          >请选择开始时间</div>

          <p>结束时间</p>
          <div
            @click="endTimeKey = !endTimeKey"
            class="timeSelWrap"
            v-show="endTimeText"
          >{{endTimeText}}</div>
          <div @click="endTimeKey = !endTimeKey" class="timeSelWrap" v-show="!endTimeText">请选择开始时间</div>
        </div>

        <div class="searchList">
          <div class="searchItem">
            <p>订单状态:</p>
            <mt-radio v-model="orderStat" :options="orderStateList"></mt-radio>
          </div>
        </div>

        <!-- 查询确定 -->
        <div class="btnWrap">
          <div class="searchBtnFn" @click="searchBtnFn">查询</div>
          <div class="searchBtnFn clear" @click="clearSearchData">清空</div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  DatetimePicker
} from 'vant';

Vue.use(DatetimePicker);
import 'vant/lib/index.css';
import '@/hotcss/hotcss'
import { querySearch, createFilter, getUserList } from '@/views/PC/orderAdmin/components/common'
export default {
  name: 'OrderAdminBox',
  props: {
    showSearchLoad: {
      type: Boolean,
    }
  },
  data() {
    return {
      startTimeKey: false,
      startTime: null,
      startTimeText: null,
      endTimeKey: false,
      endTime: null,
      endTimeText: null,
      // 创建人信息
      peopleVal: "",
      // 用户集合
      userList: [],
      peopleOptions: [
        {
          value: 'class1',
          label: '班级1',
          children: [
            {
              value: 'xs1',
              label: '1学生1',
            },
            {
              value: 'xs2',
              label: '1学生2',
            },
            {
              value: 'xs3',
              label: '1学生3',
            },
            {
              value: 'xs4',
              label: '1学生4',
            },
            {
              value: 'xs5',
              label: '1学生5',
            },
          ]
        },
        {
          value: "calss2",
          label: "班级2",
          children: [
            {
              value: "xs1",
              label: "2学生1"
            },
            {
              value: "xs2",
              label: "2学生2"
            },
            {
              value: "xs3",
              label: "2学生3"
            },
            {
              value: "xs4",
              label: "2学生4"
            },
            {
              value: "xs5",
              label: "2学生5"
            },
          ]
        }
      ],
      // 时间model
      timeOption: '',
      // 产线状态model
      orderStat: '',
      // 产线状态
      orderStatOptions: [
        {
          value: '选项1',
          label: '未生产'
        }, {
          value: '选项2',
          label: '开始生产'
        }, {
          value: '选项3',
          label: '下单'
        }, {
          value: '选项4',
          label: '巴拉'
        }],
      // 产线编号model
      productionVal: '',
      // 可筛选状态集合
      orderStateList: [],
      // 产线编号
      productionOptions: [
        {
          value: '选项1',
          label: '产线1'
        }, {
          value: '选项2',
          label: '产线2'
        }, {
          value: '选项3',
          label: '产线3'
        }, {
          value: '选项4',
          label: '产线4'
        }],
    }
  },
  created() {
    this.getUserList();
    this.getOrderStateList();
  },
  computed: {

  },
  methods: {
    startTimeTextFn(key) {
      if (key == 0) {
        let time = this.startTime;
        console.log(this.startTime);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
          day = "0" + day;
        }
        if (hours >= 0 && hours <= 9) {
          hours = "0" + hours;
        }
        if (minutes >= 0 && minutes <= 9) {
          minutes = "0" + minutes;
        }
        this.startTimeText = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + '00'
      } else if (key == 1) {
        let time = this.endTime;
        console.log(this.endTime);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
          day = "0" + day;
        }
        if (hours >= 0 && hours <= 9) {
          hours = "0" + hours;
        }
        if (minutes >= 0 && minutes <= 9) {
          minutes = "0" + minutes;
        }

        this.endTimeText = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + '00'
      }
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      } else if (type === 'hour') {
        return `${value}时`
      } else if (type === 'minute') {
        return `${value}分`
      }
      return value;
    },
    timeConfirm(key) {
      this.startTimeKey = false;
      this.endTimeKey = false;
      this.startTimeTextFn(key);
    },
    timeCancel(key) {
      this.startTimeKey = false;
      this.endTimeKey = false;
    },
    getOrderStateList() {
      this.orderStateList = [{
        "stateId": "1",
        "label": "待生产订单",
        "value": "1",
      },
      {
        "stateId": "2",
        "label": "正在生产订单",
        "value": "2",
      },
      {
        "stateId": "3",
        "value": "3",
        "label": "已完成订单"
      },
      {
        "value": "4",
        "stateId": "4",
        "label": "异常订单"
      }];
    },
    querySearch,
    createFilter,
    getUserList,
    clearSearchData() {
      this.startTimeText = ''
      this.endTimeText = ''
      this.peopleVal = ''
      this.orderStat = ''
      this.productionVal = ''
    },
    searchBtnFn() {
      const { timeOption, peopleVal, orderStat, productionVal } = this;
      const searchObj = {
        timeOption: [this.startTimeText, this.endTimeText],
        peopleVal,
        orderStat,
        productionVal
      };
      this.$emit('getSelData', searchObj);
    }
  },
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.balck {
  background: #000;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0.5;
  z-index: 999;
}
.timeSelWrap {
  background: #fff;
  color: #999;
  font-size: px(12);
  text-align: center;
  border-radius: 4px;
  padding: px(5) 0;
}
.timeWrap {
  position: fixed;
  width: 100%;
  // padding: 0 px(20);
  left: 0;
  box-sizing: border-box;
  bottom: px(0);
  z-index: 999;
}
// vat
.van-picker__columns {
  height: px(140) !important;
}
.van-picker__toolbar {
  height: px(43);
  line-height: px(43);
  button {
    padding: 0 px(15);
    font-size: px(13);
  }
}
.van-picker-column {
  font-size: px(15);
  ul {
    // line-height: px(44) !important;
    li {
      // height: px(44) !important;
      padding: 0 px(5);
    }
  }
}
.van-picker-column__wrapper {
  // line-height: px(20) !important;
}

// 覆盖element样式
.el-autocomplete {
  width: 100%;
}
.mint-radio-core::after {
  width: px(6);
  height: px(6);
  top: px(4);
  left: px(4);
}
.mint-cell-wrapper {
  background: #272727;
  // background: none;
  border: none;
  // padding: px(5) 0;
  padding-bottom: px(5);
}
.mint-radio-core {
  width: px(15);
  height: px(15);
}
.mint-cell-wrapper {
  font-size: px(12);
}
.el-autocomplete-suggestion li {
  font-size: px(14);
  line-height: px(20);
}
.el-picker-panel__footer {
  display: flex;
  justify-content: space-between;
  padding: 0 px(20);
  box-sizing: border-box;
  align-items: center;
}
.el-button--mini {
  font-size: px(14);
}
.el-input--small .el-input__inner {
  font-size: px(8);
}
.el-select {
  width: 6rem;
}
.el-select-dropdown__item {
  font-size: px(14);
  padding: 0 px(20);
  height: px(30);
  line-height: px(30);
}
.el-input__inner {
  font-size: px(12);
  padding: 0;
  text-align: center;
}
.el-date-editor .el-range-separator {
  line-height: px(20);
}
.el-date-editor .el-range-input,
.el-date-editor .el-range-separator {
  font-size: px(10);
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: px(120);
}
.el-input--prefix .el-input__inner {
  padding-left: px(30);
}
.el-input__inner {
  height: px(25);
  line-height: px(25);
  padding: 0 px(15);
}
.el-input {
  font-size: px(12);
}
.el-input__prefix {
  left: px(5);
}
.el-picker-panel__icon-btn {
  font-size: px(12);
  margin-top: 0;
}
.el-picker-panel {
  line-height: px(10);
  // width: px(120);
  // width: px(175);
  width: 12.5rem;
}
.el-input__icon {
  width: px(20);
  line-height: px(10);
}
.el-cascader {
  width: 100%;
}
.el-cascader__dropdown {
  margin: px(5) 0;
  font-size: px(14);
  border-radius: px(4);

  .el-cascader-panel {
    font-size: px(14);
    border-radius: px(4);
  }
  .el-cascader-menu {
    min-width: px(130);
  }
  .el-cascader-menu__wrap {
    height: px(150);
  }
  .el-cascader-node {
    padding: 0 px(30) 0 px(20);
    height: px(34);
    line-height: px(34);
  }
}

.searchLoad {
  height: px(520);
  background-color: rgba(0, 0, 0, 0.847058);
  .btnWrap {
    margin-top: px(15);
    display: flex;
    justify-content: space-between;
    padding: 0 px(40);
    .clear {
      background: #f2f2f2 !important;
      color: #000 !important;
    }
    .searchBtnFn {
      background: #3f91f7;
      color: #fff;
      font-size: px(12);
      text-align: center;
      width: px(80);
      height: px(30);
      line-height: px(30);
      // margin: 0 auto;
      // margin-top: px(50);
      // margin-bottom: px(50);
      border-radius: px(4);
    }
  }
  .row1 {
    padding: px(0) px(20);
    p {
      padding: px(15) 0;
      font-size: px(12);
      font-weight: 700;
      color: #fff;
    }
  }

  .el-cascader {
    font-size: px(12);
    line-height: px(40);
    .el-input {
      font-size: px(14);
    }
    .el-input__inner {
      border: px(1) solid #fff;
      height: px(28);
      line-height: px(28);
      padding: 0 px(15);
    }
  }
  .searchList {
    display: flex;
    flex-wrap: wrap;
    padding: 0 px(20);
    .searchRow {
      .el-picker-panel {
        width: 12.5rem;
      }
      width: 100% !important;
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 100%;
      }
    }
    .searchItem {
      font-size: px(12);
      color: #fff;
      font-weight: 700;
      width: 50%;
      p {
        padding: px(15) 0;
      }
    }
  }
}
</style>