<template>
    <!--资源管理-->
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-css">
        <el-breadcrumb-item :to="{ path: '/teacher/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item ><span @click="getRecourse">资源管理</span></el-breadcrumb-item>
      </el-breadcrumb>
      <div><hr/></div>
    </div>
    <div >
      <div class="search" v-if="recourseList.length>0">
        <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="name" class="searchInput"></el-input>
        <el-button round @click="searchRecourse" class="searchBtn">搜索</el-button>
        <el-button round @click="exportRe" class="searchBtn">导出</el-button>
      </div>
      <div><br><br><br></div>
      <div>
        <el-row :gutter="20">
          <el-col :span="12" v-if="recourseList.length>0">
            <div class="rlist">
              <span class="rlabel">资源列表</span>
              <div v-for="x,index in recourseList" :key="index">
                <span>
                   <span class="el-icon-date" style="background-color: sandybrown">{{x.ctime}}</span>
                  <div v-if="x.type=='mp4'">
                    <a :href="x.dir" class="title">{{x.name}}</a>
                    <br>
                    <video :preload="preload"   align="center" :controls="controls"  :autoplay="autoplay" :height="height">
                      <source :src="x.dir" type="video/mp4">
                    </video>
                  </div>
                  <div v-else>
                    <a :href="x.dir" class="title">{{x.name}}</a>
                  </div>
                </span>
              </div>
            </div>
          </el-col>
          <el-col :span="12" v-else>
            暂无资源
          </el-col>
          <el-col :span="8">
            <div class="list">
              <el-button round @click="addRecourse" class="searchBtn">添加资源</el-button>
              <div v-if="addRList.length>0">
                <span v-for="x ,index in addRList" :key="index">
                  <el-upload
                    action=""
                    :before-upload="beforeUpload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    multiple
                    :limit="1"
                    :http-request="uploadfile"
                    :on-change="onchange">
                    <el-button size="small" type="primary" >上传</el-button>
                  </el-upload>
                  <br>
                <br>
                  <el-button round @click="deleteRecourse(index)" class="searchBtn">删除资源</el-button>
                </span>
                <br>
                <br>
                <br>
                <el-button round @click="SubmitRecourse" class="searchBtn">上传资源</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Recource",
      data(){
          return {
            name:'',
            recourseList:[],
            uid:'',
            filename:[],
            filedir:[],
            addRFlag:false,
            addRList:[],
            //视频文件
            playStatus: '',
            muteStatus: '',
            isMute: true,
            isPlay: false,
            preload: 'auto', //  建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            controls: true, // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            autoplay: false,
            height: '300px'
          }
      },
      created(){
          this.uid = this.$store.getters.getsId
        this.getRecourse()
      },
      methods:{
        exportRe:function()
        {
          let that =this
          that.$http.post('/home/export/teacherreco',{
            tid:that.uid
          }).then(function (res) {
            console.log(res.data)
            window.open(res.data.data)
          })
        },
          getRecourse:function () {
            let that =this
            that.$http.post('/teacher/teacher/recourselist',{
              tid:that.uid
            }).then(function (res) {
              console.log(res.data)
              that.recourseList = res.data.data
            })
          },
        //搜索
        searchRecourse:function () {
          let that =this
          if(that.name=='')
          {
            that.$alert('搜索内容为空','提示',{
              confirmButtonText:'确定',
              type:'warning'
            })
          }
          else
          {
            that.$http.post('/teacher/teacher/searchrecourse',{
              tid:that.uid,
              name:that.name
            }).then(function (res) {
              console.log(res.data)
              that.recourseList = res.data.data
            })
          }
        },
        beforeUpload (file) {
          let that = this
            console.log(file)
          //分片
          let chunkList = []
          // 默认大小 2M=10485760/5
          // let chunkSize = file.size/40
          let sizes = 10485760/5
          let chunkNum = Math.ceil(file.size/sizes)
          let current = 0
          let i=0
          let filename = file.name
          console.log(filename)
          while (current<chunkNum)
          {
            chunkList.push({
              chunk:file.slice(current*sizes,(current+1)*sizes),
              fileName:filename+'.'+current+'.txt'
            });
            current++;
          }
          console.log(chunkNum)
          chunkList.map(function (item) {
            console.log(item.fileName)
            let form = new FormData();
            form.append('file',item.chunk);
            form.append('filename',item.fileName);
            that.$http.post('/teacher/teacher/uploadfile', form).then(function (res) {
              console.log(res)
            })
          })
          //合并
          that.$http.post('/teacher/teacher/merge',{
            filename:filename
          }).then(function (res) {
            console.log(res.data)
            that.filename.push(res.data.data[0])
            that.filedir.push(res.data.data[1])
            console.log(that.filename)
            console.log(that.filedir)
          })
        },
        // 点击移除文件按钮触发
        handleRemove (file, fileList) {
          console.log(file,fileList)
        },
        handlePreview (file) {
          console.log(file)
        },
        handleSuccess (index) {},
        // 覆盖默认的提交动作
        uploadfile (id) {},
        // 文件上传成功可触发
        onchange (index) {},
        //添加资源
        addRecourse:function(){
          let that =this
          that.addRList.push({
            fileName:'',
            fileDir:'',
          })
        },
        deleteRecourse:function (id) {
          let that = this
          that.addRList.splice(id,1)
          that.filename.splice(id,1)
          that.filedir.splice(id,1)
        },
        //上传资源
        SubmitRecourse:function () {
          let that =this
          if(that.filename==null||(that.filename!=null&&that.filename.length==0))
          {
            that.$alert('上传资源为空','提示',{
              confirmButtonText: '确认',
              type:'warning'
            })
          }
          else
          {
            console.log(that.addRList)
            for(let i=0;i<that.filedir.length;i++)
            {
              that.addRList[i]['fileName'] = that.filename[i]
              that.addRList[i]['fileDir'] = that.filedir[i]
            }
            console.log(that.addRList)
            that.$http.post('/teacher/teacher/recourse',{
              tid:that.uid,
              rList:that.addRList
            }).then(function (res) {
              console.log(res.data)
              that.getRecourse()
              that.addRList=[]
              that.$alert('上传资源成功','成功',{
                confirmButtonText: '确认',
                type:'success'
              })
            })
          }
        }
      }
    }
</script>

<style scoped>
@import "../../../common/css/recourse.css";
</style>
