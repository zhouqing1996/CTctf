<template>
    <!--创建试卷-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item ><span @click="getExamList(3)" style="font-weight: bold">测评试卷</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div class="display1">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 试卷列表</span>
          <div class="display2">
            <div class="top">
              <div class="meeting" >
                <el-input v-model="inputname" placeholder="模糊查找" size="mini"></el-input>
              </div>
              <button class="btn2 el-icon-search" v-on:click="getExamList(4)">搜索试卷</button>
              <router-link :to="{ name: 'TeacherSelfCreate' }">
                <button class="btn2 el-icon-circle-plus-outline">手动组卷</button>
              </router-link>
              <router-link :to="{ name: 'TeacherNewCreate' }">
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
              <div class="detail" v-for=" (exam,key) in currentPageData">
                <div>
                  <h3>
                    <span class="span2">[序号：{{ key+1 }} 试卷编号：{{exam.exid}}</span>
                       <a v-if="exam.exstatus==1" class="title" @click="lookexam(exam.exid)">{{exam.exname}}</a>
                    <a v-if="exam.exstatus==0" class="title">{{exam.exname}}</a>
                    <div class="delete">
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
                  <span class="ctime" ><i class="el-icon-time">时间：{{exam.gdtime}}分钟</i> <i class="el-icon-date">{{exam.createtime}}</i></span>
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
        </el-tab-pane>
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
            tid:'',
            // 翻页相关
            currentPage: 1,
            totalPage: 1,
            pageSize: 10,
            currentPageData:[]
          }
      },
      methods:{
        //  查看试卷
        lookexam:function(id){
          console.log(id)
          this.$router.push({
            path:'/teacher/viewexam',
            query:{
              id:id
            }
          })
        },
        //分页
        setCurrentPageDate: function () {
          let begin = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          this.currentPageData = this.examList.slice(begin, end)
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
        Reset:function(){
          this.addexam.name="";
          this.addexam.nc=0;
          this.addexam.np=0;
          this.addexam.nf=0;
          this.addexam.nj =0;
          this.addexam.ncm=0
          this.addexam.gdtime=0
        },
      //  组卷
      //  1：自动组卷
      //  2：手动组卷
        AddExam:function () {
          var numRe = new RegExp(/^[0-9]*$/)
          if(this.addexam.gdtime==0||this.addexam.ncm==0||this.addexam.nc==0||this.addexam.nf==0||this.addexam.np==0||this.addexam.nj==0)
          {
            this.$alert('每种题型都必须有！', '警告', {
              confirmButtonText: '确定',})
          }
          else if(!numRe.test(this.addexam.gdtime))
          {
            this.$alert('规定时间不是数字', '警告', {
              confirmButtonText: '确定',})
          }
          else if(this.addexam.name=="")
          {
            this.$alert('试卷名为空', '警告', {
              confirmButtonText: '确定',})
          }
          else if (!numRe.test(this.addexam.ncm)) {
            this.$alert('多选题数不是一个数字', '警告', {
              confirmButtonText: '确定',})
          }
          else if (!numRe.test(this.addexam.nc)) {
            this.$alert('选择题数不是一个数字', '警告', {
              confirmButtonText: '确定',})
          }
          else if (!numRe.test(this.addexam.nj)) {
            this.$alert('判断题数不是一个数字', '警告', {
              confirmButtonText: '确定',})
          }
          else if (!numRe.test(this.addexam.np)) {
            this.$alert('程序题数不是一个数字', '警告', {
              confirmButtonText: '确定',})
          }
          else if (!numRe.test(this.addexam.nf)) {
            this.$alert('填空题数不是一个数字', '警告', {
              confirmButtonText: '确定',})
          }
          else {
            this.$http.post('/yii/exam/index/addexam',{
              flag:1,
              exname:this.addexam.name,
              numc:this.addexam.nc,
              numf:this.addexam.nf,
              nump:this.addexam.np,
              numj:this.addexam.nj,
              numcm:this.addexam.ncm,
              gdtime:this.addexam.gdtime,
              auth:this.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=="自动组卷成功")
              {
                this.getExamList(3)
              }
              this.dialogFormVisibleAdd=false
              this.Reset();
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
          console.log(item)
          if(item==1)
          {
            this.$http.post('/yii/exam/teacher/queryexamt',{
              flag:1,
              tid:this.tid
            }).then(function (res) {
              console.log(res.data)
              this.examList = res.data.data
              this.totalPage =Math.ceil(this.examList.length/this.pageSize)
              this.totalPage=this.totalPage==0?1:this.totalPage
              this.setCurrentPageDate()
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==2)
          {
            this.$http.post('/yii/exam/teacher/queryexamt',{
              flag:2,
              tid:this.tid
            }).then(function (res) {
              console.log(res.data)
              this.examList = res.data.data
              this.totalPage =Math.ceil(this.examList.length/this.pageSize)
              this.totalPage=this.totalPage==0?1:this.totalPage
              this.setCurrentPageDate()
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==3)
          {
            this.$http.post('/yii/exam/teacher/queryexamt',{
              flag:3,
              tid:this.tid
            }).then(function (res) {
              console.log(res.data)
              this.examList = res.data.data
              this.totalPage =Math.ceil(this.examList.length/this.pageSize)
              this.totalPage=this.totalPage==0?1:this.totalPage
              this.setCurrentPageDate()
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==4)
          {
            this.$http.post('/yii/exam/teacher/queryexamt',{
              flag:4,
              tid:this.tid,
              name:this.inputname
            }).then(function (res) {
              console.log(res.data)
              this.examList = res.data.data
              this.totalPage =Math.ceil(this.examList.length/this.pageSize)
              this.totalPage=this.totalPage==0?1:this.totalPage
              this.setCurrentPageDate()
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
          this.$http.post('/yii/exam/index/changestatus',{
            exid:id
          }).then(function (res) {
            console.log(res.data)
            this.getExamList(3)
            alert(res.data.message)
          }).catch(function (error) {
            console.log(error)
          })
        },
      //  删除
        deleteExam:function (item,id) {
          if(item==1)
          {
            this.$confirm("删除该试卷，是否继续？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.$http.post('/yii/exam/index/deleteexam',{
                flag:1,
                exid:id
              }).then(function (res) {
                console.log(res.data)
                if(res.data.message=="删除成功")
                {
                  this.getExamList(3)
                }
                alert(res.data.message)
              })
            }).catch(function (error) {
              console.log(error)
            })
          }
          else if(item==2)
          {
            this.$confirm("完全删除该试卷，是否继续？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.$http.post('/yii/exam/index/deleteexam',{
                flag:2,
                exid:id
              }).then(function (res) {
                console.log(res.data)
                if(res.data.message=="完全删除成功")
                {
                  this.getExamList(3)
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
        }
      },
      created(){
        this.tid=this.$store.getters.getsId
          this.getExamList(3)
      },
      mounted(){

      }
    }
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .top{
    top: 20px;
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
  .display1{
    border: solid 1px #E5E7E9;
    height: 600px;
    /*text-align: center;*/
    width: 98%;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #fff;
    margin-bottom: 10px;
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
