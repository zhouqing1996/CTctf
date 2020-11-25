<template>
    <!--结果查看-->
  <div style="margin-left: 30px">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/user/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >
        <span @click="getExamList" class="span1">结果查看</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div>
      <div >
        <div >
          <div class="meeting" >
            <el-input v-model="name" placeholder="模糊查找" size="mini"></el-input>
          </div>
          <button class="btn el-icon-search" v-on:click="SeachEva()">搜索试卷</button>
        </div>
        <br>
        <br>
        <el-divider></el-divider>
        <div class="waimian">
          <div v-if="currentPageData.length>0">
            <div  v-for=" (x,key) in currentPageData" class="detail" >
              <div class="detail">
                <div>
                  <h3 @click="View(x.exid,x.num)">
                    <span class="span2">[第{{x.num}}次]</span>
                    <span  class="title" >{{x.examname}}</span>
                  </h3>
                </div>
                <div>
                  <span class="Im">
                      <img src="../../../assets/images/avter.png" style="width: 20px;height: 20px"><span class="name">{{x.auth}}</span>
                  </span>
                <span class="ctime" >
                  <i class="el-icon-time">分数：{{x.grade}}</i>
                  <i class="el-icon-time">作答时长：{{x.ctime}}分钟</i>
                  <i class="el-icon-date">完成时间：{{x.finishtime}}</i>
                </span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div>没有结果</div>
          </div>
        </div>
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
  </div>
</template>

<script>
    export default {
        name: "Resultview",
      data(){
          return{
            name:'',
            //用户作答的试卷信息
            uexamList:[],
            uid:'',
            examList:[],

            // 翻页相关
            currentPage: 1,
            totalPage: 1,
            pageSize: 10,
            currentPageData:[],
          }
      },
      created(){
          this.uid = this.$store.getters.getsId
          this.getExamList()
      },
      methods:{
          //查看结果
        View:function(eid,num)
        {
          console.log()
          this.$router.push({
            path:'/user/evaluate/userview',
            query:{
              eid:eid,
              num:num,
              uid:this.uid
            }
          })
        },
          //模糊查找
        SeachEva:function()
        {
          console.log(this.name)
          if(this.name=='')
          {
            this.$confirm("输入内容为空", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            })
          }
          else{
            this.$http.post('/yii/exam/exam/userqueryname',{
              name:this.name,
              uid:this.uid
            }).then(function (res) {
              console.log(res.data)
              let _that = this
              if(res.data.message==this.name+"查找成功")
              {
                let list = res.data.data
                _that.uexamList = [];
                for(let i=0;i<list.length;i++)
                {
                  //时间处理
                  let timex = list[i].ctime
                  let minx = timex.split(':')
                  let ntime = parseInt(minx[0])*60+parseInt(minx[1])+parseInt(minx[2])/60;
                  ntime = parseFloat(ntime).toFixed(2)
                  _that.uexamList.push({
                    num:list[i].id,
                    exid:list[i].exid,
                    examname:list[i].exname,
                    grade:list[i].grade,
                    ctime:ntime,
                    finishtime:list[i].finishtime
                  })
                }
                console.log(_that.uexamList)
                this.totalPage =Math.ceil(_that.uexamList.length/this.pageSize)
                this.totalPage=this.totalPage==0?1:this.totalPage
                this.setCurrentPageDate()
              }
            }).catch(function (err) {
              console.log(err)
            })
          }

        },
          //获取用户作答信息
          getExamList:function () {
            console.log(this.uid)
            this.name=''
            let _that = this
            this.$http.post('/yii/exam/exam/userresult',{
              uid:this.uid
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="查找成功")
              {
                let list = res.data.data
                _that.uexamList = [];
                for(let i=0;i<list.length;i++)
                {
                  //时间处理
                  let timex = list[i].ctime
                  let minx = timex.split(':')
                  let ntime = parseInt(minx[0])*60+parseInt(minx[1])+parseInt(minx[2])/60;
                  ntime = parseFloat(ntime).toFixed(2)
                  _that.uexamList.push({
                    num:list[i].id,
                    examname:list[i].exname,
                    grade:list[i].grade,
                    exid:list[i].exid,
                    ctime:ntime,
                    auth:list[i].auth,
                    finishtime:list[i].finishtime
                  })
                }
                console.log(_that.uexamList)
                this.totalPage =Math.ceil(_that.uexamList.length/this.pageSize)
                this.totalPage=this.totalPage==0?1:this.totalPage
                this.setCurrentPageDate()
              }
            }).catch(function (err) {
              console.log(err)
            })
          },
        //分页
        setCurrentPageDate: function () {
          let begin = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          this.currentPageData = this.uexamList.slice(begin, end)
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
      }
    }
</script>

<style scoped>
  .span1{
    color: black;
    /*background-color: rgba(227,62,51,0.1);*/
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: auto;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 16px;
    border-radius: 2px;
  }
  .span1:hover{
    background-color: #5FA7FE;
  }
  .span2{
    color: lightpink;
    background-color: rgba(227,62,51,0.1);
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: auto;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 16px;
    border-radius: 2px;
  }
  .span2:hover{
    background-color: #5FA7FE;
  }
  .waimian{
    margin-top: 10px;
    /*margin-left: 20px;*/
    text-align: left;
    margin-left: 60px;
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
  .btn {
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
  .btn:hover {
    background-color: #5FA7FE;
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
