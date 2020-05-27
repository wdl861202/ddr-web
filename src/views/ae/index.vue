<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <a-e-tree :tree-data="treeData" />
    </el-aside>

    <el-main>
      <el-row>
        <el-col :span="6">
          <el-button>导入脚本</el-button>
          <el-button>保存</el-button>
        </el-col>
        <el-col :span="3" :offset="15">
          <el-button @click="aeRun">执行</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
        />
      </el-row>
      <el-row>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140" />
          <el-table-column prop="name" label="姓名" width="120" />
          <el-table-column prop="address" label="地址" />
        </el-table>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import AETree from '@/components/ae/aeTree'
import { aeRun as AERun } from '@/api/ae/aeTree'

export default {
  components: {
    AETree
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item),
      textarea: '',
      treeData: []
    }
  },
  created: function() {
    this.aeRun()
  },
  methods: {
    // 执行结果，弄到tree上
    aeRun() {
      AERun({ sql: this.textarea }).then(response => {
        this.treeData = response.data.treeData
      })
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
