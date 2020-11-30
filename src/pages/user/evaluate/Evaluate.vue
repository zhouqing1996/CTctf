<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/user/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><span @click="getEvaList" style="font-weight: bold">测评</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div v-if="EvaList.length>0">
      <div class="display1">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 试卷列表</span>
            <div class="display2">
              <div class="searchmem">
                <div class="meeting" >
                  <el-input v-model="inputname" placeholder="模糊查找" size="mini"></el-input>
                </div>
                <button class="btn2 el-icon-search" v-on:click="SeachEva()">搜索试卷</button>
              </div>
              <br>
              <br>
              <el-divider></el-divider>
              <div class="waimian">
                <div  v-for=" (exam,key) in currentPageData" class="detail">
                  <div class="detail">
                    <div>
                      <h3>
                        <p @click="Goexam(exam.exid,exam.gdtime)" class="title" target="_blank">
                          <span class="span2">[序号：{{ key+1 }} 试卷编号：{{exam.exid}}]</span>{{exam.exname}}
                        </p>
                      </h3>
                    </div>
                    <div>
                      <div class="Im">
                        <img src="../../../assets/images/avter.png" class="avter"><span class="name">{{exam.auth}}</span>
                      </div>
                      <span class="ctime" ><i class="el-icon-time">时间：{{exam.gdtime}}分钟</i> <i class="el-icon-date">{{exam.createtime}}</i></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="page">
          <ul class="pagination pagination-sm"><!--分页-->
            <li class="page-item" v-if="currentPage!=1">
              <span class="page-link" v-on:click="prePage">上一页</span>
            </li>
            <li class="page-item" >
              <span class="page-link" >第{{ currentPage }}页/共{{totalPage}}页</span>
            </li>
            <li class="page-item" v-if="currentPage!=totalPage">
              <span class="page-link" v-on:click="nextPage">下一页</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      暂无测评试卷
    </div>
  </div>
</template>

