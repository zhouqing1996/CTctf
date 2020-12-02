<template>
    <!--学生练习-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生练习</el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div>
      <div class="search">
        <!--<el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="name" class="searchInput"></el-input>-->
        <!--<el-button round @click="searchStudent" class="searchBtn">搜索</el-button>-->
        <!--<el-button round @click="addFlag=true" class="searchBtn">添加学生</el-button>-->
        <el-button round  class="searchBtn el-icon-document" @click="exportP">导出数据</el-button>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Practice",
      data()
      {
        return {

        }
      },
      methods:{
        exportP:function()
        {
          let that =this
          that.$http.post('/home/export/studentpra').then(function (res) {
            console.log(res.data)
            window.open(res.data.data)
          })
        },
      }
    }
</script>

<style scoped>
  @import "../../../common/css/manages.css";
</style>
