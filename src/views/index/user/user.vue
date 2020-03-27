<template>
  <div>
    <!-- 顶部卡片 -->
    <el-card class="box-card">
      <el-form
        ref="formInline"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="normal" v-model="formInline.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select class="normal" v-model="formInline.role_id">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showDialog()"
            >新增用户</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="100"
        ></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            {{ roles[scope.row.role_id - 1] }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              @change="changeStatus(scope.row)"
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="showDialog(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="doDel(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
import { userList, userStatus, userRemove } from '@/api/user.js'
import userDialog from './components/userDialog'

export default {
  name: 'user',
  components: {
    userDialog
  },
  data() {
    return {
      // 上面行内表单绑定的对象
      formInline: {
        username: '',
        email: '',
        role_id: ''
      },
      searchData: {},
      // 表格绑定的数据源
      tableData: [],
      // 分页的当前页
      roles: ['超级管理员', '管理员', '老师', '学生'],
      page: 1,
      // 页容量
      size: 2,
      // 数据总量
      total: 0,
      oldItem: {}
    }
  },
  methods: {
    //删除的点击事件
    doDel(item) {
      this.$confirm('请问是否要删除这行数据？')
        .then(() => {
          userRemove({
            id: item.id
          }).then(res => {
            if (res.data.code == 200) {
              this.$message.success('删除成功')
              if (this.tableData.length == 1) {
                this.page--
              }
              if (this.page == 0) {
                this.page = 1
              }
              this.getList()
            } else {
              this.$message.error(res.data.message)
            }
          })
        })
        .catch(c => c)
    },
    // 点击不同按钮显示不同框
    showDialog(item) {
      this.$refs.userDialog.dialogFormVisible = true
      if (!item) {
        this.$refs.userDialog.form = {}
        this.$refs.userDialog.add = true
      } else if (this.oldItem.id !== item.id) {
        this.$refs.userDialog.add = false
        let c = { ...item }
        this.$refs.userDialog.form = c
        this.oldItem = c
      } else {
        this.$refs.userDialog.add = false
        this.$refs.userDialog.form = this.oldItem
      }
    },

    // 清除筛选的点击事件
    clearSearch() {
      //表单对象的重置方法
      //要想表单有重置方法，那么也需要给每一项加prop属性
      this.$refs.formInline.resetFields()

      // 根据最新的表单内容重新调用请求
      this.page = 1 //都要从第一页开始重新查出所有
      this.getList()
    },
    // 给搜索加点击事件
    doSearch() {
      this.searchData = this.formInline
      this.getList()
    },
    // 修改状态的点击事件
    changeStatus(item) {
      userStatus({
        id: item.id
      }).then(() => {
        //刷新界面就可以了
        //只要刷新表格就行了
        //刷新表格其实就是对表格数据重新请求
        this.getList()
      })
    },

    // 页码改变事件
    handleCurrentChange(page) {
      // 改变后的页码赋值给this.page这个属性
      // 这样子我们再去请求数据的时候，就直接请求的是改变后的页码数据了
      this.page = page
      // 根据新的页码去重新请求数据
      this.getList()
    },

    // 页容量改变事件
    handleSizeChange(size) {
      // 赋值为改变后的页容量
      this.size = size
      // 只要页容量改变了，都应该从第一页重新显示
      this.page = 1
      // 再去查数据，就是以最新页容量查出数据了
      this.getList()
    },

    // 封装的获取学科列表的函数
    getList() {
      userList({
        page: this.page,
        // 你设置的页容量是多少，我就查出多少
        limit: this.size,
        ...this.searchData
      }).then(res => {
        // 设置表格数据源
        this.tableData = res.data.data.items
        // 设置数据总量
        this.total = res.data.data.pagination.total
      })
    }
  },

  created() {
    // 获取数据
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 90px !important;
}

.normal {
  width: 139px;
}
.el-pagination {
  text-align: center;
}
</style>
