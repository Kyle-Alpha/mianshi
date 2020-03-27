<template>
<!-- props里写value，并且值为label，就代表获取级联菜单选中的值的时候，是获取的label属性值 -->
  <el-cascader
    v-model="city"
    :options="options"
    :props="{ expandTrigger: 'hover', value:'label' }"
    @change="handleChange"
    ></el-cascader>
</template>

<script>

// 导入带省市区以及全部选项的省市区联动数据
import { regionDataPlus } from 'element-china-area-data'

export default {
    name:"chinaArea",
    props:{

        value:{
            default:""
        }
    },
    data() {
        return {
            city:this.value,
            options: regionDataPlus
        }
    },

    methods: {
        handleChange(){

            this.$emit('input',this.city)
        }
    },
};
</script>

<style>
</style>
