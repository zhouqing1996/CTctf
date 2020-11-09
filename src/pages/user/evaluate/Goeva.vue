<template>
    <!--进入测评-->
  <div id="waimian">
    <div class="back">
      <el-page-header @back="back">
      </el-page-header>
    </div>
    <div>
      <div class="Tright">
        <span v-text="tLabeL" ></span>
      </div>
      <div>
          <h1 class="Tcenter">{{examList.exname}}</h1>
          <p class="Tcenter">
            <i class="el-icon-s-custom"></i>试卷创建人：{{examList.exUser}}
            ||<i class="el-icon-date"></i>创建时间：{{examList.exCreateTime}}
          ||<i class="el-icon-time"></i>考试时间：{{limitTime}} 分钟</p>
      </div>
      <hr/>
      <h2>一、选择题</h2>
      <div>
        <div v-for="(c,index) in chooseqList">
          <h3>({{index+1}}):{{c.cqitem}}</h3>
          <ul>
            <li v-for="(x,i) in c.cqcho" >
              <input type="radio" :name="'choose'+c.cqid"
                     @change="cr(c.cqid,c.cqcho[i])"/>{{x}}
            </li>
          </ul>
        </div>
      </div>
      <hr/>
      <h2>二、填空题</h2>
      <div>
      <span v-for="(f,key2) in fillqList":key="key2">
      <li class="item">({{key2+1}}){{f.fqitem}}<br>
        <textarea style="width: 400px;height: 200px;" :name="'fill'+f.fqid" @input="fr(f.fqid,$event)" class="fans"></textarea>
        <!--<input type="text"  :name="'fill'+f.fqid" @input="fr(f.fqid,$event)" class="fans"><br>-->
        <!--<div class="rich-html">-->
              <!--<vue-html5-editor :content="fsans" :id="f.fqid" :height="200" @change="updateData">-->
              <!--</vue-html5-editor>-->
        <!--</div>-->
      </li>
    </span>
      </div>
      <hr/>
      <h2>三、判断题</h2>
      <div>
      <span v-for="(j,keyj) in judgeList":key="keyj">
      <li class="item">({{keyj+1}}){{j.jqitem}}<br>
        <input type="radio" :name="'judge'+j.jqid" @change="jr(j.jqid,1)">正确
        <input type="radio" :name="'judge'+j.jqid" @change="jr(j.jqid,0)">错误
      </li>
    </span>
      </div>
      <hr/>
      <h2>四、多选题</h2>
      <div>
        <div v-for="(m,index) in choosemList">
          <h3>({{index+1}}):{{m.mitem}}</h3>
          <ul>
            <li v-for="(x,i) in m.mcho" >
              <input type="checkbox" :name="'choosem'+m.mid+i"
                     @change="mr(m.mid,m.mcho[i])"/>{{x}}
            </li>
          </ul>
        </div>
      </div>
      <hr/>
      <h2>五、程序题</h2>
      <div>
      <span v-for="(p,keyp) in programqList":key="keyp">
      <li class="item">({{keyp+1}}){{p.pqitem}}<br>
        <input type="text"  :name="'program'+p.pqid" @input="pr(p.pqid,$event)"><br>
      </li>
    </span>
      </div>
    </div>
    <hr/>
    <div>
      <button class="btn2" @click="EvaOK">提交试卷</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Goeva",
      data(){
          return{
            eid:"",
            examList:{
              id:'',
              exname:'',
              exUser:'',
              exCreateTime:'',
            },
            chooseqList:[],
            fillqList:[],
            fsans:'',
            judgeList:[],
            choosemList:[],
            programqList:[],
            //用户答案
            cList:[],
            cmList:[],
            fList:[],
            jList:[],
            pList:[],
          //  倒计时
            tLabeL:'',
            limitTime:0,
            settime:'',
            tflag:0,
            //结束时间
            etime:new Date(),
          //  每题计时
            MsTime:'',
            //  开始时间
            stime:'',
          }
      },
      methods:{
        back:function(){
          this.$router.push({
            path:'/user/evaluate',
          })
        },
        getExamList:function () {
          let that =this
          this.$http.post('/yii/exam/exam/view',{
            id:this.eid
          }).then(function (res) {
            console.log(res.data)
            // that.limitTime = res.data.data[8].gdtime
            console.log(that.limitTime)
            that.examList.exname=res.data.data[0]
            that.examList.exUser=res.data.data[1].data.username
            that.examList.exCreateTime=res.data.data[2]
            let cqList = res.data.data[3]
            for(let i=0;i<cqList.length;i++)
            {
              that.chooseqList.push({
                cqid:cqList[i].cqid,
                cqitem:cqList[i].cqitem,
                cqcho:[cqList[i].cqcho.split('---')[0],cqList[i].cqcho.split('---')[1],cqList[i].cqcho.split('---')[2],cqList[i].cqcho.split('---')[3]],
                cqrem:cqList[i].cqrem,
                cqans:cqList[i].cqans
              })
            }
            that.fillqList=res.data.data[4]
            that.programqList=res.data.data[5]
            that.judgeList =res.data.data[6]
            let mList = res.data.data[7]
            for(let i=0;i<mList.length;i++)
            {
              that.choosemList.push({
                mid:mList[i].mqid,
                mitem:mList[i].mqitem,
                mcho:[mList[i].mqcho.split('---')[0],mList[i].mqcho.split('---')[1],mList[i].mqcho.split('---')[2],mList[i].mqcho.split('---')[3]],
                mrem:mList[i].mqrem,
                mans:mList[i].mqans
              })
            }
          })
        },
        //提交选择题
        cr:function(id,str){
          let MeTime = new Date()
          let SubTime = parseInt((MeTime - this.MsTime)/1000);
          let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
          let h = Math.floor(parseInt(SubTime/60/60%24));
          let m = Math.floor(parseInt(SubTime/60%60));
          let s = Math.floor(parseInt(SubTime%60));
          h = h > 9 ? h :'0' + h
          m = m > 9 ? m :'0' + m
          s = s > 9 ? s:'0' + s
          let time = h+':'+m+':'+s
          console.log(time)
          this.MsTime = MeTime
          let flag = true
          for(let i=0;i< this.cList.length;i++)
          {
            if(this.cList[i]['id']==id)
            {
              flag=false
              this.cList[i]['ans']=str
              break
            }
          }
          if(flag){
            this.cList.push({
              id:id,
              ans:str,
              ctime:time
            })
          }
          console.log(this.cList)
        },
        //提交填空题
        updateData (ans) {
          console.log(ans)

        },
        fr:function(id,event){
          let MeTime = new Date()
          let SubTime = parseInt((MeTime - this.MsTime)/1000);
          let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
          let h = Math.floor(parseInt(SubTime/60/60%24));
          let m = Math.floor(parseInt(SubTime/60%60));
          let s = Math.floor(parseInt(SubTime%60));
          h = h > 9 ? h :'0' + h
          m = m > 9 ? m :'0' + m
          s = s > 9 ? s:'0' + s
          let time = h+':'+m+':'+s
          console.log(time)
          this.MsTime = MeTime
          let flag = true
          for(let i=0;i< this.fList.length;i++)
          {
            if(this.fList[i]['id']==id)
            {
              flag=false
              this.fList[i]['ans'] = event.currentTarget.value
              break
            }
          }
          if(flag){
            this.fList.push({
              id:id,
              ans:event.currentTarget.value,
              ctime:time
            })
          }
          console.log(this.fList)
        },
        //提交判断题
        jr:function(id,num) {
          let MeTime = new Date()
          let SubTime = parseInt((MeTime - this.MsTime)/1000);
          let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
          let h = Math.floor(parseInt(SubTime/60/60%24));
          let m = Math.floor(parseInt(SubTime/60%60));
          let s = Math.floor(parseInt(SubTime%60));
          h = h > 9 ? h :'0' + h
          m = m > 9 ? m :'0' + m
          s = s > 9 ? s:'0' + s
          let time = h+':'+m+':'+s
          console.log(time)
          this.MsTime = MeTime
          let flag = true
          for(let i=0;i< this.jList.length;i++)
          {
            if(this.jList[i]['id']==id)
            {
              flag=false
              this.jList[i]['ans'] = num
              break
            }
          }
          if(flag){
            this.jList.push({
              id:id,
              ans:num,
              ctime:time
            })
          }
          console.log(this.jList)
        },
        //提交多选题
        mr:function(id,str){
          let MeTime = new Date()
          let SubTime = parseInt((MeTime - this.MsTime)/1000);
          let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
          let h = Math.floor(parseInt(SubTime/60/60%24));
          let m = Math.floor(parseInt(SubTime/60%60));
          let s = Math.floor(parseInt(SubTime%60));
          h = h > 9 ? h :'0' + h
          m = m > 9 ? m :'0' + m
          s = s > 9 ? s:'0' + s
          let time = h+':'+m+':'+s
          console.log(time)
          this.MsTime = MeTime
          let flag =true
          for(let i=0;i< this.cmList.length;i++)
          {
            if(this.cmList[i]['id']==id) {
              flag = false
              flag = false
              let li = this.cmList[i]['ans'].split('---')
              //判断是否重复
              let t = true
              let n = li.length
              for (let j = 0; j < li.length; j++) {
                if (li[j] == str) {
                  n = j;
                  t = false
                  break
                }
              }
              if (t) {
                if (this.cmList[i]['ans'] == '') {
                  this.cmList[i]['ans'] = str
                }
                else {
                  this.cmList[i]['ans'] = this.cmList[i]['ans'] + '---' + str
                }
              }
              else {
                let st = ''
                for (let k = 0; k < li.length; k++) {
                  if (k == n) {
                    continue
                  }
                  else {
                    if (st == '' || k == 0) {
                      st = li[k]
                    }
                    else {
                      st = st + '---' + li[k]
                    }
                  }
                }
                this.cmList[i]['ans'] = st
              }
            }
            //   if(this.cmList[i]['ans']==str)
            //   {
            //     this.cmList.splice(id,1)
            //   }
            //   else{
            //     this.cmList[i]['ans']=this.cmList[i]['ans']+'---'+str;
            //   }
            //   break
            // }
          }
          if(flag){
            this.cmList.push({
              id:id,
              ans:str,
              ctime:time
            })
          }
          console.log(this.cmList)
        },
        //提交程序题
        pr:function(id,event){
          let MeTime = new Date()
          let SubTime = parseInt((MeTime - this.MsTime)/1000);
          let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
          let h = Math.floor(parseInt(SubTime/60/60%24));
          let m = Math.floor(parseInt(SubTime/60%60));
          let s = Math.floor(parseInt(SubTime%60));
          h = h > 9 ? h :'0' + h
          m = m > 9 ? m :'0' + m
          s = s > 9 ? s:'0' + s
          let time = h+':'+m+':'+s
          console.log(time)
          this.MsTime = MeTime
          let flag = true
          for(let i=0;i< this.pList.length;i++)
          {
            if(this.pList[i]['id']==id)
            {
              flag=false
              this.pList[i]['ans'] = event.currentTarget.value
              break
            }
          }
          if(flag){
            this.pList.push({
              id:id,
              ans:event.currentTarget.value,
              ctime:time
            })
          }
          console.log(this.pList)
        },
        //提交试卷
        EvaOK:function () {
          let enTime = new Date()
          let SubTime = parseInt((enTime - this.stime)/1000);
          let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
          let h = Math.floor(parseInt(SubTime/60/60%24));
          let m = Math.floor(parseInt(SubTime/60%60));
          let s = Math.floor(parseInt(SubTime%60));
          h = h > 9 ? h :'0' + h
          m = m > 9 ? m :'0' + m
          s = s > 9 ? s:'0' + s
          let time = h+':'+m+':'+s
          console.log(time)
          this.$http.post('/yii/exam/exam/userans',{
            cList:this.cList,
            fList:this.fList,
            cmList:this.cmList,
            pList:this.pList,
            jList:this.jList,
            uid:this.$store.getters.getsId,
            eid:this.eid,
            ctime:time
          }).then(function (res) {
            console.log(res.data)
            this.$router.push({path:'/user/evaluate'})
            alert(res.data.message)
          })
        },
      //  计时

        startCountDown:function () {
          let that = this
          var mydate = new Date()
          // console.log(mydate.toLocaleString())
          console.log(mydate.getMinutes())
          console.log(that.limitTime)
          mydate.setMinutes(mydate.getMinutes()+parseInt(that.limitTime))
          that.settime = mydate
          // console.log(mydate.toLocaleString())
          let time = setInterval(()=>{
            if(this.tflag == true)
            {
              clearInterval(time)
            }
            this.timeDown()
          },1000)
          this.$once("hook:beforeDestroy", () => {
            clearInterval(time);
          });
        },
        timeDown:function () {
          const endTime = new Date(this.settime);
          const nowTime = new Date();
          let leftTime = Math.floor(parseInt((endTime.getTime()-nowTime.getTime())/1000));
          let d = Math.floor(parseInt(leftTime/(24 * 60 * 60)));
          let h = Math.floor(parseInt(leftTime/60/60%24));
          let m = Math.floor(parseInt(leftTime/60%60));
          let s = Math.floor(parseInt(leftTime%60));
          // let h = this.formatTime(parseInt(leftTime /60 / 60 % 24));
          // let m = this.formatTime(parseInt(leftTime /60 % 60));
          // let s = this.formatTime(parseInt(leftTime % 60));
          h = h > 9 ? h :'0' + h
          m = m > 9 ? m :'0' + m
          s = s > 9 ? s:'0' + s
          if(leftTime <=0){
            this.tflag = true;
            this.EvaOK()
            alert("时间到，暂停作答！")
          //  自动提交试卷
            this.$router.push({
              path:'/user/evaluate',
            })
          }
          this.tLabeL = `${h}:${m}:${s}`
        },
        formatTime:function(time){
          if(time>=10)
          {
            return time
          }
          else{
            return `0${time}`
          }
        }
      },
      created(){
          this.eid =this.$route.query.id
        this.getExamList()
        // this.stime = this.$route.query.stime
        this.stime = new Date()
        this.limitTime = this.$route.query.limit
        console.log(this.stime)
        console.log(this.limitTime)
        this.startCountDown()
        this.MsTime = new Date()
        console.log(this.MsTime)
      },
      destroyed(){
          if(this.settime)
          {
            clearInterval(this.settime)
          }
      }
    }
</script>

<style scoped>
  .back{
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .Tcenter{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #000;
  }
  .Tright{
    position: absolute;
    z-index: 999;
    top: 100px;
    right: 50px;
    height: 50px;
    font-size: 40px;
    color: red;
    text-align: center;
    font-weight: bold;
    float: right!important;
  }
  .fans{
    outline-style: none ;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 13px 14px;
    width: 200px;
    font-size: 14px;
    font-weight: 700;
    font-family: "Microsoft soft";
    margin-top: 2px;
    margin-left: 3px;
  }
  .fans:focus{
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
  }
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
    /*background-color: sandybrown;*/
    margin-left: 20px;
    margin-top: 10px;
    font-family: "Times New Roman";
    font-size: 16px;
  }
  .btn2 {
    width: 100px;/*px*/
    padding: 7px;
    font-size: 14px;
    border-radius: 3px;
    border: none;
    color: white;
    background-color: #7F96FE;
    float: right;
    margin-left: 5px;
    margin-top: 17px;
    margin-bottom: 5px;
    /*position: absolute;*/
  }

  .btn2:hover {
    background-color: #5FA7FE;
  }
  li{list-style-type:none;}
</style>
