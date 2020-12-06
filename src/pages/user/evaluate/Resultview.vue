<template>
    <!--结果查看-->
  <div style="margin-left: 30px">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/user/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/user/evaluate/userNresult'}">结果查看</el-breadcrumb-item>
      <el-breadcrumb-item >{{exname}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div>
        <div>
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
            eid:'',
            examList:[],

            // 翻页相关
            currentPage: 1,
            totalPage: 1,
            pageSize: 10,
            currentPageData:[],
            exname:''
          }
      },
      created(){
        let that = this
          that.uid = that.$store.getters.getsId
        that.eid = that.$route.query.eid
          that.getExamList()
      },
      methods:{
          //查看结果
        View:function(eid,num)
        {
          let that = this
          console.log()
          that.$router.push({
            path:'/user/evaluate/userview',
            query:{
              eid:eid,
              num:num,
              uid:that.uid
            }
          })
        },
          //模糊查找
        SeachEva:function()
        {
          let that = this
          console.log(that.name)
          if(that.name=='')
          {
            that.$confirm("输入内容为空", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            })
          }
          else{
            that.$http.post('/exam/exam/userqueryname',{
              name:that.name,
              uid:that.uid
            }).then(function (res) {
              console.log(res.data)
              let _that = that
              if(res.data.message==that.name+"查找成功")
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
                that.totalPage =Math.ceil(_that.uexamList.length/that.pageSize)
                that.totalPage=that.totalPage==0?1:that.totalPage
                that.setCurrentPageDate()
              }
            }).catch(function (err) {
              console.log(err)
            })
          }

        },
          //获取用户作答信息
          getExamList:function () {
            let that = this
            console.log(that.uid)
            that.name=''
            let _that = that
            that.$http.post('/exam/exam/userresult',{
              uid:that.uid,
              eid:that.eid,
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="查找成功")
              {
                _that.exname = res.data.data[0]
                let list = res.data.data[1]
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
                that.totalPage =Math.ceil(_that.uexamList.length/that.pageSize)
                that.totalPage=that.totalPage==0?1:that.totalPage
                that.setCurrentPageDate()
              }
            }).catch(function (err) {
              console.log(err)
            })
          },
        //分页
        setCurrentPageDate: function () {
          let that = this
          let begin = (that.currentPage - 1) * that.pageSize;
          let end = that.currentPage * that.pageSize;
          that.currentPageData = that.uexamList.slice(begin, end)
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
