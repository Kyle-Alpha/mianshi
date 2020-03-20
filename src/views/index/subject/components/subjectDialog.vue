<template>
  <el-dialog
    center
    :title="add ? '新增学科' : '编辑学科'"
    :visible.sync="dialogFormVisible"
  >
    <el-form ref="form" :rules="rules" :model="form" >
      <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="doSave">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit, subjectAdd } from '@/api/subject.js'

export default {
  data() {
    return {
      // 控制对话框显示或隐藏的属性
      dialogFormVisible: false,
      add: true,
      // 跟表单绑定的对象
      form: {},
      formLabelWidth: '80px',
      rules: {
        rid: [{ required: true, message: '学科编号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '学科名称不能为空', trigger: 'blur' }]
      }
    }
  },

  methods: {
    doSave() {
      if (this.add) {
        subjectAdd(this.form).then(res => {
          if (res.data.code == 200) {
            this.$message.success('新增成功！')
            this.dialogFormVisible = false
            //刷新表格数据 this.$parent可以得到父组件
            this.$parent.getList()
          } else {
            this.$message.error(res.data.message)
          }
        })
      } else {
        subjectEdit(this.form).then(res => {
          if (res.data.code == 200) {
            this.$message.success('修改成功！')
            this.dialogFormVisible = false
            this.$parent.getList()
          } else {
            this.$message.error(res.data.message)
          }
        })
      }
    },
    cancle(){
      this.$refs.form.resetFields()
      this.dialogFormVisible=false

    }
  }
}
</script>

<style lang="less" scoped>

  .el-dialog {
    height: 520px;
    width: 600px;

  }

</style>
