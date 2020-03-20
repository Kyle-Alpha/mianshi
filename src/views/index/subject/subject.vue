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
        <el-form-item label="学科编号" prop="rid">
          <el-input class="short" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input class="normal" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="normal" v-model="formInline.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showDialog"
            >新增学科</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下面卡片 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            <!-- 把创建日期用全局过滤器过滤显示 -->
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showDialog($event, scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="changeStatus(scope.row)">{{
              scope.row.status === 1 ? '禁用' : '启用'
            }}</el-button>
            <el-button type="text" @click="doDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <subjectDialog ref="subjectDialog"></subjectDialog>
  </div>
</template>

<script>
import { subjectList, subjectStatus, subjectDel } from '@/api/subject.js'
import subjectDialog from './components/subjectDialog.vue'

export default {
  name: 'subject',
  components: {
    subjectDialog
  },
  data() {
    return {
      // 上面行内表单绑定的对象
      formInline: {},
      // 表格绑定的数据源
      tableData: [],
      // 分页的当前页
      page: 1,
      // 页容量
      size: 2,
      // 数据总量
      total: 0,
      // // 判断是否第一次
      // isFirst:true
      // 记录一下上次点的是哪一行数据
      oldItem: {}
    }
  },
  methods: {
    //删除的点击事件
    doDel(item) {
      subjectDel({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          //删除成功
          this.$message.success('删除成功')

          // 如果是最后一条数据，那么要刷新上一页
          if (this.tableData.length == 1) {
            // 代表是上一页
            this.page--
          }

          // 如果--后为0了代表是第一页删完了，不能让当前页记录为0，应该记录为1
          if (this.page == 0) {
            this.page = 1
          }

          // 默认刷新当前页
          this.getList()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    // 点击不同按钮显示不同框
    showDialog(e, item) {
      this.$refs.subjectDialog.dialogFormVisible = true
      if (!item) {
        this.$refs.subjectDialog.form = {}
        this.$refs.subjectDialog.add = true
        return
      }
      if (item != this.oldItem) {
        this.$refs.subjectDialog.add = false
        this.$refs.subjectDialog.form = { ...item }
        // 并且把记录的上一行数据记录成当前行的数据
        this.oldItem = item
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
      // console.log(this.formInline);
      this.getList()
    },
    // 修改状态的点击事件
    changeStatus(item) {
      // console.log(item);

      subjectStatus({
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
      subjectList({
        page: this.page,
        // 你设置的页容量是多少，我就查出多少
        limit: this.size,

        // rid: this.formInline.rid,
        // name: this.formInline.name,
        // username: this.formInline.username,
        // status: this.formInline.status,
        ...this.formInline
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
</style>
