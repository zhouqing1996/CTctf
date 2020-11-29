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
        let that = this
          that.getTeacherList()
      },
      methods:{
          //提交
        selectT:function()
        {
          let that = this
          if(that.selectId=='')
          {
            that.$alert('尚未选择导师', '警告', {
              confirmButtonText: '确定',})
          }
          else{
            that.$http.post('/student/student/choosest',{
              sid:that.$store.getters.getsId,
              tid:that.selectId
            }).then(function (res) {
              console.log(res.data)
              alert(res.data.message)
            })
          }
        },
          getTeacherList:function () {
            let that = this
            that.$http.post('/home/user/person',{
              flag:2
            }).then(function (res) {
              console.log(res.data)
              that.teacherList = res.data.data
            })
          }
      }
    }
</script>

<style scoped>

</style>
