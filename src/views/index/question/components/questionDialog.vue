<template>
  <el-dialog
    destroy-on-close
    class="my-add-dialog"
    fullscreen
    :title="add ? '新增题库' : '编辑题库'"
    :visible.sync="dialogFormVisible"
    @close="reset"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <subject-select v-model="form.subject"></subject-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="企业"
        prop="enterprise"
        :label-width="formLabelWidth"
      >
        <enterpriseSelect v-model="form.enterprise"></enterpriseSelect>
      </el-form-item>

      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <china-area v-model="form.city" />
      </el-form-item>

      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="难度"
        prop="difficulty"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label-width="0px">
        <div class="line" style="display:flex;justify-content:center;">
          <el-divider style="width:832px;"></el-divider>
        </div>
      </el-form-item>

      <el-form-item label="试题标题" prop="title" :label-width="formLabelWidth">
        <quill-editor v-model="form.title" :options="editorOption" />
      </el-form-item>

      <el-form-item
        prop="single_select_answer"
        v-if="form.type == 1"
        label="单选"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="form.single_select_answer">
          <!-- 导入组件就行了 -->
          <optionItem
            v-for="(item, index) in form.select_options"
            :key="index"
            :label="item.label"
            :text.sync="item.text"
            :image.sync="item.image"
          />
        </el-radio-group>
      </el-form-item>

      <el-form-item
        prop="multiple_select_answer"
        v-else-if="form.type == 2"
        label="多选"
        :label-width="formLabelWidth"
      >
        <div>
          <el-checkbox-group v-model="form.multiple_select_answer">
            <optionItem
              :isRadio="false"
              v-for="(item, index) in form.select_options"
              :key="index"
              :label="item.label"
              :text.sync="item.text"
              :image.sync="item.image"
            />
          </el-checkbox-group>
        </div>
      </el-form-item>

      <el-form-item
        prop="short_answer"
        v-else
        label="简答"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="form.short_answer"
          type="textarea"
          :rows="2"
        ></el-input>
      </el-form-item>

      <el-form-item label-width="0px">
        <div class="line" style="display:flex;justify-content:center;">
          <el-divider style="width:832px;"></el-divider>
        </div>
      </el-form-item>

      <el-form-item prop="video" label="解析视频" :label-width="formLabelWidth">
        <videoUpload :video.sync="form.video" />
      </el-form-item>

      <el-form-item label-width="0px">
        <div class="line" style="display:flex;justify-content:center;">
          <el-divider style="width:832px;"></el-divider>
        </div>
      </el-form-item>

      <el-form-item
        prop="answer_analyze"
        label="答案解析"
        :label-width="formLabelWidth"
      >
        <quill-editor v-model="form.answer_analyze" :options="editorOption" />
      </el-form-item>

      <el-form-item
        prop="remark"
        label="试题备注"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.remark" type="textarea" :rows="2"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <!-- dialogFormVisible = false -->
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入省市区组件
import chinaArea from './ChinaArea.vue'
// 导入封装的富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
// 导入选项的组件
import optionItem from './optionItem.vue'
// 导入视频上传的组件
import videoUpload from './videoUpload.vue'

// 导入新增
import { questionAdd, questionEdit } from '@/api/question.js'

export default {
  components: {
    chinaArea,
    quillEditor,
    optionItem,
    videoUpload
  },

  data() {
    return {
      dialogFormVisible: false,
      add: true,
      form: {
        // 存视频地址
        video: '',
        // 存题型的
        type: 1,
        // 单选绑定答案,
        city: '',
        single_select_answer: '',
        // 多选绑定答案，记得给数组
        multiple_select_answer: [],
        // 简答绑定答案
        short_answer: '',
        // 跟选项绑定的数组
        select_options: [
          {
            label: 'A',
            text: '',
            image: ''
          },
          {
            label: 'B',
            text: '',
            image: ''
          },
          {
            label: 'C',
            text: '',
            image: ''
          },
          {
            label: 'D',
            text: '',
            image: ''
          }
        ]
      },
      formLabelWidth: '280px',

      rules: {
        title: { required: true, message: '标题不能为空', trigger: 'blur' },
        subject: { required: true, message: '学科不能为空', trigger: 'change' },
        step: { required: true, message: '阶段不能为空', trigger: 'change' },
        enterprise: {
          required: true,
          message: '企业不能为空',
          trigger: 'change'
        },
        city: { required: true, message: '城市不能为空', trigger: 'change' },
        type: { required: true, message: '题型不能为空', trigger: 'change' },
        difficulty: {
          required: true,
          message: '难度不能为空',
          trigger: 'change'
        },
        single_select_answer: {
          required: true,
          message: '单选答案不能为空',
          trigger: 'change'
        },
        multiple_select_answer: {
          required: true,
          message: '多选答案不能为空',
          trigger: 'change'
        },
        short_answer: {
          required: true,
          message: '简答题的答案不能为空',
          trigger: 'blur'
        },
        answer_analyze: {
          required: true,
          message: '答案解析不能为空',
          trigger: 'blur'
        },
        remark: { required: true, message: '试题备注不能为空', trigger: 'blur' }
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], //引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], //列表
            // [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            // [{ direction: 'rtl' }], // 文本方向

            // [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            // [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            // [{ font: [] }], //字体
            [{ align: [] }], //对齐方式

            ['clean'], //清除字体样式
            ['image', 'video'] //上传图片、上传视频
          ]
        },
        theme: 'snow',
        placeholder: '请输入内容'
      }
    }
  },

  methods: {
    //保存的点击事件
    save() {
      this.$refs.form.validate(v => {
        if (v) {
          if (this.add) {
            questionAdd(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success('新增题库完成！')
                this.$refs.form.resetFields()
                // 隐藏对话框
                this.dialogFormVisible = false
                //刷新表格列表
                this.$parent.getList()
              } else {
                this.$message.error(res.data.message)
              }
            })
          } else {
            questionEdit(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success('编辑题库完成！')
                this.$parent.oldItem = {}
                // 重置表单元素,只能重置表单元素
                // 而我们自己封装的组件，就不叫表单元素了
                // 所以不会被清除，那如果我让组件销毁就能让组件的数据也清除了
                this.$refs.form.resetFields()
                // 隐藏对话框
                this.dialogFormVisible = false
                //刷新表格列表
                this.$parent.getList()
              } else {
                this.$message.error(res.data.message)
              }
            })
          }
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
      this.form.select_options = [
        {
          label: 'A',
          text: '',
          image: ''
        },
        {
          label: 'B',
          text: '',
          image: ''
        },
        {
          label: 'C',
          text: '',
          image: ''
        },
        {
          label: 'D',
          text: '',
          image: ''
        }
      ]
      this.dialogFormVisible = false
    }
  }
}
</script>

<style lang="less">
.my-add-dialog {
  .el-select {
    width: 364px;
  }

  .el-form-item__label {
    padding-right: 41px;
  }

  .el-divider {
    width: 832px;
  }

  .avatar-uploader {
    text-align: left;
  }
  .quill-editor {
    width: 800px;
  }
  .el-textarea {
    width: 800px;
  }
}
</style>
