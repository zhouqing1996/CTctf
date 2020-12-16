<template>
  <el-container>
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="	#1E90FF"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <router-link to="/user/index">首页</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/user/practice">练习</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/user/evaluate" >测评</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/user/recourse" >资源</router-link>
        </el-menu-item>

        <!--<el-menu-item index="4">-->
          <!--<router-link to="/user/rank" >排名</router-link>-->
        <!--</el-menu-item>-->
        <el-menu-item index="6">
          <router-link to="/user/evaluate/userNresult" >结果查看</router-link>
          <!--<template slot="title">结果</template>-->
          <!--<el-menu-item index="6-1">-->
            <!--<router-link to="/user/evaluate/result" >结果查看</router-link>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="6-2">-->
            <!--<router-link to="/user/evaluate/userNresult" >结果查看2</router-link>-->
          <!--</el-menu-item>-->
        </el-menu-item>
        <el-submenu index="7">
          <template slot="title">我的信息</template>
          <!--<el-menu-item index="7-1">-->
            <!--<router-link to="/user/class/select" >选择导师</router-link>-->
          <!--</el-menu-item>-->
          <el-menu-item index="7-2">
            <router-link to="/user/my" >我的资料</router-link>
          </el-menu-item>
          <!--<el-menu-item index="7-3">-->
            <!--<router-link to="/user/my/changepwd" >修改密码</router-link>-->
          <!--</el-menu-item>-->
          <el-menu-item index="7-4" v-on:click="logout">
            退出登录
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main  class="main-css" v-bind:style="{minHeight: Height+'px'}">
      <router-view />
    </el-main>
    <el-footer class="footer">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#1E90FF"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">用户页面</el-menu-item>
      </el-menu>
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
    mounted(){
      //动态设置内容高度 让footer始终居底   header+footer的高度是100
      this.Height = document.documentElement.clientHeight;
      //监听浏览器窗口变化　
      window.onresize = ()=> {this.Height = document.documentElement.clientHeight}
    },
    methods:{
      //退出登录
      logout:function () {
        let that = this
        let suserid=this.$store.getters.getsId
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
              // that.$store.dispatch('logout')
              that.$store.dispatch('slogout')
              that.$alert("退出成功！",'成功',{
                confirmButtonText:'确定',
                type:'success'
            })
              that.$router.push({path:'/login'})
            }
            else
            {
              // alert(res.data.message)
              that.$alert(res.data.message,'警告',{
                confirmButtonText:'确定',
                type:'warning'
              })
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
