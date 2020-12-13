<template>
  <!--学生练习-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
      <el-breadcrumb-item :to="{ path: '/admin/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><span v-on:click="getPracList">练习题库</span></el-breadcrumb-item>
    </el-breadcrumb>
    <div><hr/></div>
    <div>
      <div>
        <div class="meeting">
          <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="name" ></el-input>
        </div>
        <el-button class="btn2 el-icon-search" v-on:click="SearchPrac">搜索</el-button>
        <!--<el-button class="btn2 el-icon-search">添加练习</el-button>-->
        <el-button class="btn2 el-icon-document" v-on:click="downPrac">导出练习</el-button>
        <el-button class="btn2 el-icon-document" v-on:click="downPracinfo">导出数据</el-button>
      </div>
      <div v-if="PracList.length>0">
        <div v-for="x,key in currentPageData" :key="key" class="detail">
          <div>
            <h3>
                  <span class="title" v-on:click="ViewP(x.id)">
                    <span class="span2">[序号：{{ key+1 }} 练习编号：{{x.id}}</span>{{x.name}}
                  </span>
              <div class="delete">
                <span  class="span3" @click="Down(x.id)">下载练习</span>
                <!--<span  class="span3">学生答题情况</span>-->
                <span  class="span3" v-on:click="Downp(x.id)">下载答题信息</span>
                <span v-if="x.status==1">有效
                        <span  class="span1"><i class="el-icon-delete">删除</i></span>
                        </span>
                <span v-if="x.status==0">无效
                        <span class="span2">修改</span>
                        <span   class="span1"><i class="el-icon-delete">删除</i></span>
                      </span>
              </div>
            </h3>
          </div>
          <div>
            <span class="ctime" >
              <span style="margin-right: 10px"><i class="el-icon-user">{{x.auth}}</i></span>
              <span><i class="el-icon-date">{{x.createtime}}</i></span>
            </span>
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
      <div v-else>
        暂无练习
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pPractice",
    data() {
      return {
        name:'',
        uid:'',
        //练习列表
        PracList:[],
        // 翻页相关
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
        currentPageData: []
      }
    },
    created(){
      this.uid = this.$store.getters.getsId
      this.getPracList()
    },
    methods:{
      exportP:function() {
        let that =this
        that.$http.post('/home/export/studentpra').then(function (res) {
          console.log(res.data)
          window.open(res.data.data)
        })
      },
      //下载全部试卷
      downPrac:function() {
        let that =this
        that.$http.post('/admin/practice/downprac').then(function (res) {
          console.log(res.data)
          window.open(res.data.data)
        })
      },
      //下载作答信息
      downPracinfo:function()
      {
        let that =this
        that.$http.post('/admin/practice/downpracinfo').then(function (res) {
          console.log(res.data)
          window.open(res.data.data)
        })

      },
      //分页
      setCurrentPageDate: function () {
        let that =this
        let begin = (that.currentPage - 1) * that.pageSize;
        let end = that.currentPage * that.pageSize;
        that.currentPageData = that.PracList.slice(begin, end)
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
      //获取列表
      getPracList:function () {
        let that =this
        that.name=''
        that.$http.post('/admin/practice/getprac').then(function (res) {
          console.log(res.data)
          that.PracList =res.data.data
          that.totalPage =Math.ceil(that.PracList.length/that.pageSize)
          that.totalPage=that.totalPage==0?1:that.totalPage
          that.setCurrentPageDate()
        })
      },
      //搜索
      SearchPrac:function () {
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
          that.$http.post('/admin/practice/searchprac',{
            name:that.name
          }).then(function (res) {
            console.log(res.data)
            that.PracList =res.data.data
            that.totalPage =Math.ceil(that.PracList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          })
        }
      },
      //浏览
      ViewP:function (id) {
        let that =this
        that.$router.push({
          path:'/admin/practice/vpractice',
          query:{
            id:id
          }
        })
      },
      //下载练习题
      Down:function (id) {
        let that =this
        that.$http.post('/teacher/practice/dpractice',{
          pid:id
        }).then(function (res) {
          console.log(res.data)
          window.open(res.data.data[0])
        })
      },
      //下载用户作答练习题信息
      Downp:function (id) {
        let that =this
        that.$http.post('/teacher/practice/dpinfo',{
          pid:id,
          uid:that.uid
        }).then(function (res) {
          console.log(res.data)
          window.open(res.data.data)
        })
      },
    }
  }
</script>

<style scoped>
  @import "../../../common/css/create.css";
</style>
