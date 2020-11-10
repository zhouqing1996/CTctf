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
        <el-menu-item index="2">
          <router-link to="/user/evaluate" >测评</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/user/exercise" >练习</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/user/rank" >排名</router-link>
        </el-menu-item>
        <el-submenu index="6">
          <template slot="title">结果</template>
          <el-menu-item index="6-1">
            <router-link to="/user/evaluate/result" >结果查看</router-link>
          </el-menu-item>
          <el-menu-item index="6-2">
            <router-link to="/user/exercise/anlysis" >结果分析</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">我的信息</template>
          <el-menu-item index="7-1">
            <router-link to="/user/class/select" >选择导师</router-link>
          </el-menu-item>
          <el-menu-item index="7-2">
            <router-link to="/user/my" >我的资料</router-link>
          </el-menu-item>
          <el-menu-item index="7-3">
            <router-link to="/user/my/changepwd" >修改密码</router-link>
          </el-menu-item>
          <el-menu-item index="7-4" v-on:click="logout">
            退出登录
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main  class="main-css"  v-bind:style="{minHeight: Height+'px'}">
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
        <el-submenu index="2">
          <template slot="title">友情链接</template>
          <el-menu-item index="2-1">
            <a href="https://www.luogu.com.cn">洛谷</a>
          </el-menu-item>
        </el-submenu>
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
      this.Height = document.documentElement.clientHeight - 50;
      //监听浏览器窗口变化　
      window.onresize = ()=> {this.Height = document.documentElement.clientHeight -50}
    },
    methods:{
      //退出登录
      logout:function () {
        let suserid=this.$store.getters.getsId
        console.log(suserid)
        this.$confirm("是否退出？","提示",{
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning"
        }).then(()=>{
          this.$http.post('/yii/home/index/logout',
            {
              userid:suserid
            }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="退出成功")
            {
              this.$store.dispatch('logout')
              this.$store.dispatch('slogout')
              alert("退出成功！")
              this.$router.push({path:'/login'})
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
  .header-css{
    position: fixed;
    top: 0px;
    margin: auto;
    opacity: 0.8;
    float: right;
  }
  .header-menu{

  }
  .main-css{
    width: 100%;
    height: 600px;
    /*position: absolute;*/
  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
  .footer{
    position: relative;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 30px;/*脚部的高度*/
    clear:both;
  }

</style>
