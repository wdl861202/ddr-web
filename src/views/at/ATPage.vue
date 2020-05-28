<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-row>
        <a-e-tree :tree-data="treeData" @treeNodeClick="aeLoad" />
      </el-row>
      <el-row>
        <a-e-tree :tree-data="treeData" @treeNodeClick="aeLoad" />
      </el-row>
    </el-aside>

    <el-main>
      <el-row type="flex" align="top">
        <el-col :span="1">
          模板模式
        </el-col>
        <el-col :span="2">
          <el-radio v-model="radio" label="1">单组合时序</el-radio>
          <el-radio v-model="radio" label="2">多组合时点</el-radio>
        </el-col>
        <el-col :span="1">
          <el-radio v-model="radio" label="1">允许添加自定义逻辑关系</el-radio>
        </el-col>
        <el-col :span="1">
          <el-radio v-model="radio" label="1">禁止导出</el-radio>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="1">
          <el-button @click="a">添加自定义参数</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="1">
          自定义参数1
        </el-col>
        <el-col :span="1">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row type="flex" align="top">
        <el-col :span="6">
          <a-e-upload @treeChanged="updateAETree" />
        </el-col>
        <el-col :span="6">
          <el-button @click="aeSave">保存</el-button>
        </el-col>
        <el-col :span="6">
          <el-button @click="aeSave">提交审核</el-button>
        </el-col>
        <el-col :span="3" :offset="6">
          <el-button @click="aeRun">执行</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-input
          v-model="textarea"
          type="textarea"
          :rows="30"
          placeholder="请输入内容"
        />
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import AETree from '@/components/ae/AETree'
import AEUpload from '@/components/ae/AEUpload'
import { aeTreeData } from '@/api/ae/aeTree'
import { aeRun, aeSave, aeLoad } from '@/api/ae/aeScript'

export default {
  components: {
    AETree,
    AEUpload
  },
  data() {
    return {
      tableData: [],
      textarea: '',
      treeData: [],
      tableHeaders: []
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
        this.tableHeaders = response.data.tableHeaders
      })
    },
    updateAETree(e) {
      this.treeData = e.treeData
    },
    aeSave() {
      aeSave({ sql: this.textarea }).then(response => {
        this.textarea = response.data.sql
      })
    },
    aeLoad(e) {
      aeLoad({ id: e.id, label: e.label }).then(response => {
        this.textarea = response.data.sql
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
