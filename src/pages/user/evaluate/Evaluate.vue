<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/user/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测评</el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
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
                      <span class="span2">[序号：{{ key+1 }} 试卷编号：{{exam.exid}}</span>
                      <a  @click="Goexam(exam.exid,exam.gdtime)" class="title" target="_blank">{{exam.exname}}</a>
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
            <span>
              <!--<table >-->
              <!--<tr>-->
                <!--<th>序号</th>-->
                <!--<th>试卷编号 </th>-->
                <!--<th>试卷名</th>-->
                <!--<th>操作</th>-->
              <!--</tr>-->
              <!--<tr v-for=" (exam,key) in currentPageData" :key="key">-->
                <!--<td>{{ key+1 }}</td>-->
                <!--<td>{{exam.exid}}</td>-->
                <!--<td>{{exam.exname}}</td>-->
                <!--<td>-->
                  <!--<span v-if="exam.exstatus==1" class="span2" @click="Goexam(exam.exid)">进入测试</span>-->
                <!--</td>-->
              <!--</tr>-->
            <!--</table>-->
            </span>
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
          let begin = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          this.currentPageData = this.EvaList.slice(begin, end)
        },
        prePage() {
          console.log(this.currentPage)
          if (this.currentPage == 1)
            return
          this.currentPage--;
          this.setCurrentPageDate()
        },
        nextPage() {
          if (this.currentPage == this.totalPage) return
          this.currentPage++;
          this.setCurrentPageDate()
        },
          getEvaList:function () {
            this.$http.post('/yii/exam/index/queryexam',{
              flag:1,
            }).then(function (res) {
              console.log(res.data)
              // this.EvaList =res.data.data
              this.EvaList = []
              let List = res.data.data
              for(let i=0;i<List.length;i++)
              {
                this.EvaList.push({
                  exid:List[i].exid,
                  exname:List[i].exname,
                  auth:this.getUserName(List[i].auth),
                  gdtime:List[i].gdtime,
                  createtime:List[i].createtime,
                  exstatus:List[i].exstatus
                })
              }
              this.totalPage =Math.ceil(this.EvaList.length/this.pageSize)
              this.totalPage=this.totalPage==0?1:this.totalPage
              this.setCurrentPageDate()
            })
          },
        SeachEva:function () {
          this.$http.post('/yii/exam/index/queryexam',{
            flag:4,
            name:this.inputname
          }).then(function (res) {
            console.log(res.data)
            this.EvaList =res.data.data
            this.totalPage =Math.ceil(this.EvaList.length/this.pageSize)
            this.totalPage=this.totalPage==0?1:this.totalPage
            this.setCurrentPageDate()
          })
        },
        getCurrTime:function(){
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
          this.currentTime =  year + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute + seperator2 + second;
        },
        Goexam:function(id,s){
          console.log(id)
          console.log(s)
          this.getCurrTime()
          this.$router.push({
            path:'/user/evaluate/goeva',
            query:{
              id:id,
              stime:this.currentTime,
              limit:s
            }
          })
        },
        getUser:function(){
          let that =this
          this.$http.post('/yii/home/user/query',{
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
      created(){
          this.getUser()
          this.getEvaList()
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
  .title {
    font-size: 16px;
    color: #000;
    font-weight: bold;
  }
  .btn2:hover {
    background-color: #5FA7FE;
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
  li{list-style-type:none;}
  .dialog1{
    width: 350px;
    height:400px;
  }
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
