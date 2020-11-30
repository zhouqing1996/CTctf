
<template>
  <!--我的资料-->
  <div>
    <!--<el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">-->
    <!--<el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>-->
    <!--<el-breadcrumb-item>个人资料</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <!--<div><hr/></div>-->
    <div >
      <el-page-header @back="goBack" content="个人资料">
      </el-page-header>
    </div>
    <div class="all">
      <div class="container">
        <h3 class="title">我的资料</h3>
        <p>
          <span class="label">用户编号：</span>
          {{userid}}
        </p>
        <p>
          <span class="label">用 户 名：
        </span>{{username}}
        </p>
        <p>
          <span class="label">用户工号：
          </span>
          {{userno}}
        </p>
        <p v-if="userrole==1"><span class="label">身        份：</span>超级管理员</p>
        <p v-if="userrole==2"><span class="label">身        份：</span>二级管理员</p>
        <p v-if="userrole==3"><span class="label">身         份：</span>普通用户</p>
      </div>
      <div class="function">
        <h3 class="title">个人操作</h3>
        <el-button type="primary" round @click="chgeFlag=true">修改密码</el-button>
        <el-dialog title="修改密码" :visible.sync="chgeFlag" class="changePwd">
          <el-form >
            <el-form-item label="密       码:" :label-width="labelWidth">
              <el-input :type="passwordVisible" v-model="newpwd" auto-complete="off" placeholder="密码规则为：6-10位包含数字、字母、特殊字符的字串">
                <i slot="suffix" :class="icon" @click="showPass"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="确认密码:" :label-width="labelWidth">
              <el-input :type="passwordVisible1" v-model="newpwds" auto-complete="off" placeholder="确认密码">
                <i slot="suffix" :class="icon1" @click="showPass1"></i>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" style="align-content: center" class="dialog-footer">
            <el-button type="primary" @click="changePwd(newpwd,newpwds)">提交</el-button>
            <el-button @click="Reset">重置</el-button>
          </div>
        </el-dialog>
        <el-button type="primary" round @click="logout">退出登录</el-button>
      </div>
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
        userrole:this.$store.getters.getsRole,
        userno:this.$store.getters.getsNo,
        chgeFlag:false,

        passwordVisible:'password',
        icon:"el-icon-view",
        passwordVisible1:'password',
        icon1:"el-icon-view",
        pwd:this.$store.getters.getsPwd,
        newpwd:'',
        newpwds:'',
        labelWidth:"150px"
      }
    },
    methods:{
      goBack:function () {
        this.$router.push({
          path: '/teacher/index'
        })
      },
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
      //修改密码
      changePwd:function (newpwd,newpwds) {
        let that =this
        if(newpwd==newpwds) {
          var Reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>,.\/]).{6,10}/)
          if(!Reg.test(that.newpwd))
          {
            that.$alert('密码规则为：6-10位包含数字、字母、特殊字符的字串', '警告', {
              confirmButtonText: '确定',})
          }
          else
          {
            that.$http.post('/home/user/changeuser', {
              flag: 3,
              userid: that.$store.getters.getsId,
              password: newpwd
            }).then(res => {
              console.log(res.data)
              if (res.data.message == "和原始密码一致") {
                that.$alert(res.data.message,'提示',{
                  confirmButtonText:'确定',
                  type:'warning'
                })
              }
              else if (res.data.message == "该用户密码修改成功") {
                console.log(res.data)
                that.$store.dispatch('sforget',res.data.data)
                that.$store.dispatch('userLogin',true)
                that.$alert(res.data.message,'提示',{
                  confirmButtonText:'确定',
                  type:'warning'
                })
                that.chgeFlag = false
                // that.$router.push({path: '/admin/index'})
              }
              else {
                console.log(res.data.message)
                // alert(res.data.message)
                that.$alert(res.data.message,'提示',{
                  confirmButtonText:'确定',
                  type:'warning'
                })
              }
            }).catch(() => {
            })
          }
        }
        else{
          // alert("密码输入不一致！")
          that.$alert("密码输入不一致！",'提示',{
            confirmButtonText:'确定',
            type:'warning'
          })
        }
      },
      Reset:function () {
        this.newpwd=''
        this.newpwds=''
      },
      //退出登录
      logout:function () {
        let that = this
        let suserid=that.$store.getters.getsId
        console.log(suserid)
        that.$confirm("是否退出？","提示",{
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning"
        }).then(()=>{
          that.$http.post('/home/index/logout',
            {
              userid:suserid
            }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="退出成功")
            {
              that.$store.dispatch('slogout')
              that.$alert(res.data.message, '提示', {
                confirmButtonText: '确定',
                type:'warning'
              })
              that.$router.push({path:'/login'})
            }
            else
            {
              that.$alert(res.data.message, '提示', {
                confirmButtonText: '确定',
                type:'warning'
              })
            }
          })
        }).catch(()=>
        {});
      }
    }
  }
</script>

<style scoped>
  @import "../../../common/css/my.css";
</style>

