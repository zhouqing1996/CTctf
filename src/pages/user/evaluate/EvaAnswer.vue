<template>
<!--回答结果-->
  <div>

  </div>
</template>

<script>
    export default {
        name: "EvaAnswer",
      data(){
          return{
            exList:{
              //答题次数
              num:'',
            //  用户id
              uid:'',
            //  试卷id
              eid:''
            },

          }
      },
      created(){

      },
      methods:{
        //  获取试卷信息
        getExam:function () {
          console.log(this.exList)
          this.$http.post('/yii/exam/exam/checkans',{
            num:this.exList.num,
            uid:this.exList.uid,
            eid:this.exList.eid
          }).then(function (res) {
            console.log(res)

          }).catch(function (err) {
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped>

</style>
