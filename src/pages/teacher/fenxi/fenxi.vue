<template>
    <!--数据分析-->
  <div>
    <div>
      <p>试卷的整体分析</p>
      <span>平均得分：{{avgGrade}}</span>
      <span>平均作答时间：{{avgTime}}</span>
      <span>平均作答次数{{avgNum}}</span>
      <span>作答人数：{{num}}</span>
      <span>用户最多的作答次数：{{maxusernum}}</span>
    </div>

    <button>数据</button>
  </div>
</template>

<script>
    export default {
        name: "fenxi",
      data(){
          return{
            avgGrade:0,
            avgTime:0,
            avgNum:0,
          //  人数
            num:0,
            maxusernum:0,
            userid:[],
            pie:[]
          }
      },
      created(){
          this.getData()
      },
      methods:{
          getData:function () {
            let that =this
            that.$http.post('/yii/teacher/teacher/teacherfenxi',{
              eid:1,
            }).then(function (res) {
              console.log(res.data)
              that.avgGrade = res.data.data[0].avgGrade
              that.avgTime = res.data.data[0].avgTime
              that.avgNum = res.data.data[0].avgNum
              that.num = res.data.data[0].num
              that.maxusernum =res.data.data[0].maxusernum
              that.userid =res.data.data[0].userid
              // that.pie = res.data.data[1]
            })
          }
      }
    }
</script>

<style scoped>

</style>
