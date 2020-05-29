<template>
  <el-dialog title="收货地址" :visible="isVisible" @close="close">
    <el-row v-if="true">
      <el-col :span="4">
        <div class="block">
          <span class="demonstration">开始日期</span>
          <el-date-picker
            v-model="startDate"
            type="date"
            placeholder="选择日期"
          />
        </div>
      </el-col>
      <el-col :span="4">
        <div class="block">
          <span class="demonstration">结束日期</span>
          <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="选择日期"
          />
        </div>
      </el-col>
    </el-row>
    <el-row v-if="true">
      <div class="block">
        <span class="demonstration">选择日期</span>
        <el-date-picker
          v-model="endDate"
          type="date"
          placeholder="选择日期"
        />
      </div>
    </el-row>
    <el-row>
      <el-col :span="4">
        自定义参数1
      </el-col>
      <el-col :span="4">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="3" :offset="12">
        <el-button @click="exportExcel">导出报表</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="12">
        <el-button @click="atRun">执行</el-button>
      </el-col>
    </el-row>
    <el-row style="height:50%">
      <el-table :data="tableData">
        <el-table-column v-for="(tableHeader,index) in tableHeaders" :key="index" :label="tableHeader.label" :prop="tableHeader.prop" :width="tableHeader.width" />
      </el-table>
    </el-row>
  </el-dialog>
</template>

<script>

export default {
  components: {

  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      tableHeaders: [],
      tableData: []
    }
  },
  created: function() {

  },
  methods: {
    close() {
      this.$emit('update:isVisible', false)
    },
    atRun() {

    },
    exportExcel() {

    }
  }
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
