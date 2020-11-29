<template>
  <div>
    <button v-on:click="getALL">点击查看</button>
    <button v-on:click="logout">退出</button>
  </div>

</template>

<script>
    export default {
        name: "index",
      methods: {
        getALL: function () {
          let that = this
          console.log(that.$store.getters.getsToken)
          that.$http.get('/home/index/test', {}).then(res => {
            console.log(res.data)
            alert('注册成功')
          }).catch(function (error) {
            console.log(error)
          })
        },
        logout:function () {
          let that = this
          that.$store.dispatch('logout')
          that.$store.dispatch('slogout')
          that.$router.push({path:'/login'})
          alert("退出成功")
      //     that.$http.post('/home/index/logout',{
      //       username:that.loginForm.username,
      //     }).then(res=>{
      //       console.log(res.data)
      //       var message = res.data.message
      //       that.$store.dispatch('login',res.data.data)
      //       that.$store.dispatch('slogin',res.data.data)
      //       alert(message)
      //       that.$router.push({path:'/'})
      //       console.log(that.$store.getters.getsToken)
      //       // console.log(localStorage.getItem("Token"))
      //     }).catch(function (error) {
      //       console.log(error)
      //     })
        }
      }
    }
</script>

<style scoped>

</style>
