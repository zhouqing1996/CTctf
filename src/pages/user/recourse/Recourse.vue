<template>
    <div>
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
          <el-breadcrumb-item :to="{ path: '/user/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>资源学习</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div><hr/></div>
      <div>
        <el-row :gutter="20">
          <el-col :span="4">
            <div style="font-size: 20px;font-weight: bold;color: #0ea0db">
              资源学习
            </div>
          </el-col>
          <el-col :span="14">
            <div class="rlist">
              <div v-if="recourseList.length>0">
                <div v-for="x,index in recourseList" :key="index" style="margin-bottom: 10px">
                  ({{index+1}})<span class="el-icon-user">{{x.tid}}</span>
                  <span class="el-icon-date" style="background-color: sandybrown">{{x.ctime}}</span>
                  <span><a :href="x.dir" class="title">{{x.name}}</a></span>
                  <div v-if="x.type=='mp4'">
                    <br>
                    <video :preload="preload"   align="center" :controls="controls"  :autoplay="autoplay" :height="height">
                      <source :src="x.dir" type="video/mp4">
                    </video>
                  </div>
                </div>
              </div>
              <div v-else style="font-size: 20px;font-weight: bold;color: #0ea0db">
                暂无资源可供学习
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="search" v-if="recourseList.length>0">
              <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="name" class="searchInput"></el-input>
              <el-button  v-on:click="searchRecourse" class="searchBtn">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Recourse",
      data() {
        return {
          recourseList:[],
          //视频文件
          playStatus: '',
          muteStatus: '',
          isMute: true,
          isPlay: false,
          preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          autoplay: false,
          height: '100px',

          //搜索
          name:''
        }
      },
      created()
      {
        this.getRecourselist()
      },
      methods:{
        searchRecourse:function()
        {
          let that = this
          if(that.name=='')
          {
            that.$alert('搜索内容为空','提示',{
              confirmButtonText:'确定',
              type:'warning'
            })
          }
          else {
            that.$http.post('/student/recourse/searchre',{
              sid:that.$store.getters.getsId,
              name:that.name
            }).then(function (res) {
              console.log(res.data)
              that.recourseList = res.data.data
            })
          }
        },
          getRecourselist:function () {
            let that =this
            that.name = ''
            that.$http.post('/student/recourse/recourselist',{
              sid:that.$store.getters.getsId
            }).then(function (res) {
              console.log(res.data)
              that.recourseList = res.data.data
            })
          }
      }
    }
</script>

<style scoped>
  @import "../../../common/css/recourse.css";
</style>
