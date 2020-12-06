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
          <span slot="label"><i class="el-icon-date"></i> 练习列表</span>
          <div>
            <div class="meeting" >
              <el-input v-model="name" placeholder="模糊查找" size="mini"></el-input>
            </div>
            <button class="btn2 el-icon-search"  >搜索练习</button>
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
                  <span class="title" v-on:click="ViewP(x.id)">
                    <span class="span2">[序号：{{ key+1 }} 练习编号：{{x.id}}</span>{{x.name}}
                  </span>
                </h3>
              </div>
              <div>
                <span><i class="el-icon-date"></i>{{x.auth}}</span>
                <span class="ctime" ><i class="el-icon-date">{{x.createtime}}</i></span>
              </div>
            </div>
          </div>
          <div v-else>
            暂无练习
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
          currentPageData:[]
        }
      },
      created()
      {
        this.uid = this.$store.getters.getsId
        this.getPractice()
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
          getPractice:function () {
            let that =this
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
        }
      }
    }
</script>

<style scoped>
  @import "../../../../common/css/create.css";
</style>
