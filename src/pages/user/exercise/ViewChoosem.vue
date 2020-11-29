<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/user/exercise' }">练习</el-breadcrumb-item>
      <el-breadcrumb-item>多选题</el-breadcrumb-item>
    </el-breadcrumb>
    <!--多选题-->
    <div id="waimian">
      <div class="back">
        <el-page-header @back="back">
        </el-page-header>
      </div>
      <div v-for="(m,index) in List" class="item">
        <h3>{{m.mqitem}}（多选题）</h3>
        <ul>
          <li v-for="(x,i) in m.mqcho" >
            <input type="checkbox" :name="m.mqid+i"
                   @change="Click(m.mqid,m.mqcho[i])"/>{{x}}
          </li>
        </ul>
        <div v-if="Visable==true" class="item">
          <p v-if="AnsFlag==1" class="uansR" >您的答案：{{Ans[0].ans}}</p>
          <p v-else class="uansE" >您的答案：{{Ans[0].ans}}</p>
          <span>答案：{{m.mqans}}</span><br>
          <span>相关知识点：{{m.mqrem}}</span><br>
          <span>详解：{{m.mqtail}}</span><br>
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
        name: "ViewChoosem",
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
          //判断答案是否正确
          AnsFlag :false,
          //选择答案时设置单击选中，双击取消
          // changed:0,
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
            flag:5,
            mqid:that.qid
          }).then(function (res) {
            console.log(res.data.data)
            let tmp = res.data.data
            for(let i=0;i<tmp.length;i++)
            {
              that.List.push({
                mqid:tmp[i].mqid,
                mqitem:tmp[i].mqitem,
                mqcho:[tmp[i].mqcho.split('---')[0],tmp[i].mqcho.split('---')[1],tmp[i].mqcho.split('---')[2],
                  tmp[i].mqcho.split('---')[3]],
                mqrem:tmp[i].mqrem,
                mqans:tmp[i].mqans,
                mqtail:tmp[i].mqtail
              })
            }
            console.log(that.List)
          }).catch(function (error) {
            console.log(error)
          })
        },
        Click:function(id,str){
          let that = this
          let flag =true
          for(let i=0;i< that.Ans.length;i++)
          {
            if(that.Ans[i]['id']==id) {
              flag = false
              let li = that.Ans[i]['ans'].split('---')
              //判断是否重复
              let t = true
              let n=li.length
              for(let j=0;j<li.length;j++)
              {
                if(li[j]==str)
                {
                  t=false
                  n=j;
                  break
                }
              }
              if(t)
              {
                //没有重复的
                if(that.Ans[i]['ans']==''){
                  that.Ans[i]['ans'] = str
                }
                else{
                  that.Ans[i]['ans'] = that.Ans[i]['ans']+'---'+str
                }
              }
              else{
                let st = ''
                for(let k=0;k<li.length;k++)
                {
                  if(k==n)
                  {
                    continue
                  }
                  else{
                    if(st==''||k==0){
                      st = li[k]
                    }
                    else{
                      st = st+'---'+li[k]
                    }
                  }
                }
                that.Ans[i]['ans'] = st
              }
            }
          }
            if(flag){
              that.Ans.push({
                id:id,
                ans:str
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
              flag:5,
              uid:that.uid,
              qid:that.qid,
              ctime:time,
              ans:that.Ans
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="练习多选题成功")
              {
                that.Visable = true
                that.AnsFlag = res.data.data
              }
              else{
                alert(res.data.message)
              }

            }).catch(function (error) {
              console.log(error)
            })
          }
        },
        // //判断多选题答案与标准版答案是否相同，需要判断其中的值顺序
        // Judge:function () {
        //   let s = that.List[0].mqans.split('---')
        //   let su = that.Ans[0].ans.split('---')
        //   if(s.length != su.length){
        //     that.AnsFlag = false
        //   }
        //   for(let i=0;i<s.length;i++)
        //   {
        //     if(s.indexOf(su[i]==-1))
        //     {
        //       that.AnsFlag = false
        //     }
        //   }
        //   that.AnsFlag = true
        // }
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
