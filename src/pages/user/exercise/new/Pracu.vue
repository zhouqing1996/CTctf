<template>
  <!--练习资源-->
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item><span  style="font-weight: bold">练习列表</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div><hr></div>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label" v-on:click="getPractice"><i class="el-icon-date"></i> 练习列表</span>
          <div>
            <div class="meeting" >
              <el-input v-model="name" placeholder="模糊查找" size="mini"></el-input>
            </div>
            <button class="btn2 el-icon-search" v-on:click="Searchp">搜索练习</button>
            <button class="btn2 el-icon-circle-plus-outline" @click="UaddFlag=true">添加练习</button>
            <el-dialog title="自动组卷" :visible.sync="UaddFlag">
              <el-form :model="UaddList">
                <el-form-item label="练习名称" :label-width="formLabelWidth">
                  <el-input style="width: 350px;" v-model="UaddList.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择题数" :label-width="formLabelWidth">
                  <el-input style="width: 350px;" v-model="UaddList.NumC" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="填空题数" :label-width="formLabelWidth">
                  <el-input style="width: 350px;" v-model="UaddList.NumF" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="程序题数" :label-width="formLabelWidth">
                  <el-input style="width: 350px;" v-model="UaddList.NumP" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="判断题数" :label-width="formLabelWidth">
                  <el-input style="width: 350px;" v-model="UaddList.NumJ" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="多选题数" :label-width="formLabelWidth">
                  <el-input style="width: 350px;" v-model="UaddList.NumCM" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" style="align-content: center" class="dialog-footer">
                <el-button type="primary" v-on:click="ADDPractice">提交</el-button>
                <el-button @click="UaddFlag=false">退出</el-button>
              </div>
            </el-dialog>
          </div>
          <div v-if="UpList.length>0">
            <div v-for="x,key in currentPageData" :key="key" class="detail">
              <div>
                <h3>
                  <span class="title" >
                    <span class="span2">[序号：{{ key+1 }} 练习编号：{{x.id}}</span>{{x.name}}
                  </span>
                </h3>
              </div>
              <div>
                <span><i class="el-icon-date"></i>{{x.auth}}</span>
                <span class="ctime" ><i class="el-icon-date">{{x.createtime}}</i>
                  <el-button type="primary" v-on:click="ViewP(x.id)" v-if="x.flag==0">进入作答</el-button>
                  <el-button type="primary" v-on:click="LookP(x.id)" v-if="x.flag==1">查看结果</el-button>
                </span>
              </div>
            </div>
          </div>
          <div v-else>
            暂无练习
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 练习结果</span>
          <div>
            <div class="meeting" >
              <el-input v-model="name1" placeholder="模糊查找" size="mini"></el-input>
            </div>
            <button class="btn2 el-icon-search"  v-on:click="SearchAns">搜索练习</button>
          </div>
          <div v-if="ApList.length>0">
            <div v-for="m,index in currentPageData1" :keyx="index" class="detail">
              <div>
                <h3>
                  <span class="title" v-on:click="LookP(m.pid)">
                    <span class="span2">[序号：{{ index+1 }} 练习编号：{{m.pid}}</span>{{m.name}}
                  </span>
                </h3>
              </div>
              <div>
                <span><i class="el-icon-date"></i>{{m.auth}}</span>
                <span class="ctime" >
                  <i class="el-icon-date">{{m.fintime}}</i>
                  <i class="el-icon-date">得分：{{m.score}}</i>
                  <i class="el-icon-date">作答时长：{{m.ctime}}</i>
                </span>
              </div>
            </div>
          </div>
          <div v-else>
            暂无结果
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Pracu",
      data() {
        return{
          uid:'',
          name:'',
          name1:'',
          UpList:[],
          formLabelWidth:'120px',
          UaddFlag:false,
          UaddList:{
            name:'',
            NumC:0,
            NumF:0,
            NumP:0,
            NumCM:0,
            NumJ:0,
          },
          // 翻页相关
          currentPage: 1,
          totalPage: 1,
          pageSize: 10,
          currentPageData:[],

          //结果
          ApList:[],
          // 翻页相关
          currentPage1: 1,
          totalPage1: 1,
          pageSize1: 10,
          currentPageData1:[]
        }
      },
      created()
      {
        this.uid = this.$store.getters.getsId
        this.getPractice()
        this.getAnsPractice()
      },
      methods:{
        //分页
        setCurrentPageDate: function () {
          let that = this
          let begin = (that.currentPage - 1) * that.pageSize;
          let end = that.currentPage * that.pageSize;
          that.currentPageData = that.UpList.slice(begin, end)
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
        //分页
        setCurrentPageDate1: function () {
          let that = this
          let begin = (that.currentPage1 - 1) * that.pageSize1;
          let end = that.currentPage1 * that.pageSize1;
          that.currentPageData1 = that.ApList.slice(begin, end)
        },
        prePage1() {
          let that = this
          console.log(that.currentPage1)
          if (that.currentPage1 == 1)
            return
          that.currentPage1--;
          that.setCurrentPageDate1()
        },
        nextPage1() {
          let that = this
          if (that.currentPage1 == that.totalPage1) return
          that.currentPage1++;
          that.setCurrentPageDate1()
        },
        //结果查看
        getAnsPractice:function()
        {
          let that =this
          that.name1=''
          that.$http.post('/student/practice/practiceans',{
            uid:that.uid
          }).then(function (res) {
            console.log(res.data)
            that.ApList = res.data.data
            that.totalPage1 =Math.ceil(that.ApList.length/that.pageSize1)
            that.totalPage1=that.totalPage1==0?1:that.totalPage1
            that.setCurrentPageDate1()
          })
        },
        //结果搜索
        SearchAns:function()
        {
          let that =this
          if(that.name1=='')
          {
            that.$alert('搜索内容为空！','提示',{
              confirmButtonText:'确定',
              type:'warnning'
            })
          }
          else
          {
            that.$http.post('/student/practice/searchans',{
              name:that.name1,
              uid:that.uid
            }).then(function (res) {
              console.log(res.data)
              that.ApList = res.data.data
              that.totalPage1 =Math.ceil(that.ApList.length/that.pageSize1)
              that.totalPage1=that.totalPage1==0?1:that.totalPage1
              that.setCurrentPageDate1()
            })
          }

        },
          getPractice:function () {
            let that =this
            that.name =''
            that.$http.post('/student/practice/practicelist',{
              uid:that.uid
            }).then(function (res) {
              console.log(res.data)
              that.UpList = res.data.data
              that.totalPage =Math.ceil(that.UpList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
            })
          },
        //添加
        ADDPractice:function () {
          let that =this
          that.$http.post('/student/practice/addpractice',{
            uid:that.uid,
            list:that.UaddList
          }).then(function (res) {
            console.log(res.data)
            that.$alert('添加完成！','成功',{
              confirmButtonText:'确定',
              type:'success'
            })
            that.getPractice()
            that.UaddFlag=false
          })
        },
        //预览
        ViewP:function (id) {
          let that =this
          that.$router.push({
            path:'/user/vpractice',
            query:{
              id:id
            }
          })
        },
        Searchp:function () {
          let that =this
          if(that.name=='')
          {
            that.$alert('搜索内容为空！','提示',{
              confirmButtonText:'确定',
              type:'warnning'
            })
          }
          else
          {
            that.$http.post('/student/practice/searchp',{
              uid:that.uid,
              name:that.name
            }).then(function (res) {
              console.log(res.data)
              that.UpList = res.data.data
              that.totalPage =Math.ceil(that.UpList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
            })
          }

        },
        //查看结果
        LookP:function (id) {
          let that =this
          that.$router.push({
            path:'/user/ansPractice',
            query:{
              uid:that.uid,
              pid:id,
              num:1
            }
          })
        }
      }
    }
</script>

<style scoped>
  @import "../../../../common/css/create.css";
</style>
