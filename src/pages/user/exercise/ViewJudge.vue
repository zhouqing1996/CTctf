<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/user/exercise' }">练习</el-breadcrumb-item>
      <el-breadcrumb-item>判断题</el-breadcrumb-item>
    </el-breadcrumb>
    <!--判断题-->
    <div id="waimian">
      <div class="back">
        <el-page-header @back="back">
        </el-page-header>
      </div>
      <div v-for="(j,i) in List">
        <div class="item">
          <h3>{{j.jqitem}}（判断题）</h3>
          <input type="radio" :name="j.jqid" @change="Click(j.jqid,1)">正确
          <input type="radio" :name="j.jqid" @change="Click(j.jqid,0)">错误
        </div>
        <hr/>
        <div v-if="Visable==true" class="item">
          <p v-if="AnsFlag==1" class="uansR" >
            <label v-if="Ans[0].ans==1">您的答案：正确</label>
            <label v-if="Ans[0].ans==0">您的答案：错误</label>
          </p>
          <p v-if="AnsFlag==0" class="uansE" >
            <label v-if="Ans[0].ans==1">您的答案：正确</label>
            <label v-if="Ans[0].ans==0">您的答案：错误</label>
          </p>
          <span v-if="j.jqans==1">答案：正确</span><br>
          <span v-if="j.jqans==0">答案：错误</span><br>
          <span>相关知识点：{{j.jqrem}}</span><br>
          <span>详解：{{j.jqtail}}</span><br>
          <hr/>
        </div>
        <div>
          <button class="btn2" v-if="Visable==false" @click="Submit">提交</button>
          <!--<button class="btn2" @click="back">返回</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ViewJudge",
      data(){
        return{
          qid:'',
          uid:'',
          //数据
          List:[],
          //用户答案
          Ans:[],
          AnsFlag:0,
          //  显示答案
          Visable:false,
          //  计时
          startTime:'',
          endTime:'',
        }
      },
      methods:{
        back:function()
        {
          let that = this
          that.$router.push({
            path:'/user/exercise',
          })
        },
        getQuestion:function () {
          let that = this
          that.$http.post('/student/exercise/queryquestion',{
            flag:4,
            jqid:that.qid
          }).then(function (res) {
            console.log(res.data.data)
            that.List = res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        Click:function(id,num){
          let flag = true
          for(let i=0;i< that.Ans.length;i++)
          {
            if(that.Ans[i]['id']==id)
            {
              flag=false
              that.Ans[i]['ans'] = num
              break
            }
          }
          if(flag){
            that.Ans.push({
              id:id,
              ans:num
            })
          }
          console.log(that.Ans)
        },
        Submit:function () {
          let that = this
          that.endTime = new Date()
          let SubTime = parseInt((that.endTime - that.startTime)/1000);
          let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
          let h = Math.floor(parseInt(SubTime/60/60%24));
          let m = Math.floor(parseInt(SubTime/60%60));
          let s = Math.floor(parseInt(SubTime%60));
          h = h > 9 ? h :'0' + h
          m = m > 9 ? m :'0' + m
          s = s > 9 ? s:'0' + s
          let time = h+':'+m+':'+s
          console.log(time)
          if(that.Ans.length==0)
          {
            that.$alert('您尚未作答，请检查', '警告', {
              confirmButtonText: '确定',})
          }
          else if(that.Ans[0].ans=='')
          {
            that.$alert('您尚未作答，请检查', '警告', {
              confirmButtonText: '确定',})
          }
          else{
            that.$http.post('/student/exercise/submitanser',{
              flag:4,
              uid:that.uid,
              qid:that.qid,
              ans:that.Ans,
              ctime:time
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="练习判断题成功")
              {
                that.Visable = true
                that.AnsFlag=res.data.data
              }
              else{
                alert(res.data.message)
              }
            }).catch(function (error) {
              console.log(error)
            })
          }
        }
      },
      created(){
        let that = this
        that.qid = that.$route.query.id
        that.getQuestion()
        console.log(that.List)
        that.uid = that.$store.getters.getsId
        that.startTime = new Date()
        console.log(that.startTime)
      }
    }
</script>

<style scoped>
  .back{
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .btn2 {
    width: 100px;/*px*/
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #7F96FE;
    float: left;
    margin-left: 5px;
    margin-top: 17px;
    margin-bottom: 5px;
  }

  .btn2:hover {
    background-color: #5FA7FE;
  }
  li{list-style-type:none;}
  #waimian {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 5px;
    text-align: left;
    padding: 30px;
  }
  .item{
    margin-left: 50px;
    margin-top: 20px;
  }
  .uansR{
    /*正确答案*/
    margin-left: 30px;
    color: yellowgreen;
    font-weight: bold;
  }
  .uansE{
    /*错误答案*/
    margin-left: 30px;
    color: coral;
    font-weight: bold;
  }
</style>
