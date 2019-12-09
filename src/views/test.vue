<template>
  <div style="width:40%">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="单元1 工作中" name="1">
        <!-- <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div> -->
        <!-- <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
        <el-table
          :data="list"
          :header-cell-style="{'background-color': '#fafafa'}"
          border
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="orderId" label="料盒id"></el-table-column>
          <el-table-column prop="startTime" label="物料名"></el-table-column>
          <el-table-column prop="user" label="下单人"></el-table-column>
          <el-table-column prop="order" label="订单编号"></el-table-column>
        </el-table>
      </el-collapse-item>
      <el-collapse-item title="单元2 空闲" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="单元3 工作中" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="单元4 异常" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ['1'],
      list: [
        {
          orderId: 123,
          startTime: "物料一",
          user: '张三',
          order: 'P195626',
        },
        {
          orderId: 123,
          startTime: "物料一",
          user: '张三',
          order: 'P195626',
        },
        {
          orderId: 123,
          startTime: "物料一",
          user: '张三',
          order: 'P195626',
        },
        {
          orderId: 123,
          startTime: "物料一",
          user: '张三',
          order: 'P195626',
        },
        {
          orderId: 123,
          startTime: "物料一",
          user: '张三',
          order: 'P195626',
        },
      ]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>