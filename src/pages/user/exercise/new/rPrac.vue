<template>
  <!--结果查看，总体查看-->
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{ path: '/user/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>结果查看</el-breadcrumb-item>
      </el-breadcrumb>
      <div><hr/></div>
    </div>
    <div v-if="resultList.length>0">
      <div >
        <div class="meeting" >
          <el-input v-model="name" placeholder="模糊查找" size="mini"></el-input>
        </div>
        <button class="btn el-icon-search" v-on:click="SeachEva()">搜索试卷</button>
      </div>
      <br>
      <br>
      <el-divider></el-divider>
      <div  v-for=" (x,key) in currentPageData" class="detail" >
        <div class="detail">
          <div>
            <h3 @click="Look(x.exid)">
              <span style="text-align: center;">{{x.exname}}</span>
            </h3>
          </div>
          <div>
              <span class="Im">
                  <img src="../../../assets/images/avter.png" style="width: 20px;height: 20px"><span class="name">{{x.auth}}</span>
              </span>
            <span class="ctime" >
                <i class="el-icon-time">试卷创建时间:{{x.createtime}}</i>
                <i class="el-icon-notebook-1">测试次数：{{x.num}}</i>
                <i class="el-icon-set-up">最高得分：{{x.score}}</i>
                <i class="el-icon-date">最后完成时间：{{x.lastTime}}</i>
              </span>
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
    <div v-else>
      暂无测试结果查看！
    </div>
  </div>
</template>

<script>
  export default {
    name: "rPrac",
    data()
    {
      return {
        resultList:[],
        uid:this.$store.getters.getsId,
        name:'',
        // 翻页相关
        currentPage: 1,
        totalPage: 1,
        pageSize: 10,
        currentPageData:[],
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getList:function () {
        let that =this
        that.resultList = []
        that.$http.post('/student/practice/practiceans',{
          uid:that.uid
        }).then(function (res) {
          console.log(res.data)
          if(res.data.data==that.uid)
          {
            that.resultList = []
          }
          else {
            that.resultList = res.data.data
            that.totalPage =Math.ceil(that.resultList.length/that.pageSize)
            that.totalPage=that.totalPage==0?1:that.totalPage
            that.setCurrentPageDate()
          }

        })
      },
      Look:function(id)
      {
        this.$router.push({
          path:'/user/evaluate/result',
          query:{
            eid:id
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
          that.$alert("输入内容为空", "提示", {
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
              _that.resultList = [];
              for(let i=0;i<list.length;i++)
              {
                //时间处理
                let timex = list[i].ctime
                let minx = timex.split(':')
                let ntime = parseInt(minx[0])*60+parseInt(minx[1])+parseInt(minx[2])/60;
                ntime = parseFloat(ntime).toFixed(2)
                _that.resultList.push({
                  num:list[i].id,
                  exid:list[i].exid,
                  examname:list[i].exname,
                  grade:list[i].grade,
                  ctime:ntime,
                  finishtime:list[i].finishtime
                })
              }
              console.log(_that.resultList)
              that.totalPage =Math.ceil(_that.resultList.length/that.pageSize)
              that.totalPage=that.totalPage==0?1:that.totalPage
              that.setCurrentPageDate()
            }
          }).catch(function (err) {
            console.log(err)
          })
        }

      },
      //分页
      setCurrentPageDate: function () {
        let that = this
        let begin = (that.currentPage - 1) * that.pageSize;
        let end = that.currentPage * that.pageSize;
        that.currentPageData = that.resultList.slice(begin, end)
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
    },
  }
</script>

<style scoped>
  @import "../../../../common/css/result.css";
</style>
