<template>
  <el-dialog
    center
    :title="add ? '新增用户' : '编辑用户'"
    :visible.sync="dialogFormVisible"
    width="44.6%"
    top="7vh"
  >
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="username" label="用户名">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="phone" label="电话">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select class="normal" v-model="form.role_id">
          <el-option label="超级管理员" :value="1"></el-option>
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select class="normal" v-model="form.status">
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注">
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
import { userEdit, userAdd } from '@/api/user.js'

export default {
  data() {
    return {
      // 控制对话框显示或隐藏的属性
      dialogFormVisible: false,
      add: true,
      // 跟表单绑定的对象
      form: {},
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        role_id: [{ required: true, message: '状态不能为空', trigger: 'blur' }]
      }
    }
  },

  methods: {
    doSave() {
      if (this.add) {
        userAdd(this.form).then(res => {
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
        userEdit(this.form).then(res => {
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

<style lang="less" scoped>

</style>
