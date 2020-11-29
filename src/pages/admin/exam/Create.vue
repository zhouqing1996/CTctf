<template>
    <!--创建试卷-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><span @click="getExamList(3)" style="font-weight: bold">测评试卷</span></el-breadcrumb-item>
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
              <button class="btn2 el-icon-search" v-on:click="getExamList(4)">搜索试卷</button>
              <router-link :to="{ name: 'selfcreate' }">
                <button class="btn2 el-icon-circle-plus-outline">手动组卷</button>
              </router-link>
              <router-link :to="{ name: 'newcreate' }">
                <button class="btn2 el-icon-circle-plus-outline">创建试卷</button>
              </router-link>
              <button class="btn2 el-icon-circle-plus-outline" @click="dialogFormVisibleAdd=true">自动组卷</button>
              <el-dialog title="自动组卷" :visible.sync="dialogFormVisibleAdd">
                <el-form :model="addexam">
                  <el-form-item label="试卷名称" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addexam.name" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="选择题数" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addexam.nc" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="填空题数" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addexam.nf" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="程序题数" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addexam.np" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="判断题数" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addexam.nj" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="多选题数" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addexam.ncm" auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="时间：" :label-width="formLabelWidth">
                    <el-input style="width: 350px;" v-model="addexam.gdtime" auto-complete="off" placeholder="规定作答时间，以分钟计算"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" style="align-content: center" class="dialog-footer">
                  <el-button type="primary" @click="AddExam">提交</el-button>
                  <el-button @click="dialogFormVisibleAdd=false">退出</el-button>
                </div>
              </el-dialog>
              <button class="btn2 el-icon-folder" @click="getExamList(1)">有效试卷</button>
              <button class="btn2 el-icon-folder-remove" @click="getExamList(2)">无效试卷</button>
              <button class="btn2 el-icon-folder-checked" @click="getExamList(3)">所有试卷</button>
            </div>
            <div class="waimian">
              <div v-for=" (exam,key) in currentPageData" class="detail">
                <div>
                  <h3><span class="span2">[序号：{{ key+1 }} 试卷编号：{{exam.exid}}]</span>
                    <a v-if="exam.exstatus==1" class="title" @click="lookexam(exam.exid)">{{exam.exname}}</a>
                    <a v-if="exam.exstatus==0" class="title">{{exam.exname}}</a>
                    <div class="delete">
                      <span @click="goDown(exam.exid)" class="span3">下载试卷</span>
                      <span @click="goFenXi(exam.exid)" class="span3">学生答题情况</span>
                      <span v-if="exam.exstatus==1">有效
                        <span @click="deleteExam(1,exam.exid)" class="span1"><i class="el-icon-delete">删除</i></span>
                        </span>
                      <span v-if="exam.exstatus==0">无效
                        <span @click="changeExamstatus(exam.exid)" class="span2">修改</span>
                        <span  @click="deleteExam(2,exam.exid)" class="span1"><i class="el-icon-delete">删除</i></span>
                      </span>
                    </div>
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
        </el-tab-pane>
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
      </el-tabs>

    </div>
  </div>
</template>

