<template>
  <el-dialog title="预览" :visible="isVisible" @close="close">
    <el-row v-if="singlePort">
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
    <el-row v-if="multiPort">
      <div class="block">
        <span class="demonstration">选择日期</span>
        <el-date-picker
          v-model="singleDate"
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
        <el-button @click="exportATRunExcel">导出报表</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="12">
        <el-button @click="atRun">执行</el-button>
      </el-col>
    </el-row>
    <el-row style="height : 400px;">
      <el-scrollbar style="height:100%">
        <el-table id="atRunResultTable" :data="tableData">
          <el-table-column v-for="(tableHeader,index) in tableHeaders" :key="index" :label="tableHeader.label" :prop="tableHeader.prop" :width="tableHeader.width" />
        </el-table>
      </el-scrollbar>
    </el-row>
  </el-dialog>
</template>

<script>
import { aeRun } from '@/api/ae/aeScript'
import { export_json_to_excel as exportJsonToExcel } from '@/vendor/Export2Excel'

export default {
  components: {

  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    portCheckValues: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tableHeaders: [],
      tableData: [],
      startDate: '',
      endDate: '',
      singleDate: '',
      options: [],
      value: '',
      downloadLoading: false,
      autoWidth: true,
      bookType: 'xlsx',
      filename: '测试'
    }
  },
  computed: {
    singlePort: function() {
      return this.portCheckValues.includes('single')
    },
    multiPort: function() {
      return this.portCheckValues.includes('multi')
    }
  },
  created: function() {

  },
  methods: {
    close() {
      this.$emit('update:isVisible', false)
    },
    atRun() {
      aeRun({}).then(response => {
        this.tableData = response.data.tableData
        this.tableHeaders = response.data.tableHeaders
      })
    },
    exportATRunExcel() {
      this.downloadLoading = true

      const tHeader = ['ID', '代码', '名称']
      const filterVal = ['id', 'portfolioCode', 'portfolioName']
      const list = this.tableData
      const data = this.formatJson(filterVal, list)
      // exportTableToExcel('atRunResultTable')

      exportJsonToExcel({
        header: tHeader,
        data: data,
        filename: this.filename,
        autoWidth: this.autoWidth,
        bookType: this.bookType
      })
      this.downloadLoading = false
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
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
