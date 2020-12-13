<template>
    <!--总体练习题目-->
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{ path: '/teacher/pCreate' }">练习题库</el-breadcrumb-item>
        <el-breadcrumb-item><span  style="font-weight: bold">练习列表</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div><hr/></div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 练习列表</span>
          <div>
            <div class="meeting" >
              <el-input v-model="name" placeholder="模糊查找" size="mini"></el-input>
            </div>
            <button class="btn2 el-icon-search"  v-on:click="Search">搜索练习</button>
            <button class="btn2 el-icon-search" v-on:click="ADDPractice">添加练习</button>
          </div>
          <div v-if="pList.length>0">
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
                <span class="ctime" ><i class="el-icon-date">{{x.createtime}}</i></span>
              </div>
            </div>
          </div>
          <div v-else>
            暂无练习
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
        name: "pCreate",
      data() {
        return{
          uid:'',
          //练习题库
          pList:[],
          name:'',

          // 翻页相关
          currentPage: 1,
          totalPage: 1,
          pageSize: 10,
          currentPageData:[]
        }
      },
      created(){
          this.uid =this.$store.getters.getsId
        this.getPList()
      },
      methods:{
        //分页
        setCurrentPageDate: function () {
          let that = this
          let begin = (that.currentPage - 1) * that.pageSize;
          let end = that.currentPage * that.pageSize;
          that.currentPageData = that.pList.slice(begin, end)
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
        //练习列表
        getPList:function () {
          let that =this
          that.$http.post('/teacher/practice/practice',{
            uid:that.uid
          }).then(function (res) {
            console.log(res.data)
            that.name=''
            that.pList = res.data.data
            that.totalPage =Math.ceil(that.pList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          })
        },
        //添加练习
        ADDPractice:function () {
          let that =this
          that.$router.push({
            path:'/teacher/practice',
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
        //搜索练习
        Search:function () {
          let that = this
          if(that.name=='')
          {
            that.$alert('搜索内容为空！','提示',{
              confirmButtonText:"确定",
              type:'warning'
            })
          }
          else{
            that.$http.post('/teacher/practice/searchparctice',{
              name:that.name,
              uid:that.uid
            }).then(function (res) {
              console.log(res.data)
              that.pList = res.data.data
              that.totalPage =Math.ceil(that.pList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
            })
          }
        },
        ViewP:function (id) {
          let that =this
          that.$router.push({
            path:'/teacher/vpractice',
            query:{
              id:id
            }
          })
        }
      }
    }
</script>

<style scoped>
@import "../../../common/css/create.css";
</style>
