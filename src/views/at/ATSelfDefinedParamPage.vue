<template>
  <el-dialog title="设置自定义参数" :visible="isVisible" @close="close">
    <el-row v-if="true">
      <el-col :span="4">
        <a-e-tree :tree-data="treeData" @treeNodeClick="aeLoad" />
      </el-col>
      <el-col :span="12">
        <el-col :span="4">
          自定义参数1
        </el-col>
        <el-col :span="4">
          <el-select v-model="select" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="select" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import AETree from '@/components/AE/AETree'
import { aeLoad } from '@/api/ae/aeScript'

export default {
  components: {
    AETree
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      treeData: [],
      options: [],
      select: '',
      value: ''
    }
  },
  created: function() {

  },
  methods: {
    close() {
      this.$emit('update:isVisible', false)
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
