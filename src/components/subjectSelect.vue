<template>
  <el-select :value="value" placeholder="请选择学科" @input="v=>{$emit('input',v)}">
    <!-- 按条件显示 -->
    <el-option value="" v-if="isSearch">所有学科</el-option>
    <el-option v-for="(item,index) in subjectList" :key="index" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
import { subjectList } from "@/api/subject.js";
export default {

  name:"subjectSelect",

  props:{

      value:{
          default:''
          },
      isSearch:{

        type:Boolean,
        default:false
      }
  },

  data() {
    return {
      subjectList:[]
    };
  },



  created() {
    //   获取学科数据
    subjectList({
      status: 1
    }).then(res => {
      this.subjectList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>
