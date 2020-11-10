<template>
    <!--选择老师-->
  <div>
    <img src="../../../assets/images/fenxiang.png"/>
    <span>选择教师</span>
    <select v-model="selectId">
      <option :value="t.id" v-for=" t in teacherList" >{{t.username}}</option>
    </select>
    <button @click="selectT">确定选择</button>
  </div>
</template>

<script>
    export default {
        name: "SelectTeacher",
      data(){
          return{
            teacherList:[],
            selectId:''
          }
      },
      created(){
          this.getTeacherList()
      },
      methods:{
          //提交
        selectT:function()
        {
          if(this.selectId=='')
          {
            this.$alert('尚未选择导师', '警告', {
              confirmButtonText: '确定',})
          }
          else{
            this.$http.post('/yii/student/student/choosest',{
              sid:this.$store.getters.getsId,
              tid:this.selectId
            }).then(function (res) {
              console.log(res.data)
              alert(res.data.message)
            })
          }
        },
          getTeacherList:function () {
            this.$http.post('/yii/home/user/person',{
              flag:2
            }).then(function (res) {
              console.log(res.data)
              this.teacherList = res.data.data
            })
          }
      }
    }
</script>

<style scoped>

</style>
