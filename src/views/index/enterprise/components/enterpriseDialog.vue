<template>
  <el-dialog
    center
    :title="add ? '新增企业' : '编辑企业'"
    :visible.sync="dialogFormVisible"
    width="44.6%"
  >
    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item
        prop="short_name"
        label="企业简称"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="企业备注" :label-width="formLabelWidth">
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
import { enterpriseEdit, enterpriseAdd } from '@/api/enterprise.js'

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
        eid: [{ required: true, message: '企业编号不能为空', trigger: 'blur' }],
        name: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ],
        short_name: [
          { required: true, message: '企业简称不能为空', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '企业简介不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    doSave() {
      if (this.add) {
        enterpriseAdd(this.form).then(res => {
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
        enterpriseEdit(this.form).then(res => {
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
    cancle() {
      this.dialogFormVisible = false
    }
  }
}
</script>

<style >
</style>
