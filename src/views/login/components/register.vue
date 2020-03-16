<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
    <el-form ref="regForm" :model="form" :rules="rules" label-width="67px">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="imageCode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imageCode"></el-input>
          </el-col>
          <el-col :span="8" class="alinright">
            <img src="@/assets/login_code.png" alt="" class="imgBox" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="authCode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.authCode"></el-input>
          </el-col>
          <el-col :span="8" class="alinright"
            ><el-button>获取用户验证码</el-button></el-col
          >
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('regForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      imageUrl: '',
      form: {
        name: '',
        email: '',
        phone: '',
        password: '',
        imageCode: '',
        authCode: ''
      },
      rules: {
        avatar: [
          { required: true, message: '头像不能为空', trigger: 'change' }
        ],
        name: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            // pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        phone: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        imageCode: [
          { required: true, message: '图形验证码不能为空', trigger: 'blur' },
          { len: 4, message: '验证码长度只能为4', trigger: 'blur' }
        ],
        authCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { len: 4, message: '验证码长度只能为4', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitForm(formname) {
      this.$refs[formname].validate(v => {
        if (v) {
          // 信息提示框第一种
          this.$message.success('验证成功')
        } else {
          // 信息提示框第二种
          this.$message({
            type: 'error',
            message: '验证失败'
          })
        }
      })
    },
    
  }
}
</script>

<style lang="less">
.el-dialog {
  width: 602px !important;
  height: 786px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(78, 78, 78, 1);
  .el-dialog__header {
    width: 600px;
    height: 53px;
    background: linear-gradient(to right, #01c5fc, #1395fd);
    text-align: center;

    line-height: 53px;
    padding: 0;
    span {
      color: #ffffff;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    left: 50%;
    transform: translateX(-50%);
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .imgBox {
    height: 40px;
    width: 143px;
  }
  .alinright {
    text-align: right;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>
