<template>
    <div>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="getStudentList">学生管理</span></el-breadcrumb-item>
        </el-breadcrumb>
        <div><hr/></div>
      </div>
      <div v-if="studentList.length>0">
        <div class="search">
          <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="name" class="searchInput"></el-input>
          <el-button round @click="searchStudent" class="searchBtn">搜索</el-button>
          <el-button round @click="addFlag=true" class="searchBtn">添加学生</el-button>
          <el-dialog title="添加学生" :visible.sync="addFlag">
            <el-form >
              <el-form-item label="学生列表：" >
                <el-select style="width: 350px;" v-model="addList" multiple placeholder="选择学生" auto-complete="off">
                  <el-option v-for="(x,i) in addStudentList" :label="x.name" :value="x.id" :key="i">{{x.name}}</el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" style="align-content: center" class="dialog-footer">
              <el-button type="primary" @click="SubmitAddStudent">提交</el-button>
              <el-button @click="Reset">重置</el-button>
            </div>
          </el-dialog>
          <div><hr/></div>
        </div>
        <table>
          <th>序号</th>
          <th>学生学号</th>
          <th>学生姓名</th>
          <th>操作</th>
          <tr v-for="x,index in currentPageData" :key="index">
            <td>{{index+1}}</td>
            <td>{{x.no}}</td>
            <td>{{x.name}}</td>
            <td>
              <span @click="delStudent(x.id)" class="span1">退选</span>
            </td>
          </tr>
        </table>
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
      <div v-else>
        暂无学生
      </div>
    </div>
</template>

<script>
    export default {
        name: "TeacherStuManage",
      data(){
          return{
            studentList:[],
            uid:'',
            name:'',
            //可添加的学生列表
            addStudentList:[],
          //  添加学生弹框
            addFlag:false,
            //添加学生列表
            addList:[],
            // 翻页相关
            currentPage: 1,
            totalPage: 1,
            pageSize: 30,
            currentPageData:[]

          }
      },
      created(){
          this.uid = this.$store.getters.getsId
        this.getStudentList()
        this.addStudent()
      },
      methods:{
          getStudentList:function () {
            let that =this
            that.$http.post('/teacher/teacher/studentlist',{
              tid:that.uid
            }).then(function (res) {
              console.log(res.data)
              that.studentList = res.data.data
              that.totalPage =Math.ceil(that.studentList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
              that.name=''
            })
          },
        //  退选某学生
        delStudent:function (id) {
            let that =this
          that.$confirm('确定退选该学生？','提示',{
            cancelButtonText:'取消',
            confirmButtonText:'确定',
            type:'warning'
          }).then(()=>{
            that.$http.post('/teacher/teacher/delstudent',{
              tid:that.uid,
              sid:id
            }).then(function (res) {
              console.log(res.data)
              if(res.data.message=='success')
              {
                that.getStudentList()
                that.addStudent()
                that.$alert('已退选该学生','成功',{
                  confirmButtonText:'确定',
                  type:'success'
                })
              }
              else
              {
                that.$alert(res.data.message,'提示',{
                  confirmButtonText:'确定',
                  type:'warning'
                })
              }
            })
          })
        },
      //  搜索
        searchStudent:function () {
          let that = this
          if(that.name=='')
          {
            that.$alert('搜索内容为空！','提示',{
              confirmButtonText:"确定",
              type:'warning'
            })
          }
          else
          {
            that.$http.post('/teacher/teacher/searchstudent',{
              tid:that.uid,
              name:that.name
            }).then(function (res) {
              console.log(res.data)
              that.studentList =res.data.data
              that.totalPage =Math.ceil(that.studentList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
            })
          }
        },
        //添加学生列表
        addStudent:function () {
            let that =this
          that.$http.post('/teacher/teacher/student',{
            tid:that.uid
          }).then(function (res) {
            console.log(res.data)
            if(res.data.data)
            {
              that.addStudentList =res.data.data
            }
            else
            {
              that.addStudentList = []
            }
          })
        },
        //提交添加学生
        SubmitAddStudent:function () {
          console.log(this.addList)
          let that =this
          if(that.addList==null||(that.addList!=null&&that.addList.length==0))
          {
            that.$alert('请选择添加的学生','提示',{
              confirmButtonText:'确定',
              type:'warning'
            })
          }
          else
          {
            that.$http.post('/teacher/teacher/addstudent',{
              tid:that.uid,
              list:that.addList
            }).then(function (res) {
              console.log(res.data)
              that.$alert(res.data.message,'成功',{
                confirmButtonText:'确定',
                type:'success'
              })
              that.getStudentList()
              that.addStudent()
              that.addFlag =false
              that.Reset()
            })
          }
        },
        //重置
        Reset:function () {
          this.addList = []
        },
        //分页
        setCurrentPageDate: function () {
          let that = this
          let begin = (that.currentPage - 1) * that.pageSize;
          let end = that.currentPage * that.pageSize;
          that.currentPageData = that.studentList.slice(begin, end)
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
@import "../../../common/css/manages.css";
</style>
