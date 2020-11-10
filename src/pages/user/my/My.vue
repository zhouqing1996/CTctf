<template>
  <!--我的资料-->
  <div>
    <el-form class="my-container" label-position="left" label-width="0px">
      <h3 class="my_title">我的资料</h3>
      <p>用户编号：{{userid}}</p>
      <p>用户名：{{username}}</p>
      <p v-if="userrole==1">身份：超级管理员</p>
      <p v-if="userrole==2">身份：二级管理员</p>
      <p v-if="userrole==3">身份：普通用户</p>
      <span>我的导师:</span>
      <span v-if="tList.length>0">
        <p v-for="x in tList">
          <strong>{{x.tname}}</strong>
        </p>
      </span>
      <span v-else style="color: #0ea0db;" @click="selectT">
        暂未选择导师，请选择导师
      </span>
    </el-form>
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
        tList:[]
      }
    },
    created(){
      this.getTList()
    },
    methods:{
      selectT:function()
      {
        this.$router.push({
          path:'/user/class/select'
        })
      },
      getTList:function () {
        this.$http.post('/yii/student/student/stlist',{
          sid:this.userid
        }).then(function (res) {
          console.log(res.data)
          if(res.data.message=='学生导师信息为空')
          {

          }
          else{
            let l = res.data.data
            for(let i=0;i<l.length;i++)
            {
              let falg =true
              for(let j=0;j<this.tList.length;j++)
              {
                if(this.tList[j].tid==l[i].tid){
                  falg=false
                  break
                }
              }
              if(falg)
              {
                this.tList.push({
                  tid:l[i].tid,
                  tno:l[i].tno,
                  tname:l[i].tname
                })
              }
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .my-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    text-align: left;
  }
  .my_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
