<template>
  <body id="poster">
  <el-form class="register-container" label-position="left" label-width="0px">
    <h3 class="register_title">注册</h3>
    <el-form-item>
      <el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
    </el-form-item>

    <el-form-item>
      <el-input :type="passwordVisible1"  v-model="registerForm.password" auto-complete="off" placeholder="密码规则：6-10位包含数字、字母、特殊字符">
        <i slot="suffix" :class="icon1" @click="showPass1"></i>
      </el-input>
    </el-form-item>

    <el-form-item>
    <el-input :type="passwordVisible2"  v-model="registerForm.password1" auto-complete="off" placeholder="请再次输入密码">
      <i slot="suffix" :class="icon2" @click="showPass2"></i>
    </el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="submitForm(registerForm)">确认注册</el-button>
    </el-form-item>
    <p class="other"><router-link to="/login">登录</router-link></p>
  </el-form>
  </body>
</template>

<script>
    export default {
        name: "register",
      data() {
        return {
          registerForm: {
            password: "",
            password1: "",
            username: ""
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
          if (this.passwordVisible1 === "text") {
            this.passwordVisible1 = "password";
            //更换图标
            this.icon1 = "el-icon-view";
          } else {
            this.passwordVisible1 = "text";
            this.icon1 = "el-icon-lock";
          }
        },
        showPass2() {
          if (this.passwordVisible2 === "text") {
            this.passwordVisible2 = "password";
            //更换图标
            this.icon2 = "el-icon-view";
          } else {
            this.passwordVisible2 = "text";
            this.icon2 = "el-icon-lock";
          }
        },
        submitForm(formName) {
          let r = '/^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*()_+`\\-={}:";\'<>,.\\/]).{6,10}/';
          var Reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{6,10}/)
          if(!Reg.test(this.registerForm.password))
          {
            this.$alert('密码规则为：6-10位包含数字、字母、特殊字符的字串', '警告', {
              confirmButtonText: '确定',})
          }
          else if(this.registerForm.password1 != this.registerForm.password)
          {
            this.$alert('两次输入密码不一致', '警告', {
              confirmButtonText: '确定',})
          }
          else{
            console.log(this.registerForm.username);
            console.log(this.registerForm.password);
            this.$http.post('/yii/home/index/register',{
              username:this.registerForm.username,
              password:this.registerForm.password
            }).then(res=>{
              console.log(res.data)
              if(res.data.message=="注册成功")
              {
                alert('注册成功')
                this.$router.push({
                  path:'/login',
                  params:{
                    username:this.registerForm.username,
                    password:this.registerForm.password
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
  #poster {
    /*background:url("../assets/eva.jpg") no-repeat;*/
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }

  .register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .register_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .other {
    margin-top: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #1ab2ff;
    cursor: pointer;
    text-align: center;
    /*text-indent: 8px;*/
    width: 360px;
  }
  .other:hover {
    /*color: #2c2fd6;*/
  }
</style>


