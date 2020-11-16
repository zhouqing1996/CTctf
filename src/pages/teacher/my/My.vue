<template>
  <!--我的资料-->
  <div>
    <div class="back">
      <el-page-header @back="back">
      </el-page-header>
    </div>
    <div>
      <el-form class="my-container" label-position="left" label-width="0px">
        <h3 class="my_title">我的资料</h3>
        <!--<p>用户编号：{{this.userid}}</p>-->
        <p>用户工号：{{this.userno}}</p>
        <p>用 户 名：{{this.username}}</p>
        <p v-if="this.userrole==1">身      份：管理员</p>
        <p v-if="this.userrole==2">身      份：教师</p>
        <p v-if="this.userrole==3">身      份：学生</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my",
    data(){
      return {
        userid:this.$store.getters.getsId,
        username:this.$store.getters.getsName,
        userno:this.$store.getters.getsNo,
        userrole:this.$store.getters.getsRole,
      }
    },
    methods:{
      back:function(){
        this.$router.push({
          path:'/teacher/index',
        })
      },
    }
  }
</script>

<style scoped>
  .my-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    text-align: left;
  }
  .my_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
