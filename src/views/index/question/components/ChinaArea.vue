<template>
  <!-- props里写value，并且值为label，就代表获取级联菜单选中的值的时候，是获取的label属性值 -->
  <el-cascader
    :value="value.split(',')"
    :options="options"
    :props="{ expandTrigger: 'hover', value: 'label' }"
    @input="v=>{$emit('input',v.toString())}"
  ></el-cascader>
</template>

<script>
// 导入带省市区以及全部选项的省市区联动数据
import { regionDataPlus } from 'element-china-area-data'

export default {
  name: 'chinaArea',
  props: ['value'],
  data() {
    return {
      options: regionDataPlus
    }
  },

}
</script>

<style></style>
