<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/user/exercise' }">练习</el-breadcrumb-item>
      <el-breadcrumb-item>选择题</el-breadcrumb-item>
    </el-breadcrumb>
    <!--选择题-->
    <div id="waimian">
      <div class="back">
        <el-page-header @back="back">
        </el-page-header>
      </div>
      <div v-for="(c,i) in List">
        <div>
          <h3>{{c.cqitem}}(选择题)</h3>
          <ul>
            <li v-for="(x,i) in c.cqcho" >
              <input type="radio" :name="c.cqid"
                     @change="Click(c.cqid,c.cqcho[i])"/>{{x}}
            </li>
          </ul>
        </div>
        <div v-if="Visable==true">
          <span>答案：{{c.cqans}}</span><br>
          <span>相关知识点：{{c.cqrem}}</span><br>
          <span>详解：{{c.cqtail}}</span><br>
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
        name: "ViewChoose",
      data(){
          return{
            qid:'',
            uid:'',
            //数据
            List:[],
            //用户答案
            Ans:[],
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
          this.$router.push({
            path:'/user/exercise',
          })
        },
          getQuestion:function () {
            this.$http.post('/yii/student/exercise/queryquestion',{
              flag:1,
              cqid:this.qid
            }).then(function (res) {
              console.log(res.data.data)
              let tmp = res.data.data
              for(let i=0;i<tmp.length;i++)
              {
                this.List.push({
                  cqid:tmp[i].cqid,
                  cqitem:tmp[i].cqitem,
                  cqcho:[tmp[i].cqcho.split('---')[0],tmp[i].cqcho.split('---')[1],tmp[i].cqcho.split('---')[2],
                    tmp[i].cqcho.split('---')[3]],
                  cqrem:tmp[i].cqrem,
                  cqans:tmp[i].cqans,
                  cqtail:tmp[i].cqtail
                })
              }
            }).catch(function (error) {
              console.log(error)
            })
          },
        Click:function(id,str){
          let flag = true
          for(let i=0;i< this.Ans.length;i++)
          {
            if(this.Ans[i]['id']==id)
            {
              flag=false
              this.Ans[i]['ans']=str
              break
            }
          }
          if(flag){
            this.Ans.push({
              id:id,
              ans:str
            })
          }
          console.log(this.Ans)
        },
        Submit:function () {
          this.endTime = new Date()
          let SubTime = parseInt((this.endTime - this.startTime)/1000);
          let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
          let h = Math.floor(parseInt(SubTime/60/60%24));
          let m = Math.floor(parseInt(SubTime/60%60));
          let s = Math.floor(parseInt(SubTime%60));
          h = h > 9 ? h :'0' + h
          m = m > 9 ? m :'0' + m
          s = s > 9 ? s:'0' + s
          let time = h+':'+m+':'+s
          console.log(time)
          this.$http.post('/yii/student/exercise/submitanser',{
            flag:1,
            uid:this.uid,
            qid:this.qid,
            ans:this.Ans,
            ctime:time
          }).then(function (res) {
            console.log(res.data)
            if(res.data.message=="练习选择题成功")
            {
              this.Visable = true
            }
            else{
              alert(res.data.message)
            }
          }).catch(function (error) {
            console.log(error)
          })

        }
      },
      created(){
          this.qid = this.$route.query.id
        this.getQuestion()
        console.log(this.List)
        this.uid = this.$store.getters.getsId
        this.startTime = new Date()
        console.log(this.startTime)

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
</style>
