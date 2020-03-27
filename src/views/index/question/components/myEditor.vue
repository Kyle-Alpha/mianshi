<template>
  <div>
    <div class="toolbar" ref="toolbar"></div>
    <div class="content" ref="content">
      {{ value }}
    </div>
  </div>
</template>

<script>
// 导入编辑器
import wangEditor from "wangeditor";
export default {
  name:"myEditor",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {

    let editor = new wangEditor(this.$refs.toolbar, this.$refs.content);
    
    // 监听富文本值改变事件
    // function声明的函数，里面的this默认是window,
    // 所以我们这里不要用function，因为它会改变this指向
    // 用箭头函数就不会改变
    editor.customConfig.onchange = html => {
      
        //把值传递给父组件
        this.$emit('input',html);
    };

    editor.create();
  }
};
</script>

<style>
.toolbar {
  border: 1px solid #ccc;
}
.content {
  border: 1px solid #ccc;
  height: 50px;
}
</style>