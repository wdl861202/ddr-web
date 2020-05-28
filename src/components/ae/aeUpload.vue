<template>
  <el-upload
    class="upload-demo"
    action="/dev-api/ddr/ae/upload"
    :on-change="handleChange"
    :file-list="fileList"
    :limit="1"
    :show-file-list="false"
    :multiple="false"
    :on-success="refreshTree"
  >
    <el-button size="small" type="primary">导入脚本</el-button>
    <div slot="tip" class="el-upload__tip">只能上传sql文件</div>
  </el-upload>
</template>
<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    refreshTree(response, file, fileList) {
      this.$emit('treeChanged', response.data)
    }
  }
}
</script>
