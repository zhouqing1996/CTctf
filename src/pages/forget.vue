<!--<template>-->
  <!--<body id="poster">-->
  <!--<el-form class="forget-container" label-position="left" label-width="0px">-->
    <!--<h3 class="forget_title">找回密码</h3>-->
    <!--<el-form-item>-->
      <!--<el-input type="text" v-model="forgetForm.username" auto-complete="off" placeholder="账号"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item>-->
      <!--<el-input :type="passwordVisible" v-model="forgetForm.password" auto-complete="off" placeholder="密码">-->
        <!--<i slot="suffix" :class="icon" @click="showPass"></i>-->
      <!--</el-input>-->
    <!--</el-form-item>-->

    <!--<el-form-item style="width: 100%">-->
      <!--<el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="forget">确认修改密码</el-button>-->
    <!--</el-form-item>-->
    <!--<p class="other"><router-link to="/register">没有账号？立即注册</router-link>|<router-link to="/login">登录</router-link></p>-->
  <!--</el-form>-->
  <!--</body>-->
<!--</template>-->
<template>
  <div class="page">
    <div class="loginwarrp">
      <div class="logo"><img src="../common/img/web.png" style="width: 50px;height: 50px;" align="middle"/>计算思维考试系统</div>
      <div class="login_form">
        <li class="login-item" >
          <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-user">用户账号：</span>
          <input type="text" v-model="forgetForm.username" class="login_input" placeholder="用户名">
          <span class="error"></span>
        </li>
        <li class="login-item">
          <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-key">设置密码：</span>
          <input :type="passwordVisible" v-model="forgetForm.password" class="login_input" placeholder="6-10位包含数字、字母、特殊字符">
          <i slot="suffix" :class="icon" @click="showPass"></i>
          <span class="error"></span>
        </li>
        <li class="login-item">
          <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-s-custom">身份选择：</span>
          <select v-model="forgetForm.role" placeholder="选择身份" style="border-radius:10px;">
            <option value="2">教  师</option>
            <option value="3" selected="selected">学  生</option>
            <option value="1">管理员</option>
          </select>
          <span class="error"></span>
        </li>
        <div class="clearfix">
          <li class="login-sub">
            <input type="button" value="确认修改密码" v-on:click="forget">
          </li>
          <span class="error"></span>
        </div>
        <div  >
          <span><router-link to="/login">有账号？立即登录</router-link></span>
          <span><router-link to="/register">没有账号？注册账号</router-link></span>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "forget",
    data() {
      return {
        passwordVisible:'password',
        icon:"el-icon-view",
        forgetForm: {
          username: '',
          password: '',
          role:''
        },
        responseResult: []
      }
    },
    methods: {
      showPass() {
        let that = this
        if (that.passwordVisible === "text") {
          that.passwordVisible = "password";
          //更换图标
          that.icon = "el-icon-view";
        } else {
          that.passwordVisible = "text";
          that.icon = "el-icon-lock";
        }
      },
      forget() {
        let that = this
        let r = '/^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*()_+`\\-={}:";\'<>,.\\/]).{6,10}/';
        var Reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{6,10}/)
        if(!Reg.test(that.forgetForm.password))
        {
          that.$alert('密码规则为：6-10位包含数字、字母、特殊字符的字串', '警告', {
            confirmButtonText: '确定',})
        }
        else{
          let that = this
          that.$http.post('/home/index/forget',{
            username:that.forgetForm.username,
            password:that.forgetForm.password,
            role:that.forgetForm.role
          }).then(res=>{
            console.log(res.data)
            if(res.data.message=="修改密码成功")
            {
              alert('修改密码成功')
              that.$store.dispatch('logout')
              that.$store.dispatch('slogout')
              that.$router.push({
                path:'/login',
                params:{
                  username:that.forgetForm.username
                }
              })
            }
            else {
              alert(res.data.message)
            }
          }).catch(function (error) {
            console.log(error)
          })
        }

      },
      // gotoReigster() {
      //   that.$router.push({
      //     path: "/register"
      //   });
      // },
      // gotoLogin(){
      //   that.$router.push({
      //     path:"/login"
      //   });
      // }
    },
    created:function () {
      that.forgetForm.username = that.$route.params.username
    }
  }
</script>

<style>
  @import "../common/css/forget.css";
</style>
