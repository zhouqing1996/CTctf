<template>
  <el-container class="all">
    <el-header class="header-css">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#EED8AE"
        text-color="#4876FF"
        active-text-color="#00F5FF"
        height="100px">
        <el-menu-item index="10">
          <router-link to="/teacher/index">
            <img src="../../common/img/sds_di42leiwangzhanfuwu--.png" style="height:60px;width: 60px">
          </router-link>
        </el-menu-item>
        <el-menu-item index="1">
          <router-link to="/teacher/index">
            <img src="../../common/img/web.png" style="height: 20px;width: 20px">
            首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/teacher/stuManage" >
            <img src="../../common/img/web.png" style="height: 20px;width: 20px">
            学生管理</router-link>
        </el-menu-item>
        <!--<el-submenu index="3">-->
          <!--<template slot="title">教师事务管理</template>-->
          <!--<el-menu-item index="3-1">-->
            <!--<router-link to="/teacher/create" >评测管理</router-link>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="3-2">-->
            <!--<router-link to="" >资源管理</router-link>-->
          <!--</el-menu-item>-->
        <!--</el-submenu>-->
        <el-menu-item index="3">
          <router-link to="/teacher/resourse" >
            <img src="../../common/img/web.png" style="height: 20px;width: 20px">
            资源管理</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/teacher/create" >
            <img src="../../common/img/web.png" style="height: 20px;width: 20px">
            评测管理</router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <router-link to="/teacher/pCreate" >
            <img src="../../common/img/web.png" style="height: 20px;width: 20px">
            练习管理</router-link>
        </el-menu-item>
        <el-submenu index="6">
          <template slot="title">
            <img src="../../common/img/web.png" style="height: 20px;width: 20px">
            我的信息</template>
          <el-menu-item index="6-1">
            <router-link to="/teacher/my" >
              <img src="../../common/img/web.png" style="height: 20px;width: 20px">
              我的资料</router-link>
          </el-menu-item>
          <!--<el-menu-item index="7-2">-->
            <!--<router-link to="/teacher/my/changepwd" >修改密码</router-link>-->
          <!--</el-menu-item>-->
          <el-menu-item index="6-2" v-on:click="logout">
            <img src="../../common/img/web.png" style="height: 20px;width: 20px">
            退出登录
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main  class="main-css" v-bind:style="{minHeight: Height+'px'}">
      <router-view />
    </el-main>
    <el-footer class="footer">
      <!--<el-menu-->
        <!--class="el-menu-demo"-->
        <!--mode="horizontal"-->
        <!--background-color="#1E90FF"-->
        <!--text-color="#fff"-->
        <!--active-text-color="#ffd04b">-->
        <!--<el-menu-item index="1">用户页面</el-menu-item>-->
        <!--<el-submenu index="2">-->
          <!--<template slot="title">友情链接</template>-->
          <!--<el-menu-item index="2-1">-->
            <!--<a href="https://www.luogu.com.cn">洛谷</a>-->
          <!--</el-menu-item>-->
        <!--</el-submenu>-->
      <!--</el-menu>-->
    </el-footer>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return{
        Height:0
      }
    },
    methods:{
      mounted(){
        let that =this
        //动态设置内容高度 让footer始终居底   header+footer的高度是100
        that.Height = document.documentElement.clientHeight;
        //监听浏览器窗口变化　
        window.onresize = ()=> {that.Height = document.documentElement.clientHeight}
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
              // alert("退出成功！")
              that.$alert(res.data.message, '提示', {
                confirmButtonText: '确定',
                type:'warning'
              })
              that.$router.push({path:'/login'})
            }
            else
            {
              alert(res.data.message)
            }
          })
        }).catch(()=>
        {});
      }
    },
    created()
    {

    }
  }
</script>

<style scoped>
  @import "../../common/css/home.css";
</style>
