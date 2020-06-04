<template>
  <el-row type="flex" style="height:calc(100vh - 100px);">
    <el-col :span="4" style="overflow:auto;">
      <a-e-tree :tree-data="treeData" @treeNodeClick="aeLoad" />
    </el-col>
    <el-col :span="20" style="padding : 10px;overflow:auto;">
      <el-row :gutter="24">
        <el-row type="flex" align="top">
          <el-col :span="6">
            <a-e-upload @treeChanged="updateAETree" />
          </el-col>
          <el-col :span="6">
            <el-button @click="aeSave">保存</el-button>
          </el-col>
          <el-col :span="3" :offset="11">
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
        <el-row style="height:50%">
          <el-table :data="tableData">
            <el-table-column v-for="(tableHeader,index) in tableHeaders" :key="index" :label="tableHeader.label" :prop="tableHeader.prop" :width="tableHeader.width" />
          </el-table>
          <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </el-row>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import AETree from '@/components/AE/AETree'
import AEUpload from '@/components/AE/AEUpload'
import { aeTreeData } from '@/api/ae/aeTree'
import { aeRun, aeSave, aeLoad } from '@/api/ae/aeScript'
import Pagination from '@/components/Pagination'

export default {
  components: {
    AETree,
    AEUpload,
    Pagination
  },
  data() {
    return {
      tableData: [],
      textarea: '',
      treeData: [],
      tableHeaders: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
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
        this.total = response.data.total
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
    },
    getList() {
      this.listLoading = true
      aeRun(this.listQuery).then(response => {
        this.tableData = response.data.tableData
        this.tableHeaders = response.data.tableHeaders
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
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
