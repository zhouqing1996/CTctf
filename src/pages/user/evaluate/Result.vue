<template>
  <!--&lt;!&ndash;<button @click="getAns">判断成绩</button>&ndash;&gt;-->
  <!--&lt;!&ndash;<button @click="getList">获得信息</button>&ndash;&gt;-->
  <!--学生查看结果查看试卷-->
  <div id="waimian">
    <div class="back">
      <el-page-header @back="back">
      </el-page-header>
    </div>
    <div>
      <h1 class="T"><strong>{{List.exname}}</strong>
        <span v-text="'试题总分：'+List.exNum+',您的得分：'+List.GradeLabel" style="color: #FF0000;float: right!important;margin-right: 50px" ></span></h1>
      <hr/>
      <!--<div class="Tright">-->
        <!---->
      <!--</div>-->
      <el-row :gutter="20">
        <el-col :span="12">
          <div>
            <div v-if="CList.length>0">
              <h2>一、选择题</h2>
              <span v-for="(c,key1) in CList":key="key1" >
            <li class="item">({{key1+1}})<strong>{{c.item}}</strong><br>
              <input type="radio"  value="">（A）{{c.cho.split('---')[0]}}<br>
              <input type="radio"  value="">（B）{{c.cho.split('---')[1]}}<br>
              <input type="radio"  value="">（C）{{c.cho.split('---')[2]}}<br>
              <input type="radio"  value="">（D）{{c.cho.split('---')[3]}}<br>
            </li>
            <p class="ans">答案：{{c.ans}}</p>
            <p class="tail">详解：{{c.tail}}</p>
            <p class="rem">相关知识点：{{c.rem}}</p>
            <p v-if="c.flag">
              <span v-if="c.flag==1" class="uansR">您的答案：{{c.uans}}</span>
              <span v-else class="uansE">您的答案：{{c.uans}}</span>
            </p>
            <p v-else style="color: red">
              您未作答该题！
            </p>
        </span>
            </div>
            <div v-if="FList.length>0">
              <h2>二、填空题</h2>
              <span v-for="(f,key2) in FList":key="key2">
      <li class="item">({{key2+1}})<strong>{{f.item}}</strong><br>
        <input type="text" value=""><br>
      </li>
      <p class="ans">答案：{{f.ans}}</p>
      <p class="tail">详解：{{f.tail}}</p>
      <p class="rem">相关知识点：{{f.rem}}</p>
        <p v-if="f.flag">
          <span v-if="f.flag==1" class="uansR">您的答案：{{f.uans}}</span>
          <span v-else class="uansE">您的答案：{{f.uans}}</span>
        </p>
        <p v-else style="color: red">
          您未作答该题！
        </p>
    </span>
            </div>
            <div v-if="JList.length>0">
              <h2>三、判断题</h2>
              <span v-for="(j,keyj) in JList":key="keyj">
        <li class="item">({{keyj+1}})<strong>{{j.item}}</strong><br>
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
        <li class="item">({{keym+1}})<strong>{{m.item}}</strong><br>
              <input type="checkbox"  value="">（A）{{m.cho.split('---')[0]}}<br>
              <input type="checkbox"  value="">（B）{{m.cho.split('---')[1]}}<br>
              <input type="checkbox"  value="">（C）{{m.cho.split('---')[2]}}<br>
              <input type="checkbox"  value="">（D）{{m.cho.split('---')[3]}}<br>
        </li>

      <p class="ans">答案：{{m.ans}}</p>
      <p class="tail">详解：{{m.tail}}</p>
      <p class="rem">相关知识点：{{m.rem}}</p>
        <p v-if="m.flag">
          <span v-if="m.flag==1" class="uansR">您的答案：{{m.uans}}</span>
          <span v-else class="uansE">您的答案：{{m.uans}}</span>
        </p>
        <p v-else style="color: red">
          您未作答该题！
        </p>
    </span>
            </div>
            <div v-if="PList.length>0">
              <h2>五、程序题</h2>
              <span v-for="(p,key3) in PList":key="key3">
        ({{key3+1}})<strong>{{p.item}}</strong>
        <p class="ans">答案：{{p.ans}}</p>
        <p class="tail">详解：{{p.tail}}</p>
        <p class="rem">相关知识点：{{p.rem}}</p>
        <p v-if="p.flag">
          <span v-if="p.flag==1" class="uansR">您的答案：{{p.uans}}</span>
          <span v-else class="uansE">您的答案：{{p.uans}}</span>
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
            <!--<div class="Gright">-->
              <!--图像-->
              <RadarChart :fact="fact" :real="real"></RadarChart>
            <!--</div>-->
            <div>
              <el-divider></el-divider>
              <div style="margin-top: 10px;margin-left: 20px;margin-bottom: 40px">
                <span style="color: #0ea0db;font-weight: bold;">推荐内容</span>
              </div>
              <div>
                <span style="text-align: left;color: coral;font-weight: bold;margin-top: 10px;margin-bottom: 10px;margin-left: 20px;margin-bottom: 10px">知识点：</span>
                <span v-for="x,index in rem">
                  <p>({{index+1}}):{{x.rem}}</p>
                </span>
                <span style="text-align: left;color: coral;font-weight: bold;margin-top: 10px;margin-bottom: 10px;margin-left: 20px;margin-bottom: 10px">推荐题目：</span>
                <span v-for="x,index in BankList">
                  <p>({{index+1}}):{{x.item}}</p>
                </span>
                <span style="text-align: left;color: coral;font-weight: bold;margin-top: 10px;margin-bottom: 10px;margin-left: 20px;margin-bottom: 10px">推荐书籍：</span>
                <span v-for="x,index in BookList">
                  <p>({{index+1}}):{{x.bookname}}({{x.item}})</p>
                </span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="2">
          <el-divider direction="vertical"></el-divider>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    import RadarChart from "../../../components/RadarChart";
    export default {
        name: "Result",
      components: {RadarChart},
      data(){
          return{
            //试卷eid,uid，id
            List:{
              eid:'',
              uid:'',
              id:'',
              exname:'',
              GradeLabel:0,
              exNum:'',
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
        this.List.uid = this.$route.query.uid
        this.List.eid = this.$route.query.eid
        this.List.num = this.$route.query.num
        this.getData()
        this.getList()

      },
      methods:{
        getData:function () {
          console.log(this.List)
          this.$http.post('/yii/student/student/radar',{
            num:this.List.num,
            uid:this.List.uid,
            eid:this.List.eid,
          }).then(function (res) {
            console.log(res.data)
            this.fact.NC=res.data.data[0].nc
            this.fact.NF=res.data.data[0].nf
            this.fact.NP=res.data.data[0].np
            this.fact.NM=res.data.data[0].nm
            this.fact.NJ=res.data.data[0].nj
            this.real.NC=res.data.data[1].nc
            this.real.NF=res.data.data[1].nf
            this.real.NP=res.data.data[1].np
            this.real.NM=res.data.data[1].nm
            this.real.NJ=res.data.data[1].nj
            console.log(this.fact)
            console.log(this.real)
          })
        },
        back:function(){
          this.$router.push({
            path:'/user/evaluate/result',
          })
        },
          //获取试卷信息
          getList:function () {
            console.log(this.List)
            this.$http.post('/yii/exam/exam/getuserdetail',{
              num:this.List.num,
              uid:this.List.uid,
              eid:this.List.eid
            }).then(function (res) {
              console.log(res)
              let list = res.data.data[0]
              console.log(list)
              this.List.exname = res.data.data[1].exname
              this.List.exNum = res.data.data[2]
              this.List.GradeLabel = res.data.data[3]
              this.CList = []
              this.FList = []
              this.PList = []
              this.CMList = []
              this.JList = []
              for(let i=0;i<list.length;i++)
              {
                // console.log(list[i].type)
                if(list[i].type==1)
                {
                  this.CList.push({
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
                  this.FList.push({
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
                  this.PList.push({
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
                  this.CMList.push({
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
                  this.JList.push({
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
              this.rem=res.data.data[4]
              this.BankList =res.data.data[5]
              this.BookList=res.data.data[6]
            })
            console.log(this.List.exname)

          },
      }
    }
</script>

<style scoped>
  .back{
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .Tright{
    /*得分*/
    position: absolute;
    z-index: 888;
    top: 150px;
    margin-right: 200px;
    right: 50px;
    height: 50px;
    font-size: 20px;
    color: red;
    text-align: center;
    font-weight: bold;
    float: right!important;
  }
  /*雷达图*/
  .Gright{
    /*position: absolute;*/
    z-index: 888;
    top: 250px;
    margin-right: 200px;
    right: 50px;
    font-size: 20px;
    color: red;
    text-align: center;
    font-weight: bold;
    /*float: right!important;*/
  }
  .T{
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #000;
  }
  #waimian {
    margin-top: 10px;
    padding: 10px;
    background-color: aliceblue;
    margin-left: 20px;
    margin-right: 20px;
    border: white;
    width: auto;
    text-align: left;
  }
  .item{
    /*background-color: sandybrown;*/
    margin-left: 20px;
    margin-top: 10px;
    font-family: "Times New Roman";
    font-size: 16px;
  }
  .ans{
    /*background-color: gray;*/
    font-size: 14px;
    margin-left: 20px;
    font-family: "Times New Roman";
  }
  .tail{
    font-family: "Times New Roman";
    font-size: 12px;
    margin-left: 20px;
  }
  .rem{
    font-family: "Times New Roman";
    font-size: 10px;
    margin-left: 20px;
  }
  li{list-style-type:none;}
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
  .Rdetail{
    text-align: left;
  }
</style>
