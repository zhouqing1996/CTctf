<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{path:'/user/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/user/practice'}">练习</el-breadcrumb-item>
        <el-breadcrumb-item >{{List.exname}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div><hr/></div>
    </div>
    <div id="waimian">
      <div>
        <h1 class="T"><strong>{{List.exname}}</strong>
          <br>
          <span>{{List.auth}}</span>||<span>{{List.ctime}}</span>
          <span v-text="'练习总分：'+List.exNum+',您的得分：'+List.GradeLabel" style="color: #FF0000;float: right!important;margin-right: 50px" ></span></h1>
        <hr/>
        <el-row :gutter="20">
          <el-col :span="12">
            <div>
              <div v-if="CList.length>0">
                <h2>一、选择题</h2>
                <span v-for="(c,key1) in CList":key="key1" >
            <li class="item"><h3>({{key1+1}})<span v-html="c.item">{{c.item}}</span> </h3><br>
              <input type="radio"  value=""><span v-html="c.cho.split('---')[0]">{{c.cho.split('---')[0]}}</span> <br>
              <input type="radio"  value=""><span v-html="c.cho.split('---')[1]">{{c.cho.split('---')[1]}}</span> <br>
              <input type="radio"  value=""><span v-html="c.cho.split('---')[2]">{{c.cho.split('---')[2]}}</span> <br>
              <input type="radio"  value=""><span v-html="c.cho.split('---')[3]">{{c.cho.split('---')[3]}}</span> <br>
            </li>
            <p class="ans">答案：<span v-html="c.ans">{{c.ans}}</span> </p>
            <p class="tail">详解：<span v-html="c.tail">{{c.tail}}</span> </p>
            <p class="rem">相关知识点：<span v-html="c.rem">{{c.rem}}</span> </p>
            <p v-if="c.flag">
              <span v-if="c.flag==1" class="uansR">您的答案：<span v-html="c.uans">{{c.uans}}</span> </span>
              <span v-else class="uansE">您的答案：<span v-html="c.uans">{{c.uans}}</span> </span>
            </p>
            <p v-else style="color: red">
              您未作答该题！
            </p>
        </span>
              </div>
              <div v-if="FList.length>0">
                <h2>二、填空题</h2>
                <span v-for="(f,key2) in FList":key="key2">
      <li class="item"><h3>({{key2+1}})<span v-html="f.item">{{f.item}}</span> </h3><br>
        <input type="text" value=""><br>
      </li>
      <p class="ans">答案：<span v-html="f.ans">{{f.ans}}</span> </p>
      <p class="tail">详解：<span v-html="f.tail">{{f.tail}}</span> </p>
      <p class="rem">相关知识点：<span v-html="f.rem">{{f.rem}}</span> </p>
        <p v-if="f.flag">
          <span v-if="f.flag==1" class="uansR">您的答案：<span v-html="f.uans">{{f.uans}}</span> </span>
          <span v-else class="uansE">您的答案：<span v-html="f.uans">{{f.uans}}</span> </span>
        </p>
        <p v-else style="color: red">
          您未作答该题！
        </p>
    </span>
              </div>
              <div v-if="JList.length>0">
                <h2>三、判断题</h2>
                <span v-for="(j,keyj) in JList":key="keyj">
        <li class="item"><h3>({{keyj+1}})<span v-html="j.item">{{j.item}}</span> </h3><br>
          <input type="radio" :name="'judge'+j.jqid" >正确
          <input type="radio" :name="'judge'+j.jqid" >错误
        </li>
      <p class="ans" v-if="j.ans==1">答案：正确</p>
        <p class="ans" v-else>答案：错误</p>
      <p class="tail">详解：{{j.tail}}</p>
      <p class="rem">相关知识点：{{j.rem}}</p>
        <p v-if="j.flag">
          <span v-if="j.flag==1" class="uansR">
            <label v-if="j.uans==1">您的答案：正确</label>
            <label v-else>您的答案：正确</label>
          </span>
          <span v-else class="uansE">
            <label v-if="j.uans==1">您的答案：正确</label>
            <label v-else>您的答案：正确</label>
          </span>
        </p>
        <p v-else style="color: red">
          您未作答该题！
        </p>
    </span>
              </div>
              <div v-if="CMList.length>0">
                <h2>四、多选题</h2>
                <span v-for="(m,keym) in CMList":key="keym">
        <li class="item"><h3>({{keym+1}})<span v-html="m.item">{{m.item}}</span> </h3><br>
              <input type="checkbox"  value=""><span v-html="m.cho.split('---')[0]">{{m.cho.split('---')[0]}}</span> <br>
              <input type="checkbox"  value=""><span v-html="m.cho.split('---')[1]">{{m.cho.split('---')[1]}}</span> <br>
              <input type="checkbox"  value=""><span v-html="m.cho.split('---')[2]">{{m.cho.split('---')[2]}}</span> <br>
              <input type="checkbox"  value=""><span v-html="m.cho.split('---')[3]">{{m.cho.split('---')[3]}}</span> <br>
        </li>

      <p class="ans">答案：<span v-html="m.ans">{{m.ans}}</span> </p>
      <p class="tail">详解：<span v-html="m.tail">{{m.tail}}</span> </p>
      <p class="rem">相关知识点：<span v-html="m.rem">{{m.rem}}</span> </p>
        <p v-if="m.flag">
          <span v-if="m.flag==1" class="uansR">您的答案：<span v-html="m.uans">{{m.uans}}</span> </span>
          <span v-else class="uansE">您的答案：<span v-html="m.uans">{{m.uans}}</span> </span>
        </p>
        <p v-else style="color: red">
          您未作答该题！
        </p>
    </span>
              </div>
              <div v-if="PList.length>0">
                <h2>五、程序题</h2>
                <span v-for="(p,key3) in PList":key="key3">
        <h3>({{key3+1}})<span v-html="p.item">{{p.item}}</span> </h3>
        <p class="ans">答案：<span v-html="p.ans">{{p.ans}}</span> </p>
        <p class="tail">详解：<span v-html="p.tail">{{p.tail}}</span> </p>
        <p class="rem">相关知识点：<span v-html="p.rem">{{p.rem}}</span> </p>
        <p v-if="p.flag">
          <span v-if="p.flag==1" class="uansR">您的答案：<span v-html="p.uans">{{p.uans}}</span> </span>
          <span v-else class="uansE">您的答案：<span v-html="p.uans">{{p.uans}}</span></span>
        </p>
        <p v-else style="color: red">
          您未作答该题！
        </p>
      </span>
              </div>
            </div>
          </el-col>
          <el-col :span="1">
            <el-divider direction="vertical"></el-divider>
          </el-col>
          <el-col :span="9">
            <div class="Rdetail">
              <div style="margin-top: 30px;margin-left: 20px;margin-bottom: 40px">
                <span style="color: #0ea0db;font-weight: bold;">作答详细情况</span>
              </div>
              <RadarChart :fact="fact" :real="real"></RadarChart>
            </div>
          </el-col>
          <el-col :span="2">
            <el-divider direction="vertical"></el-divider>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
  import RadarChart from "../../../../components/RadarChart";
  export default {
    name: "ansPracu",
    components: {RadarChart},
    data(){
      return{
        //试卷pid,uid，id
        List:{
          pid:'',
          uid:'',
          num:'',
          exname:'',
          GradeLabel:0,
          exNum:'',
          ctime:'',
          auth:''
        },
        //  用户答案
        CList:[],
        FList:[],
        CMList:[],
        PList:[],
        JList:[],
        rem:[],
        BankList:[],
        BookList:[],
        //试题中的数据
        fact:{
          NC:0,
          NF:0,
          NJ:0,
          NP:0,
          NM:0
        },
        //用户作答的数据
        real:{
          NC:0,
          NF:0,
          NJ:0,
          NP:0,
          NM:0
        }
      }
    },
    created(){
      let that = this
      that.List.uid = that.$route.query.uid
      that.List.pid = that.$route.query.pid
      that.List.num = that.$route.query.num
      console.log(that.List)
      that.getData()
      that.getList()

    },
    methods:{
      getData:function () {
        let that = this
        console.log(that.List)
        that.$http.post('/student/practice/radar',{
          num:that.List.num,
          uid:that.List.uid,
          pid:that.List.pid,
        }).then(function (res) {
          console.log(res.data)
          that.fact.NC=res.data.data[0].nc
          that.fact.NF=res.data.data[0].nf
          that.fact.NP=res.data.data[0].np
          that.fact.NM=res.data.data[0].nm
          that.fact.NJ=res.data.data[0].nj
          that.real.NC=res.data.data[1].nc
          that.real.NF=res.data.data[1].nf
          that.real.NP=res.data.data[1].np
          that.real.NM=res.data.data[1].nm
          that.real.NJ=res.data.data[1].nj
          console.log(that.fact)
          console.log(that.real)
        })
      },
      //获取试卷信息
      getList:function () {
        let that = this
        console.log(that.List)
        that.$http.post('/student/practice/getuserdetail',{
          num:that.List.num,
          uid:that.List.uid,
          pid:that.List.pid
        }).then(function (res) {
          console.log(res.data)
          let list = res.data.data[0]
          console.log(list)
          that.List.exname = res.data.data[1].name
          that.List.ctime =res.data.data[1].createtime
          that.List.auth =res.data.data[1].auth
          that.List.exNum = res.data.data[2]
          that.List.GradeLabel = res.data.data[3]
          that.CList = []
          that.FList = []
          that.PList = []
          that.CMList = []
          that.JList = []
          for(let i=0;i<list.length;i++)
          {
            // console.log(list[i].type)
            if(list[i].type==1)
            {
              that.CList.push({
                ans:list[i].ans,
                cho:list[i].cho,
                flag:list[i].flag,
                item:list[i].item,
                rem:list[i].rem,
                tail:list[i].tail,
                type:list[i].type,
                uans:list[i].uans
              })
            }
            else if(list[i].type==2)
            {
              that.FList.push({
                ans:list[i].ans,
                flag:list[i].flag,
                item:list[i].item,
                rem:list[i].rem,
                tail:list[i].tail,
                type:list[i].type,
                uans:list[i].uans
              })
            }
            else if(list[i].type==3)
            {
              that.PList.push({
                ans:list[i].ans,
                flag:list[i].flag,
                item:list[i].item,
                rem:list[i].rem,
                tail:list[i].tail,
                type:list[i].type,
                uans:list[i].uans
              })
            }
            else if(list[i].type==4)
            {
              that.CMList.push({
                ans:list[i].ans,
                cho:list[i].cho,
                flag:list[i].flag,
                item:list[i].item,
                rem:list[i].rem,
                tail:list[i].tail,
                type:list[i].type,
                uans:list[i].uans
              })
            }
            else if(list[i].type==5)
            {
              that.JList.push({
                ans:list[i].ans,
                flag:list[i].flag,
                item:list[i].item,
                rem:list[i].rem,
                tail:list[i].tail,
                type:list[i].type,
                uans:list[i].uans
              })
            }
            else
            {
              alert('错误！')
            }
          }
          // that.rem=res.data.data[4]
          // that.BankList =res.data.data[5]
          // that.BookList=res.data.data[6]
        })
        console.log(that.List.exname)

      },
    }
  }
</script>

<style scoped>
  @import "../../../../common/css/ansPrac.css";
</style>
