<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/user/exercise' }">练习</el-breadcrumb-item>
      <el-breadcrumb-item>填空题</el-breadcrumb-item>
    </el-breadcrumb>

    <!--填空题-->
    <div id="waimian" >
      <div class="back">
        <el-page-header @back="back">
        </el-page-header>
      </div>
      <div v-for="(f,index) in List">
        <div class="item">
          <h3>{{f.fqitem}}（填空题）</h3>
          <!--<input type="text"  :name="f.fqid" @input="Click(f.fqid,$event)"><br>-->
          <textarea :name="f.fqid" @input="Click(f.fqid,$event)" style="width: 400px;height: 200px">

          </textarea>
        </div>
        <hr/>
        <div v-if="Visable==true" class="item">
          <p v-if="AnsFlag==1" class="uansR" >您的答案：{{Ans[0].ans}}</p>
          <p v-else class="uansE" >您的答案：{{Ans[0].ans}}</p>
          <span>答案：{{f.fqans}}</span><br>
          <span>相关知识点：{{f.fqrem}}</span><br>
          <span>详解：{{f.fqtail}}</span><br>
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
        name: "ViewFill",
      data(){
        return{
          qid:'',
          uid:'',
          //数据
          List:[],
          //用户答案
          Ans:[],
          AnsFlag:false,
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
            flag:2,
            fqid:that.qid
          }).then(function (res) {
            console.log(res.data.data)
            that.List =res.data.data
          }).catch(function (error) {
            console.log(error)
          })
        },
        Click:function(id,event){
          let that = this
          let flag = true
          for(let i=0;i< that.Ans.length;i++)
          {
            if(that.Ans[i]['id']==id)
            {
              flag=false
              that.Ans[i]['ans'] = event.currentTarget.value
              break
            }
          }
          if(flag){
            that.Ans.push({
              id:id,
              ans:event.currentTarget.value
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
              flag:2,
              uid:that.uid,
              qid:that.qid,
              ans:that.Ans,
              ctime:time
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="练习填空题成功")
              {
                that.Visable = true
                that.AnsFlag =res.data.data
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
    margin-left: 50px;
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
