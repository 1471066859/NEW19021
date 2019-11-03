<template>
  <el-collapse-transition>
    <div class="searchLoad" v-show="showSearchLoad">
      <div class="row1">
        <p>创建人</p>
        <el-cascader v-model="peopleVal" :options="peopleOptions" @change="handleChange"></el-cascader>
      </div>

      <div class="searchList">
        <div class="searchItem searchRow">
          <p>选择开始时间:</p>
          <el-date-picker
            v-model="timeOption"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </div>
        <div class="searchItem">
          <p>产线编号:</p>
          <el-select v-model="productionVal" placeholder="选择产线">
            <el-option
              v-for="item in productionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="searchItem">
          <p>订单状态:</p>
          <el-select v-model="orderStat" placeholder="选择订单状态">
            <el-option
              v-for="item in orderStatOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <!-- 查询确定 -->
      <div class="searchBtnFn" @click="searchBtnFn">查询</div>
    </div>
  </el-collapse-transition>
</template>

<script>
import '@/hotcss/hotcss'
export default {
  name: 'OrderAdminBox',
  props: {
    showSearchLoad: {
      type: Boolean,
    }
  },
  data() {
    return {
      // 创建人信息
      peopleVal: [],
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
  methods: {
    clearSearchData() {
      this.timeOption = ''
      this.peopleVal = ''
      this.orderStat = ''
      this.productionVal = ''
    },
    searchBtnFn() {
      const { timeOption, peopleVal, orderStat, productionVal } = this;
      const searchObj = {
        timeOption,
        peopleVal,
        orderStat,
        productionVal
      };
      this.$emit('getSelData', searchObj);
    },
    handleChange() {

    },
  },
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;

// 覆盖element样式
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
  height: px(380);
  background-color: rgba(0, 0, 0, 0.847058);
  .searchBtnFn {
    background: #3f91f7;
    color: #fff;
    font-size: px(12);
    text-align: center;
    width: px(80);
    height: px(30);
    line-height: px(30);
    margin: 0 auto;
    // margin-top: px(50);
    // margin-bottom: px(50);
    margin-top: px(100);
    border-radius: px(4);
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
      // width: 50%;
      width: 50%;
      p {
        padding: px(15) 0;
      }
    }
  }
}
</style>