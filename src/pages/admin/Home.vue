<template>
  <el-container class="all">
    <el-header class="header-css" >
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#EED8AE"
          text-color="#4876FF"
          active-text-color="#00F5FF"
        height="100px">
          <el-menu-item index="10">
            <router-link to="/admin/index">
              <img src="../../common/img/sds_di42leiwangzhanfuwu--.png" style="height:60px;width: 60px">
            </router-link>
          </el-menu-item>
          <el-menu-item index="1">
            <router-link to="/admin/index">
              <img src="../../common/img/web.png" style="height: 20px;width: 20px">
              首页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/admin/user/userinfo" >
              <img src="../../common/img/web.png" style="height: 20px;width: 20px">
              用户信息</router-link>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <img src="../../common/img/web.png" style="height: 20px;width: 20px">
              题库信息</template>
            <el-menu-item index="3-1">
              <router-link to="/admin/bank/choose" >
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                选择题</router-link>
            </el-menu-item>
            <el-menu-item index="3-2">
              <router-link to="/admin/bank/fill" >
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                填空题</router-link>
            </el-menu-item>
            <!--<el-menu-item index="3-3">-->
              <!--<router-link to="/admin/bank/program" >程序题</router-link>-->
            <!--</el-menu-item>-->
            <el-menu-item index="3-4">
              <router-link to="/admin/bank/programn" >
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                程序题</router-link>
            </el-menu-item>
            <el-menu-item index="3-5">
              <router-link to="/admin/bank/judge" >
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                判断题</router-link>
            </el-menu-item>
            <el-menu-item index="3-6">
              <router-link to="/admin/bank/choosem" >
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                多选题</router-link>
            </el-menu-item>
            <!--<el-menu-item index="3-7">-->
              <!--<router-link to="/admin/bank/addchoose" >添加单选题</router-link>-->
            <!--</el-menu-item>-->
          </el-submenu>
          <el-menu-item index="4">
            <router-link to="/admin/book" >
              <img src="../../common/img/web.png" style="height: 20px;width: 20px">
              图书管理</router-link>
          </el-menu-item>
            <el-menu-item index="5">
              <router-link to="/admin/exam/create" >
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                测评题库</router-link>
            </el-menu-item>
          <el-menu-item index="6">
            <router-link to="/admin/practice/practice" >
              <img src="../../common/img/web.png" style="height: 20px;width: 20px">
              学生练习</router-link>
          </el-menu-item>
          <!--<el-submenu index="6">-->
            <!--<template slot="title">测评结果</template>-->
            <!--&lt;!&ndash;<el-menu-item index="6-1">查看测评</el-menu-item>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-menu-item index="6-2">测评分析</el-menu-item>&ndash;&gt;-->
          <!--</el-submenu>-->
          <el-submenu index="7">
            <template slot="title">
              <img src="../../common/img/web.png" style="height: 20px;width: 20px">
              我的信息</template>
            <el-menu-item index="7-1">
              <router-link to="/admin/my/my" >
                <img src="../../common/img/web.png" style="height: 20px;width: 20px">
                我的资料</router-link>
            </el-menu-item>
            <!--<el-menu-item index="7-2">-->
              <!--<router-link to="/admin/my/changepwd" >修改密码</router-link>-->
            <!--</el-menu-item>-->
            <el-menu-item index="7-3" v-on:click="logout">
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
      <!--<span>Write by @zhouqing.</span>-->
      <!--<el-menu-->
        <!--class="el-menu-demo"-->
        <!--mode="horizontal"-->
        <!--background-color="	#1E90FF"-->
        <!--text-color="#fff"-->
        <!--active-text-color="#ffd04b">-->
        <!--<el-menu-item index="1">-->
          <!--<router-link to="/admin/index">首页</router-link>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="2">-->
          <!--<router-link to="/admin/user/userinfo" >用户信息</router-link>-->
        <!--</el-menu-item>-->
        <!--<el-submenu index="3">-->
          <!--<template slot="title">题库信息</template>-->
          <!--<el-menu-item index="3-1">-->
            <!--<router-link to="/admin/bank/choose" >选择题</router-link>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="3-2">-->
            <!--<router-link to="/admin/bank/fill" >填空题</router-link>-->
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
          // userForm:[]
          isN:true,
          Height:0
        }
      },
      mounted(){
        //动态设置内容高度 让footer始终居底   header+footer的高度是100
        this.Height = document.documentElement.clientHeight-200;
        //监听浏览器窗口变化　
        window.onresize = ()=> {this.Height = document.documentElement.clientHeight}
      },
      methods:{
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
                  // that.$store.dispatch('logout')
                  that.$store.dispatch('slogout')
                  that.$alert(res.data.message, '成功', {
                    confirmButtonText: '确定',
                    type:'success'
                  })
                  that.$router.push({path:'/login'})
                }
                else
                {
                  // alert(res.data.message)
                  that.$alert(res.data.message, '提示', {
                    confirmButtonText: '确定',
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

<style >
@import "../../common/css/home.css";
</style>