<script>
    export default {
        name: "create",
      data(){
          return{
            formLabelWidth: '120px',
            examList:[],
            inputname:'',
            authname:"",
            //组卷
            dialogFormVisibleAdd:false,
            addexam:{
              id:"",
              name:"",
              nc:0,
              nf:0,
              np:0,
              nj:0,
              ncm:0,
              gdtime:0
            },
            userList:[],
            // 翻页相关
            currentPage: 1,
            totalPage: 1,
            pageSize: 10,
            currentPageData:[]
          }
      },
      methods:{
        goDown:function(id){
          let that =this
          that.$http.post('/exam/download/dfile',{
            eid:id
          }).then(function (res) {
            console.log(res.data)
            window.open(res.data.data[0])
          })
        },
        goFenXi:function(id)
        {
          this.$router.push({
            path:'/admin/exam/fenxi',
            query:{
              eid:id
            }
          })
        },
        //  查看试卷
        lookexam:function(id){
          console.log(id)
          this.$router.push({
            path:'/admin/exam/viewexam',
            query:{
              id:id
            }
          })
        },
        //  查询人
        // getUser(id)
        // {
        //   that.$http.post('/home/user/queryid',{
        //     id:id
        //   }).then(function (res) {
        //     console.log(res.data)
        //     that.authname = res.data.data.username
        //   }).catch(function (error) {
        //     console.log(error)
        //   })
        // },
        //分页
        setCurrentPageDate: function () {
          let that =this
          let begin = (that.currentPage - 1) * that.pageSize;
          let end = that.currentPage * that.pageSize;
          that.currentPageData = that.examList.slice(begin, end)
        },
        prePage() {
          let that =this
          console.log(that.currentPage)
          if (that.currentPage == 1)
            return
          that.currentPage--;
          that.setCurrentPageDate()
        },
        nextPage() {
          let that =this
          if (that.currentPage == that.totalPage) return
          that.currentPage++;
          that.setCurrentPageDate()
        },
        Reset:function(){
          let that =this
          that.addexam.name="";
          that.addexam.nc=0;
          that.addexam.np=0;
          that.addexam.nf=0;
          that.addexam.nj =0;
          that.addexam.ncm=0
          that.addexam.gdtime=0
        },
      //  组卷
      //  1：自动组卷
      //  2：手动组卷
        AddExam:function () {
          let that =this
          var numRe = new RegExp(/^[0-9]*$/)
          if(that.addexam.gdtime==0||that.addexam.ncm==0||that.addexam.nc==0||that.addexam.nf==0||that.addexam.np==0||that.addexam.nj==0)
          {
            that.$alert('每种题型都必须有！', '警告', {
              confirmButtonText: '确定',
            type:'warning'})
          }
          else if(!numRe.test(that.addexam.gdtime))
          {
            that.$alert('规定时间不是一个数字', '警告', {
              confirmButtonText: '确定',type:'warning'})
          }
          else if(that.addexam.exname=="")
          {
            that.$alert('试卷名为空', '警告', {
              confirmButtonText: '确定',type:'warning'})
          }
          else if (!numRe.test(that.addexam.ncm)) {
            that.$alert('多选题数不是一个数字', '警告', {
              confirmButtonText: '确定',type:'warning'})
          }
          else if (!numRe.test(that.addexam.nc)) {
            that.$alert('选择题数不是一个数字', '警告', {
              confirmButtonText: '确定',type:'warning'})
          }
          else if (!numRe.test(that.addexam.nj)) {
            that.$alert('判断题数不是一个数字', '警告', {
              confirmButtonText: '确定',type:'warning'})
          }
          else if (!numRe.test(that.addexam.np)) {
            that.$alert('程序题数不是一个数字', '警告', {
              confirmButtonText: '确定',type:'warning'})
          }
          else if (!numRe.test(that.addexam.nf)) {
            that.$alert('填空题数不是一个数字', '警告', {
              confirmButtonText: '确定',type:'warning'})
          }
          else {
            that.$http.post('/exam/index/addexam',{
              flag:1,
              exname:that.addexam.name,
              numc:that.addexam.nc,
              numf:that.addexam.nf,
              nump:that.addexam.np,
              numj:that.addexam.nj,
              numcm:that.addexam.ncm,
              gdtime:that.addexam.gdtime,
              auth:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="自动组卷成功")
              {
                that.getExamList(3)
              }
              that.dialogFormVisibleAdd=false
              that.Reset();
              alert(res.data.message)
            }).catch(function (error) {
              console.log(error)
            })
          }

        },
        //返回试卷信息
        //1：有效试卷
        //2：无效试卷
        //3：所有试卷
        //4:模糊查找
        getExamList:function (item) {
          let that =this
          console.log(item)
          if(item==1)
          {
            that.$http.post('/exam/index/queryexam',{
              flag:1
            }).then(function (res) {
              console.log(res.data)
              that.examList = []
              let List = res.data.data
              for(let i=0;i<List.length;i++)
              {
                that.examList.push({
                  exid:List[i].exid,
                  exname:List[i].exname,
                  auth:List[i].auth,
                  gdtime:List[i].gdtime,
                  createtime:List[i].createtime,
                  exstatus:List[i].exstatus
                })
              }
              that.totalPage =Math.ceil(that.examList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==2)
          {
            that.$http.post('/exam/index/queryexam',{
              flag:2
            }).then(function (res) {
              console.log(res.data)
              that.examList = []
              let List = res.data.data
              for(let i=0;i<List.length;i++)
              {
                that.examList.push({
                  exid:List[i].exid,
                  exname:List[i].exname,
                  auth:List[i].auth,
                  gdtime:List[i].gdtime,
                  createtime:List[i].createtime,
                  exstatus:List[i].exstatus
                })
              }
              console.log(that.examList)
              that.totalPage =Math.ceil(that.examList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==3)
          {
            that.$http.post('/exam/index/queryexam',{
              flag:3
            }).then(function (res) {
              console.log(res.data)
              that.examList = []
              let List = res.data.data
              for(let i=0;i<List.length;i++)
              {
                that.examList.push({
                  exid:List[i].exid,
                  exname:List[i].exname,
                  auth:List[i].auth,
                  gdtime:List[i].gdtime,
                  createtime:List[i].createtime,
                  exstatus:List[i].exstatus
                })
              }
              console.log(that.examList)
              that.totalPage =Math.ceil(that.examList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==4)
          {
            that.$http.post('/exam/index/queryexam',{
              flag:4,
              name:that.inputname
            }).then(function (res) {
              console.log(res.data)
              that.examList = []
              let List = res.data.data
              for(let i=0;i<List.length;i++)
              {
                that.examList.push({
                  exid:List[i].exid,
                  exname:List[i].exname,
                  auth:List[i].auth,
                  gdtime:List[i].gdtime,
                  createtime:List[i].createtime,
                  exstatus:List[i].exstatus
                })
              }
              that.totalPage =Math.ceil(that.examList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
            }).catch(function (error) {
              console.log(error)
            })
          }
          else{
            console.log("输入错误")
          }
        },
        //修改状态
        changeExamstatus:function (id) {
          let that =this
          that.$http.post('/exam/index/changestatus',{
            exid:id
          }).then(function (res) {
            console.log(res.data)
            that.getExamList(3)
            alert(res.data.message)
          }).catch(function (error) {
            console.log(error)
          })
        },
      //  删除
        deleteExam:function (item,id) {
          let that =this
          if(item==1)
          {
            that.$confirm("删除该试卷，是否继续？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              that.$http.post('/exam/index/deleteexam',{
                flag:1,
                exid:id
              }).then(function (res) {
                console.log(res.data)
                if(res.data.message=="删除成功")
                {
                  that.getExamList(3)
                }
                alert(res.data.message)
              })
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==2)
          {
            that.$confirm("完全删除该试卷，是否继续？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              that.$http.post('/exam/index/deleteexam',{
                flag:2,
                exid:id
              }).then(function (res) {
                console.log(res.data)
                if(res.data.message=="完全删除成功")
                {
                  that.getExamList(3)
                }
                alert(res.data.message)
              })
            }).catch(function (error) {
              console.log(error)
            })
          }
          else{
            console.log("输入错误")
          }
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
      created(){
          // that.getUser()
          this.getExamList(3)
      },
      mounted(){

      }
    }
</script>

<style scoped>
  /*下载试卷*/
  .span3{
    padding: 7px;
    color: white;
    background-color: #0ea0db;
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
  .span3:hover{
    background-color: gray;
  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
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
  .ctime{
    float: right!important;
    width: auto;
    font-size: 12px;
    color: #909399;
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
  .btn3 {
    width: 80px;/*px*/
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

  .btn3:hover {
    background-color: #5FA7FE;
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
    border: solid 1px #ccc;/*no*/
    padding: 5px;/*no*/
    text-align: center;
    font-size: 18px;/*px*/
  }
  .display{
    padding-left: 5px;
    padding-top: 10px;
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
  li{list-style-type:none;}
  .dialog1{
    width: 350px;
    height:400px;
  }
  ul {
    display: flex;
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
