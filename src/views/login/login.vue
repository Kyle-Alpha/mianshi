<template>
  <div class="login">
    <div class="leftBox">
      <div class="title">
        <img src="@/assets/login_logo.png" alt="" class="titleImg" />
        <span class="titleName">黑马面面</span>
        <span class="titleLine"></span>
        <span class="titleLogin">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form ref="loginForm" :model="form" :rules="rules">
        <!-- 电话号码 -->
        <el-form-item prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入手机号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 图像验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input
                v-model="form.code"
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
              ></el-input>
            </el-col>
            <el-col :span="7">
              <img class="code" @click="codeClick" :src="imgUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="agree">
          <div class="agree-box" style="display:flex;align-items:center;">
            <el-checkbox v-model="form.agree" class="agree"> </el-checkbox>
            我已阅读并同意
            <el-link type="primary" :underline="false">用户协议</el-link>和
            <el-link type="primary" :underline="false">隐私条款</el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            class="box-btn"
            type="primary"
            @click="submitForm('loginForm')"
            >登录</el-button
          >
          <el-button class="box-btn" type="primary" @click="showReg"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="@/assets/login_banner_ele.png" alt="" class="rightImg" />
    <reg ref="reg"></reg>
  </div>
</template>
<script>
import reg from './components/register'
import { login } from '@/api/login'
import { setToken } from '@/utils/token'
export default {
  components: {
    reg
  },
  data() {
    return {
      form: {
        phone: '18511111111',
        password: '12345678',
        code: '',
        agree: true
      },
      imgUrl:
        process.env.VUE_APP_URL + '/captcha?type=login&date=' + Date.now(),
      rules: {
        // 手机号码表单验证规则
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /(13|14|15|18|17)[0-9]{9}/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        // 密码验证规则
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 5, max: 10, message: '长度为5到10个字符', trigger: 'blur' }
        ],
        // 验证码验证规则
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { len: 4, message: '图片验证码只能是4位', trigger: 'blur' }
        ],
        // 是否同意
        agree: [
          {
            pattern: /true/,
            message: '必须勾选同意用户协议',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    codeClick() {
      this.imgUrl =
        process.env.VUE_APP_URL + '/captcha?type=login&date=' + Date.now()
    },
    submitForm(formname) {
      this.$refs[formname].validate(v => {
        if (v) {
          // 信息提示框第一种
          login({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.code
          })
            .then((res) => {
              if(res.data.code==200){
                setToken(res.data.data.token)
                this.$router.push('/home')
              }else{
                this.$message.warning(res.data.message)
                this.codeClick()
              }
            })

        } else {
          // 信息提示框第二种
          this.$message({
            type: 'error',
            message: '你有未输入的内容'
          })
        }
      })
    },
    showReg() {
      this.$refs.reg.dialogFormVisible = true
    }
  }
}
</script>

<style lang="less">
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  .leftBox {
    box-sizing: border-box;
    width: 478px;
    height: 550px;
    background: #fff;
    padding: 48px 42px 86px;
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 28px;
      .titleImg {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .titleName {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-right: 14px;
      }
      .titleLine {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .titleLogin {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .el-form {
      .el-form-item {
        margin-bottom: 25px;
      }
      .box-btn {
        display: block;
        width: 100%;
        &:nth-child(2) {
          margin-left: 0;
          margin-top: 26px;
        }
      }
      .code {
        width: 110px;
        height: 42px;
      }
    }
  }
  .rightImg {
    width: 663px;
    height: 435px;
  }
}
</style>
