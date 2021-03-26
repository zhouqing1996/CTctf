<template>
  <div class="page">
    <div class="loginwarrp">
      <div class="logo"><img src="../common/img/web.png" style="width: 50px;height: 50px;" align="middle"/>计算思维考试系统</div>
      <div class="login_form">
        <li class="login-item" >
          <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-user">用户账号：</span>
          <input type="text" v-model="registerForm.userno" class="login_input" placeholder="用户账号">
          <span class="error"></span>
        </li>
        <li class="login-item" >
          <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-user"> 用 户 名：</span>
          <input type="text" v-model="registerForm.username" class="login_input" placeholder="用户名">
          <span class="error"></span>
        </li>
        <li class="login-item">
          <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-key">设置密码：</span>
          <input :type="passwordVisible1" v-model="registerForm.password" class="login_input" placeholder="6-10位包含数字、字母、特殊字符">
          <i slot="suffix" :class="icon1" @click="showPass1"></i>
          <span class="error"></span>
        </li>
        <li class="login-item">
          <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-key">确认密码：</span>
          <input :type="passwordVisible2" v-model="registerForm.password1" class="login_input" placeholder="密码">
          <i slot="suffix" :class="icon2" @click="showPass2"></i>
          <span class="error"></span>
        </li>
        <li class="login-item">
          <span style="font-size: 20px;color: #0ea0db;font-weight: bold;" class="el-icon-s-custom">注册身份：</span>
          <select v-model="registerForm.role" placeholder="选择注册身份" style="border-radius:10px;">
            <option value="2">教  师</option>
            <option value="3" selected="selected">学  生</option>
            <option value="1">管理员</option>
          </select>
          <span class="error"></span>
        </li>
        <div class="clearfix">
          <li class="login-sub">
            <input type="button" value="注册" v-on:click="submitForm(registerForm)">
          </li>
          <span class="error"></span>
        </div>
          <div  >
            <span><router-link to="/login">有账号？立即登录</router-link></span>
            <span><router-link to="/forget">忘记密码？立即找回</router-link></span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
    export default {
        name: "register",
      data() {
        return {
          registerForm: {
            userno:'',
            password: "",
            password1: "",
            username: "",
            role:''
          },
          flag: true,
          passwordVisible1:'password',
          passwordVisible2:'password',
          icon1:"el-icon-view",
          icon2:"el-icon-view",
        }
      },
      methods: {
        showPass1() {
          let that =this
          if (that.passwordVisible1 === "text") {
            that.passwordVisible1 = "password";
            //更换图标
            that.icon1 = "el-icon-view";
          } else {
            that.passwordVisible1 = "text";
            that.icon1 = "el-icon-lock";
          }
        },
        showPass2() {
          let that =this
          if (that.passwordVisible2 === "text") {
            that.passwordVisible2 = "password";
            //更换图标
            that.icon2 = "el-icon-view";
          } else {
            that.passwordVisible2 = "text";
            that.icon2 = "el-icon-lock";
          }
        },
        submitForm(formName) {
          let that =this
          let r = '/^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*()_+`\\-={}:";\'<>,.\\/]).{6,10}/';
          var Reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{6,10}/)
          if(!Reg.test(that.registerForm.password))
          {
            that.$alert('密码规则为：6-10位包含数字、字母、特殊字符的字串', '警告', {
              confirmButtonText: '确定',})
          }
          else if(that.registerForm.userno=='')
          {
            that.$alert('用户账号为空！', '警告', {
              confirmButtonText: '确定',})
          }
          else if(that.registerForm.password1 != that.registerForm.password)
          {
            that.$alert('两次输入密码不一致', '警告', {
              confirmButtonText: '确定',})
          }
          else{
            console.log(that.registerForm.username);
            console.log(that.registerForm.password);
            that.$http.post('/home/index/register',{
              username:that.registerForm.username,
              password:that.registerForm.password,
              role:that.registerForm.role,
              no:that.registerForm.userno
            }).then(res=>{
              console.log(res.data)
              if(res.data.message=="注册成功")
              {
                alert('注册成功')
                that.$router.push({
                  path:'/login',
                  params:{
                    username:that.registerForm.username,
                    password:that.registerForm.password
                  }
                })
              }
              else
              {
                alert(res.data.message)
              }
            }).catch(function (error) {
              console.log(error)
            })
          }

        },
      }
    }
</script>

<style scoped>
  @import "../common/css/login.css";
</style>