<script>
    export default {
        name: "Evaluate",
      data(){
          return{
            inputname:'',
            EvaList:[],
            // 翻页相关
            currentPage: 1,
            totalPage: 1,
            pageSize: 10,
            currentPageData:[],
          //  计时
            timer:'',//定义定时器的变量
            currentTime :new Date()
          }
      },
      methods:{
        //分页
        setCurrentPageDate: function () {
          let that = this
          let begin = (that.currentPage - 1) * that.pageSize;
          let end = that.currentPage * that.pageSize;
          that.currentPageData = that.EvaList.slice(begin, end)
        },
        prePage() {
          let that = this
          console.log(that.currentPage)
          if (that.currentPage == 1)
            return
          that.currentPage--;
          that.setCurrentPageDate()
        },
        nextPage() {
          let that = this
          if (that.currentPage == that.totalPage) return
          that.currentPage++;
          that.setCurrentPageDate()
        },
        getEvaList:function () {
          let that = this
            that.$http.post('/exam/index/queryexam',{
              flag:5,
              sid:that.$store.getters.getsId
            }).then(function (res) {
              // console.log(that.$http.interceptors.request)
              console.log(res.data)
              // that.EvaList =res.data.data
              that.EvaList = []
              let List = res.data.data
              for(let i=0;i<List.length;i++)
              {
                that.EvaList.push({
                  exid:List[i].exid,
                  exname:List[i].exname,
                  auth:List[i].auth,
                  gdtime:List[i].gdtime,
                  createtime:List[i].createtime,
                  exstatus:List[i].exstatus
                })
              }
              that.totalPage =Math.ceil(that.EvaList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
            })
          },
        SeachEva:function () {
          let that = this
          that.$http.post('/exam/index/queryexam',{
            flag:4,
            name:that.inputname
          }).then(function (res) {
            console.log(res.data)
            that.EvaList =res.data.data
            that.totalPage =Math.ceil(that.EvaList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          })
        },
        getCurrTime:function(){
          let that = this
          var date = new Date();
          var seperator1 = "-";
          var seperator2 = ":";
          //以下代码依次是获取当前时间的年月日时分秒
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          var minute = date.getMinutes();
          var hour = date.getHours();
          var second = date.getSeconds();
          //固定时间格式
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
          }
          if (minute >= 0 && minute <= 9) {
            minute = "0" + minute;
          }
          if (second >= 0 && second <= 9) {
            second = "0" + second;
          }
          that.currentTime =  year + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute + seperator2 + second;
        },
        Goexam:function(id,s){
          let that = this
          console.log(id)
          console.log(s)
          that.getCurrTime()
          that.$router.push({
            path:'/user/evaluate/goeva',
            query:{
              id:id,
              stime:that.currentTime,
              limit:s
            }
          })
        },
        getUser:function(){
          let that =this
          that.$http.post('/home/user/query',{
            flag:2
          }).then(function (res) {
            console.log(res.data)
            that.userList = res.data.data
          })
        },
        getUserName:function(id){
          let that =this
          for(let k=0;k<that.userList.length;k++)
          {
            if(id==that.userList[k].id)
            {
              return that.userList[k].username
            }
          }
        },
      },
      mounted(){
        // setInterval(that.getUser(),2000)
      },
      created(){
        let that = this
          // setInterval(that.getUser(),2000)
          that.getEvaList()
      }
    }
</script>

<style scoped>
  .btn2 {
    width: 100px;
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
  .title {
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  a:link{
    color: dodgerblue;
    text-decoration:none;
  }
  a:visited{
    color: deepskyblue;
  }
  a:hover{
    color: yellowgreen;
  }
  a:active{
    color: yellow;
  }
  /*删除*/
  .span1{
    padding: 7px;
    color: white;
    background-color: gray;
    margin-left: 5px;
    margin-top: 17px;
    margin-bottom: 5px;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: auto;
    height: 30px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    border-radius: 2px;
  }
  .span1:hover{
    background-color: #5FA7FE;
  }
  /*修改*/
  .span2{
    color: #e33e33;
    background-color: rgba(227,62,51,0.1);
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: auto;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    border-radius: 2px;
  }
  .span2:hover{
    background-color: #5FA7FE;
  }
  .delete{
    float: right!important;
  }
  .waimian{
    margin-top: 10px;
    /*margin-left: 20px;*/
    text-align: left;
    width: auto;
    height: auto;
  }
  .detail {
    border-collapse: collapse;
    width: 80%;
    margin-top: 5px;
    table-layout: fixed;
    white-space:nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    padding: 5px;
    text-align: left;
    border-bottom: 1px solid #f0f2f5;
    position: relative;
    font-size: 14px;
  }
  .ctime{
    float: right!important;
    width: auto;
    font-size: 12px;
    color: #909399;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;

  }
  th {
    font-size: 14px;
    border: solid 1px #ccc;
    font-weight: bold;
    padding: 5px;
    background-color: #F1F1F1;
    text-align: center;
  }
  table, td {
    border: solid 1px #ccc;
    padding: 5px;
    text-align: center;
    font-size: 18px;
  }
  .display1{
    border: solid 1px #E5E7E9;
    height: 600px;
    /*text-align: center;*/
    width: 98%;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #fff;
  }
  .page {
    text-align: center;
  }
  .meeting{
    float:left;
    margin:14px 0 10px 0;
    font-weight: bold;
    background-color: #00AAFF;
    border:solid 1px #00AAFF;
    border-radius: 5px;
    width: 20%;
    padding:2px;
  }
  .avter{
    display: flex;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    -o-object-fit: cover;
    object-fit: cover;
    overflow: hidden;
  }
  .Im{
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    display: flex;
    float: left;
  }
  .name{
    float: left;
    font-size: 14px;
    color: #8a8a8a;
    line-height: 24px;
    margin-top: 0;
  }

  .dialog1{
    width: 350px;
    height:400px;
  }
  li{list-style-type:none;}
  ul {
    display: flex;
    /*flex-direction: row;*/
    /*flex-wrap: nowrap;*/
    flex-flow: row nowrap;
    justify-content: center;
  }
  ul li {
    list-style: none;
    text-align: center;
    line-height: 30px;
    padding: 10px;
    height: 30px;
    width: 100px;
    margin: 0 10px;
  }
</style>
