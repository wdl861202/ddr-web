<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <a-e-tree :tree-data="treeData" />
    </el-aside>

    <el-main>
      <el-row type="flex" align="top">
        <el-col :span="6">
          <a-e-upload @treeChanged="updateAETree" />
        </el-col>
        <el-col :span="6">
          <el-button>保存</el-button>
        </el-col>
        <el-col :span="3" :offset="12">
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
          <el-table-column prop="id" label="ID" width="140" />
          <el-table-column prop="portfolioCode" label="代码" width="120" />
          <el-table-column prop="portfolioName" label="名称" />
        </el-table>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import AETree from '@/components/ae/aeTree'
import AEUpload from '@/components/ae/aeUpload'
import { aeTreeData } from '@/api/ae/aeTree'
import { aeRun } from '@/api/ae/aeScript'

export default {
  components: {
    AETree,
    AEUpload
  },
  data() {
    return {
      tableData: [],
      textarea: '',
      treeData: []
    }
  },
  created: function() {
    this.initAETree()
  },
  methods: {
    // 执行结果，弄到tree上
    initAETree() {
      aeTreeData({ sql: this.textarea }).then(response => {
        this.treeData = response.data.treeData
      })
    },
    aeRun() {
      aeRun({ sql: this.textarea }).then(response => {
        this.tableData = response.data.tableData
      })
    },
    updateAETree(e) {
      console.log(e)
      this.textarea = e.sql
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
