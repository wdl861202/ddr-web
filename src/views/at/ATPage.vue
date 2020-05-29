<template>
  <el-row>
    <el-col :span="4">
      <el-row style="height:40%">
        <a-e-tree :tree-data="treeData" @treeNodeClick="aeLoad" />
      </el-row>
      <el-row style="height:40%">
        <a-e-tree :tree-data="treeData" @treeNodeClick="aeLoad" />
      </el-row>
    </el-col>

    <el-col :span="20">
      <a-t-run-dlg :is-visible.sync="atRunDlgVisible" />
      <el-row type="flex" align="middle" :gutter="24">
        <el-col :span="4">
          模板模式
        </el-col>
        <el-col :span="10">
          <el-checkbox-group v-model="portCheckList" :max="1">
            <el-checkbox label="single">单组合时序</el-checkbox>
            <el-checkbox label="multi">多组合时点</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="5">
          <el-checkbox v-model="selfDefineLogic" label="1">允许添加自定义逻辑关系</el-checkbox>
        </el-col>
        <el-col :span="4">
          <el-checkbox v-model="forbidExport" label="1">禁止导出</el-checkbox>
        </el-col>
      </el-row>

      <el-row type="flex" align="middle" :gutter="24">
        <el-col :span="4">
          <el-button @click="addParam">添加自定义参数</el-button>
        </el-col>
      </el-row>

      <el-row type="flex" align="middle" :gutter="24">
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
      </el-row>
      <el-row type="flex" align="middle" :gutter="24">
        <el-col :span="2">
          <a-e-upload @treeChanged="updateAETree" />
        </el-col>
        <el-col :span="2">
          <el-button @click="aeSave">保存</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="aeSave">提交审核</el-button>
        </el-col>
        <el-col :span="3" :offset="12">
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
    </el-col>
  </el-row>

</template>

<script>
import AETree from '@/components/AE/AETree'
import AEUpload from '@/components/AE/AEUpload'
import { aeTreeData } from '@/api/ae/aeTree'
import { aeSave, aeLoad } from '@/api/ae/aeScript'
import ATRunDlg from './ATRunPage'

export default {
  components: {
    AETree,
    AEUpload,
    ATRunDlg
  },
  props: {

  },
  data() {
    return {
      tableData: [],
      textarea: '',
      treeData: [],
      tableHeaders: [],
      options: [
        {
          value: 'value1',
          label: '值1'
        },
        {
          value: 'value2',
          label: '值2'
        }
      ],
      portCheckList: [],
      selfDefineLogic: '',
      forbidExport: '',
      value: '',
      atRunDlgVisible: false
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
      this.atRunDlgVisible = true
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
    },
    addParam() {

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
