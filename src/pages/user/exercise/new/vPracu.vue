<template>
  <!--进入测评-->
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{ path: '/user/evaluate' }">测评</el-breadcrumb-item>
        <el-breadcrumb-item>测评考试</el-breadcrumb-item>
        <el-breadcrumb-item>《练习：{{qList.exname}}》</el-breadcrumb-item>
      </el-breadcrumb>
      <div><hr/></div>
    </div>
    <div id="waimian">
      <div>
        <div>
          <h1 class="Tcenter">{{qList.exname}}</h1>
          <p class="Tcenter">
            <i class="el-icon-s-custom"></i>试卷创建人：{{qList.exUser}}
            ||<i class="el-icon-date"></i>创建时间：{{qList.exCreateTime}}
          </p>
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
        <span style="color: #FF0000;margin-left: 20px">
          <strong>请注意每一题目完成之后要点击保存！</strong>编程语言选择：
          <el-select v-model="yuyan"  placeholder="请选择" size="mini" class="code-mode-select">
          <el-option
            v-for="item in languages"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        </span>
          <span v-for="(p,keyp) in programqList":key="keyp">
      <li class="item">({{keyp+1}}){{p.pqitem}}<br>
        <MonacoEditor :codes="code_content"
                      :read-only="false"
                      :language="yuyan" @contentBody="changePValue"></MonacoEditor>
        <button @click="pr(p.pqid,code_content)">保存</button>
      </li>
    </span>
        </div>
      </div>
      <hr/>
      <div>
        <button class="btn2" @click="EvaOK">提交试卷</button>
      </div>
    </div>
  </div>

</template>

