<template>
  <el-select v-model="business" placeholder="请选择企业" @change="selChange">
    <el-option value="" v-if="isSearch">所有企业</el-option>
    <el-option
      v-for="(item,index) in businessList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { enterpriseList } from "@/api/enterprise.js";
export default {

  props:{

      value:{
          default:""
      },

      isSearch:{
        type:Boolean,
        default:false,
      }
  },
  data() {
    return {
      business: this.value,
      businessList:[]
    };
  },

  methods: {
      selChange(){

          this.$emit('input',this.business)
      }
  },

  watch:{

    value(val){

      this.business = val;
    }
  },

  created() {
    // 获取企业数据
    enterpriseList({
      status: 1
    }).then(res => {
      this.businessList = res.data.data.items;
    });
  }
};
</script>

<style>
</style>
