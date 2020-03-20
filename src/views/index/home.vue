<template>
  <el-container class="home">
    <!-- 头部 -->
    <el-header>
      <!-- 左边的部分 -->
      <div class="left">
        <!-- 字体图标 -->
        <i
          @click="isCollapse = !isCollapse"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></i>
        <img src="@/assets/home_logo.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 右边的部分 -->
      <div class="right">
        <img :src="avatar" alt />
        <span class="name">{{ username }}，你好</span>
        <el-button @click="doLogout" type="primary" size="mini">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-menu
          :collapse-transition="false"
          :collapse="isCollapse"
          router
          unique-opened
        >
          <el-menu-item
            :index="'/home/' +item.path"
            v-for="(item, index) in children"
            :key="index"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主体部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logout, info } from '@/api/home'
import { removeToken } from '@/utils/token'
import children from '@/router/children'
export default {
  data() {
    return {
      isCollapse: false,
      avatar: '',
      username: '',
      children
    }
  },
  methods: {
    doLogout() {
      this.$confirm('您将退出本系统, 是否继续退出?', '是否退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //发请求
          logout().then(() => {
            this.$message.success('退出成功！')
            removeToken()
            // 还要清空vuex，传入空字符串就代表把username的值赋值为空
            // 赋值为空就是清空了
            // this.$store.commit('changeUsername', '')
            // this.$store.commit('changeAvatar', '')
            // 跳转到登录页面
            this.$router.push('/login')
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '感谢您，您还留下来陪着我，我好开心O(∩_∩)O哈哈~'
          })
        })
    }
  },
  created() {
    info().then(res => {
      window.console.log(res)
      this.avatar = process.env.VUE_APP_URL + '/' + res.data.data.avatar
      this.username = res.data.data.username
    })
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    padding-left: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .left {
      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
      i {
        font-size: 24px;
        margin-left: 24px;
        margin-right: 22px;
        cursor: pointer;
      }
    }
    .right {
      display: flex;
      align-items: center;
      height: 100%;
      .el-button {
        margin-right: 20px;
        margin-left: 38px;
      }
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      span {
        font-size: 14px;
      }
    }
  }
  .el-aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    transition: all 0.5s;
    .el-menu {
      border-right: none;
    }
    i {
      margin-right: 8px;
    }
  }
  .el-main {
    background: rgba(232, 233, 236, 1);
  }
}
</style>