<script>
  import MonacoEditor from "../../../../components/MonacoEditor";
  import CodeMirror from "../../../../components/CodeMirror";
  import initHtml5Editor from "../../../../common/initHtml5Editor";
  export default {
    name: "Goeva",
    components: {CodeMirror, MonacoEditor},
    data(){
      return{
        languages: {
          'c': 'c',
          'cpp': 'c++',
          'css': 'css',
          'go': 'go',
          'html': 'html',
          'java': 'java',
          'javascript': 'javascript',
          'markdown': 'markdown',
          'php': 'php',
          'python': 'python',
          'r': 'r',
          'swift': 'swift',
          'typescript': 'typescript',
          'vb': 'vb',
          'xml': 'xml',
        },
        pid:"",
        qList:{
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
        code_content:'',
        yuyan:'python',
        // language:'',
        //  倒计时
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
      getExamList:function () {
        let that =this
        console.log(that.pid)
        that.$http.post('/student/practice/viewpractice',{
          pid:that.pid
        }).then(function (res) {
          console.log(res.data)
          that.qList.exname=res.data.data[0]
          that.qList.exUser=res.data.data[1]
          that.qList.exCreateTime=res.data.data[2]
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
              mans:mList[i].mqans,
              mtail:mList[i].mqtail
            })
          }
        })
      },
      //提交选择题
      cr:function(id,str){
        let that = this
        let MeTime = new Date()
        let SubTime = parseInt((MeTime - that.MsTime)/1000);
        let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
        let h = Math.floor(parseInt(SubTime/60/60%24));
        let m = Math.floor(parseInt(SubTime/60%60));
        let s = Math.floor(parseInt(SubTime%60));
        h = h > 9 ? h :'0' + h
        m = m > 9 ? m :'0' + m
        s = s > 9 ? s:'0' + s
        let time = h+':'+m+':'+s
        console.log(time)
        that.MsTime = MeTime
        let flag = true
        for(let i=0;i< that.cList.length;i++)
        {
          if(that.cList[i]['id']==id)
          {
            flag=false
            that.cList[i]['ans']=str
            break
          }
        }
        if(flag){
          that.cList.push({
            id:id,
            ans:str,
            ctime:time
          })
        }
        console.log(that.cList)
      },
      //提交填空题
      updateData (ans) {
        console.log(ans)
      },
      fr:function(id,event){
        let that = this
        let MeTime = new Date()
        let SubTime = parseInt((MeTime - that.MsTime)/1000);
        let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
        let h = Math.floor(parseInt(SubTime/60/60%24));
        let m = Math.floor(parseInt(SubTime/60%60));
        let s = Math.floor(parseInt(SubTime%60));
        h = h > 9 ? h :'0' + h
        m = m > 9 ? m :'0' + m
        s = s > 9 ? s:'0' + s
        let time = h+':'+m+':'+s
        console.log(time)
        that.MsTime = MeTime
        let flag = true
        for(let i=0;i< that.fList.length;i++)
        {
          if(that.fList[i]['id']==id)
          {
            flag=false
            that.fList[i]['ans'] = event.currentTarget.value
            break
          }
        }
        if(flag){
          that.fList.push({
            id:id,
            ans:event.currentTarget.value,
            ctime:time
          })
        }
        console.log(that.fList)
      },
      //提交判断题
      jr:function(id,num) {
        let that = this
        let MeTime = new Date()
        let SubTime = parseInt((MeTime - that.MsTime)/1000);
        let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
        let h = Math.floor(parseInt(SubTime/60/60%24));
        let m = Math.floor(parseInt(SubTime/60%60));
        let s = Math.floor(parseInt(SubTime%60));
        h = h > 9 ? h :'0' + h
        m = m > 9 ? m :'0' + m
        s = s > 9 ? s:'0' + s
        let time = h+':'+m+':'+s
        console.log(time)
        that.MsTime = MeTime
        let flag = true
        for(let i=0;i< that.jList.length;i++)
        {
          if(that.jList[i]['id']==id)
          {
            flag=false
            that.jList[i]['ans'] = num
            break
          }
        }
        if(flag){
          that.jList.push({
            id:id,
            ans:num,
            ctime:time
          })
        }
        console.log(that.jList)
      },
      //提交多选题
      mr:function(id,str){
        let that = this
        let MeTime = new Date()
        let SubTime = parseInt((MeTime - that.MsTime)/1000);
        let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
        let h = Math.floor(parseInt(SubTime/60/60%24));
        let m = Math.floor(parseInt(SubTime/60%60));
        let s = Math.floor(parseInt(SubTime%60));
        h = h > 9 ? h :'0' + h
        m = m > 9 ? m :'0' + m
        s = s > 9 ? s:'0' + s
        let time = h+':'+m+':'+s
        console.log(time)
        that.MsTime = MeTime
        let flag =true
        for(let i=0;i< that.cmList.length;i++)
        {
          if(that.cmList[i]['id']==id) {
            flag = false
            flag = false
            let li = that.cmList[i]['ans'].split('---')
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
              if (that.cmList[i]['ans'] == '') {
                that.cmList[i]['ans'] = str
              }
              else {
                that.cmList[i]['ans'] = that.cmList[i]['ans'] + '---' + str
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
              that.cmList[i]['ans'] = st
            }
          }
        }
        if(flag){
          that.cmList.push({
            id:id,
            ans:str,
            ctime:time
          })
        }
        console.log(that.cmList)
      },
      //提交程序题
      changePValue:function(vel)
      {
        let that = this
        that.code_content = vel
        console.log(that.code_content)
      },
      pr:function(id,code_content){
        let that = this
        let MeTime = new Date()
        let SubTime = parseInt((MeTime - that.MsTime)/1000);
        let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
        let h = Math.floor(parseInt(SubTime/60/60%24));
        let m = Math.floor(parseInt(SubTime/60%60));
        let s = Math.floor(parseInt(SubTime%60));
        h = h > 9 ? h :'0' + h
        m = m > 9 ? m :'0' + m
        s = s > 9 ? s:'0' + s
        let time = h+':'+m+':'+s
        console.log(time)
        that.MsTime = MeTime
        let flag = true
        for(let i=0;i< that.pList.length;i++)
        {
          if(that.pList[i]['id']==id)
          {
            flag=false
            that.pList[i]['ans'] = that.code_content
            break
          }
        }
        if(flag){
          that.pList.push({
            id:id,
            ans:that.code_content,
            ctime:time
          })
        }
        console.log(that.pList)
      },
      //提交试卷
      EvaOK:function () {
        let that = this
        console.log(that.cList)
        console.log(that.pList)
        console.log(that.cmList)
        console.log(that.jList)
        console.log(that.fList)
        console.log(that.code_content)
        let enTime = new Date()
        let SubTime = parseInt((enTime - that.stime)/1000);
        let d = Math.floor(parseInt(SubTime/(24 * 60 * 60)));
        let h = Math.floor(parseInt(SubTime/60/60%24));
        let m = Math.floor(parseInt(SubTime/60%60));
        let s = Math.floor(parseInt(SubTime%60));
        h = h > 9 ? h :'0' + h
        m = m > 9 ? m :'0' + m
        s = s > 9 ? s:'0' + s
        let time = h+':'+m+':'+s
        console.log(time)
        that.$http.post('/student/practice/practicecheck',{
          cList:that.cList,
          fList:that.fList,
          cmList:that.cmList,
          pList:that.pList,
          jList:that.jList,
          uid:that.$store.getters.getsId,
          pid:that.pid,
          ctime:time
        }).then(function (res) {
          console.log(res.data)
          that.$router.push({
            path:'/user/ansPractice',
            query:{
              uid:that.$store.getters.getsId,
              pid:that.pid,
              num:res.data.data
            }
          })
          // alert(res.data.message)
        })
      },
      //  计时

      // startCountDown:function () {
      //   let that = this
      //   var mydate = new Date()
      //   // console.log(mydate.toLocaleString())
      //   console.log(mydate.getMinutes())
      //   console.log(that.limitTime)
      //   mydate.setMinutes(mydate.getMinutes()+parseInt(that.limitTime))
      //   that.settime = mydate
      //   // console.log(mydate.toLocaleString())
      //   let time = setInterval(()=>{
      //     if(that.tflag == true)
      //     {
      //       clearInterval(time)
      //     }
      //     that.timeDown()
      //   },1000)
      //   that.$once("hook:beforeDestroy", () => {
      //     clearInterval(time);
      //   });
      // },
      // timeDown:function () {
      //   let that = this
      //   const endTime = new Date(that.settime);
      //   const nowTime = new Date();
      //   let leftTime = Math.floor(parseInt((endTime.getTime()-nowTime.getTime())/1000));
      //   let d = Math.floor(parseInt(leftTime/(24 * 60 * 60)));
      //   let h = Math.floor(parseInt(leftTime/60/60%24));
      //   let m = Math.floor(parseInt(leftTime/60%60));
      //   let s = Math.floor(parseInt(leftTime%60));
      //   h = h > 9 ? h :'0' + h
      //   m = m > 9 ? m :'0' + m
      //   s = s > 9 ? s:'0' + s
      //   if(leftTime <=0){
      //     that.tflag = true;
      //     that.EvaOK()
      //     alert("时间到，暂停作答！")
      //     //  自动提交试卷
      //     that.$router.push({
      //       path:'/user/evaluate',
      //     })
      //   }
      //   that.tLabeL = `${h}:${m}:${s}`
      // },
      // formatTime:function(time){
      //   if(time>=10)
      //   {
      //     return time
      //   }
      //   else{
      //     return `0${time}`
      //   }
      // }
    },
    created(){
      let that = this
      that.pid =that.$route.query.id
      that.getExamList()
      that.stime = new Date()
      console.log(that.stime)
      that.MsTime = new Date()
      console.log(that.MsTime)
    },
    destroyed(){
      let that = this
      if(that.settime)
      {
        clearInterval(that.settime)
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
    margin-bottom: 10px;
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
