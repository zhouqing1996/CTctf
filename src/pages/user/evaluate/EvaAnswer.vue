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
          let that = this
          console.log(that.exList)
          that.$http.post('/yii/exam/exam/checkans',{
            num:that.exList.num,
            uid:that.exList.uid,
            eid:that.exList.eid
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
