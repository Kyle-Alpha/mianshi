<template>
  <el-dialog center title="新增学科" :visible.sync="dialogFormVisible">
    <el-form ref="form" :rules="rules" :model="form">
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
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入接口操作函数
import { subjectAdd } from "@/api/subject.js";

export default {
  data() {
    return {
      // 控制对话框显示或隐藏的属性
      dialogFormVisible: false,
      // 跟表单绑定的对象
      form: {},
      formLabelWidth: "80px",
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },

  methods: {
    doAdd() {
      //做整个表单验证
      this.$refs.form.validate(v => {
        if (v) {
          //调用接口传入数据
          //   分析：subjectAdd需要你传入一个对象
          // 对象需要有rid、name、short_name、intro、remark这些属性
          // 而this.form也是对象，而且他刚好也有这些属性
          // 所以我直接传入this.form就打完收工
          //   subjectAdd({
          // rid: this.form.rid,
          // name: this.form.name,
          // short_name: this.form.short_name,
          // intro: this.form.intro,
          // remark: this.form.remark
          // ...this.form
          //   })

          subjectAdd(this.form).then(res => {
            if (res.data.code == 200) {
              this.$message.success("新增成功！");
              this.dialogFormVisible = false;
              //刷新表格数据 this.$parent可以得到父组件
              this.$parent.getList();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style>
</style>