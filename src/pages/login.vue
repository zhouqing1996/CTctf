<template>
  <div class="page">
    <div class="loginwarrp">
      <div class="logo">
        <img src="../common/img/web.png" style="width: 50px;height: 50px;" align="middle"/>计算思维考试系统
      </div>
      <div class="login_form">
        <li class="login-item" >
            <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-user">用户账号：</span>
            <input type="text" v-model="loginForm.username" class="login_input" placeholder="账号">
          <span class="error"></span>
        </li>
        <li class="login-item">
          <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-key">登录密码：</span>
          <input :type="passwordVisible" v-model="loginForm.password" class="login_input" placeholder="密码">
          <i slot="suffix" :class="icon" @click="showPass" style="text-align: right"></i>
          <span class="error"></span>
        </li>
        <li class="login-item">
          <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-s-custom">登录身份：</span>
          <select v-model="loginForm.role" placeholder="选择登录身份" style="border-radius:10px;">
            <option value="2">教  师</option>
            <option value="3" selected="selected">学  生</option>
            <option value="1">管理员</option>
          </select>
        </li>
        <div class="clearfix">
          <li class="login-sub">
            <input type="button" value="登录" v-on:click="login">
          </li>
          <div  >
            <span><router-link to="/register">没有账号？立即注册</router-link></span>
            <span><router-link to="/forget">忘记密码？立即找回</router-link></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "Login",
    data() {
      return {
        passwordVisible:'password',
        icon:"el-icon-view",
        loginForm: {
          username: '',
          password: '',
          role:''
        },
        responseResult: []
      }
    },
    methods: {
      showPass() {
        let that =this
        if (that.passwordVisible === "text") {
          that.passwordVisible = "password";
          //更换图标
          that.icon = "el-icon-view";
        } else {
          that.passwordVisible = "text";
          that.icon = "el-icon-lock";
        }
      },
      login() {
        let that =this
        if(that.loginForm.username==''||that.loginForm.password==''||that.loginForm.role=='')
        {
          that.$alert('请输入完整登录信息', '警告', {
            confirmButtonText: '确定',
          type:'warning'})
        }
        else{
          that.$http.post('/home/index/login',{
            username:that.loginForm.username,
            password:that.loginForm.password,
            role:that.loginForm.role
          }).then(res=>{
            console.log(res.data)
            var message = res.data.message
            if(message=="登录成功")
            {
              // that.$store.dispatch('login',res.data.data)
              that.$store.dispatch('slogin',res.data.data)
              let role = that.$store.getters.getsRole
              // alert(message)
              that.$alert(res.data.message, '成功', {
                confirmButtonText: '确定',
                type:'success'})
              if(role==1)
              {
                //管理员
                that.$router.push({path:'/admin/index'})
              }
              else if(role ==2)
              {
                //二级管理员
                that.$router.push({path:'/teacher/index'})
              }
              else
              {
                that.$router.push({path:'/user/index'})
              }
              console.log(that.$store.getters.getsToken)
            }
            else if(message=="该用户不存在")
            {
              alert(message)
            }
            else if(message=="密码错误，登录失败")
            {
              alert(message)
            }
          }).catch(function (error) {
            console.log(error)
          })
        }
      },
      // gotoReigster() {
      //   this.$router.push({
      //     path: "/register"
      //   });
      // },
      // gotoForget(){
      //   this.$router.push({
      //     path:"/forget"
      //   });
      // }
    },
    created:function ()
    {
      this.loginForm.username = this.$route.params.username;
      this.loginForm.password = this.$route.params.password
    }
  }
</script>

<style>
  @import "../common/css/login.css";
</style>
