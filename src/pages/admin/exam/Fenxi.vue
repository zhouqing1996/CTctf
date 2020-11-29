<template>
  <!--数据分析-->
  <div>
    <div class="whole">
      <p style="color: #FF0000;text-align: center;font-weight: bold">试卷的整体分析</p>
      <span><strong>答题总人数：</strong>{{List.userNum}}</span><br>
      <span><strong>答题用户名单:</strong>
      <span v-for="x in List.UserList" style="color: #0ea0db">
        <button @click="viewuser(List.eid,x.id)">{{x.name}}</button>
      </span>
      </span><br>
      <span><strong>试卷总分：</strong>{{List.wholeSoce}}</span><br>
      <span><strong>试卷最高分：</strong>{{List.heightScore}}</span><br>
      <span><strong>试卷最低分：</strong><span style="color: #FF0000">{{List.lowScore}}</span></span><br>
      <span><strong>平均得分：</strong>{{List.avgGrade}}</span><br>
      <span><strong>平均作答时间：</strong>{{List.avgTime}}分钟</span><br>
      <span><strong>平均作答次数:</strong>{{List.avgNum}}</span><br>
      <span><strong>用户最多的作答次数：</strong>{{List.maxUserNum}}</span><br>
    </div>
    <div>
      <PieChart :sdata="pie" :t="pieTitle" :subt="pieSubt"></PieChart>
      <BarChart :data="bar" :title="barTitle"></BarChart>
    </div>
    <button>数据</button>
  </div>
</template>

<script>
  import PieChart from "../../../components/PieChart";
  import BarChart from "../../../components/BarChart";
  export default {
    name: "Fenxi",
    components: {BarChart, PieChart},
    data(){
      return{
        //试卷的整体分析
        List:{
          //试卷的id
          eid:'',
          exname:'',
          //平均用时
          avgGrade:0,
          avgTime:0,
          avgNum:0,
          //总分数
          wholeSoce:0,
          //最高分，最低分
          heightScore:0,
          lowScore:0,
          //  作答人数
          userNum:0,
          //作答的最多次数
          maxUserNum:0,
          //  作答人次表
          UserList:[]
        },
        pie:[],
        pieTitle:'作答次数占比扇形图',
        pieSubt:'',
        bar:[],
        barTitle:'错误题目频次分析',


      }
    },
    created(){
      this.List.eid =this.$route.query.eid
      this.getData()
    },
    methods:{
      //查看某用户的作答情况
      viewuser:function(eid,uid)
      {

      },
      getData:function () {
        let that =this
        that.$http.post('/teacher/teacher/teacherfenxi',{
          eid:that.List.eid,
        }).then(function (res) {
          console.log(res.data)
          that.pieSubt ="试卷名:"+res.data.data[0].exname
          that.List.exname =res.data.data[0].exname
          that.List.avgGrade = res.data.data[0].avgGrade
          that.List.avgTime = res.data.data[0].avgTime
          that.List.avgNum = res.data.data[0].avgNum
          that.List.wholeSoce = res.data.data[0].exnum
          that.List.heightScore=res.data.data[0].HeightScore
          that.List.lowScore =res.data.data[0].LowScore
          that.List.userNum = res.data.data[0].num
          that.List.maxUserNum =res.data.data[0].maxusernum
          let id = res.data.data[0].userid
          let name = res.data.data[0].username
          that.List.UserList=[]
          for(let i=0;i<id.length;i++)
          {
            that.List.UserList.push({
              id:id[i],
              name:name[i]
            })
          }
          let pieData = res.data.data[2]
          that.pie =[]
          for(let j=0;j<pieData.length;j++)
          {
            //pie num答题次数，value:人数
            that.pie.push({
              num:pieData[j].num,
              value:pieData[j].value
            })
          }
          console.log(that.pie)
          let barData = res.data.data[3]
          that.bar = []
          for(let j=0;j<barData.length;j++)
          {
            //错误题目Itemnum 错误频次value
            that.bar.push({
              num:barData[j].Itemnum,
              value:barData[j].num
            })
          }
          console.log(that.bar)
        })
      }
    }
  }
</script>

<style scoped>
  @import "../../../common/css/fenxi.css";
</style>
